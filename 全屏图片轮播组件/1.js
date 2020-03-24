// 获取元素
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const slides = document.querySelectorAll(".slide");

// 获取当前正在播放的幻灯片的数组下标
var currentIndex = 0;
// 定义自动播放的开关
var autoplay = true;
//  定义向前播放的开关
var forward = true;
//  定义播放的时间间隔
var interval = 5000;

// 定义一个事件函数
// 当点击向右的箭头时
function handleNextClide() {
    // 先定义一个变量保存当前正在播放的幻灯片
    let current = slides[currentIndex];
    // 当点击向右的箭头时，让当前播放的幻灯片的.current类名去掉；
    current.classList.remove('current');
    currentIndex++;
    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }
    slides[currentIndex].classList.add('current');
}
// 给向右的箭头绑定这个点击事件函数
next.addEventListener('click', handleNextClide)

// 定义另一个事件处理函数
// 当点击向左的箭头时
function handlePrevClide() {
    // 也是先定义一个变量保存当前正在播放的幻灯片
    let current = slides[currentIndex];
    current.classList.remove('current');
    currentIndex--;
    if (currentIndex <= 0) {
        currentIndex = slides.length - 1;
    }
    slides[currentIndex].classList.add('current');
}
// 给向左的箭头绑定这个点击事件函数
prev.addEventListener("click", handlePrevClide);

// 自动播放
if (autoplay) {
    setInterval(forward ? handleNextClide : handlePrevClide, interval);

}