import re
import sys
import pprint
import requests
import html2text

if __name__ == "__main__":

    pp = pprint.PrettyPrinter(indent=2, width=200)

    course_catalog_text = "./GenCat20212022.txt"

    catalog_text_file = open(course_catalog_text, 'rt')
    catalog_text = catalog_text_file.read()
    catalog_text_file.close()

    match = re.findall(r"([A-Z]{3}\s+\d\d\d\S*)—\S+.*?", catalog_text, flags=re.M)
    print("Number of courses found " + str(len(match)))
    #pp.pprint(match)

    course_categoty = set()
    for m in match:
        course_categoty.add(m.split()[0])
    course_categoty = list(course_categoty)
    course_categoty.sort()
    print("Number of courses category found " + str(len(course_categoty)))
    # pp.pprint(course_categoty)

    count = 0
    course_id = set()
    for c in course_categoty:
        url = "https://registrar-apps.ucdavis.edu/courses/search/course_search_results.cfm?course_number=" + c + "&termCode=202110"
        print(url)

        r = requests.get(url)
        if(r.status_code != 200):
            print("Error: could not access course")
            sys.exit()
        
        text = html2text.html2text(r.text)
        # print(text)
        match = re.findall(r"\*\*\d+\*\*.*?\|\s+(\S+\s+\S+)", text, re.S)
        # print(match)

        for m in match:
            course_id.add(m)

        count = count + 1
        print(str(count) + "/" +  str(len(course_categoty)))
        # if (count == 1):
        #     break

    course_id = list(course_id)
    course_id.sort()
    # print(course_id)
    print("Number of unique courses found " + str(len(course_id)))
    #pp.pprint(course_id)

    course_list_file = open("fq2021_course_name.txt", "wt")
    for c in course_id:
        c = "".join(c.split())
        course_list_file.writelines(c + "\n")
    course_list_file.close()

