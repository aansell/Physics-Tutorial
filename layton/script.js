class variableDiv {
  constructor(parent, name, value) {
    this.variable = document.createElement("div");
    this.variable.id = name;
    this.variable.className = "variableDiv";
    parent.appendChild(this.variable);
    this.variable.draggable = "true";
    this.variable.addEventListener("dragstart", drag);
    if(value == null) {
      this.variable.innerHTML = name + " = ?";
    } else {
      this.variable.innerHTML = name + " = " + value;
    }
  }
}

function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    if(ev.target.id == "dropbox1" || ev.target.id == "dropbox2") {
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }  
}

var letter = "F";
fetch('problems.json') // Assuming problems.json is the file containing the JSON data
  .then(response => response.json()) // Parse the JSON from the response
  .then(problem => {
    // Once JSON is parsed successfully, update the HTML
    var container = document.getElementById("content");
    problem[0].variables.forEach(item => {
      new variableDiv(container, item.name, item.value);
    });
  })
  .catch(error => {
    // Handle any errors that occur during fetching or parsing
    console.error('Error fetching or parsing JSON:', error);
  });