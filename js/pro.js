function shuffle(display_string)
{
var a = display_string.split("!"),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

function project(projects, name)
{
display_string=""
if(name != "")
{
	for(var i = 0; i<projects.length; i++)
	{
		if(projects[i].owners == name)
	 		{
				display_string+="!<li><a href='"+projects[i].pagelink+"'>"+projects[i].title+"</a></li>";
			}
	}
	return display_string+"</ol>";
}
else
{
	for(var i = 0; i<projects.length; i++)
	{
		display_string+="!<li><a href='"+projects[i].pagelink+"'>"+projects[i].title+"</a></li>";
	}
	return display_string;
}
}


function projects(name){
var allProject = { 
    "project" : [
      {
        "title" : "Software Engineering for Social Impact",
        "owners" :"Sujit Kumar Chakrabarti",
	"pagelink" : "../projects/social-sujit.html"
      },{
        "title" : "Automated Evaluation of Programming Assignments",
        "owners" : "Sujit Kumar Chakrabarti",
	"pagelink" : "../projects/autoeval-sujit.html"
      },{
        "title" : "Detection of Architectural Knowledge from Legacy Code",
        "owners" : "Sujit Kumar Chakrabarti",
	"pagelink" : "../projects/reveng-sujit.html"
      },{
        "title" : "Symbolic Testing of Embedded Software",
        "owners" : "Sujit Kumar Chakrabarti",
	"pagelink" : "../projects/symtest-sujit.html"
      },{
        "title" : "Formal Specification of Web apps using Statecharts",
        "owners" : "Sujit Kumar Chakrabarti",
	"pagelink" : "../projects/reqeng-sujit.html"
      },{
        "title" : "Verification and validation of architectures for embedded software",
        "owners" : "Meenakshi D'Souza",
	"pagelink" : "../projects/project-md-1.html"
      },{
        "title" : "Verification and validation of IoT systems",
        "owners" : "Meenakshi D'Souza",
	"pagelink" : "../projects/project-md-2.html"
      },{
        "title" : "Verifiable avionics self-adaptive software",
        "owners" : "Meenakshi D'Souza",
	"pagelink" : "../projects/project-md-3.html"
      },{
        "title" : "Program analysis, test case generation and motion planning for robotics software",
        "owners" : "Meenakshi D'Souza",
	"pagelink" : "../projects/project-md-4.html"
      },{
        "title" : "Verifying data races and timing requirements in RTOS",
        "owners" : "Meenakshi D'Souza",
	"pagelink" : "../projects/project-md-5.html"
      },{
        "title" : "Architecture and design decisions in complex systems and system-of-systems",
        "owners" : "Meenakshi D'Souza",
	"pagelink" : "../projects/project-md-6.html"
      },{
        "title" : "Formal verification of Simulink models",
        "owners" : "Meenakshi D'Souza",
	"pagelink" : "../projects/project-md-7.html"
      },{ "title" : "Other projects",
        "owners" : "Meenakshi D'Souza",
	"pagelink" : "../projects/project-md-8.html"
      }
    ]
  };
var element = document.getElementById("projects");
var output_text = project(allProject.project, name)
output_text=shuffle(output_text);
element.innerHTML = output_text;
}
