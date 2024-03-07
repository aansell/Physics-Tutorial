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