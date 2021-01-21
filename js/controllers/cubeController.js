function CubeController() {
    addNavigation();
    var tabs = ["home", "portfolio", "skills", "experience", "apps", "contact"];
    var currentTab = "";
    getPageParam();

    function rotate(tab) {
        if(tab != currentTab) {
            $(".cube").removeClass("cube--show-" + currentTab);
            $(".cube").addClass("cube--show-" + tab); 
            $(".tab-" + tab + " ." + tab).addClass("button-active");    
            setPageParam(tab);
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
        <button id="home" class="btn home">Home</button>
        <button id="portfolio" class="btn portfolio">Portfolio</button>
        <button id="skills" class="btn skills">Skills</button> 
        <button id="experience" class="btn experience">Experience</button> 
        <button id="apps" class="btn apps">Apps</button>
        <button id="contact" class="btn contact">Contact</button>
        `;
        $(".nav").html(nav);
    }

    $(".nav .btn").click(function(event) {
        var id = event.target.id;
        rotate(id);
    });

    function getPageParam() {
        var tab = "home"
        if ('URLSearchParams' in window) {
            var urlParams = new URLSearchParams(window.location.search);
            if(urlParams.has('page')) {
            var myParam = urlParams.get('page');
            if(tabs.includes(myParam)) {
                tab = myParam;
            }
            }
        }
        rotate(tab);
    }

    function setPageParam(newTab) {
        if ('URLSearchParams' in window) {
            var searchParams = new URLSearchParams(window.location.search)
            searchParams.set("page", newTab);
            var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
            history.pushState(null, '', newRelativePathQuery);
        }
    }   
}