
var lists = new Array;
var flag = true;
var a;
function videoListInit(str) {
    var video = document.getElementsByTagName("video");
    video[0].src = str;
    video[0].play();
    var list = document.getElementsByClassName("video-list-item-title");
    for (var i = 0; i <　list.length; i++) {
        list[i].onclick = function() {
            var ul = this.nextElementSibling;
            if (ul.style.display == "block")
            ul.setAttribute("style", "");    
            else {
                ul.setAttribute("style", "display:block;");
            }
        }
    }
    for (var j = 0; ;j++) {
        var authors = document.getElementsByClassName("video-list-item-ul")[j];
        if (authors) {
            authors = authors.getElementsByTagName("a");
            for (var k = 0; k < authors.length; k++) {
                // var a = authors[k];
                // var url = a.href;
                // authors[k].onclick = function() {
                //     video[0].src = url;
                //     video[0].play();
                //     return false;
                // }
                authors[k].onclick = function() {
                    // alert(this.href);
                    if (a) a.style = "";
                    a = this;
                    this.style = "background-color:#ddd;";
                    video[0].src = this.href;
                    video[0].play();
                    return false;
                }
            }
        } else break;
    }
}

function livesListInit() {
    var livelist = document.getElementsByClassName("video-list")[0];
    var lives = document.getElementsByClassName("lives-main-item");
    for (var i = 0; i < lives.length; i++) {
        lives[i].onclick = function() {
            if (flag) {
                document.getElementsByClassName("lives")[0].setAttribute("style", "display:block;");    
                flag = false;
            }
            // var lives_img = this.getElementsByClassName("lives-main-img");
            var lives_text = this.getElementsByClassName("lives-main-text")[0];
            var name = lives_text.textContent;
            var count = lives_text.title;
            var first_Url;
            if (lists[name] == 1) {}
            else {
                lists[name] = 1;
                var div = document.createElement("div");
                div.className = "video-list-item";
                var h2 = document.createElement("h2");
                h2.className = "video-list-item-title";
                h2.textContent = name;
                var ul = document.createElement("ul");
                ul.className = "video-list-item-ul";
                for (var j = 1; j <= count; j++) {
                    var li = document.createElement("li");
                    var a = document.createElement("a");
                    a.textContent = ""+j;
                    a.href = "./videos/"+name+"/1 (" + j + ").mp4" ;
                    if (j == 1) first_Url = a.href;
                    li.appendChild(a);
                    ul.appendChild(li);
                }
                div.appendChild(h2);
                div.appendChild(ul);
                livelist.appendChild(div);
            }
            videoListInit(first_Url);
        }
    }
}

    (function () {
      let container = document.getElementsByClassName('zh-player')[0];
      let controllerW = document.getElementsByClassName('zh-player-video-controls-wrap')[0];
      let controllerV = document.getElementsByClassName('zh-player-video-controls-volumeHint')[0];
      let state = document.getElementsByClassName('zh-player-video-state')[0];
      let playBtn = controllerW.getElementsByClassName('zh-player-video-controls-playBtn')[0];
      let fullscreenBtn = controllerW.getElementsByClassName('zh-player-video-controls-fullscreenBtn')[0];
      let video = document.getElementsByTagName('video')[0];
      let timeNow = document.getElementsByClassName('zh-player-video-time-wrap-now')[0];
      let timeTotal = document.getElementsByClassName('zh-player-video-time-wrap-total')[0];
      let progress = document.getElementsByClassName('zh-player-video-controls-top')[0];
      let progress_slider = document.getElementsByClassName('zh-player-video-progress-slider')[0];
      let progress_loaded = document.getElementsByClassName('zh-player-video-progress-loaded')[0];
      let progress_btn = document.getElementsByClassName('dot')[0];
      let showId;
      let showHideFlag = true;
      let fullFlag = false;
      let progressId;
      let dragFlag = false;
      let VideoManage = {
        init(src) {
          video.src = src;
          video.controls = false;
          video.auto = false;
          // video.addEventListener('loadeddata', this.initControls());
          this.initControls();
          this.operateControls();
        },
        initControls() {
          video.addEventListener('loadeddata', function() {   
            timeNow.textContent = getTime(0);       
            timeTotal.textContent = getTime(video.duration);
          })
          container.onclick = ()=>{
            container.onclick = undefined;
            this.showHideControls();
          }
        },
        showHideControls() {
          container.addEventListener("mousemove", showControlsFromC);
          controllerW.addEventListener("mousemove", showControlsFromW);
          container.addEventListener("mouseout", hideControls);
          controllerW.addEventListener("mouseout", hideControls);
        },
        operateControls() {
          playBtn.addEventListener('click', play);
          video.addEventListener('click', play);

          fullscreenBtn.addEventListener('click', full);
          container.addEventListener('dblclick', full);
          progress_btn.addEventListener('mousedown', function() {
            dragFlag = true;
            clearInterval(progressId);
          })
          progress.addEventListener('mousemove', function(e) {
            if (dragFlag) {
              let length = e.pageX - container.offsetLeft;
              var percent = length / container.offsetWidth;
              setProgress(percent);
              video.currentTime = percent*video.currentTime;
              
            }
          })
          progress.addEventListener('mouseup', function(){
            dragFlag = false;
            progressId = setInterval(function(){
                setProgress(getProgress());
                timeNow.textContent = getTime(video.currentTime);
                if (video.ended) {
                  clearInterval(progressId);
                  timeNow.textContent = getTime(0);
                  playBtn.classList.toggle('paused')    
                }
              }, 50);
          })
          // 想实现拖拽dot变更播放进度
          progress.addEventListener('click', function(e){
            if (controllerW.style.opacity == 1) {
              clearInterval(progressId); //停止加载下一次任务, 避免覆盖
              let length = e.pageX - container.offsetLeft;
              var percent = length / container.offsetWidth;
              setProgress(percent);
              video.currentTime = percent*video.duration;
              progressId = setInterval(function(){
                setProgress(getProgress());
                timeNow.textContent = getTime(video.currentTime);
                if (video.ended) {
                  clearInterval(progressId);
                  timeNow.textContent = getTime(0);
                  playBtn.classList.toggle('paused')    
                }
              }, 50);
            }
          })
        }
      };
      VideoManage.init('http://lc-r5Dti1zY.cn-e1.lcfile.com/50635d8e24d1ce78e202.mp4/1074_0b2ecfzs2aqgx4akbvmipbptieiefwwqny2a.f0.mp4');

      function showControlsFromC(e) {
        controllerW.style.opacity = 1;
        if (showId) clearTimeout(showId);
        showId = setTimeout(function(){
          hideControls();  
        }, 500);
        
      }
      function showControlsFromW(e) {
        if (showId) clearTimeout(showId);
        controllerW.style.opacity = 1;
        e.stopPropagation();
      }
      function hideControls() {
        controllerW.style.opacity = 0;
      }
      function play() {
        if (video.paused || video.ended) {
          video.play();
          state.style.opacity = 0;
          playBtn.classList.toggle('paused')
          progressId = setInterval(function(){
            setProgress(getProgress());
            timeNow.textContent = getTime(video.currentTime);
            if (video.ended) {
              clearInterval(progressId);
              timeNow.textContent = getTime(0);
              playBtn.classList.toggle('paused')    
            }
          }, 50);
        } else {
          video.pause();
          state.style.opacity = 1;
          playBtn.classList.toggle('paused');
          clearInterval(progressId);
        }
      }
      function full() {
        // let isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
        if (fullFlag == true) {
          fullFlag = false;
          exitFullscreen(document);
        } else {
          fullFlag = true;
          FullScreen(container);
        }
      }
      //进入全屏
      function FullScreen(ele) {
        // if (ele.requestFullscreen) {
        //   ele.requestFullscreen();
        // } else if (ele.mozRequestFullScreen) {
        //   ele.mozRequestFullScreen();
        // } else if (ele.webkitRequestFullScreen) {
        //   ele.webkitRequestFullScreen();
        // }
        //现在统一使用 
        ele.requestFullscreen();
      }
      //退出全屏
      function exitFullscreen(de) {
        // if (de.exitFullscreen) {
        //   de.exitFullscreen();
        // } else if (de.mozCancelFullScreen) {
        //   de.mozCancelFullScreen();
        // } else if (de.webkitCancelFullScreen) {
        //   de.webkitCancelFullScreen();
        // }
        de.exitFullscreen();
      }
      function getTime(time) {
        let [hour, min, sec] = [0,0,time];
        if (sec >= 60) {
          sec = time%60;
          min = time/60;
        }
        if (min >= 60) {
          min = min%60
          hour = time/60/60;
        }
        return `${hour.toFixed(0).toString().padStart(2, '0')}:${min.toFixed(0).toString().padStart(2, '0')}:${sec.toFixed(0).toString().padStart(2, '0')}`;
      }
      // video的播放条
      function getProgress() {
        return video.currentTime / video.duration;
      }
      function setProgress(percent) {
        let str = `scaleX(${percent.toFixed(2)})`;
        progress_slider.style.transform = str;
        progress_btn.style = `left: ${percent*100+'%'};`;
      }
    })();

addLoadEvent(livesListInit);