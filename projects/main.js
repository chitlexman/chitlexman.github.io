window.onload = init;

function loadJSON(cb) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'projects.json',true);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == 200) {
      cb(xobj.responseText);
    }
  };
  xobj.send(null);
}

function init() {
  loadJSON(function(response) {
    var projects = JSON.parse(response);

    if (projects) {
      projects.forEach(function(el){
        addItem(el);
      });
    }

  });

  function addItem(item) {

    var projects = document.getElementById('projects');
    var project = document.createElement('div');
    project.className = "project";
   
    var img = document.createElement('img');
    var header = document.createElement('h3');
    var description = document.createElement('p');

    img.src = item.prevImg;
    header.innerHTML = item.name;
    description.innerHTML = item.description;
    
    project.appendChild(img);
    project.appendChild(header);
    project.appendChild(description);

    if (item.githubLink) {
      var githubLink = document.createElement('a');
      githubLink.href = item.githubLink;
      githubLink.innerHTML = 'GitHub'; 
      project.appendChild(githubLink);
    }

    if (item.demoLink) {
      var demoLink = document.createElement('a');
      demoLink.href = item.demoLink;
      demoLink.innerHTML = 'Demo'; 
      project.appendChild(demoLink);
    }

    if (item.tags) {
      var tags = document.createElement('p');
      tags.innerHTML = 'keywords: ' + item.tags.join(', ');
      project.appendChild(tags);
    }

    projects.appendChild(project);

  }
}
