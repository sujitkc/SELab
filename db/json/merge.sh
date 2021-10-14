#!/bin/bash

rm DB.json

cat AuthorsDB.json >> DB.json
cat ConferencesDB.json >> DB.json
cat PeopleDB.json >> DB.json
cat SupervisorDB.json >> DB.json
cat ConferencePublicationsDB.json >> DB.json
cat FacultyDB.json >> DB.json
cat StudentsDB.json >> DB.json
cat WorkshopPublicationsDB.json >> DB.json
