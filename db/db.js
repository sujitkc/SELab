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
}

class Faculty extends Person {
  constructor(id, name, empnum) {
    super(id, name, membertype.MEMBERFACULTY);
    this.employeeNumber = empnum;
    this.students = [];
  }

  addStudent(s) {
    this.students.push(s);
  }
}

class Student extends Person {
  constructor(
      id,
      name,
      rollNumber,
      supervisor,
      otherSupervisors,
      joiningTerm,
      joiningYear,
      graduatingYear,
      programme,
      registrationType) {
    super(id, name, membertype.MEMBERSTUDENT);
    this.rollNumber       = rollNumber;
    this.supervisor       = supervisor;
    this.otherSupervisors = otherSupervisors;
    this.joiningTerm      = joiningTerm;
    this.joiningYear      = joiningYear;
    this.graduatingYear   = graduatingYear;
    this.programme        = programme;
    this.registrationType = registrationType;
  }

  addSupervisor(s) {
    this.otherSupervisors.push(s);
  }
}

class DB {

  static instance = null;
  constructor() {
    this.people = [];
    this.addFacultyMembers();
    this.addStudents();
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
      var f = new Student(st.Email, name, st["Roll Number"], null, [], jterm, jyear, gyear, prog, registrationType); 
      this.people.push(f);
    }
  }
  static getInstance() {
    if(DB.instance == null) {
      DB.instance = new DB();
    }
    return DB.instance;
  }

  toString() {
    var s = "DB"
    return s;
  }
}
