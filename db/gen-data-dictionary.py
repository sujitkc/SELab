#!/usr/bin/python3

import csv
import sys
import functools

def string_of_list(lst):
  return functools.reduce(lambda x, y: x + "\n  " + y, lst, "")
 
def string_of_dict(dd): 
  s = ""
  for table in dd:
    print("table = ", table)
    s += table + "(\n"
    s += string_of_list(dd[table])
    s += "\n)\n\n"
  return s    

def read_csv(fname):
  with open(fname, "r") as fin:
    dataset = csv.reader(fin)
    l = [row for row in dataset]
  return l

def write_all_tables():
  alltables = [
    "people",
    "faculty",
    "workshop-publications",
    "conference-publications",
    "students",
    "authors",
    "supervisor"
  ]
  dd = {}
  for table in alltables:
    data = read_csv("csv/" + table + ".csv")
    dd[table] = data[0]
  print(dd)
  s = string_of_dict(dd)
  with open("data-dictionary.txt", "w") as fout:
    fout.write(s)
    
if __name__ == "__main__":
  write_all_tables()
