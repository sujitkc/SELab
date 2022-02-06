class API {

  // HTML dump of publication array
  // Where to use: Wherever a list of publications needs
  static reduceStrings(strings) {
    return "<ul>" + strings.reduce( (x, y) => x + "<li>" + y, "" ) + "</ul>";
  }

  // to be added to an HTML file, typically in the 
  // person webpages of all the lab members.
  static html_of_publications(publications, header) {
    if(publications.length == 0) {
      return "";
    }
    let pubNames = publications.map(x => x.toHTML());
    return "<h2>" + header + "</h2>" + "<ul>" +
      pubNames.reduce( (x, y) => x + "<li>" + y, "") + "</ul>";
    }

  static all_publications(publications) {
    return this.html_of_publications(publications, "All Publications");
  }

  static conference_publications(publications) {
    return this.html_of_publications(publications, "Conference Publications");
  }

  static workshop_publications(publications) {
    return this.html_of_publications(publications, "Workshop Publications");
  }

  static journal_publications(publications) {
    return this.html_of_publications(publications, "Journal Publications");
  }

  static technical_reports(publications) {
    this.html_of_publications(publications, "Technical Reports");
  }

  static displayPublications(emailID) {
    let conf = document.getElementById("myconfpublications");
    let workshop = document.getElementById("myjournalpublications");
    let journal = document.getElementById("myworkshoppublications");
    let techrep = document.getElementById("mytechreports");

    let theLab = Lab.getInstance();
    let myself = theLab.getPersonByEmailID(emailID);
    let myconfpubs = myself.getConferencePublications();
    console.log(myconfpubs);
    conf.innerHTML = API.conference_publications(myconfpubs);
    workshop.innerHTML = API.workshop_publications(myself.getWorkshopPublications());
    journal.innerHTML = API.journal_publications(myself.getJournalPublications());
//    techrep.innerHTML = API.technical_reports(myself.getTechnicalReports());
  }

  static peopleListtoHTML(list) {
    let htmls = list.map(x => x.toHTML());
    return API.reduceStrings(htmls);
  }

  // Display the list of all students working with the given 
  // faculty member.
  static displayStudents(id) {
    let element = document.getElementById("mystudents");
    let theLab = Lab.getInstance();
    let mystudents = theLab.getPersonByEmailID(id).getStudents();
    element.innerHTML = API.peopleListtoHTML(mystudents);
  }

  // Display the list of all students working with the given 
  // faculty member.
  static displayCourses(id, elementId) {
    let element = document.getElementById(elementId);
    let theLab = Lab.getInstance();
    let mycourses = theLab.getPersonByEmailID(id).getCourses();
    let strCourses = mycourses.map(c => c.toHTML());
    var htmlCourses = "<ul>" + strCourses.reduce(
        function(x, y) { return x + "<li>" + y; },
        ""
      ) + "</ul>";
    element.innerHTML = htmlCourses;
  }
}
