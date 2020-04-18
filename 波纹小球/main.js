// 获取节点
const container = document.getElementById('container');
// 准备一个盛放所有小球的数组   
const circlesArr = [];
// 一行15个
let rows = 15;
// 一列15个
let cols = 15;

for(let i = 0; i< cols; i++){
    circlesArr[i] = [];
    for(let j = 0; j< rows; j++){
        const circle = document.createElement('div');
        circle.classList.add('circle');
        container.appendChild(circle);
        circlesArr[i].push(circle);
    }
}
// console.log(circlesArr)

circlesArr.forEach((cols,i)=>{
    cols.forEach((circle,j)=>{
        circle.addEventListener("click",()=>{
            growCircle(i,j);
            console.log(i,j)
        })
    })
})
function growCircle(i,j){
    if(circlesArr[i] && circlesArr[i][j]){
        if(!circlesArr[i][j].classList.contains('grow')){
            circlesArr[i][j].classList.add('grow');
            setTimeout(()=>{
                growCircle(i-1,j)
                growCircle(i+1,j)
                growCircle(i,j-1)
                growCircle(i,j+1)
            },100);
            setTimeout(()=>{
                circlesArr[i][j].classList.remove('grow');
            },300)
        }
    }
}