class Name {
  constructor(first, middle, last) {
    this.firstName = first;
    this.middleName = middle;
    this.lastName = last;
  }

  fullName() {
    return this.firstName + " " + this.middleName + " " + this.lastName;
  }
}

const membertype = {
  MEMBERFACULTY: 1,
  MEMBERSTUDENT: 2,
  EXTERNALFACULTY: 3,
  EXTERNAL: 4
}

const term = {
  AUGUST: "August",
  JANUARY: "January",
  SUMMER: "Summer"
}

const programme = {
  PHD: 1,
  MSR: 2,
  MTECH: 3,
  IMTECH: 4,
  MSCDT: 5
}

const registration = {
  FT: 1,
  PT: 2
}

class Semester {
  constructor(term, year) {
    this.term = term;
    this.year = year;
  }
}

class Person {
  constructor(id, name, type, webpage) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.webpage = webpage;
  }

  getPublications() {
    return Lab.getInstance().publications.filter(
        x => x.authors.includes(this)
    );
  }

  getRecentPublications() {
    let thisYear = new Date().getFullYear();
    return Lab.getInstance().publications.filter(
        x => x.authors.includes(this) && (x.platform.year > thisYear - 5) 
    );
  }

  getSpecificPublications(platformType) {
    return this.getRecentPublications().filter(
      x => x.platform instanceof platformType
    )
  }

  getConferencePublications() {
    return this.getSpecificPublications(Conference);
  }

  getJournalPublications() {
    return this.getSpecificPublications(Journal);
  }

  getWorkshopPublications() {
    return this.getSpecificPublications(Workshop);
  }

  getTechnicalReports() {
    return this.getSpecificPublications(TechnicalReportPlatform);
  }

  toHTML() {
    return "<a href=\"" + this.webpage + "\">" + this.name.fullName() + "</a>";
  }
}

class Faculty extends Person {
  constructor(id, name, empnum, webpage) {
    super(id, name, membertype.MEMBERFACULTY, webpage);
    this.employeeNumber = empnum;
  }

  getStudents() {
    let fac = this;
    let theLab = Lab.getInstance();
    return theLab.getMemberStudents().filter(
      function (x) {
        return (x.supervisor == fac) || (x.coSupervisors.includes(fac));
      }
    );
  }

  getCourses() {
    let fac = this;
    let theLab = Lab.getInstance();

    let courses = theLab.courses.filter(
      function (x) {
        let tf = x.instructors.includes(fac)
        return tf;
      }
    );
    return courses;
  }
}

class Student extends Person {
  constructor(
    id,
    name,
    rollNumber,
    supervisor,
    coSupervisors,
    joiningTerm,
    joiningYear,
    graduatingYear,
    programme,
    registrationType,
    webpage
  ) {
    super(id, name, membertype.MEMBERSTUDENT, webpage);
    this.rollNumber = rollNumber;
    this.supervisor = supervisor;
    this.coSupervisors = coSupervisors;
    this.joiningTerm = joiningTerm;
    this.joiningYear = joiningYear;
    this.graduatingYear = graduatingYear;
    this.programme = programme;
    this.registrationType = registrationType;
  }

  addCosupervisor(s) {
    this.coSupervisors.push(s);
  }
}

class Course {
  constructor(id, name, instructors, offerings, weblink) {
    this.id = id;
    this.name = name;
    this.instructors = instructors;
    this.offerings = offerings;
    this.weblink = weblink;
  }

  addInstructor(instructor) {
    this.instructors.push(instructor);
  }

  addOfferings(offering) {
    this.offerings.push(offering);
  }

  toHTML() {
    let strOfferings = this.offerings.map(
      function(o) { return o.term + " - " + o.year }
    ).reduce(
      function(x, y) { return x + ", " + y; }, ""
    );

    return "<a href=\"" + this.weblink + "\">" + this.name + "</a> ("  + strOfferings + ")";
  }
}

class NormalCourse extends Course {
  constructor(id, name, instructors, weblink) {
    super(id, name, instructors, weblink);
  }
}

class OnlineCourse extends Course {
  constructor(id, name, instructors, weblink, platform) {
    super(id, name, instructors, weblink);
    this.platform = platform;
  }
}

class CourseOffering {
  constructor(course, term, year) {
    this.course = course;
    this.term = term;
    this.year = year;
  }
}

class Lab {

  static instance = null;

  static baseURL = "file:///home/sujit/IIITB/SELab/website/SELab/";

  constructor() {
    this.people = [];
    this.conferences = [];
    this.workshops = [];
    this.journals = [];
    this.techreportplatforms = [];
    this.patentplatforms = [];
    this.publications = [];
    this.courses = [];

    this.addFacultyMembers();
    this.addStudents();
    this.addOtherPeople();
    this.addConferences();
    this.addWorkshops();
    this.addJournals();
    this.addTechReportPlatforms();
    this.addPublications();
    this.addCourses();
    this.addInstructors();
  }

  // extra Person specific fields from the json object in people.
  extractPersonDetails(p) {
    let emailID = p["Email"];
    let firstName = p["First Name"];
    let middleName = p["Middle Name"];
    let lastName = p["Last Name"];
    let name = new Name(firstName, middleName, lastName);

    var memtype = null;
    if (p["Member Type"] == "memberfaculty") {
      memtype = membertype.MEMBERFACULTY;
    }
    else if (p["Member Type"] == "memberstudent") {
      memtype = membertype.MEMBERSTUDENT;
    }
    else if (p["Member Type"] == "externalfaculty") {
      memtype = membertype.EXTERNALFACULTY;
    }
    else {
      memtype = membertype.EXTERNAL;
    }

    var webpage = null;
    if (p["webpage"] != null) {
      if (p["linktype" == "absolute"]) {
        webpage = p["webpage"];
      }
      else {
        webpage = Lab.baseURL + p["webpage"];
      }
    }
    else {
      webpage = "";
    }
    return new Person(emailID, name, memtype, webpage);
  }

  addFacultyMembers() {
    for (let fac of FacultyDB) {
      var person = null;
      for (let p of PeopleDB) {
        if (p.Email == fac.Email) {
          person = this.extractPersonDetails(p);
          break;
        }
      }
      var f = new Faculty(fac.Email, person.name, fac.employeeID, person.webpage);
      this.people.push(f);
    }
  }

  addStudents() {
    var person = null;
    for (let st of StudentsDB) {
      var name = null;
      for (let p of PeopleDB) {
        if (p.Email == st.Email) {
          person = this.extractPersonDetails(p);
        }
      }

      let jyear = parseInt(st["Joining Year"]);
      var jterm = null;
      if (st["Term"] == "January") {
        jterm = term.JANUARY;
      }
      else {
        jterm = term.AUGUST;
      }
      var prog = null;
      if (st["Programme"] == "Ph.D.") {
        prog = programme.PHD;
      }
      else if (st["Programme"] == "MS") {
        prog = programme.MSR;
      }
      else if (st["Programme"] == "M.Tech") {
        prog = programme.MTECH;
      }
      else if (st["Programme"] == "iMTech") {
        prog = programme.IMTECH;
      }
      else if (st["Programme"] == "M.Sc Digital Society") {
        prog = programme.MSCDT;
      }
      else {
        prog = programme.PHD;
      }
      var registrationType = null;
      if (st["Registration Type"] == "Full Time") {
        registrationType = registration.FT;
      }
      else if (st["Registration Type"] == "Part Time") {
        registrationType = registration.PT;
      }
      let gyear = parseInt(st["Graduating Year"]);
      var student = new Student(
        st.Email,
        person.name,
        st["Roll Number"],
        null,
        [],
        jterm,
        jyear,
        gyear,
        prog,
        registrationType,
        person.webpage);
      let sups = SupervisorDB.filter(
        function (x) {
          return x["Student"] == student.id && x["Role"] == "Supervisor";
        }
      );
      let sup = sups[0]; // sup expected to have one and only one element.
      student.supervisor = this.getPersonByEmailID(sup["Faculty"]);
      let cosups = SupervisorDB.filter(
        function (x) {
          return x["Student"] == student.id && x["Role"] == "Co-supervisor";
        }
      );
      for (let cosup of cosups) {
        let cosupervisor = this.getPersonByEmailID(cosup["Faculty"]);
        student.addCosupervisor(cosupervisor);
      }
      this.people.push(student);
    }
  }

  addOtherPeople() {
    for (let p of PeopleDB) {
      let per = this.extractPersonDetails(p);
      if (per.type == membertype.EXTERNALFACULTY || per.type == membertype.EXTERNAL) {
        this.people.push(per);
      }
    }
  }

  addConferences() {
    for (let conf of ConferencesDB) {
      let c = new Conference(
        conf["ID"],
        conf["Name"],
        conf["Month"],
        conf["Year"],
        conf["Venue"],
        conf["Country"],
        conf["Online"]
      );
      this.conferences.push(c);
    }
  }

  addWorkshops() {
    for (let workshop of WorkshopsDB) {
      let conf = this.getConferenceByID(workshop["Conference"]);
      let w = new Workshop(
        workshop["ID"],
        workshop["Name"],
        conf,
        workshop["Online"]
      );
      this.workshops.push(w);
    }
  }

  addJournals() {

  }

  addTechReportPlatforms() {

  }


  addPublications() {
    for (let pub of PublicationsDB) {
      let pubid = pub["Publication Number"];
      let title = pub["Title"];
      let plmid = pub["Platform"];
      let online = pub["Online"];

      var platform = this.getPublicationPlatformByID(plmid);
      let publication = new Publication(pubid, title, platform, online);
      let auths = AuthorsDB.filter(
        function (x) {
          return x["ID"] == pubid;
        }
      );
      for (let auth of auths) {
        let author = this.getPersonByEmailID(auth["author"]);
        if (author == null) {
          console.log("Author " + auth["author"] + " not found.");
        }
        else {
          publication.addAuthor(author);
        }
      }
      this.publications.push(publication);
    }
  }

  addCourses() {
    for (let i in CoursesDB) {
      let course = CoursesDB[i];
      let c = new Course(course["ID"], course["Name"], [], [], course["Weblink"]);

      let instructorIDs = InstructorsDB.filter(
        function(i) { return i["CourseID"] == c.id  }
      ).map(
        function(i) { return i["Instructor"] }
      );
      for (let iindex in instructorIDs) {
        let id = instructorIDs[iindex];
        c.addInstructor(this.getPersonByEmailID(id));
      }

      let offerings = CoursesOfferingsDB.filter(
        function(o) { return o["ID"] == c.id; }
      ).map(
        function(o) { return new Semester(o["Term"], parseInt(o["Year"]))}
      );
      c.offerings = offerings;
      this.courses.push(c);
    }
  }

  addInstructors() {

  }

  addCourseOfferings() {

  }

  getPersonByEmailID(emailID) {
    for (let p of this.people) {
      if (emailID == p.id) {
        return p;
      }
    }
    return null;
  }

  getConferenceByID(id) {
    for (let c of this.conferences) {
      if (id == c.id) {
        return c;
      }
    }
    return null;
  }

  getWorkshopByID(id) {
    for (let w of this.workshops) {
      if (id == w.id) {
        return w;
      }
    }
    return null;
  }

  getJournalByID(id) {
    for (let j of this.journals) {
      if (id == j.id) {
        return j;
      }
    }
    return null;
  }

  getPublicationPlatformByID(id) {
    var platform = this.getConferenceByID(id);
    if (platform != null) {
      return platform;
    }
    platform = this.getWorkshopByID(id);
    if (platform != null) {
      return platform;
    }
    platform = this.getJournalByID(id);
    return platform;
  }

  getMemberFaculty() {
    return this.people.filter(
      function (x) { return x.type == membertype.MEMBERFACULTY; }
    );
  }

  getMemberStudents() {
    return this.people.filter(
      function (x) { return x.type == membertype.MEMBERSTUDENT; }
    );
  }

  static getInstance() {
    if (Lab.instance == null) {
      Lab.instance = new Lab();
    }
    return Lab.instance;
  }

  toString() {
    var s = "Lab"
    return s;
  }
}

class Publication {
  constructor(id, title, platform, online) {
    this.title = title;
    this.authors = [];
    this.platform = platform;
    this.online = online;
  }

  addAuthor(author) {
    this.authors.push(author);
  }

  toHTML() {
    let authorNames = this.authors.map(
      function (author) { return author.toHTML(); }
    );
    let strAuthors = authorNames.reduce(
      function (x, y) { return x + ", " + y },
      ""
    );
    return this.title + " " + strAuthors + " " + this.platform.toHTML();
  }
}

class PublicationPlatform {
  constructor(id, name, month, year, online) {
    this.id     = id;
    this.name   = name;
    this.month  = month;
    this.year   = year;
    this.online = online;
  }
}

class Conference extends PublicationPlatform {
  constructor(id, name, month, year, venue, country, online) {
    super(id, name, month, year, online);
    this.venue = venue;
    this.country = country;
  }

  toString() {
    return this.name + " " + this.month + " " + this.year + " " + this.venue
      + " " + this.country;
  }

  toHTML() {
    return this.toString();
  }
}

class Workshop extends PublicationPlatform {
  constructor(id, name, conference, online) {
    super(id, name, conference.month, conference.year, online);
    this.conference = conference;
  }

  toHTML() {
    return this.name;
  }
}

class Journal extends PublicationPlatform {
  constructor(id, name, month, year, online) {
    super(id, name, month, year, online);
  }

  toHTML() {
    return this.name;
  }
}

class TechnicalReportPlatform extends PublicationPlatform {
  constructor(name) {
    super(name);
  }

  toHTML() {
    return this.name;
  }
}

class Venue {
  constructor(city, country) {
    this.city = city;
    this.country = country;
  }

  toString() {
    return this.city + ", " + this.country;
  }

  toHTML() {
    return this.toString();
  }
}
