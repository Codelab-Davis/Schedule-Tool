import os

# https://stackoverflow.com/questions/26494211/extracting-text-from-a-pdf-file-using-pdfminer-in-python

import io

from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage

def convert_pdf_to_txt(path):
    rsrcmgr = PDFResourceManager()
    retstr = io.StringIO()
    codec = 'utf-8'
    laparams = LAParams()
    device = TextConverter(rsrcmgr, retstr, codec=codec, laparams=laparams)
    fp = open(path, 'rb')
    interpreter = PDFPageInterpreter(rsrcmgr, device)
    password = ""
    maxpages = 0
    caching = True
    pagenos = set()

    for page in PDFPage.get_pages(fp, pagenos, maxpages=maxpages,
                                  password=password,
                                  caching=caching,
                                  check_extractable=True):
        interpreter.process_page(page)

    fp.close()
    device.close()
    text = retstr.getvalue()
    retstr.close()
    return text

if __name__ == "__main__":
    # Catalog available at https://ucdavis.pubs.curricunet.com/Catalog/downloads
    # https://local-resources.ucdavis.edu/local_resources/docs/catalog/GenCat20212022.pdf


    course_catalog_pdf = "./GenCat20212022.pdf"

    dirname = os.path.dirname(course_catalog_pdf)
    filename = os.path.splitext(os.path.basename(course_catalog_pdf))[0]
    text_filename = os.path.join(dirname, filename) + ".txt"

    catalog_text = convert_pdf_to_txt(course_catalog_pdf)

    text_file = open(text_filename,"w+")
    text_file.write(catalog_text)
    text_file.close()

