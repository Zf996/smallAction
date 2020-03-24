const textEl = document.getElementById('text');
const texts = JSON.parse(textEl.getAttribute('data-text'));
// 定义index变量用于计算显示tets数组里面第几个字符串
let index = 0;
// 定义charIndex变量用于计算显示的是每一个字符串中的第几个字符
let charIndex = 0;
// 定义detal变量用于显示到执行下一次动画间隔的时间
let detal = 500;
// 定义开始时间，
let start = null;
// 定义是否开始执行删除操作
let isDel = false;
// 定义回调函数
function type(time){
    // 
    window.requestAnimationFrame(type);
    // 如果开始时间是空，就给它赋值当前的时间
    if(!start){
        start = time;
    }
    // 定义progress用于表示现在距离开始时间的差值
    let progress = time - start;
    // 如果差值大于了500毫秒就开始执行打字操作
    if(progress > detal){
        // 先取出数组里面的第一个字符串
        let text = texts[index];
        // 判断是否是删除操作
        if(!isDel){
            // 依次从字符串里面slice出每一个字符
            textEl.innerHTML = text.slice(0,++charIndex);
            // 将detal设置成随机的数，是为了将打字的速度模拟的更像人真实的打字速度；
            detal = 500 - Math.random() + 400;
        }else{
            // 执行删除操作，slice从长到短。模拟真实的删除操作
            textEl.innerHTML = text.slice(0,charIndex--);
        }
        // 实时更新start的值，避免progress不断的增大
        start = time;
        // 当这个字符串打印完毕之后
        if(charIndex == text.length){
            // 将会执行删除操作
            isDel = true;
            // 删除的时候速度会快一些，所以将detal的值改小一些
            detal = 200;
            // 1200毫秒后开始执行
            start = time + 1200;
        }
        // 当删除完之后
        if(charIndex < 0){
            isDel = false;
            start = time + 200;
            // 开始打印下一个字符串，++index % texts.length的结果只能是0~length-1
            index = ++index % texts.length;
        }
    }
}
// 开始执行
window.requestAnimationFrame(type);
