// 获取header实例
const headerEl = document.querySelector("header");
// 获取返回顶部按钮的实例
const scrollToTopEl = document.querySelector(".scrollToTop");
window.addEventListener("scroll", () => {
    let height = headerEl.getBoundingClientRect().height;
    if (window.pageYOffset - height > 800) {
        if (!headerEl.classList.contains("sticky")) {
            headerEl.classList.add("sticky");
        }
    } else {
        headerEl.classList.remove("sticky");

    }
    if (document.documentElement.scrollTop > 2000) {
        scrollToTopEl.style.display = "block";
        console.log(1)
    } else {
        scrollToTopEl.style.display = "none";
        console.log(2)
    }
})


const glide = new Glide(".glide");
// 获取标题的实例
const captionEl = document.querySelectorAll(".slide-caption");
console.log(captionEl)

// glide里面提供的事件
glide.on(["mount.after", "run.after"], () => {
    const caption = captionEl[glide.index];
    anime({
        // 表示对谁执行动画，这里是对caption下面的每一个元素
        targets: caption.children,
        opacity: [0, 1],
        duration: 400,
        easing: "linear",
        delay: anime.stagger(400, { start: 300 }),//stagger是一个非常重要的函数，400表示caption里面的每一个child都会在上一个child出现之后400ms后出现，start:300表示第一个chil会在300ms后开始出现
        translateY: [anime.stagger([40, 10]), 0],//让caption下面的每一个child都位移，值是40~10之间
    });
});
// 监听在轮播开始之前将caption下面的所有的直接子child给透明
glide.on("run.before", () => {
    console.log(document.querySelectorAll(".slide-caption > *"))
    document.querySelectorAll(".slide-caption > *").forEach(el => {
        el.style.opacity = 0;
    })
})

glide.mount();//将轮播组件加载好

// 成功案例

const isotope = new Isotope(".cases", {
    layoutMode: "fitRows",//行模式布局
    itemSelector: ".case-item"
});

const filterBtns = document.querySelector(".filter-btns");

filterBtns.addEventListener("click", function (e) {
    let { target } = e;
    const filterOption = target.getAttribute("data-filter");
    if (filterOption) {
        document.querySelectorAll(".filter-btn.active").forEach(btn => { btn.classList.remove("active") });
        target.classList.add("active");
        isotope.arrange({ filter: filterOption })
    }
})

// 数据部分参数数字的增长
// scrollReveal
// 配置参数
const staggeringOption = {
    delay: 300,
    deistance: "50px",
    duration: 500,
    easing: "ease-in-out",
    origin: "bottom"
}
// {...staggeringOption,interval: 350}是说让staggeringOption这个对象挨个传入，并在最后添加一项，这是scrollreveal的规定
ScrollReveal().reveal(".feature",{...staggeringOption,interval: 350});
ScrollReveal().reveal(".service-item",{...staggeringOption,interval: 350});

const dataSectionEl = document.querySelector(".data-section");

ScrollReveal().reveal(".data-section",{
    beforeReveal: ()=>{
        anime({
            targets: ".data-piece .num",//目标是.data-piece .num下的数值
            innerHTML: el => {  //对里面的每一个数字进行遍历
                return [0, el.innerHTML];//从0增长到这个的数字
            },
            duration: 2000,//执行时间2000
            round: 1,  //每次增长1
            easing: "easeInExpo"
        })
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom / 5}px)`

    }
})

// 数据部分的背景视差效果的实现
window.addEventListener("scroll", ()=>{
    const bottom = dataSectionEl.getBoundingClientRect().bottom;
    const top = dataSectionEl.getBoundingClientRect().top;
    if(bottom >= 0 && top <= window.innerHeight){
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${bottom / 5}px)`
    }
});

const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]', {
    header: "header",
    offset: 80
});
document.addEventListener("scrollStart", ()=>{
    if(headerEl.classList.contains("open")){
        headerEl.classList.remove("open");
    }
})
const exlploreBrnEls = document.querySelectorAll('.explore-btn');

exlploreBrnEls.forEach(exploreBrnEl => {
    exploreBrnEl.addEventListener("click", () =>{
        scroll.animateScroll(document.querySelector('#about-us'))
    })
})


// 首先获取折叠按钮的实例
const burgerEl = document.querySelector(".burger");
burgerEl.addEventListener("click", () => {
    headerEl.classList.toggle("open")
    console.log(111)
})