import pandas as pd
import pprint as pp
import course_web_info
import progressbar

class ProcessExcel:

    # constructor - takes in file name, creates dataframe
    def __init__(self, file_name):
        self.df = pd.read_excel(file_name)
        self.col_oper()

    # perform operations on dataframes
    def col_oper(self):

        #                1     2     3     4     5      6      7      8      9     10    11    12
        month2quarter = ["WQ", "WQ", "SQ", "SQ", "SS1", "SS1", "SS2", "SS2", "FQ", "FQ", "FQ", "FQ"]

        # subject code = SUBJ + CRSE
        self.df["SUBJ_CODE"] = self.df["SUBJ"] + self.df["CRSE"].astype(str)

        # instructor = IFNAME + ILNAME
        self.df["INSTRUCTOR"] = self.df["IFNAME"] + " " + self.df["ILNAME"]

        # term = change TERM
        year = self.df["TERM"].astype(str).str[0:4]
        quarter = self.df["TERM"].astype(str).str[4:]
        quarter = quarter.apply(lambda x: month2quarter[int(x) - 1])
        self.df["QUARTER"] = quarter + year

        # group the data by unique attributes
        self.grouped_df = self.df.groupby(["SUBJ_CODE", "INSTRUCTOR", "QUARTER"])

        # add course info to list
        self.courses = []
        bar = progressbar.ProgressBar(max_value=len(self.grouped_df))
        num_group_done = 0
        for group, df in self.grouped_df:
            # print(str(group) + "\n" + str(df) + "\n")
            # create course objects in array
            course = Course(df)
            self.courses.append(vars(course))
            # pp.pprint(vars(course))

            num_group_done += 1
            bar.update(num_group_done)
        
    def getCourses(self):
        return self.courses

# course object
class Course:

    # constructor - init the fields
    def __init__(self, df):
        self.name = df["CRSE_TITLE"].tolist()[0]
        self.course_id = df["SUBJ_CODE"].tolist()[0]
        self.instructor = df["INSTRUCTOR"].tolist()[0]
        self.aplus = 0
        self.a = 0
        self.aminus = 0
        self.bplus = 0
        self.b = 0
        self.bminus = 0
        self.cplus = 0
        self.c = 0
        self.cminus = 0
        self.dplus = 0
        self.d = 0
        self.dminus = 0
        self.f = 0
        self.I = 0
        self.P = 0
        self.NP = 0
        self.Y = 0
        self.quarter = df["QUARTER"].tolist()[0]
        self.ge_list = []

        # group by grades - to set the grades
        grouped_df = df.groupby("GRADE")

        for grade, df_grade in grouped_df:

            # sum all counts of the same grade
            grade_sum = df_grade["CNTOFGRADE"].sum().item()    
            
            # set the count to the appropriate grade
            if(grade == 'A+'):
                self.aplus = grade_sum
            elif(grade == 'A'):
                self.a = grade_sum
            elif(grade == 'A-'):
                self.aminus = grade_sum
            elif(grade == 'B+'):
                self.bplus = grade_sum
            elif(grade == 'B'):
                self.b = grade_sum
            elif(grade == 'B-'):
                self.bminus = grade_sum
            elif(grade == 'C+'):
                self.cplus = grade_sum
            elif(grade == 'C'):
                self.c = grade_sum
            elif(grade == 'C-'):
                self.cminus = grade_sum
            elif(grade == 'D+'):
                self.dplus = grade_sum
            elif(grade == 'D'):
                self.d = grade_sum
            elif(grade == 'D-'):
                self.dminus = grade_sum
            elif(grade == 'F'):
                self.f = grade_sum
            elif(grade == 'I'):
                self.I = grade_sum
            elif(grade == 'P'):
                self.P = grade_sum
            elif(grade == 'NP'):
                self.NP = grade_sum
            elif(grade == 'Y'):
                self.Y = grade_sum
        
        crn = df["CRN"].tolist()[0]
        term_code = df["TERM"].tolist()[0]

        course_info = course_web_info.ClassWebInfo(crn, term_code)
        self.ge_list = course_info.getGE_List()
        self.units = course_info.getUnits()
        self.seats = course_info.getSeats()
        self.max_seats = course_info.getMax_Enroll()
        self.description = course_info.getDesc()
        self.final_exam = course_info.getFinal_Exam()
        self.prereq = course_info.getPrereq()

