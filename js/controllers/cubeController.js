function CubeController() {
    var tabs = ["home", "portfolio", "education", "experience", "apps", "contact"];
    var currentTab = "";
    var loadedTabs = {
        home: false,
        portfolio: false,
        education: false,
        experience: false,
        apps: false,
        contact: false
    }

    var descriptions = {
        home: "Anker Peet currently works as a Software Engineer at Healthwise, a non-profit company located in Boise, Idaho.",
        portfolio: "Chek out Anker Peet's portfolio which showcases Javascript, CSS, and HTML.",
        education: "Anker Peet's education includes Brigham Young University - Idaho, Boise CodeWorks, and FreeCodeCamp.",
        experience: "With over 4 years of profesional software and web development experience, Anker's work experience includes Healthwise, AgentCubed, and Peak Environmental.",
        apps: "Outside of his day job, Anker Peet works on side projects which includes applications such as SurveySoft, and SimpleMoney.",
        contact: "You can contact Anker Peet at me@ankerpeet.com"
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
        updateMetaData(tab);
        updateClasses();
        updateTabIndex();
    }

    function updateMetaData(tab) {
        console.log(tab);
        if(tabs.indexOf(tab) != -1) {
            var pageName = uppercaseFirstLetter(tab);
            document.title = "Anker Peet | Boise, Idaho | Software Developer | " + pageName + " Page";
            console.log(descriptions[tab])
            document.querySelector('meta[name="description"]').setAttribute('content', descriptions[tab]);
        }
    }

    function uppercaseFirstLetter(tab) {
        var arr = tab.split("");
        arr[0] = arr[0].toUpperCase();
        return arr.join("");
    }

    window.addEventListener('click', function (evt) {
        if (!evt.target.classList.contains('spa-link')) return;
      
        evt.preventDefault();
        var category = trimSlashes(evt.target.getAttribute('href'));
        // if the category is empty, show the_keyword as the homepage.
        if (category == '') category = 'home';
        //showStoriesForCategory(category);
        // update history
        window.history.pushState({category: category}, window.title, evt.target.getAttribute('href'));
        rotate(category);
    });

    window.addEventListener('popstate', function (evt) {
        // if this history entry has 'state' (that is when you created it), use the state
        // if it's a "real" browser history entry, find out what URL it comes from.
        var category = evt.state ? evt.state.category : trimSlashes(window.location.pathname);
        if (category == '') category = 'home';
        rotate(category);
    });

    function trimSlashes(pathName) {
        if (pathName[0] === '/') pathName = pathName.slice(1);
        if (pathName.slice(-1) === '/') pathName = pathName.slice(-1);
        return pathName;
      }

    function updateTabIndex() {
        $(".tab :input:not(:hidden)").each(function (i) { $(this).attr('tabindex', -1); });
        $(`.tab-${currentTab} :input:not(:hidden)`).each(function (i) { $(this).attr('tabindex', i + 1); });
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
        var nav = `<a href='/home' id="logo" class='spa-link'>A</a>`;
        for(var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            nav += `<a href='/${tab}' id="${tab}" class="spa-link btn nav-link ${tab} ${tab == id ? "button-active" : ""}">${tab}</a>`
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
        // if ('URLSearchParams' in window) {
        //     var urlParams = new URLSearchParams(window.location.search);
        //     if(urlParams.has('page')) {
        //         var myParam = urlParams.get('page');
        //         if(tabs.includes(myParam)) {
        //             tab = myParam;
        //         }
        //     }
        // }
        rotate(tab);
        preloadContent();
    }

    function setPageParam(newTab) {
        // if ('URLSearchParams' in window) {
        //     var searchParams = new URLSearchParams(window.location.search)
        //     searchParams.set("page", newTab);
        //     var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
        //     history.pushState(null, '', newRelativePathQuery);
        // }
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