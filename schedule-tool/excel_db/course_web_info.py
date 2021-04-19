import requests
import html2text
import re
import sys

class ClassWebInfo:

    def __init__(self, crn, termcode):
        url = "https://registrar-apps.ucdavis.edu/courses/search/course.cfm?crn=" + str(crn) + "&termCode=" + str(termcode) + "&winName=detialWin&_cf_containerId=detailWin_body&_cf_nodebug=true&_cf_nocache=true&_cf_rc=0"
        self.r = requests.get(url)
        if(self.r.status_code != 200):
            print("Error: could not access course info for crn:" + str(crn) + " and term: " + str(termcode))
            sys.exit()
        
        self.text = html2text.html2text(self.r.text)

        self.__genGE_List()
        self.__genUnits()
        self.__genDesc()
        self.__genSeats()
        self.__genMax_Enroll()   
        self.__genFinal_Exam()
        self.__genPrereq()    

    def __genGE_List(self):
        self.ge_list = []

        print(self.text)
        match = re.search(r"\*\*New GE Credit.*?\*\*\s*(\S.*?)\s*\*\*", self.text, re.S)
        if not match:
            return

        ge_lines = match.group(1)
        for line in ge_lines.splitlines():
            ge = list(filter(lambda c: c >= 'A' and c <= 'Z', line))
            ge = "".join(ge)
            self.ge_list.append(ge)
    
    def __genUnits(self):
        self.units = ""
        match = re.search(r"\*\*Units:\*\*\s(\S)", self.text, re.S)
        if not match:
            return

        self.units = match.group(1)                        

    def __genDesc(self):
        self.desc = ""
        match = re.search(r"\*\*Description:\*\*\s*(\S.*?)\s*---", self.text, re.S)
        
        if not match:
            return

        self.desc = match.group(1)                        
    
    def __genSeats(self):
        self.seats = ""
        match = re.search(r"\*\*Available Seats:\*\*\s(\S)", self.text, re.S)
        if not match:
            return

        self.seats = match.group(1)                        

    def __genMax_Enroll(self):
        self.max_enroll = ""
        match = re.search(r"\*\*Maximum Enrollment:\*\*\s(\S*)", self.text, re.S)
        if not match:
            return

        self.max_enroll = match.group(1)

    def __genFinal_Exam(self):
        self.final_exam = ""
        match = re.search(r"Final Exam:\*\*\s+(\S.*?)\s*---", self.text, re.S)
        
        if not match:
            return

        self.final_exam = match.group(1)

    def __genPrereq(self):
        self.prereq = ""
        match = re.search(r"\*\*Prerequisite:\*\*\s*(\S.*?)\s*---", self.text, re.S)
        
        if not match:
            return

        self.prereq = match.group(1)
                              

    def getGE_List(self):
        return self.ge_list

    def getUnits(self):
        return self.units

    def getDesc(self):
        return self.desc
    
    def getSeats(self):
        return self.seats
    
    def getMax_Enroll(self):
        return self.max_enroll

    def getFinal_Exam(self):
        return self.final_exam
    
    def getPrereq(self):
        return self.prereq

if __name__ == "__main__":
    test = ClassWebInfo(44644, 202101)
    print(test.getGE_List())
    print(test.getUnits())
    print(test.getDesc())
    print(test.getSeats())
    print(test.getMax_Enroll())
    print(test.getFinal_Exam())
    print(test.getPrereq())

