function findAuthor(authors, name) {
  for(var i in authors) {
    if(authors[i].name == name) {
      return i;
    }
  }
  return -1;
}

function stringOfAuthors(authors, mainAuthor) {
  var text = authors.map(function(author) { 
	    if(author.name == mainAuthor) { 
		    return "<b>" + author.name + "</b>, ";
	    }
	    else {
		  return author.name + ", ";
	    } 
	  }).reduce(function(s1, s2) { return s1 + s2; } , "");

  return text.substring(0, text.length - 2);
}

function string_of_publication (str_pub, pub_type, func, name) {
  return "<h3>" + str_pub + "</h3><ol>" +
   pub_type.filter(
     function(x) {  return name == "" || findAuthor(x.authors, name) != -1; }
   ).sort(function(x, y) { return x.year < y.year; }).map(func)
  .reduce(function(s1, s2) { return s1 + s2; } , "") + "</ol>";
}

function journal(journals, name) {
  return string_of_publication("Journal", journals,
     function(x) {
         return "<br><li>" + stringOfAuthors(x.authors, name) + "<i>. " + x.paper + "</i>, " + x.name + ", " + x.issue + ", " + x.year + "</li>";
    }, name);
}

function conference(conferences, name) {
  return string_of_publication("Conference", conferences,
     function(x) {
         return "<br><li>" + stringOfAuthors(x.authors, name) + "<i>. " + x.paper + "</i>, " + x.name + ", " + x.venue + ", " + x.year + "</li>";
    }, name);
}

function workshop(workshops, name) {
  return string_of_publication("Workshop", workshops,
     function(x) {
         return "<br><li>" + stringOfAuthors(x.authors, name) + "<i>. " + x.paper + "</i>, " + x.name + ", " + x.venue + ", " + x.year + "</li>";
    }, name);
}

function pubs (name) {

  var allpubs = { 
    "conference" : [
      {
        "paper" : "Towards Automatic Training Design",
        "authors" : [
          {"name" :"Sujit Kumar Chakrabarti"}
         ],
         "name" : "MITE 2016",
         "venue" : "Madurai, INDIA",
         "date" : "December",
         "year" : "2016"
      },
      {
        "paper" : "SymTest : A Framework for Symbolic Testing of Embedded Software",
        "authors" : [
          {"name" :"Sujit Kumar Chakrabarti"},
          {"name" :"Ramesh S."}
         ],
         "name" : "ISEC 2016",
         "venue" : "Goa, INDIA",
         "date" : "February",
         "year" : "2016"
      },
      {
        "paper" : "Test-the-REST: An Approach to Testing RESTful Web-services",
        "authors" : [
          {
            "name" : "Sujit Kumar Chakrabarti"
          },
          {
            "name" : "Prashant Kumar"
          }
        ],
        "name" : "ISEC 2010",
        "venue" : "Mysore, INDIA",
        "date" : "February",
        "year" : "2016"
      },
      {
        "paper" : "Using Spreadsheets for Finite State Modelling",
        "authors" : [
          {
            "name" : "Sujit Kumar Chakrabarti"
          },
          {
            "name" : "Srihari Sukumaran"
          }
        ],
        "name" : "ISEC 2009",
        "venue" : "Pune, INDIA",
        "date" : "February",
        "year" : "2016"
      },
      {
        "paper" : "Web Services Testing: New Challenges, New Approaches",
        "authors" : [
          {
            "name" : "Sukanta Bhatt"
          },
          {
            "name" : "Sujit Kumar Chakrabarti"
          }
        ],
        "name" : "STeP-IN Summit",
        "venue" : "Bangalore, INDIA",
        "date" : "February",
        "year" : "2010"
      },
      {
        "paper" : "Software Reliability Prediction in Philips Healthcare -- An Experience Report",
        "authors" : [
          {
            "name" : "Sujit Kumar Chakrabarti"
          },
          {
            "name" : "Prashant Kumar"
          }
        ],
        "name" : "ISSRE",
        "venue" : "Mysore, INDIA",
        "date" : "2009",
        "year" : "2009"
      },
      {
        "paper" : "Test Sequence Computation for Regression Testing of Reactive Systems",
        "authors" : [
          {
            "name" : "Sujit Kumar Chakrabarti"
          },
          {
            "name" : "Y. N. Srikant"
          }
        ],
        "name" : "ISEC 2008",
        "venue" : "Hyderabad, INDIA",
        "date" : "February",
        "year" : "2008"
      },
      {
        "paper" : "Specification Based Regression Testing using Explicit State Space Enumeration",
        "authors" : [
          {
            "name" : "Sujit Kumar Chakrabarti"
          },
          {
            "name" : "Y. N. Srikant"
          }
        ],
        "name" : "ICSEA 2006",
        "venue" : "Tahiti, French Polynesia",
        "date" : "",
        "year" : "2006"
      },
      {
         "paper" : "Connected Testing of RESTful Web-Services",
         "authors" : [
           {
             "name" : "Sujit Kumar Chakrabarti"
           },
           {
             "name" : "Reswin Rodriquez"
           }
         ],
         "name" : "ISEC 2010",
         "venue" : "Mysore, INDIA",
         "date" : "February",
         "year" : "2010"
      },
      {
         "paper" : "Formal verification of avionics self-adaptive software",
         "authors" : [
           {
             "name" : "Rajanikanth N. Kashi"
           },
           {
             "name" : "Meenakshi DSouza"
           },
           {
             "name" : "S Kumar Baghel"
           },
           {
             "name" : "Nitin Arun Kulkarni"
           }

         ],
         "name" : "ISEC 2016",
         "venue" : "Goa, INDIA",
         "date" : "February",
         "year" : "2016"
      },
      {
         "paper" : "A Robust and Scalable Architecture for Airborne Radar Simulation",
         "authors" : [
           {
             "name" : "Rajanikanth N. Kashi"
           },
           {
             "name" : "Y Narahari"
           },
           {
             "name" : "N N S S R K Prasad"
           },
           {
             "name" : "R S Rao"
           }

         ],
         "name" : "IEEE Region 10 Technical Conference on Convergent Technologies For The Asia-Pacific",
         "venue" : "Bangalore, India",
         "date" : "October",
         "year" : "2003"
      },
      {
         "paper" : "A Robust Design of Airborne Radar Simulation Software using design patterns",
         "authors" : [
           {
             "name" : "Rajanikanth N. Kashi"
           },
           {
             "name" : "Y Narahari"
           },
           {
             "name" : "N N S S R K Prasad"
           },
           {
             "name" : "R S Rao"
           }

         ],
         "name" : "National Conference on Object Oriented Technology 2003 (NCOOT 2003)",
         "venue" : "Lonere, Maharastra, India",
         "date" : "August",
         "year" : "2003"
      },
      {
         "paper" : "Airborne Radar Data Processor Simulation Using Software In The-Loop Model",
         "authors" : [
           {
             "name" : "Rajanikanth N. Kashi"
           },
           {
             "name" : "Y Narahari"
           },
           {
             "name" : "N N S S R K Prasad"
           },
           {
             "name" : "R S Rao"
           }

         ],
         "name" : "International Radar Symposium India",
         "venue" : "Bangalore, India",
         "date" : "December",
         "year" : "2003"
      },
      {
        "paper" : "Specifying and Constructing Safety-Critical Real-time Systems using TAU",
        "authors" : [
          {
            "name" : "Rajanikanth N. Kashi"
          },
          {
            "name" :"Charles Law"
          },
          {
            "name" :"Gary Spence"
          },
          {
            "name" :"Greg Lacefield"
          },
          {
            "name" :"Nainatara Kumble"
          }
        ],
        "name" : "Telelogic User Group Conference",
        "venue" : "Miami, Florida, USA",
        "date" : "October",
        "year" : "2004"
      },
      {
        "paper" : "Perspectives on the use of Model Based Development Approach For Safety Critical Avionics Software Development",
        "authors" : [
          {
            "name" : "Rajanikanth N. Kashi"
          },
          {
            "name" :"Mohandas Amarnathan"
          }
        ],
        "name" : "International Conference on Aerospace Science and Technology (INCAST) 2008",
        "venue" : "National Science Seminar Complex IISc, Bangalore, India",
        "date" : "",
        "year" : "2008"
      },
      {
        "paper" : "Architectural Semantics of AADL using Event-B",
        "authors" : [
          {
            "name" : "Meenakshi DSouza"
          },
          {
            "name" :"Manoranjan Satpathy"
          },
          {
            "name" :"Ramesh S."
          }
        ],
        "name" : "IEEE International Conference on Computing, Communication and Information Technology (IC3I)",
        "venue" : "",
        "date" : "",
        "year" : "2014"
      },
      {
        "paper" : "Verification of Message Sequence Structures",
        "authors" : [
          {
            "name" : "Meenakshi DSouza"
          },
          {
            "name" :"Teodor Knapik"
          }
        ],
        "name" : "International Conference on Distributed Computing and Internet Technology (ICDCIT)",
        "venue" : "171-182, LNCS 7753, Springer",
        "date" : "",
        "year" : "2013"
      },
      {
        "paper" : "Improving estimation accuracy by using Case Based Reasoning and a combined estimation approach",
        "authors" : [
          {
            "name" : "Meenakshi DSouza"
          },
          {
            "name" :"Srinivasa Gopal"
          }
        ],
        "name" : "ACM, India Software Engineering Conference (ISEC)",
        "venue" : "Kanpur, India",
        "date" : "",
        "year" : "2012"
      },
      {
        "paper" : "A framework for decentralized access control",
        "authors" : [
          {
            "name" : "Meenakshi DSouza"
          },
          {
            "name" :"Abhishek Bhatnagar"
          },
          {
            "name" :"Namit Chaturvedi"
          },
          {
            "name" :"Atish Datta Chowdhury"
          },
          {
            "name" :"Arul Ganesh"
          }
        ],
        "name" : "ACM Conference on Computer and Communications Security (ASIACCS)",
        "venue" : "",
        "date" : "",
        "year" : "2007"
      },
      {
        "paper" : "Formal safety analysis of mode transitions in aircraft flight control system",
        "authors" : [
          {
            "name" : "Meenakshi DSouza"
          },
          {
            "name" :"Kuntal Das Barman"
          },
          {
            "name" :"Ganesh Babu Kandhan"
          },
          {
            "name" :"Karan Sehgal"
          }
        ],
        "name" : "26th IEEE Digital Avionics Systems Conference (DASC)",
        "venue" : "",
        "date" : "",
        "year" : "2007"
      },
      {
        "paper" : "Tool for Translating Simulink Models into Input Language of a Model Checker",
        "authors" : [
          {
            "name" : "Meenakshi DSouza"
          },
          {
            "name" :"Abhishek Bhatnagar"
          },
          {
            "name" :"Sudeepa Roy"
          }
        ],
        "name" : "8th International Conference on Formal Engineering Methods (ICFEM)",
        "venue" : "LNCS, Volume No. 4260, 606-620",
        "date" : "",
        "year" : "2006"
      },
      {
        "paper" : "A framework for rapid-prototyping of context based ubiquitous computing applications",
        "authors" : [
          {
            "name" : "Meenakshi DSouza"
          },
          {
            "name" :"Namit Chaturvedi"
          },
          {
            "name" :"Atish Datta Chowdhury"
          },
          {
            "name" :"Arul Ganesh"
          }
        ],
        "name" : "IEEE International Conference on Sensor networks, Ubiquitous and Trustworthy Computing (SUTC)",
        "venue" : "306-311",
        "date" : "",
        "year" : "2006"
      },
      {
        "paper" : "Reasoning about Layered Message Passing Systems",
        "authors" : [
          {
            "name" : "Meenakshi DSouza"
          },
          {
            "name" :"Ramaswamy Ramanujam"
          }
        ],
        "name" : "4th International Conference on Verification, Model Checking and Abstract Interpretation (VMCAI)",
        "venue" : "LNCS, Volume No. 2575, 268-282, 2003",
        "date" : "",
        "year" : "2003"
      },
      {
        "paper" : "Beyond Message Sequence Graphs",
        "authors" : [
          {
            "name" :"P. Madhusudan"
          },
          {
            "name" : "Meenakshi DSouza"
          }
        ],
        "name" : "21st Foundations of Software Technology and Theoretical Computer Science (FSTTCS) Conference",
        "venue" : "LNCS, Volume No. 2245, 256-267",
        "date" : "",
        "year" : "2001"
      },
      {
        "paper" : "Reasoning about Message Passing in Finite State Environments",
        "authors" : [
          {
            "name" : "Meenakshi DSouza"
          },
          {
            "name" :"Ramaswamy Ramanujam"
          }
        ],
        "name" : "27th International Colloquium on Automata, Lauguages and Programming (ICALP)",
        "venue" : "LNCS, Volume No.1853, 487-498",
        "date" : "",
        "year" : "2000"
      },
      {
        "paper" : "Safety Validation of an Embedded Real-time System at Hardware-Software Integration Test Environment",
        "authors" : [
          {
            "name" :"Gracy Philip"
          },
          {
            "name" : "Meenakshi DSouza"
          }
        ],
        "name" : "9th Intl. Conf. on Advanced Computing and Communication Technologies",
        "venue" : "Springer Advances in Intelligent System and Computing Series",
        "date" : "",
        "year" : "2015"
      },
      {
        "paper" : "Incorporating Adaptivity using Learning in Avionics Self Adaptive Software: A Case Study",
        "authors" : [
          {
            "name" :"Rajanikanth N. Kashi"
          },
          {
            "name" : "Meenakshi DSouza"
          },
          {
            "name" :"S Kumar Baghel"
          },
          {
            "name" :"Nitin Arun Kulkarni"
          }
          
        ],
        "name" : "5th International Conference on Computing, Communications and Informatics (ICACCI 2016)",
        "venue" : "Jaipur, INDIA",
        "date" : "",
        "year" : "2016"
      },
      {
        "paper" : "A systematic and effective method of mechanizing Allocation in system modeling of Aircraft Navigation Products using SysML",
        "authors" : [
          {
            "name" :"Rajanikanth N. Kashi"
          },
          {
            "name" : "Perumal Kumar"
          }
        ],
        "name" : "National Conference on Emerging Technologies in Computer Science 2010 (NCETCS-2010)",
        "venue" : "Bangalore, INDIA",
        "date" : "",
        "year" : "2010"
      },
      {
        "paper" : "Improving the Kinetics and Effectiveness of Systems Engineering - Perspectives on Integrated use of SysML, AADL, and UML for Aircraft Navigation Product Lines",
        "authors" : [
          {
            "name" :"Rajanikanth N. Kashi"
          },
          {
            "name" : "Perumal Kumar"
          },
          {
            "name" : "Vanathi Ravindran"
          }
        ],
        "name" : "4th Asia-Pacific Conference on Systems Engineering (APCOSE 2010)",
        "venue" : "National Taiwan Ocean University, Keelung, TAIWAN",
        "date" : "",
        "year" : "2010"
      },
      {
        "paper" : "The Modeling and Analysis of Aircraft In-Trail Procedures Using SysML",
        "authors" : [
          {
            "name" :"Rajanikanth N. Kashi"
          },
          {
            "name" : "Fernandes Cercuncesao"
          },
          {
            "name" : "Prabhu Kota"
          }
        ],
        "name" : "5th Asia-Pacific Conference on Systems Engineering (APCOSE 2011)",
        "venue" : "SOUTH KOREA",
        "date" : "October",
        "year" : "2011"
      },
      {
        "paper" : "Perspectives on Lean Systems Engineering in Avionics Product Development,",
        "authors" : [
          {
            "name" :"Rajanikanth N. Kashi"
          },
          {
            "name" : "Nainatara Kumble"
          },
          {
            "name" : "Muralikrishna Sampath"
          }
        ],
        "name" : "5th Asia-Pacific Conference on Systems Engineering (APCOSE 2011)",
        "venue" : "SOUTH KOREA",
        "date" : "October",
        "year" : "2011"
      },
      {
        "paper" : "Design of a Power Aware Methodology in IoT based on Hidden Markov Model",
        "authors" : [
          {
            "name" :"Palani Kumar Subramanian"
          },
          {
            "name" : "Meenakshi DSouza"
          }
        ],
        "name" : "Proceedings of COMSNETS-17",
        "venue" : "INDIA",
        "date" : "",
        "year" : "2017"
      },
      {
        "paper" : "Static Vulnerability Analysis for Secure Mobile Platforms",
        "authors" : [
          {
            "name" :"Dhinakar Kalyanasundaram"
          },
          {
            "name" : "Meenakshi DSouza"
          }
        ],
        "name" : "Innovations in Software Engineering Conference (ISEC) 2017",
        "venue" : "Jaipur, INDIA",
        "date" : "",
        "year" : "2017"
      },
      {
        "paper" : "Knowledge Based Decision Framework For Architecting Complex Systems",
        "authors" : [
          {
            "name" :"Ramakrishnan Raman"
          },
          {
            "name" : "Meenakshi DSouza"
          }
        ],
        "name" : "32nd ACM Symposium on Applied Computing – ACM SAC 2017",
        "venue" : "Marrakech, Morocco",
        "date" : "April 03-06",
        "year" : "2017"
      }
    ],
  "workshop" : [
      {
        "paper" : "ACT (Abstract to Concrete Tests) - A tool for generating Concrete test cases from Formal Specification of Web Applications",
        "authors" : [
          {
            "name" : "Khusbu Bubna"
          },
          {
            "name" :"Sujit Kumar Chakrabarti"
          }
        ],
        "name" : "MODSYM 2016",
        "venue" : "Goa, INDIA",
        "date" : "February",
        "year" : "2016"
      },
      {
        "paper" : "Graduate Course in Software Testing",
        "authors" : [
          {
            "name" :"Sujit Kumar Chakrabarti"
          },
          {
            "name" : "Meenakshi DSouza"
          }
        ],
        "name" : "MODSYM 2016",
        "venue" : "Goa, INDIA",
        "date" : "February",
        "year" : "2016"
      }
    ],
  "journal" : [
      {
        "paper" : "Guidance Systems for Fighter Aircraft",
        "authors" : [
          {
            "name" : "Rajanikanth N. Kashi"
          },
          {
            "name" :"R S Rao"
          },
          {
            "name" :"Ajai Vohra"
          },
          {
            "name" :"P S Subramanyam"
          }
        ],
        "name" : "Defence Science Journal",
        "issue" : "",
        "date" : "July",
        "year" : "2015"
      }
    ]

  }; 
  
  var element = document.getElementById("pubs");
  var output_text = journal(allpubs.journal, name) + conference(allpubs.conference, name) + workshop(allpubs.workshop, name);

  element.innerHTML = output_text;
}
