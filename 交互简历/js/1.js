// 单例模式
// Loading
let loadingRender = (function () {
    let $loadingBox = $('.loadingBox'),
        $current = $loadingBox.find('.current');
    // 我们需要预先加载的图片
    let imgData = ["img/lg1.png", "img/lg2.png", "img/lg3.png", "img/lg4.png", "img/lg5.png", "img/lm1.png", "img/lm2.png", "img/lm3.png", "img/lm4.png", "img/lm5.png", "img/md1.jpg", "img/md2.jpg", "img/md3.jpg", "img/md4.jpg", "img/md5.jpg"]
    let n = 0;
    let len = imgData.length;
    // run方法用来预加载图片
    let run = function (callback) {

        // console.log(len)
        imgData.forEach(item => {
            let tempImg = new Image;
            tempImg.onload = () => {
                // console.log(tempImg);
                tempImg = null; //因为不需要显示图片，所以将它置为null;
                // console.log(tempImg);
                $current.css('width', (++n / len) * 100 + '%');
                // 加载完成：执行回调函数(让当前loading页消失)
                if (n === len) {
                    clearTimeout(delayTimer);
                    callback && callback();
                }
            };
            tempImg.src = item;
        })
    }
    // => maxDelay设置最长等待时间（10s,到达10s如果加载了90%以上就跳转正常内容，如果不足这个比例网络状况不佳，请重试）
    let delayTimer = null;
    let maxDelay = function maxDelay(callback) {
        delayTimer = setTimeout(() => {
            if (n / len >= 0.9) {
                $current.css('width', '100%');
                callback && callback();
                return;
            }
            alert('非常遗憾，当前您的网络状态不佳，请重试');
            window.location.href = 'http://www.qq.com';//此时我们跳转到另一个页面
        }, 10000)
    }
    // 完成后
    let done = function done() {
        // 停留一秒钟开始移除
        let timer = setTimeout(() => {
            $loadingBox.remove();

        }, 1000)
    }
    return {
        init: function () {
            run(done);
            maxDelay(done);
        }
    }
})()
loadingRender.init();
// phone
let phoneRender = (function () {
    let $phoneBox = $('.phoneBox')
    let $time = $phoneBox.find('span')
    let $answer = $phoneBox.find('.answer')
    let $answerMarkLink = $answer.find('.markLink')
    let $hang = $phoneBox.find('.hang')
    let $hangMarkLink = $hang.find('.markLink')
    let answerBell = $('#answerBell')[0]//[0]是把获得的对象转换成原生的js对象
    let introduction = $('#introduction')[0]
    return {
        init: function () {
            // =>播放bell
            /**
             * audio的一些常用的属性
             * duration:播放的总时间s
             * currentIime: 当前已经播放的时间
             * ended:是否已经播放完毕
             * paused: 当前是否为播放状态
             * volume:控制音量(0-1)
             * 事件：
             * canplay: 可以女正常播放（但是播放过程中可能会出现卡顿）
             * canplaythrough:资源记载完毕，可以顺畅的播放了
             * onended: 已经播放完成
             * onloadedmetadata: 资源的基础信息已经加载完成
             * onloadeddata:整个资源加载完成
             * onpause:触发了暂停
             * onplay：触发了播放
             * onplaying：正在播放中
             * 
             * 
             */
            answerBell.play();
            answerBell.volume = 0.3
        }
    }
})()
// =>开发过程中，由于当前项目板块众多（每一个板块都是一个单例）
// 我们最好规划一种机制，通过标识的判断可以让程序只执行对应板块内容，这样的话
// 我们开发哪个板块，我们就把标识改为啥，然后就可以执行啥；
let url = window.location.href;
let well = url.indexOf('#');
let hash = well === -1 ? null : url.substr(well + 1);
switch (hash) {
    case 'loading':
        loadingRender.init();
        break;
    case 'phone':
        phoneRender.init();
        break;
}