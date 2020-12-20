//todo: get screen shots of my portfolio projects and then open modal on click that contains the iframe of the project
addNavigation();
var tabs = ["home", "portfolio", "skills", "experience", "apps", "contact"];
var currentTab = "";
//getUrlParams();

function rotate(tab) {
  if(tab != currentTab) {
    $(".cube").removeClass("cube--show-" + currentTab);
    $(".cube").addClass("cube--show-" + tab); 
    $(".tab-" + tab + " ." + tab).addClass("button-active");
    //$(".tab-" + currentTab + " ." + currentTab).removeClass("button-active");
    currentTab = tab;
  }
  updateClasses();
}

function updateClasses() {
  $(".tab").removeClass("right left back front top bottom front-experience left-home right-apps back-portfolio");
  if(currentTab == "home" || currentTab == "contact" || currentTab == "skills" || currentTab == "apps") {
    $(".tab-portfolio").addClass("right");
    $(".tab-experience").addClass("left");
  }
  else if(currentTab == "portfolio") {
    $(".tab-apps").addClass("right-apps");
    $(".tab-home").addClass("left-home");
    $(".tab-experience").addClass("back");
    $(".tab-portfolio").addClass("front");
    $(".tab-skills").addClass("top");
    $(".tab-contact").addClass("bottom");
  }
  else {
    $(".tab-home").addClass("right-apps");
    $(".tab-apps").addClass("left-home");
    $(".tab-experience").addClass("front-experience");
    $(".tab-portfolio").addClass("back-portfolio");
    $(".tab-skills").addClass("top");
    $(".tab-contact").addClass("bottom");
  }
}

function addNavigation() {
  var nav = `
  <button class="btn home" onclick="rotate('home')">Home</button>
  <button class="btn portfolio" onclick="rotate('portfolio')">Portfolio</button>
  <button class="btn skills" onclick="rotate('skills')">Skills</button> 
  <button class="btn experience" onclick="rotate('experience')">Experience</button> 
  <button class="btn apps" onclick="rotate('apps')">Apps</button>
  <button class="btn contact" onclick="rotate('contact')">Contact</button>
  `;
  $(".nav").html(nav);
}

function getUrlParams() {
  var urlParams = new URLSearchParams(window.location.search);
  var tab = "home"
  if(urlParams.has('page')) {
    var myParam = urlParams.get('page');
    if(tabs.includes(myParam)) {
      tab = myParam;
    }
    else {
      tab = "home";
    }
  }
  else {
    tab = "home";
  }
  rotate(tab);
}