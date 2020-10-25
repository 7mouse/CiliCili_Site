var n = 15;
var flag = false;
function initPhoto() {
    var photos = document.getElementsByClassName("grid");
    for (var i = 1; i <= 15; i++) {
        var div = document.createElement("div");
        div.className = "item";
        var image = document.createElement("img");
        image.src = "./images/grid/1 ("+i+").jpg";
        image.onclick = function() {
            onclickImage(this);
        }
        div.appendChild(image);
        photos[0].appendChild(div);
    }

}
    
// 封装成一个函数
function waterFall() {
    var box = document.getElementsByClassName('grid');
    var items = document.getElementsByClassName("item");
    // 定义每一列之间的间隙 为10像素
    var gap = 10;
    // 1- 确定列数  = 页面的宽度 / 图片的宽度
    var pageWidth = getClient().width;
    var itemWidth = items[0].offsetWidth;
    var columns = parseInt(pageWidth / (itemWidth + gap));
    var arr = [];
    for (var i = 0; i < items.length; i++) {
        if (i < columns) {
            // 2- 确定第一行
            items[i].style.top = 0;
            items[i].style.left = (itemWidth + gap) * i + 'px';
            arr[i] = items[i].offsetHeight;
        } else {
            // 其他行
            // 3- 找到数组中最小高度  和 它的索引
            var minHeight = arr[0];
            var index = 0;
            for (var j = 0; j < arr.length; j++) {
                if (minHeight > arr[j]) {
                    minHeight = arr[j];
                    index = j;
                }
            }
            // 4- 设置下一行的第一个盒子位置
            // top值就是最小列的高度 + gap
            items[i].style.top = arr[index] + gap + 'px';
            // left值就是最小列距离左边的距离
            items[i].style.left = items[index].offsetLeft + 'px';
            
            // 5- 修改最小列的高度 
            // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
            arr[index] = arr[index] + items[i].offsetHeight + gap;
        }
    }
}
// 页面尺寸改变时实时触发
window.onresize = function() {
    waterFall();
}
// 当加载到第30张的时候
window.onscroll = function() {
    var box = document.getElementsByClassName("grid");
    var items = document.getElementsByClassName("item");
    if (getClient().height + getScrollTop() >= items[items.length - 1].offsetTop) {
        // 模拟 ajax 获取数据    
        var datas = new Array();
        var j = 0;
        if (flag) {
            return;
        }
        for (var i = 1; i <= 15; i++) {
            j = i + n;
            if (j > 30) break;
            datas[i-1] =  "./images/grid/1 (" + j + ").jpg";
        }
        n = n+15;
        for (var i = 0; i < datas.length; i++) {
            var div = document.createElement("div");
            div.className = "item";
            var image = document.createElement("img");
            image.src = datas[i];
            image.onclick = function() {
                onclickImage(this);
            }
            div.appendChild(image); 

            box[0].appendChild(div);
        }
        if (n >= 15) {
            flag = true;
            alert("图片已全部加载");
        }
        waterFall();
    }
}
// clientWidth 处理兼容性
function getClient() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
}
// scrollTop兼容性处理
function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

function onclickImage(ele) {
    var top = document.getElementsByClassName("top");
    var disp = document.getElementsByClassName("disp");
    var dispW = document.getElementsByClassName("dispW");
    var pic = document.getElementsByClassName("picture");
    disp[0].setAttribute("style", "height:100%;opacity:1;");
    dispW[0].setAttribute("style", "display:block;");
    pic[0].setAttribute("src", ele.src);

    
    var divleft = document.getElementsByClassName("dispW-left");
    divleft[0].onclick = function() {
        var parNode = ele.parentNode;
        var preNode = parNode.previousSibling;
        ele = preNode.childNodes[0];
        pic[0].setAttribute("src", ele.src);
    }
    var divleft = document.getElementsByClassName("dispW-right");
    divleft[0].onclick = function() {
        var parNode = ele.parentNode;
        var nextNode = parNode.nextSibling;
        ele = nextNode.childNodes[0];
        pic[0].setAttribute("src", ele.src);
    }
    var divleft = document.getElementsByClassName("dispW-close");
    divleft[0].onclick = function() {
        top[0].setAttribute("style", "");
        pic[0].setAttribute("src", "");
        disp[0].setAttribute("style", "transition:0.4s;");
        dispW[0].setAttribute("style", "");
    }

}

addLoadEvent(initPhoto);
addLoadEvent(function() {
    setTimeout(waterFall, 50); // 谷歌浏览器 onload事件中无法获取元素高度offsetHeight, 兼容浏览器, 异步触发
});