/**
 * Created by xiaoshujun on 2016/6/28.
 */
function LimitDrag(id) {
    Drag.apply(this,arguments);
}
LimitDrag.prototype = new Drag();
LimitDrag.prototype.constructor = LimitDrag;
var oldMove = LimitDrag.prototype.fnMove;
LimitDrag.prototype.fnMove = function () {
    oldMove.apply(this,arguments);
    if(this.oDiv.offsetLeft < 0){
        this.oDiv.style.left = 0;
    }
    if(this.oDiv.offsetTop < 0){
        this.oDiv.style.top = 0;
    }
    if(this.oDiv.offsetLeft > document.documentElement.clientWidth - this.oDiv.offsetWidth){
        this.oDiv.style.left = document.documentElement.clientWidth - this.oDiv.offsetWidth + 'px';
    }
    if(this.oDiv.offsetTop > document.documentElement.clientHeight - this.oDiv.offsetHeight){
        this.oDiv.style.top = document.documentElement.clientHeight - this.oDiv.offsetHeight + 'px';
    }
}