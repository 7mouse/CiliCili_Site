function addLoadEvent(func) {
    var oldload = window.onload;
    if (typeof oldload != 'function') {
        window.onload = func;
    } else {
        window.onload = function(){
            oldload();
            func();
        }
    }
}

function NavHightLight() {
    if (!document.getElementsByTagName) alert("不支持DOM操作"); 
    var links = document.getElementsByTagName("a");
    // alert(1);
    // for (var j = 0; j < links.length; j++) {
    //     alert(links[j].getAttribute("href"));
    // }
    // alert(2);
    var url = window.location.href;
    // alert(url);
    for (var i = 0; i < links.length; i++) {
        if (url.indexOf(links[i].getAttribute("href")) != -1) {
            // alert(links[i].getAttribute("href"));
            // alert(url.indexOf(links[i].getAttribute("href")));
            var classes = links[i].getAttribute("class");
            links[i].setAttribute("class", "onclicked");
            links[i].setAttribute("style", "color:black;");
            return;
        }
    }
    // alert(3);
}

function SearchBtn() {
    var btn = document.getElementsByClassName("search-btn");
    btn[0].onclick = function() {
        var str = document.getElementsByClassName("search-txt")[0].value;
        btn[0].href = "https://www.baidu.com/s?ie=UTF-8&wd=" + str;
    }
}

function login_Init() {
    var l_b = document.getElementsByClassName("login");
    var window = document.getElementsByClassName("denglu");
    var close = document.getElementsByClassName("s2");
    l_b[0].onclick = function() {
        window[0].setAttribute("style", "display:initial;");
    }
    close[0].onclick = function() {
        window[0].setAttribute("style", "");
    }
} 
addLoadEvent(NavHightLight);
addLoadEvent(SearchBtn);
addLoadEvent(login_Init);