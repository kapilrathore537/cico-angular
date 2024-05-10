var mini = true;

function toggleSidebar() {
  if (mini) {
    document.getElementById("mySidebar").style.width = "300px";
    document.getElementById("mySidebar").style.position = "fixed";
    this.mini = false;
  } else {
    document.getElementById("mySidebar").style.width = "70px";
    // document.getElementById("main").style.marginLeft = "70px";
    document.getElementById("mySidebar").style.position = "fixed";
    this.mini = true;
  }
}
