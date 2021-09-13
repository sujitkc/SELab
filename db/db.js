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
  MEMBERFACULTY : 1,
  MEMBERSTUDENT : 2,
  EXTERNALFACULTY : 3,
  EXTERNAL : 4
}

const term = {
  AUGUST : 1,
  JANUARY : 2
}

const programme = {
  PHD : 1,
  MSR : 2
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
  }
}

class Student extends Person {
  constructor(
      id,
      name,
      supervisor,
      otherSupervisors,
      joiningDate,
      graduatingYear,
      programme,
      registrationType) {
    super(id, name, membertype.MEMBERSTUDENT);
    this.supervisor       = supervisor;
    this.otherSupervisors = otherSupervisors;
    this.joiningDate      = joiningDate;
    this.graduatingYear   = graduatingYear;
    this.programme        = programme;
    this.registrationType = registrationType;
  }
}
