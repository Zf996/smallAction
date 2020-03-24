window.onload = function () {
    // 获取对应的标签
    var oDiv = document.getElementById('div1');
    // 获取top的值
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    // parseInt是为了避免小方块抖动：因为计算机只能计算到1
    var iH = parseInt(scrollTop + (windowHeight - oDiv.offsetHeight) / 2);
    // 页面加载完成后调用缓冲运动函数
    startMove(iH);
    // 页面滚动时调用缓冲运动函数
    window.onscroll = function () {
        // 获取对应的标签
        var oDiv = document.getElementById('div1');
        // 获取top的值
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        // parseInt是为了避免小方块抖动：因为计算机只能计算到1
        var iH = parseInt(scrollTop + (windowHeight - oDiv.offsetHeight) / 2);
        // 页面加载完成后调用缓冲运动函数
        startMove(iH);
    }
    // 页面大小发生变化时调用运动函数
    window.onresize = function () {
        // 获取对应的标签
        var oDiv = document.getElementById('div1');
        // 获取top的值
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        // parseInt是为了避免小方块抖动：因为计算机只能计算到1
        var iH = parseInt(scrollTop + (windowHeight - oDiv.offsetHeight) / 2);
        // 页面加载完成后调用缓冲运动函数
        startMove(iH);
    }
}
// 缓冲运动
var timer = null;
function startMove(iTarget) {
    var oDiv = document.getElementById('div1');
    // 运功框架
    // 1.只要开始一个定时器首先删除一个定时器
    clearInterval(timer);
    timer = setInterval(function () {
        // 计算速度
        var speed = (iTarget - oDiv.offsetTop) / 8;
        // 下面这行代码主要用于将缓冲运动可以完美的契合到终点
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        // 2.将静止和运动使用if-else分开
        if (oDiv.offsetTop == iTarget) {
            clearInterval(timer);
        } else {
            oDiv.style.top = oDiv.offsetTop + speed + 'px';
        }
    }, 30);
}