import json

with open("../../js/publications.json", "r") as fin:
  data = json.load(fin)

pub_num = 1
with open("authors.csv", "w") as fauth:
  with open("conference-workshop-publications.csv", "w") as fpub:
    fpub.write("Publication Number,Title,Type,Forum,Venue,Day,Month,Year,Online" + '\n')
    for paper in data['workshop']:
      print(paper)
      row = ""
      row += str(pub_num)
      row += "," + paper["paper"]
      row += ",workshop"
      row += "," + paper["name"]
      row += "," + paper["venue"]
      row += ","
      row += "," + paper["date"]
      row += "," + paper["year"]
      row += "," + paper["online"]
      fpub.write(row + '\n')
      for author in paper["authors"]:
        fauth.write(str(pub_num) + "," + author["name"] + "\n")
      pub_num += 1

    for paper in data['conference']:
      print(paper)
      row = ""
      row += str(pub_num)
      row += "," + paper["paper"]
      row += ",conference"
      row += "," + paper["name"]
      row += "," + paper["venue"]
      row += ","
      row += "," + paper["date"]
      row += "," + paper["year"]
      row += "," + paper["online"]
      fpub.write(row + '\n')
      for author in paper["authors"]:
        fauth.write(str(pub_num) + "," + author["name"] + "\n")
      pub_num += 1
