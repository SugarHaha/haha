/**
 * Created by ijiajia on 2016/6/12.
 */
function getStyle(obj, name){
    return (obj.currentStyle || getComputedStyle(obj, false))[name];
}
function move(obj, json, options){
    var options=options || {};
    options.duration=options.duration || 500;
    options.easing=options.easing || 'linear';

    var start={};
    var dis={};
    for(var name in json){
        switch(name){
            case "color":
            case "backgroundColor":
                var reg = /^rgb\((\d*),\s*(\d*),\s*(\d*)\s*\)$/i;
                var result = reg.exec(getStyle(obj, name));
                if(result){
                    start[name] = [parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3])];
                }else{
                    start[name] = [0, 0, 0];
                }

                result = reg.exec(json[name]);

                if(result){
                    dis[name] = [parseFloat(result[1]) - start[name][0], parseFloat(result[2]) - start[name][1], parseFloat(result[3]) - start[name][2]];
                }else{
                    dis[name] = [0, 0, 0];
                }
                break;
            default:
                start[name]=parseFloat(getStyle(obj, name));
                if(isNaN(start[name])){
                    switch(name){
                        case 'left':
                            start[name]=obj.offsetLeft;
                            break;
                        case 'top':
                            start[name]=obj.offsetTop;
                            break;
                        case 'opacity':
                            start[name]=1;
                            break;
                        case 'borderWidth':
                            start[name]=0;
                            break;
                            default:
                            break;
                    }
                }
                dis[name]=json[name]-start[name];
            break;
        }

    }

    var count=Math.floor(options.duration/30);
    var n=0;
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        n++;

        for(var name in json){
            
            if(typeof(start[name]) === "object"){

                switch(options.easing){
                    case 'linear':
                        var a = n / count;
                        var cur = [];
                        for(var i = 0; i < start[name].length; ++i){
                            cur[i] = parseInt(start[name][i] + dis[name][i] * a);
                        }
                        break;
                    case 'ease-in':
                        var a = n / count;
                        var cur = [];
                        for(var i = 0; i < start[name].length; ++i){
                            cur[i] = parseInt(start[name][i] + dis[name][i] * a * a * a);
                        }
                        break;
                    case 'ease-out':
                        var a=1-n/count;
                        var cur = [];
                        for(var i = 0; i < start[name].length; ++i){
                            cur[i] = parseInt(start[name][i] + dis[name][i] *(1 - a * a * a));
                        }
                        break;
                }

                obj.style[name]= "rgb(" + cur[0] + ", " + cur[1] + ", " + cur[2] + ")";
            }else{
                switch(options.easing){
                    case 'linear':
                        var a = n / count;
                        var cur = start[name] + dis[name] * a;
                        break;
                    case 'ease-in':
                        var a=n/count;
                        var cur=start[name]+dis[name]*a*a*a;
                        break;
                    case 'ease-out':
                        var a=1-n/count;
                        var cur=start[name]+dis[name]*(1-a*a*a);
                        break;
                }

                if(name=='opacity'){
                    obj.style.opacity=cur;
                    obj.style.filter='alpha(opacity='+cur*100+')';
                }else{
                    obj.style[name]=cur+'px';
                }
            }
        }


        if(n==count){
            clearInterval(obj.timer);
            options.complete && options.complete();
        }
    }, 30);
}