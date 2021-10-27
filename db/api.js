class API {

  // HTML dump of publication array
  // Where to use: Wherever a list of publications needs
  static reduceStrings(strings) {
    var s = "<ul>";
    s+= strings.reduce(
      function(x, y) { return x + "<li>" + y; },
      ""
    );
    s += "</ul>";
    return s;
  }

  // to be added to an HTML file, typically in the 
  // person webpages of all the lab members.
  static html_of_publications(publications) {
    
    let pubNames = publications.map(
        function(x) {
          return x.title;
        }
      );
    var strPubs = "<ul>" + pubNames.reduce(
        function(x, y) { return x + "<li>" + y; },
        ""
      ) + "</ul>";
    return "<h1>All Publications</h1>" + strPubs;
  }

  static peopleListtoHTML(list) {
    let htmls = list.map(
      function(x) { return x.toHTML(); }
    );
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
}
