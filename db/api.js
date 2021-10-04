// HTML dump of publication array
// Where to use: Wherever a list of publications needs
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
