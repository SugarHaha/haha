/**
 * Created by xiaoshujun on 2016/6/28.
 */
function Drag(id) {
    if(!id)return;
    this.oDiv = document.getElementById(id);
    this.disX = 0;
    this.disY = 0;
    this.init();
}
Drag.prototype.init = function () {
    var _this = this;
    this.oDiv.onmousedown = function (ev) {
        var oEvent = ev || event;
        _this.fnDown(oEvent);
    }
}
Drag.prototype.fnDown = function (oEvent) {
    var _this = this;
    this.disX = oEvent.clientX - this.oDiv.offsetLeft;
    this.disY = oEvent.clientY - this.oDiv.offsetTop;
    document.onmousemove = function (ev) {
        var oEvent = ev || event;
        _this.fnMove(oEvent);
        return false;
    }
}
Drag.prototype.fnMove = function (oEvent) {
    var _this = this;
    this.oDiv.style.left = oEvent.clientX - this.disX +'px';
    this.oDiv.style.top = oEvent.clientY - this.disY +'px';
    document.onmouseup = function () {
        _this.fnUp();
    }
}
Drag.prototype.fnUp = function () {
    document.onmousemove =  null;
    document.onmouseup = null;
}