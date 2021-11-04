#!/usr/bin/python3

import csv
import sys
import subprocess

def read_csv(fname):
  with open(fname, "r") as fin:
    dataset = csv.reader(fin)
    l = [row for row in dataset]
  return l

def write_json(data, table):
  ws = "  "
  keys = data[0]
  with open("json/" + table + ".json", "w") as fout:
    fout.write(table + " = [")
    for rownum in range(1, len(data)):
      row = data[rownum]
      fout.write ("\n" + ws + "{\n")
      for i in range(len(keys)):
        if(i < len(keys) - 1):
          fout.write(2 * ws + '"' + keys[i] + '"' + " : " + '"' + row[i] + '"' + ",\n")
        else:
          fout.write(2 * ws + '"' + keys[i] + '"' + " : " + '"' + row[i] + '"' + "\n")
      if(rownum < len(data) - 1):
        fout.write(ws + "},")
      else:
        fout.write(ws + "}")
    fout.write("\n];\n\n")

alltables = {
  "AuthorsDB",
  "PublicationsDB",
  "ConferencesDB",
  "WorkshopsDB",
  "FacultyDB",
  "PeopleDB",
  "StudentsDB",
  "SupervisorDB",
}

def merge_all_tables():
  print("Merging ...")
  with open("json/DB.json", "w") as fout:
    for table in alltables:
      with open("json/" + table + ".json", "r") as fin:
        data = fin.read()
        fout.write(data + "\n")

def write_all_tables():
  for table in alltables:
    print("Reading " + table + "...")
    data = read_csv("csv/" + table + ".csv")
    write_json(data, table)
  merge_all_tables()

if __name__ == "__main__":
  if(len(sys.argv) >= 1 and sys.argv[-1] != "-a"):
    table = sys.argv[1]
    data = read_csv("csv/" + table + ".csv")
    write_json(data, table)
  else:
    write_all_tables()
