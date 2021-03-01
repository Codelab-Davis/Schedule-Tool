from pymongo import MongoClient
import pprint as pp
import sys
from process_excel import ProcessExcel

# connect to client
client = MongoClient("mongodb+srv://scheduletool:scheduletool@schedule-tool.kbgbb.mongodb.net/pskainth_schedule-tool?retryWrites=true&w=majority")

# try to connect to database
try:
    db_list = client.list_database_names()
    print(db_list)
except:
    print("ERR: Unable to open client")
    sys.exit()

# choose the database and test if successful
db = client['pskainth_schedule-tool']
print(db.list_collection_names())

# choose the collection and clear collection
collection = db['course_info']
collection.delete_many({})
print(collection.estimated_document_count())

# get the data from the excel doc
excel_data = ProcessExcel("./raw_data/courses_16_17.xlsx")
courses = excel_data.getCourses()

# insert all of the data into the database
collection.insert_many(courses)

print(collection.estimated_document_count())
