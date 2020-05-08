let symbolArray = [7, 8, 9, '/', 4, 5, 6, '*', 1, 2, 3, '=', 0, '.', '%', '+'];
let expArr = [];
let expStr;

function makeGrid(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);

    for (let i = 0; i < symbolArray.length; i++) {
        let cell = document.createElement("button");
        cell.innerHTML = symbolArray[i];
        container.appendChild(cell).className = "grid-item";
        container.appendChild(cell).id = symbolArray[i];
    };

};

makeGrid(4, 4);
//document.getElementById('displayP').textContent=1;
let divArray = document.getElementById('container').children;
for (let i of divArray) {

    /*i.addEventListener('keydown', function (event) {
        display(parseInt(event.key));
        console.log(event.key);
    });*/
    i.addEventListener('click', function () {
        display(i.getAttribute('id'));
    });

}

function splitExp() {
    let regMul = /[0-9]\*[0-9]/g;
    let regDiv = /{0-9}|\/|{0-9}/g;
    let regAdd = /{0-9}|\+|{0-9}/g;
    let regSub = /{0-9}|\-|{0-9}/g;
    if(expStr.match(regMul) != '') {
        let tempArr = expStr.match(regMul);
        alert(parseInt(tempArr[0][0])*parseInt(tempArr[0][2]));
    }
}

let count = 0;

function display(i) {
    /*if(typeof(i)=="number") {
        document.getElementById('displayP').textContent+=i;
    }*/

    document.getElementById('displayP').textContent += i;
    expArr[count] = i;
    count++;

}

function arrToStr() {
    expStr = expArr.join('');
}