function getStyle(obj,name){
	return (obj.currentStyle || getComputedStyle(obj,false))[name]
};
function move(obj,json,options){
	var options = options || {};//判断options里面有没有传
	options.duration = options.duration || 500;//如果传了就用，如果没传就用500
	options.easing = options.easing || 'linear';
	var start = {};//初始值
	var dis= {};//过程距离
	for(name in json){
		start[name] = parseFloat(getStyle(obj,name));
		if(isNaN(start[name])){
			switch(name){
				case'left':
					start[name] = obj.offsetLeft;
					break;
				case 'top':
					start[name] = obj.offsetTop;
					break;
				case 'opacity':
					start[name] = 1;
					break;
			}
		}
		dis[name] = json[name] - start[name]
	}
	var count = Math.floor(options.duration/30);//总步数等于总时间除以多长时间走一步
	var n = 0;//走了多少步
	clearInterval(obj.timer)
	obj.timer = setInterval(function(){
		n++;
		for(name in json){//走了总的百分之多少
//					var a = n / count;
//					var cur = start[name] + dis[name]*a;//走了多少
			switch(options.easing){
				case 'linear'://匀速
					var a = n / count;
					var cur = start[name] + dis[name]*a;
					break;
				case 'ease-in'://越来越快
					var a = n / count;
					var cur = start[name] + dis[name]*a*a*a;
					break;
				case 'ease-out'://越来越慢
					var a = 1 - n / count;
					var cur = start[name] + dis[name]*(1-a*a*a);
					break;
			}
			if(name == 'opacity'){//如果json样式是透明度的话
				obj.style.opacity = cur;
				obj.style.filter='alpha(opacity='+cur*100+')';//处理透明度的兼容
			}else{
				obj.style[name] = cur + 'px';
			}
		}
		if(n == count){
			clearInterval(obj.timer)
			options.complete && options.complete()					
		}
	},30)
}