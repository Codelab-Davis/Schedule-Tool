from pymongo import MongoClient
import pprint as pp
import sys
from process_excel import ProcessExcel
import argparse
import os
import pathlib

# default global variable for db name
db_name = "pskainth_schedule-tool"

# default clear status
clear = True

options = {
    'clear'   : True,
    'db_name' : "pskainth_schedule-tool"
}

def load_args():
    # create parser object to parse arguments1
    parser = argparse.ArgumentParser()

    # create arguments for command line (optional)
    parser.add_argument("-c", "--clear", 
                        help="Clear the given database. If not provided, clear default database",
                        action="store_true")
    parser.add_argument("-db", "--database", 
                        help="Specify a database. If not, will default to some db",
                        type=str)

    # create mutually exclusive arguments (optional)
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("-f", "--file", 
                        type=str,
                        help="single file name")
    group.add_argument("-d", "--dir", 
                        type=str,
                        help="name of directory")

    # parse through arguments
    args = parser.parse_args()

    # set clear status
    options['clear'] = args.clear
    
    # change db name from default if provided
    if args.database != None:
        options['db_name'] = args.database

    # list of file names (needs to be tested to see if they can be opened)
    excel_file_names = []

    # check if file can be opened (if file name provided)
    if args.file != None:
        if not pathlib.Path(args.file).is_file():
            print("ERR: unable to open file " + args.file)
            sys.exit()
        excel_file_names.append(args.file)

    # check if directory exists and can be accessed
    if args.dir != None:
        if not pathlib.Path(args.dir).is_dir():
            print("ERR: could not open directory " + args.dir)
            sys.exit()

        for root, dirs, files in os.walk(args.dir):
            for filename in files:
                path_and_file = args.dir + "/" + filename
                if pathlib.Path(path_and_file).is_file():
                    excel_file_names.append(path_and_file)
                else:
                    print("ERR: unable to open file " + filename)
                    sys.exit()
        
    # return list of excel files
    return excel_file_names   

def load_db(excel_file_names):
    
    # connect to client
    client_name = "mongodb+srv://scheduletool:scheduletool@schedule-tool.kbgbb.mongodb.net/" + options['db_name'] + "?retryWrites=true&w=majority"
    try:
        client = MongoClient(client_name)
        print("Connected to client successfully")
    except:
        print("ERR: Unable to open client")
        sys.exit()

    # connect to database 
    try:
        db = client[options['db_name']]
        print("Connected to database " + options['db_name'] + " successfully")
    except:
        print("ERR: Unable to open database " + options['db_name'])
        sys.exit()

    # default collection name is "details"
    collection = db['details']

    # clear collection if specified
    if options['clear']:
        collection.delete_many({})
        print("Collection cleared, count = " + str(collection.estimated_document_count()))

    # check if given file names are of correct file type
    filenames = excel_file_names
    for files in filenames:
        if not files.endswith(".xlsx"):
            print("Invalid file name: " + files)
            sys.exit()

    # add all courses to database
    for files in filenames:
        print("processing file : " + files)
        excel_data = ProcessExcel(files)
        courses = excel_data.getCourses()
        collection.insert_many(courses)

    print(collection.estimated_document_count())      
    
if __name__ == "__main__":
   filenames = load_args()
   load_db(filenames)