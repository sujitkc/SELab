// HTML dump of publication array
// Where to use: Wherever a list of publications needs
function reduceStrings(strings) {
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
function html_of_publications(publications) {
  let pubNames = publications.map(
      function(x) {
        return x.name;
      }
    );
  let strPubs = pubNames.reduce(
      function(x, y) { return x + y; },
      ""
    );
  return strPubs;
}

function peopleListtoHTML(list) {
  let theLab = Lab.getInstance();
  let htmls = list.map(
    function(x) { return x.toHTML(); }
  );
  return reduceStrings(htmls);
}

// Display the list of all students working with the given 
// faculty member.
function displayStudents(id) {
  let element = document.getElementById("mystudents");
  let theLab = Lab.getInstance();
  let mystudents = theLab.getPersonByEmailID(id).getStudents();
  element.innerHTML = peopleListtoHTML(mystudents);
}
