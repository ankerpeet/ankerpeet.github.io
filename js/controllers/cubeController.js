function CubeController() {
    var tabs = ["home", "portfolio", "education", "experience", "apps", "contact"];
    var currentTab = "";
    var loadedTabs = {
        home: false,
        portfolio: false,
        education: false,
        experience: false,
        apps: false,
        contact: false,
    }
    getPageParam();
    
    function rotate(tab) {
        if(tab != currentTab) {
            $(".cube").removeClass("cube--show-" + currentTab);
            $(".cube").addClass("cube--show-" + tab); 
            $(".tab-" + tab + " ." + tab).addClass("button-active");    
            setPageParam(tab);
            currentTab = tab;
            if(!loadedTabs[tab]) {
                loadContent(tab);
            }
        }
        updateClasses();
    }

    function updateClasses() {
        $(".tab").removeClass("right left back front top bottom front-experience left-home right-apps back-portfolio");
        if(currentTab == "home" || currentTab == "contact" || currentTab == "education" || currentTab == "apps") {
            $(".tab-portfolio").addClass("right");
            $(".tab-experience").addClass("left");
        }
        else if(currentTab == "portfolio") {
            $(".tab-apps").addClass("right-apps");
            $(".tab-home").addClass("left-home");
            $(".tab-experience").addClass("back");
            $(".tab-portfolio").addClass("front");
            $(".tab-education").addClass("top");
            $(".tab-contact").addClass("bottom");
        }
        else {
            $(".tab-home").addClass("right-apps");
            $(".tab-apps").addClass("left-home");
            $(".tab-experience").addClass("front-experience");
            $(".tab-portfolio").addClass("back-portfolio");
            $(".tab-education").addClass("top");
            $(".tab-contact").addClass("bottom");
        }
    }

    function addNavigation(id) {
        var nav = `<button onclick="app.controllers.cubeController.changeTab('home')" id="logo">A</button>`;
        for(var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            nav += `<button onclick="app.controllers.cubeController.changeTab('${tab}')" id="${tab}" class="btn nav-link ${tab} ${tab == id ? "button-active" : ""}">${tab}</button>`
        }
        nav += `<div class="socialContainer"><div class="socialLink"><a target="_blank" href="https://www.linkedin.com/in/anker-peet/"><i class="fa fa-linkedin-square"></i></a></div>`
        nav += `<div class="socialLink"><a target="_blank" href="https://github.com/ankerpeet"><i class="fa fa-github-square"></i></a></div></div>`
        $(`#${id}Nav`).html(nav);
    }

    function addNavToggle(tab) {
        var toggle = `      
        <button onclick="app.controllers.cubeController.toggleNav()" type="button" class="navbar-toggle">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>                        
        </button>`;

        $(`.toggleContainer.${tab}`).html(toggle);
    }

    this.toggleNav = function() {
        $(".nav").toggle();
    }

    this.changeTab = function(tab) {
        if($( window ).width() <= 700) {
            $(".nav").hide();
        }
        rotate(tab);
    }

    $(window).resize(function(){
        if($( window ).width() > 700) {
            $(".nav").show();
        }
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
        preloadContent();
    }

    function setPageParam(newTab) {
        if ('URLSearchParams' in window) {
            var searchParams = new URLSearchParams(window.location.search)
            searchParams.set("page", newTab);
            var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
            history.pushState(null, '', newRelativePathQuery);
        }
    }   

    function preloadContent() {
        for(var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            if(!loadedTabs[tab]) {
                loadContent(tab);
            }
        }
    }

    function loadContent(tab) {
        $(`#${tab}Content`).load(`../../components/${tab}.html`, function(){
            addNavigation(tab);
            addNavToggle(tab);
        });
        loadedTabs[tab] = true;
    }
}