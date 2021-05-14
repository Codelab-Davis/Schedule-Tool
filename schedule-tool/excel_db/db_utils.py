from pymongo import MongoClient
import pprint as pp
import pickle
import sys

# database_name = "pskainth_schedule-tool"
database_name = "schedule-tool"
# collection_name = "details"
collection_name = "enrollment"
options = {
    'db_file' : collection_name + ".db",

    'clear_db'   : True,
    'backup_db'  : False,
    'restore_db' : True
}

# connect to client
print("Connecting to Mongo DB")
client = MongoClient("mongodb+srv://scheduletool:scheduletool@schedule-tool.kbgbb.mongodb.net/" + database_name + "?retryWrites=true&w=majority")

# try to connect to database
print("Validating connection")
try:
    db_list = client.list_database_names()
    print(db_list)
except:
    print("ERR: Unable to open client")
    sys.exit()

# choose the database and test if successful
print("Opening DB")
db = client[database_name]
print(db.list_collection_names())

# choose the collection and clear collection
print("Getting collection " + collection_name)
collection = db[collection_name]

if options['backup_db']:
    # insert all of the data into the database
    print("Reading from database")
    documents = collection.find({})
    doc_list = []
    for d in documents:
        doc_list.append(d)
    print(collection.estimated_document_count())
    print("Writing pickle file " + options['db_file'])
    db_file_handle = open(options['db_file'], "wb")
    pickle.dump(doc_list, db_file_handle)
    db_file_handle.close()

if options['clear_db']:
    print("Clearing collection")
    collection.delete_many({})
    print(collection.estimated_document_count())

if options['restore_db']:
    print("Reading pickle file " + options['db_file'])
    db_file_handle = open(options['db_file'], "rb")
    documents = pickle.load(db_file_handle)
    db_file_handle.close()
    # insert all of the data into the database
    print("Writing to database")
    collection.insert_many(documents)
    print(collection.estimated_document_count())
