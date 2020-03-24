// 业务逻辑：
// 一、中图上的遮罩层的移动
// 1.用鼠标移入遮罩层
// 鼠标移入中图区域 遮罩层在左上角显示，以及要跟随鼠标移动
// 获取到整个容器
var oWrap = document.getElementById('wrap');
// 获取到中图区域
var oCon = document.getElementsByClassName('content')[0];
// 获取到中图片元素
var omdImg = oCon.getElementsByTagName('img')[0];
// 获取到遮罩层
var oShadow = document.getElementsByClassName('shadow')[0];
// 获取到大图区域
var oBig = document.getElementsByClassName('big')[0];
// 获取到中图片
var obigImg = oBig.getElementsByTagName('img')[0];
// 鼠标进入中图区域
oCon.onmouseover = function () {
    // 1.显示
    oShadow.style.display = 'block';
    oBig.style.display = 'block';
}
// 2.鼠标在遮罩层上移动
oCon.onmousemove = function (e) {
    // 获取到鼠标的坐标
    var x = e.clientX;
    var y = e.clientY;
    // console.log(x,y);
    //获取到wrap到浏览器左上角的距离
    var wX = oWrap.offsetLeft;
    var wY = oWrap.offsetTop;
    // console.log(wX,wY);
    // 鼠标的坐标减去wrap左上角距离浏览器左上角的距离就是遮罩层的距离，然后再减去遮罩层的一半，就是为了让鼠标可以再遮罩层的中心
    var moveX = x - wX - oShadow.offsetWidth / 2;
    var moveY = y - wY - oShadow.offsetHeight / 2;
    // 遮罩层的边界值检测
    if (moveX < 0) {
        moveX = 0
    } else if (moveX > (oCon.offsetWidth - oShadow.offsetWidth)) {
        moveX = oCon.offsetWidth - oShadow.offsetWidth;

    }
    if (moveY < 0) {
        moveY = 0;
    } else if (moveY > (oCon.offsetHeight - oShadow.offsetHeight)) {
        moveY = oCon.offsetHeight - oShadow.offsetHeight;

    }

    // 实时更新遮罩层的位置
    oShadow.style.left = moveX + 'px';
    oShadow.style.top = moveY + 'px';
    // 二、大图位置的偏移-本质就是改变大图片的top和left，使其在大图片的容器里移动（这个容器一定要overflow：hidden；）

    // 做法：中图遮罩层的移动的比例应该和大图移动的比例是相同的
    // 公式：遮罩层往右面移动的值/ （中图的宽度-遮罩层的宽度）220 = 大图往左面移动的值 / (大图的宽度-中图的宽度)400
    var presentX = moveX * 400 / 220;
    var presentY = moveY * 400 / 220;
    // 对大图添加样式使其移动
    obigImg.style.top = -presentY + 'px';
    obigImg.style.left = -presentX + 'px';

}
// 3.鼠标移出中图区域 遮罩层在隐蔽
oCon.onmouseout = function () {
    oShadow.style.display = 'none';
    oBig.style.display = 'none';

}

//业务逻辑： 下面的小图片列表当鼠标移动到其上面时他们的边框border要变成红色的，对应中图区域的图片也要变成和小图片对应一样的
//解决思路： 将中图片对应的路径事先绑定在小图片的一个自定义属性上，当事件触发的时候，获取这个自定义属性的值，将其赋值给中图图的路径src上
// 获取到要操作的元素
// 包裹小图片的ul---接下来会用到事假委托 
var list = document.getElementsByClassName("listLi")[0];
// 获取到包裹小图片的li
var lis = document.getElementsByTagName("li");
// 当鼠标移动到小图片上时，之所以绑定到外部的ul上利用的是事件委托
list.onmouseover = function (e) {
    var that = e.target;
    // 判断是不是想要执行操作的那个元素
    if (that.dataset.index == "1") {
        // 是的话就给这个元素添加一个类名on。
        that.className = "on";
        // 将中图片换成小图片对应的那个图片
        // 先获取到小图上的自定义属性的值---小技巧：自定义属性定义时如果有大写的话，在获取时他会自动转换成小写的哦
        // 将中图片的src属性的值改成下图片上的自定义属性的值
        omdImg.src = that.dataset.mdimg;
        obigImg.src = that.dataset.lgimg;
    }
}
// 当鼠标移出小图片上时，之所以绑定到外部的ul上利用的是事件委托
list.onmouseout = function (e) {
    if (e.target.dataset.index == "1") {
        e.target.className = "";
    }
}
console.log(lis);