from pymongo import MongoClient
import pandas as pd
import pprint as pp
import requests
import html2text
import re
import sys
import course_web_info
from datetime import datetime
import progressbar
import pickle

options = {
    'term'          : "202110",
    'quarter'       : "FQ2021",
    'previous_year' : "20_21",
    'extension'     : ".xlsx",
    'db_name'       : "schedule-tool",

    'pk_file_crn_map' : "crn_map_dump.pkl",
    'pk_file_course_enroll' : "course_enroll_dump.pkl",

    'dump_pk_crn_map'       : False, # ONCE: Dump initial CRN info. Not expected to change
    'dump_pk_course_enroll' : True,  # ALWAYS: Dump course enroll info in case need to use last information
    'load_pk_crn_map'       : True,  # ALWAYS: Once saved, load dumped file to save time.
    'load_pk_course_enroll' : False, # NEED BASIS: Only when previous data is needed for debug

    'clear_detail_collection'      : False, # CAUTION - Will destroy collection, do only if creating new
    'clear_enroll_collection'      : False, # CAUTION - Will destroy collection, do only if creating new
    'insert_new_detail_collection' : False, # ONCE: every quarter when creating new database for that quarter
    'insert_new_enroll_collection' : False, # ONCE:every quarter when creating new database for that quarter
    'update_enroll_collection'     : True,  # NIGHTLY: Do it when enrollment (seats) information needs update
}

class CurrentQuarter:

    def __init__(self):

        now = datetime.now()
        self.time_string = now.strftime("%Y-%m-%d_%X")
        print("Update time: " + self.time_string)
        # get fall 2020 course id
        # self.course_id = self.get_course_id()

        print("Getting course names")
        self.course_id = self.get_course_id_file("fq2021_course_name.txt")
        self.course_id.sort()

        # for c in self.course_id:
        #     print(c)
        # print(self.course_id)
        # sys.exit()
        
        self.crn_map = {}
        self.enrollment_list = []
        self.course_list = []

        print("Getting crn's")
        if options['load_pk_crn_map']:
            # load crn from pickle data dump
            crn_map_dump_file = open(options['pk_file_crn_map'], "rb")
            self.crn_map = pickle.load(crn_map_dump_file)
            crn_map_dump_file.close()
        else:
            # get crn from html web
            self.get_CRN()

        if options['dump_pk_crn_map']:
            # save crn to pickle data dump
            crn_map_dump_file = open(options['pk_file_crn_map'], "wb")
            pickle.dump(self.crn_map, crn_map_dump_file)
            crn_map_dump_file.close()
        
        print("generating course info")
        if options['load_pk_course_enroll']:
            # load crn from pickle data dump
            course_enroll_dump_file = open(options['pk_file_course_enroll'], "rb")
            course_enroll_info = pickle.load(course_enroll_dump_file)
            course_enroll_dump_file.close()            
            self.course_list = course_enroll_info['course']
            self.enrollment_list = course_enroll_info['enroll']
        else:
            self.gen_course_info()

        if options['dump_pk_course_enroll']:
            # save crn to pickle data dump
            course_enroll_dump_file = open(options['pk_file_course_enroll'], "wb")
            pickle.dump({'course': self.course_list, 'enroll': self.enrollment_list}, course_enroll_dump_file)
            course_enroll_dump_file.close()

    def get_course_id_file(self, filename):
        course_name_file = open(filename, "rt")
        course_names = course_name_file.readlines()
        course_name_file.close()

        for index in range(len(course_names)):
            course_names[index] = course_names[index].rstrip()

        return course_names

    def get_course_id(self):
        file_name = "./raw_data/courses_" + options['previous_year'] + options['extension']
        df = pd.read_excel(file_name)
        df["SUBJ_CODE"] = df["SUBJ"] + df["CRSE"].astype(str)

        grouped_df_term = df.groupby(["TERM"])

        # for key, group in grouped_df:
        #     print(key)

        key = int(str((int(options['term'][:4]) - 1)) + options['term'][4:])
        # print(grouped_df_term.get_group(key))

        unique_df_course = grouped_df_term["SUBJ_CODE"].unique()
        # print(unique_df_course)
        return unique_df_course.tolist()[0]
    
    def get_CRN(self):
        bar = progressbar.ProgressBar(max_value=len(self.course_id))
        num_courses_done = 0

        for course_id in self.course_id:

            url = "https://registrar-apps.ucdavis.edu/courses/search/course_search_results.cfm?course_number=" + course_id + "&termCode=202110"
            r = requests.get(url)
            if(r.status_code != 200):
                print("Error: could not access course")
                sys.exit()
            
            text = html2text.html2text(r.text)
            # print(text)

            match = re.search(r"\*\*CRN\*\*.*?(\*\*\d{5}\*\*.*)$", text, re.S)
            text = match.group(1)
            # print(text)
            match = re.findall(r"\*\*(\d{5})\*\*", text, re.S)
            
            if match:
                crn_list = set()
                for m in match:
                    crn_list.add(m)

                self.crn_map[course_id] = list(crn_list)
                # print(self.crn_map[course_id])

            num_courses_done += 1
            bar.update(num_courses_done)

    
    def gen_course_info(self):
        bar = progressbar.ProgressBar(max_value=len(self.course_id))
        num_courses_done = 0

        for course_id in self.course_id:
            instructor_list = []

            for crn in self.crn_map[course_id]:
                if int(crn) == 94:
                    print("ERROR: Invalid CRN: " + crn + " for courseId: " + course_id)
                    
                course_info = course_web_info.ClassWebInfo(crn, options['term'])

                # print("CRN: " + crn + " Course_ID: " + course_id)
                instructor = course_info.getInstructor() 
                course_name = course_info.getCourse_Name()

                if instructor not in instructor_list:
                    instructor_list.append(instructor)

                    course = {
                        "name" : course_name,
                        "course_id" : course_id,
                        "instructor" : instructor,
                        "aplus" : 0,
                        "a" : 0,
                        "aminus" : 0,
                        "bplus" : 0,
                        "b" : 0,
                        "bminus" : 0,
                        "cplus" : 0,
                        "c" : 0,
                        "cminus" : 0,
                        "dplus" : 0,
                        "d" : 0,
                        "dminus" : 0,
                        "f" : 0,
                        "I" : 0,
                        "P" : 0,
                        "NP" : 0,
                        "Y" : 0,
                        "quarter" : options['quarter'],
                        "ge_list" : course_info.getGE_List(),
                        "units" : course_info.getUnits(),
                        "max_seats" : course_info.getMax_Enroll(),
                        "description" : course_info.getDesc(),
                        "final_exam" : course_info.getFinal_Exam(),
                        "prereq" : course_info.getPrereq()
                    }

                    self.course_list.append(course)

                enrollment = {
                    "name" : course_name,
                    "course_id" : course_id,
                    "crn" : crn, 
                    "instructor" : instructor,
                    "quarter" : options['quarter'],
                    "ge_list" : course_info.getGE_List(),
                    "units" : course_info.getUnits(),
                    "seats" : [{self.time_string : course_info.getSeats()}],
                    "max_seats" : course_info.getMax_Enroll(),
                    "description" : course_info.getDesc(),
                    "final_exam" : course_info.getFinal_Exam(),
                    "prereq" : course_info.getPrereq()
                }

                self.enrollment_list.append(enrollment)

            num_courses_done += 1
            bar.update(num_courses_done)

    def get_course_list(self):
        return self.course_list

    def get_enrollment_list(self):
        return self.enrollment_list

if __name__ == "__main__":
    quarter_courses = CurrentQuarter()

    # push course list to reg mongodb collection for course info
        # connect to client
    client_name = "mongodb+srv://scheduletool:scheduletool@schedule-tool.kbgbb.mongodb.net/" + options['db_name'] + "?retryWrites=true&w=majority"
    # print(client_name)
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

    # course collection name is "details"
    collection = db['details']

    if options["clear_detail_collection"]:
        print("clearing the collection 'details'")
        collection.delete_many({})
        print(collection.estimated_document_count())

    if options["insert_new_detail_collection"]:
        print("inserting, 'detail' collection count = " + str(len(quarter_courses.get_course_list())))
        collection.insert_many(quarter_courses.get_course_list())
        print(collection.estimated_document_count())

    # push enrollment list to enrollment collection
    collection = db['enrollment']

    if options["clear_enroll_collection"]:
        print("clearing the collection 'enrollment'")
        collection.delete_many({})
        print(collection.estimated_document_count())

    if options["insert_new_enroll_collection"]:
        print("inserting, 'enrollment' collection count = " + str(len(quarter_courses.get_enrollment_list())))
        collection.insert_many(quarter_courses.get_enrollment_list())
        print(collection.estimated_document_count())

    if options["update_enroll_collection"]:
        bar = progressbar.ProgressBar(max_value=len(quarter_courses.get_enrollment_list()))
        num_courses_done = 0

        for course in quarter_courses.get_enrollment_list():
            collection.update_one(
                {
                    "crn" : course["crn"],
                    "quarter" : course["quarter"]
                },
                {
                    "$push": {
                        "seats" : course["seats"][0]
                    }
                }
            )
            num_courses_done += 1
            bar.update(num_courses_done)
    
        print(collection.estimated_document_count())
