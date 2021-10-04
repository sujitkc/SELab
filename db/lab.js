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
  MEMBERFACULTY   : 1,
  MEMBERSTUDENT   : 2,
  EXTERNALFACULTY : 3,
  EXTERNAL        : 4
}

const term = {
  AUGUST  : 1,
  JANUARY : 2
}

const programme = {
  PHD : 1,
  MSR : 2,
  MTECH : 3,
  IMTECH : 4,
  MSCDT : 5
}

const registration = {
  FT : 1,
  PT : 2
}

class Person {
  constructor(id, name, type) {
    this.id = id;
    this.name = name;
    this.type = type;
  }

  getPublications() {
    let theLab = Lab.getInstance();
    return theLab.publications.filter(
      function(x) {
        x.authors.includes(this);
      }
    );
  }
}

class Faculty extends Person {
  constructor(id, name, empnum) {
    super(id, name, membertype.MEMBERFACULTY);
    this.employeeNumber = empnum;
  }

  getStudents() {
    faculty = this;
    let theLab = Lab.getInstance();
    return theLab.getMemberStudents().filter(
      function(x) {
        return (x.supervisor == faculty) || (x.coSupervisors.includes(faculty));
      }
    );
  }

  getPublications() {
    return [this.id, this.name, "publication"];
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
      registrationType) {
    super(id, name, membertype.MEMBERSTUDENT);
    this.rollNumber       = rollNumber;
    this.supervisor       = supervisor;
    this.coSupervisors    = coSupervisors;
    this.joiningTerm      = joiningTerm;
    this.joiningYear      = joiningYear;
    this.graduatingYear   = graduatingYear;
    this.programme        = programme;
    this.registrationType = registrationType;
  }

  addCosupervisor(s) {
    this.coSupervisors.push(s);
  }
}

class Lab {

  static instance = null;
  constructor() {
    this.people = [];
    this.conferences = [];
    this.publications = [];

    this.addFacultyMembers();
    this.addStudents();
    this.addConferences();
    this.addWorkshops();
    this.addJournals();
    this.addTechReportPlatforms();
    this.addConferencePublications();
    this.addWorkshopPublications();
    this.addJournalPublications();
    this.addTechReports();
  }

  addFacultyMembers() {
    for(let fac of faculty) {
      var name = null;
      for(let p of people) {
        if(p.Email == fac.Email) {
          let firstName = p["First Name"];
          let middleName = p["Middle Name"];
          let lastName = p["Last Name"];
          name = new Name(firstName, middleName, lastName);
          break;
        }
      }
     
      var f = new Faculty(fac.Email, name, fac.employeeID); 
      this.people.push(f);
    }
  }

  addStudents() {
    faculty = this.getMemberFaculty();
    for(let st of students) {
      var name = null;
      for(let p of people) {
        if(p.Email == st.Email) {
          let firstName = p["First Name"];
          let middleName = p["Middle Name"];
          let lastName = p["Last Name"];
          name = new Name(firstName, middleName, lastName);

          break;
        }
      }

      let jyear = parseInt(st["Joining Year"]);
      var jterm = null;
      if(st["Term"] == "January") {
        jterm = term.JANUARY;
      }
      else {
        jterm = term.AUGUST;
      }
      var prog = null;
      if(st["Programme"] == "Ph.D") {
        prog = programme.PHD;
      }
      else if(st["Programme"] == "MS") {
        prog = programme.MSR;
      }
      else if(st["Programme"] == "M.Tech") {
        prog = programme.MTECH;
      }
      else if(st["Programme"] == "iMTech") {
        prog = programme.IMTECH;
      }
      else if(st["Programme"] == "M.Sc Digital Society") {
        prog = programme.MSCDT;
      }
      var registrationType = null;
      if(st["Registration Type"] == "Full Time") {
        registrationType = registration.FT;
      }
      else if(st["Registration Type"] == "Part Time") {
        registrationType = registration.PT;
      }
      let gyear = parseInt(st["Graduating Year"]);
      var student = new Student(
                      st.Email,
                      name,
                      st["Roll Number"],
                      null,
                      [],
                      jterm,
                      jyear,
                      gyear,
                      prog,
                      registrationType);
      let sups = supervisor.filter(
        function(x) { 
          return x["Student"] == student.id && x["Role"] == "Supervisor";
        }
      );
      let sup = sups[0]; // sup expected to have one and only one element.
      student.supervisor = this.getPersonByEmailID(sup["Faculty"]);
      let cosups = supervisor.filter(
        function(x) {
          return x["Student"] == student.id && x["Role"] == "Co-supervisor";
        }
      );
      for(let cosup of cosups) {
        let cosupervisor = this.getPersonByEmailID(cosup["Faculty"]);
        student.addCosupervisor(cosupervisor);
      }
      this.people.push(student);
    }
  }

  addConferences() {
    for(let conf of conferences) {
      let c = new Conference(
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

  }

  addJournals() {

  }

  addTechReportPlatforms() {

  }

  addConferencePublications() {

  }

  addWorkshopPublications() {

  }

  addJournalPublications() {

  }

  addTechReports() {

  }

  getPersonByEmailID(emailID) {
    for(let p of this.people) {
      if(emailID == p.id) {
        return p;
      }
    }
    return null;
  }

  getMemberFaculty() {
    return this.people.filter(
      function(x) { return x.type == membertype.MEMBERFACULTY; }
    ); 
  }

  getMemberStudents() {
    return this.people.filter(
      function(x) { return x.type == membertype.MEMBERSTUDENT; }
    ); 
  }
  static getInstance() {
    if(Lab.instance == null) {
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
  constructor(title, authors, platform) {
    this.title = title;
    this.authors = authors;
    this.platform = platform;
  }

  addAuthor(author) {
    this.authods.push(author);
  }

  toHTML() {
    authorNames = this.authors.map(
        function(author) { return author.name; }
      );
    strAuthors = this.authorNames.reduce(
        function(x, y) { return x + y },
        ""
      );
    return this.title + " " + strAuthors + " " + this.platform.toHTML();
  }
}

class PublicationPlatform {
  constructor(name) {
    this.name = name;
  }
}

class Conference extends PublicationPlatform {
  constructor(name, month, year, venue, country, online) {
    super(name);
    this.month   = month;
    this.year    = year;
    this.venue   = venue;
    this.country = country;
    this.online  = online;
  }

  toString() {
    return this.name + " " + this.month + " " + this.year + " " + this.venue
      + " " + this.country;
  }

  toHTML() {
    return this.name;
  }
}

class Workshop extends PublicationPlatform {
  constructor(name, date, conference) {
    super(name);
    this.date = date;
    this.conference = conference;
  }

  toHTML() {
    return this.name;
  }
}

class Journal extends PublicationPlatform {
  constructor(name) {
    super(name);
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
