/**
 * Created by xiaoshujun on 2016/6/30.
 */
window.onload = function () {
    
    var oContent = document.getElementById('content');
    
    //滚动
    var oNavball = document.getElementById('navball');
    var oOL = oNavball.children;
    var aLi = oContent.children;
    var iNow = 0;
    var bFlag=false;
    var oSpanon = oNavball.getElementsByTagName('span')
    //可视区域高度
    oContent.style.height=document.documentElement.clientHeight+'px';
    for(var i = 0; i < aLi.length; i++){
        aLi[i].style.top = (iNow === i ? 0 : oContent.offsetHeight) +"px";
    }
    window.onresize = function () {
        oContent.style.height=document.documentElement.clientHeight+'px';
        for(var i = 0; i < aLi.length; i++){
            aLi[i].style.top = (iNow === i ? 0 : oContent.offsetHeight) +"px";
        }
    }

    //加载logo
    loadLogo(iNow);

    //点击滚动
    for(var i = 0; i < oOL.length; i++){
        oOL[i].index = i;
        oOL[i].onclick = function () {

            for(var i = 0; i < oOL.length; i++){
                if(i < this.index){
                    if(i != iNow){
                        oSpanon[i].className = '';
                        aLi[i].style.top = -oContent.offsetHeight + "px";
                    }else{
                        oSpanon[i].className = '';
                        move(aLi[i], {top: -oContent.offsetHeight}, {"duration": 500, easing: "ease-out"});
                    }
                }else if(i > this.index){
                    if( i != iNow){
                        oSpanon[i].className = '';
                        aLi[i].style.top = oContent.offsetHeight + "px";
                    }else{
                        move(aLi[i], {top: oContent.offsetHeight}, {"duration": 500, easing: "ease-out"});
                    }
                }else{
                    oSpanon[i].className = 'on';
                     move(aLi[i], {top: 0}, {"duration": 500, easing: "ease-out"});
                }
                iNow = this.index;
                //加载logo
                loadLogo(iNow);
                elastic(Logo,30)
            }
	    }
    }

    //滚轮滚动
    if(navigator.userAgent.toLowerCase().indexOf('firefox')!= -1){
        document.addEventListener('DOMMouseScroll', function(ev){
            var oEvent = ev || event;
            if(oEvent.wheelDelta){
                if(oEvent.wheelDelta > 0){
                    //上
                    scrollUp();
                }else{
                    //下
                    scrollDown();
                }
            }else{
                if(oEvent.detail < 0){
                    scrollUp();
                }else{
                    scrollDown();
                }
            }
        }, false);
    }else{
        document.onmousewheel = function(ev){
            var oEvent = ev || event;
            if(oEvent.wheelDelta){
                if(oEvent.wheelDelta > 0){
                    scrollUp();
                }else{
                    scrollDown();
                }
            }else{
                if(oEvent.detail<0){
                    scrollUp();
                }else{
                    scrollDown();
                }
            }
        };
    }
    //滚轮向上
    function scrollUp(){
        if(bFlag)return;
        bFlag = true;
        var prev = iNow;
        if(--iNow < 0){
            iNow = 0;
        }

        if(prev === iNow){
            bFlag = false;
            return;
        }

        //加载logo
        loadLogo(iNow);
        elastic(Logo,30);
        move(aLi[prev],{'top': oContent.offsetHeight},{easing: "ease-out", 'duration':500,'complete':function(){
            bFlag = false;
        }});
        move(aLi[iNow],{'top': 0},{easing: "ease-out", 'duration':500,'complete':function(){
            bFlag = false;
        }});

    }
    //滚轮向下
    function scrollDown(){
        if(bFlag)return;
        bFlag = true;
        var prev = iNow;
        if(++iNow > aLi.length - 1){
            iNow = aLi.length - 1;
        }

        if(prev === iNow){
            bFlag = false;
            return;
        }

        //加载logo
        loadLogo(iNow);
        elastic(Logo,30)

        move(aLi[prev],{'top': -oContent.offsetHeight},{easing: "ease-out", 'duration':500,'complete':function(){
            bFlag = false;
        }});
        move(aLi[iNow],{'top': 0},{easing: "ease-out", 'duration':500,'complete':function(){
            bFlag = false;
        }});
    }
    //键盘
    document.onkeydown=function(ev){
        var oEvent = ev||event;
        if(oEvent.keyCode == 38){
            scrollUp();
        }
        if(oEvent.keyCode == 40){
            scrollDown();
        }
    };
    //鼠标闪烁
    var oMouse = document.getElementById('mouse');
    function MouseShow() {
        move(oMouse,{'opacity':1},{ 'duration':800,'complete':function () {
           move(oMouse,{'opacity':0.2},{ 'duration':500,'complete':function () {
            MouseShow();
         }});
        }});
    }
    MouseShow();
    //s首页
    var oMidImg = document.getElementById('mid_img');
    function oMidImgShow() {
        move(oMidImg,{'top':-100,'opacity':0.5},{ 'duration':100,'complete':function () {
            move(oMidImg,{'top':450,'opacity':0.8},{ 'duration':800,'complete':function () {
                move(oMidImg,{'top':350,'opacity':1},{ 'duration':800})
            }});
        }});
    }
    oMidImgShow();
    //项目
    var oCaseList = document.getElementById('case_list');
    var CaseLi = oCaseList.getElementsByTagName('li');
    var CaseDiv = oCaseList.getElementsByTagName('span');
    for(var i = 0; i < CaseLi.length; i++){
        CaseLi[i].index = i;
        CaseLi[i].onmouseover = function () {
           CaseDiv[this.index].style.display = 'block';
        }
        CaseLi[i].onmouseout = function () {
            CaseDiv[this.index].style.display = 'none'
        }
    }
    //自定义滚动条
    var oList = document.getElementById('list');
    var oSlider = document.getElementById('slider');
    var oCase = document.getElementById('case');
    oSlider.onmousedown = function (ev) {
        var oEvent = ev || event;
        var disX = oEvent.clientX - oSlider.offsetLeft;
        document.onmousemove = function (ev) {
            var oEvent = ev || event;
            var l = oEvent.clientX - disX;
            if(l < 0){
                l = 0;
            }
            if(l >= oList.offsetWidth - oSlider.offsetWidth){
                l= oList.offsetWidth - oSlider.offsetWidth;
            }
            oSlider.style.left = l +'px';
            // 求比例
            var scale = l/(oList.offsetWidth - oSlider.offsetWidth);
            console.log(scale)
            oCaseList.style.left=scale*(1150 - oCaseList.offsetWidth)+'px';
        };
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
        }
        return false;
    }
    //logot弹性运动;
    var Logo = document.getElementById('logo');
    elastic(Logo,30)
    function elastic(obj,iTarget) {
        var left = 0;
        var iSpeed = 0; //速度
        var timer = null;
        timer = setInterval(function () {
            iSpeed+= (iTarget - left)/5;
            iSpeed*= 0.8;
            left+=iSpeed;
            obj.style.left = Math.round(left) + 'px';
            //关闭计时器
            if(Math.abs(iSpeed) < 1 && Math.round(left) == iTarget){
                clearInterval(timer)
            }
        },30)
    }
    //关于我tab
    var ResumeList = document.getElementById('resume_list');
    var tabLi = ResumeList.getElementsByTagName('li');
    var tabSpan = ResumeList.getElementsByTagName('span');
    var ResumeContent = document.getElementById('resume_content');
    var oSpan = ResumeContent.getElementsByTagName('span');
    for(var i = 0; i < tabLi.length; i++ ){
        tabLi[i].index = i;
        tabLi[i].onclick = function () {
            for(var j = 0; j < tabLi.length; j++){
                tabSpan[j].className='';
                oSpan[j].style.display = 'none';
            }
            tabSpan[this.index].className='active';
            oSpan[this.index].style.display = 'block';
        }
    }
    //案例
    var oItem = document.getElementById('item');
    var ItemLi = oItem.getElementsByTagName('li');
    var ItemDiv = oItem.getElementsByTagName('span');
    for(var i = 0; i < ItemLi.length; i++){
        ItemLi[i].index = i;
        ItemLi[i].onmouseover = function () {
            ItemDiv[this.index].style.display = 'block';
        }
        ItemLi[i].onmouseout = function () {
            ItemDiv[this.index].style.display = 'none'
        }
    }
    //换一换
    // var oChange = document.getElementById('change');
    // var left = 0;
    // oChange.onclick = function () {
    //
    // }
}
//变色
var pageColorConfing = [0, 1, 0, 0, 0];
var prveColorState = pageColorConfing[1];
function loadLogo(pageIndex){
    if(pageColorConfing[pageIndex] !== prveColorState){
        var whiteLogo = document.getElementById("logo").getElementsByTagName("img")[0];
        var blackLogo = document.getElementById("logo").getElementsByTagName("img")[1];
        var whitenav = document.getElementById("navball");
        var colors = ["rgb(255, 255, 255)", "rgb(0, 0, 0)"];
        var whitemouse = document.getElementById("mouse").getElementsByTagName("img")[0];
        var blackmouse = document.getElementById("mouse").getElementsByTagName("img")[1];
        var whitrwb = document.getElementById("icon").getElementsByTagName("li")[0].getElementsByTagName("img")[0];
        var blackwb = document.getElementById("icon").getElementsByTagName("li")[0].getElementsByTagName("img")[1];
        var whitrqq = document.getElementById("icon").getElementsByTagName("li")[1].getElementsByTagName("img")[0];
        var blackqq = document.getElementById("icon").getElementsByTagName("li")[1].getElementsByTagName("img")[1];
        var whitrwx = document.getElementById("icon").getElementsByTagName("li")[2].getElementsByTagName("img")[0];
        var blackwx = document.getElementById("icon").getElementsByTagName("li")[2].getElementsByTagName("img")[1];
        move(whitenav, {"color": colors[pageColorConfing[pageIndex]]}, {"duration": 500, easing: "ease-out"});

        var groupByColor = [[whiteLogo], [blackLogo]];
        for(var i = 0; i < groupByColor.length; ++i){
            for(var n = 0; n < groupByColor[i].length; ++n){
                move(groupByColor[i][n], {"opacity": (i === pageColorConfing[pageIndex] ? 1.0 : 0.0)}, {easing: "ease-out", "duration": 500});
            }
        }
        var groupByColor1 = [[whitemouse], [blackmouse]];
        for(var i = 0; i < groupByColor1.length; ++i){
            for(var n = 0; n < groupByColor1[i].length; ++n){
                move(groupByColor1[i][n], {"opacity": (i === pageColorConfing[pageIndex] ? 1.0 : 0.0)}, {easing: "ease-out", "duration": 500});
            }
        }
        var groupByColor2 = [[whitrwb], [blackwb]];
        for(var i = 0; i < groupByColor2.length; ++i){
            for(var n = 0; n < groupByColor2[i].length; ++n){
                move(groupByColor2[i][n], {"opacity": (i === pageColorConfing[pageIndex] ? 1.0 : 0.0)}, {easing: "ease-out", "duration": 500});
            }
        }
        var groupByColor3 = [[whitrqq], [blackqq]];
        for(var i = 0; i < groupByColor3.length; ++i){
            for(var n = 0; n < groupByColor3[i].length; ++n){
                move(groupByColor3[i][n], {"opacity": (i === pageColorConfing[pageIndex] ? 1.0 : 0.0)}, {easing: "ease-out", "duration": 500});
            }
        }
        var groupByColor4 = [[whitrwx], [blackwx]];
        for(var i = 0; i < groupByColor4.length; ++i){
            for(var n = 0; n < groupByColor4[i].length; ++n){
                move(groupByColor4[i][n], {"opacity": (i === pageColorConfing[pageIndex] ? 1.0 : 0.0)}, {easing: "ease-out", "duration": 500});
            }
        }
    }
    prveColorState = pageColorConfing[pageIndex];
}
