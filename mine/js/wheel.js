/**
 * Created by ijiajia on 2016/6/6.
 */
function addEvent(obj, sEv, fn){
    if(obj.addEventListener){
        obj.addEventListener(sEv, fn, false);
    }else{
        obj.attachEvent('on'+sEv, fn);
    }
}

function addWheel(obj, fn){
    function wheel(ev){
        var oEvent=ev || event;

        var bDown=true;
        if(oEvent.wheelDelta){
            if(oEvent.wheelDelta>0){
                bDown=false;
            }else{
                bDown=true;
            }
        }else{
            if(oEvent.detail<0){
                bDown=false;
            }else{
                bDown=true;
            }
        }

        fn && fn(bDown);
        // 阻止默认事件
        oEvent.preventDefault && oEvent.preventDefault();
        return false;
    }

    if(navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
        obj.addEventListener('DOMMouseScroll', wheel, false);
    }else{
        // obj.onmousewheel=wheel;
        addEvent(obj, 'mousewheel', wheel);
    }
}