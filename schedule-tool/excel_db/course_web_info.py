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
        
        self.__genGE_List()

    def __genGE_List(self):
        self.ge_list = []

        text = html2text.html2text(self.r.text)
        # print(self.r.text)
        match = re.search(r"\*\*New GE Credit.*?\*\*\s*(\S.*?)\s*\*\*", text, re.S)
        if not match:
            return

        ge_lines = match.group(1)
        for line in ge_lines.splitlines():
            ge = list(filter(lambda c: c >= 'A' and c <= 'Z', line))
            ge = "".join(ge)
            self.ge_list.append(ge)
    
    def getGE_List(self):
        return self.ge_list

if __name__ == "__main__":
    test = ClassWebInfo(62905, 202103)
    print(test.getGE_List())