// 获取汉堡按钮
const burger = document.querySelector('.burger');
// 获取菜单组元素
const navMenu = document.querySelector('.nav-menu');
// 获取所有的小菜单
const navMenuItems = document.querySelectorAll('.nav-menu li');
burger.addEventListener('click',() =>{
    burger.classList.toggle('active');
    navMenu.classList.toggle('open');
    // 遍历每一个菜单项，判断是否有animation，有的话就去除，没有的话就删掉
    navMenuItems.forEach((item,index) => {
        if(item.style.animation){
            item.style.animation = ""
        }else {
            item.style.animation = `0.3s ease-in slideIn forwards ${index * 0.1 + 0.3}s`   
        }
    }) 
})

