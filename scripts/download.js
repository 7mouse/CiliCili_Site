// function addLoadEvent(func) {
//     var oldload = window.onload;
//     if (typeof oldload != 'function') {
//         window.onload = func;
//     } else {
//         window.onload = function(){
//             oldload();
//             func();
//         }
//     }
// }

// function InitAnimation() {
    
// }

// addLoadEvent(InitAnimation);


(function f(win, doc) {


    var tanm = ["第一弹发射！", "第一弹真尼玛好玩", "知男而上", "沉迷女装乐园", "已糖求资源", "好玩又有趣，尽在第一弹", "进退两男",
        "小姐姐敲可爱！", "嘘——小纸条私聊！", "搞事情开始", "前面的弹幕有毒", "大佬都是会玩儿的！", "聘CP啦", "女装大佬666", "COSER小姐姐真美腻",
        "弹弹娘prpr！", "前边的小姐姐处对象吗？", "大佬伪音真滴diao", "滑天下之大稽", "拳打嘤嘤怪", "弹叔今天女装了嘛？", "能找得到cp算我输",
        "能分得清小哥哥小姐姐算我输", "舔胸舔胸prprprpr..", "每天全靠配音区的大佬声音催眠", "小姐姐眼熟我~", "耶！今天要去绘画区学画画！",
        "神出鬼没的大佬们", "震惊！小说排行榜竟然是这些！", "今天~也是福利满满的一天呢~", "马上考试了，我还在刷第一弹",
        "在第一弹终于找到了一起打游戏的小伙伴", "全靠大佬们给我发糖了", "第一弹里的COS小姐姐真多呀", "胸大的不像话", "禁止带球撞人",
        "农药求带，声甜", "今日份的扩列", "萌新求带", "我不管，反正都是我老婆", "都玩过，鉴定完毕", "全国最大的女装社区欢迎您",
        "大佬女装又好看，说话又好听，还要什么女朋友", "弹弹娘后宫势力登场", "为绘画区大佬打call", "催更势力登场", "有弹友，不孤单",
        "风里雨里我在第一弹等你", "牧羊人之心真好玩", "楼主给你糖！", "为爱发电！", "路人弹娘的养成方法", "您的好友【弹妹】已上线",
        "战斗力只有5的弹娘", "弹弹妹，我们走", "弹妹的笑容由我来守护", "这么可爱的一定是男孩子", "有奇怪的东西混进去了", "承包弹妹",
        "第一弹发来贺电", "马猴烧酒弹弹妹", "此生无悔入第一弹", "我永远喜欢弹弹妹", "借一部说话", "性别不同怎么谈恋爱", "真香！", "腿玩年",
        "我弹美如画", "太太我喜欢你啊", "有了第一弹，妈妈再也不用担心我找不到男朋友了。", "又来骗我成为女装大佬。", "第一弹势力登场",
        "我要这糖果有何用", "表白弹娘", "www小姐姐们好好看！！~", "捕捉弹弹娘一只", "前方高能，啊，我瞎了", "我好像都在第一弹看过",
        "感谢楼主送糖！", "第一弹从没让我失望过", "悄悄抱走蛋蛋妹", "为第一弹打call", "前排收糖", "糖果在手，天下我有", "诸君，我喜欢蛋蛋妹",
        "天王盖地虎 弹妹一米五", "我来第一弹这么久了，还没人敢赞我", "生鱼忧患 死鱼安乐", "德国骨科时代已经过去，现在是英国法庭时代", "沉迷小姐姐美貌无法自拔",
        "你应该在这大好的年纪和女生一起抢男人", "只要锄头挖的好，男孩也能推得倒", "可爱弹娘出现！", "妈耶，这个弹娘太撩了~", "好好好，老婆我和你走~",
        "有弹娘的地方就有我~", "别想了，弹娘也是我老婆~", "不多说了，亲弹娘一口~", "我一来就出不去了，怎么办", "防不胜防"];
    var danmArrayTop = [];//15个 同时
    var danmArrayBottom = [];//15个 同时

    var danmMoveDuration = 30;
    var movPx = 3;
    var startPosition = Math.ceil(Math.random() * 100);
  //  var windowWidth = $(win).width();
    /*   var bottomStart = (startPosition + 50) % 250;*/
    var topContainer = null;
    var bottomContainer = null;
    var createDanmDuration = 0;

    $(document).ready(function () {
        calculateRemPx();
        initPage();
        initDanm();
        initCartoon();


    });

    win.onload = function () {
        let diffWidth = $(document).width() - $(win).width();
        if (diffWidth > 0) {
            setTimeout(function () {
                win.scrollTo && win.scrollTo(diffWidth / 2, 0);
            }, 0);

        }
    };


    function danm(el, speed, p) {
        this.el = el;
        this.position = p;
        this.speed = speed;
        this.width = -p;
        this.state = "run";
    }

    danm.prototype.delete = function () {
        /* this.el.textContent = text;
         this.el.style.display = "none";
         var spanWidth = $(this.el).width();
         this.width = spanWidth;
         this.el.style.right = -spanWidth + "px";
         this.position = -spanWidth;
         this.el.style.display = "block";*/
        this.state = "delete";
        $(this.el).remove();
        /*     this.state = "init";*/
    };


    function initDanm() {
        topContainer = $("#dwn-dm-top");
        bottomContainer = $("#dwn-dm-bottom");
    /*    createDanmTimer = setInterval(createDanm, 3500);*/
        setInterval(moveDanm, danmMoveDuration);
    }

    function moveDM(b) {
        var docWidth = $(doc).width();
        if (b.position > (docWidth + b.width)) {
            b.delete();
        }
        else if (b.state === 'run') {
            b.position = b.position + b.speed;
            b.el.style.right = b.position + "px";
        }


    }

    /*function removeArray(arr, index) {
        if (arr instanceof Array) {
            arr.splice(index, 1)
        }
    }*/

    function moveDanm() {
        if(createDanmDuration>=3600){
            createDanm();
            createDanmDuration=0;
        }
         createDanmDuration+=danmMoveDuration;

      /*  console.log(1)*/
        danmArrayBottom.forEach(moveDM);
        danmArrayTop.forEach(moveDM);
    }

    var top = 0.5;
    var fontSizeArr = [1.8, 2.2, 2.5];

    var tfsize = null;
    var bfsize = null;


    function createDanm() {

        danmArrayTop = danmArrayTop.filter(function (b) {
            return b.state === "run"
        });
        danmArrayBottom = danmArrayBottom.filter(function (b) {
            return b.state === "run"
        });


        var topDm = createDmElement(tfsize, top, topContainer);
        var t = topDm.el;

        danmArrayTop.push(new danm(t, movPx, -topDm.width));

        var bottomDm = createDmElement(bfsize, top, bottomContainer);

        var b = bottomDm.el;
        danmArrayBottom.push(new danm(b, movPx, -bottomDm.width));

        top += 4;
        top = top > 12 ? .5 : top;
    }


    function createDmElement(fsize, top, container) {
        var t = document.createElement('span');
        t.className = "dan-m-span";
        t.textContent = tanm[startPosition];
        startPosition += 1;
        startPosition %= 100;
        t.style.display = "none";
        var tsize = 0;
        if (t.textContent.length < 20) {
            tsize = Math.floor((Math.random() * 10) % 3);
        }
        if (fsize === 2 && tsize === 2) {
            tsize = 0;
        }
        t.style.fontSize = fontSizeArr[tsize] + 'rem';
        /*   tfsize=tsize;*/
        t.style.top = top + 'rem';
        container.append(t);
        var twidth = $(t).width();
        // var bwidth = $(b).width();

        t.style.right = -twidth + "px";
        // b.style.right = -bwidth + "px";


        t.style.display = "block";


        return {
            el:t,
            size: tsize,
            width:twidth,
            txtLength: t.textContent.length
        }
    }


    function initPage() {
        setTimeout(function () {
            $(".dwn-download-center").removeClass("opacity0");
        }, 200);
        setTimeout(function () {
            $(".dwn-body-line .line-left").removeClass("opacity0");
        }, 500);
        setTimeout(function () {
            $(".dwn-body-line .line-right").removeClass("opacity0");
        }, 600);

        setTimeout(function () {
            $(".dwn-diamond-qr").removeClass("opacity0").addClass("qr-normal");
        }, 800);
        var resizeCancel = null;
        $(window).resize(function () {
   /*         windowWidth = $(win).width();*/
          /*  docWidth = $(doc).width();*/
            clearTimeout(resizeCancel);
            resizeCancel = setTimeout(function () {
                calculateRemPx();
            }, 300)
        })


    }

    function initCartoon() {
        setTimeout(function () {
            $(".cartoon-start .cartoon-left .cartoon-figure").animate({"left": "20px"}, "normal", "swing", function () {
                $(".cartoon-start").removeClass("cartoon-start")
            }).animate({left:0});
            $(".cartoon-start .cartoon-right .cartoon-figure").animate({"left": "-20px"}, "normal", "swing", function () {
                $(".cartoon-start").removeClass("cartoon-start")
            }).animate({left:0});
            /*
                        $(".cartoon-start .cartoon-right .cartoon-figure").animate({"left": 0}, "normal", "linear")
            */
        }, 1200);

    }

    function calculateRemPx() {
        var width = $(win).width();
        var height = $(win).height();
        if (width < 1000) {
            $(document.documentElement).css("font-size", "12px");
            return;
        }

        var ratio = width / height;
        var fontSize = 16;
        if (ratio >= 1.8) { // 以宽度为准
            fontSize = width / 100
        }
        else { //以高度为准
            fontSize = height / 55
        }

        $(document.documentElement).css("font-size",  fontSize + "px");

    }

})(window, document);
