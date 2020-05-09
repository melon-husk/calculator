let symbolArray = [7, 8, 9, '/', 4, 5, 6, '*', 1, 2, 3, '-', 0, '.', '=', '+'];
let expArr = [];
let expStr;
let count = 0;
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

function splitExp(expStr) {
    let tempStr;
    let regMulDiv = /[0-9]+\.?[0-9]*[\*\/][+-]?[0-9]+\.?[0-9]*/g;
    let regAddSub = /-?[0-9]+\.?[0-9]*[\+\-][+-]?[0-9]+\.?[0-9]*/g;
    let mulBrek = /\*/g;
    let addBrek = /\+/g;
    while (tempStr = expStr.match(regMulDiv)) {
        expStr = (tempStr[0].match(mulBrek)) ? (expStr.replace(tempStr[0], mul(tempStr[0]))) : expStr.replace(tempStr[0], divi(tempStr[0]));
    }
    while (tempStr = expStr.match(regAddSub)) {
        expStr = tempStr[0].match(addBrek) ? expStr.replace(tempStr[0], add(tempStr[0])) :expStr.replace(tempStr[0],subs(tempStr[0]));
    }
    //console.log(expStr);
    document.getElementById('displayP').textContent = expStr;
}


function add(arr, t) {
    t = arr.split('+');
    let sum = Number(t[0]) + Number(t[1]);
    return sum;
}

function subs(arr, t) {
    t = arr.split('-');
    return parseInt(t[0]) - parseInt(t[1]);
}

function mul(arr, t) {
    t = arr.split('*');
    return parseInt(t[0]) * parseInt(t[1]);
}

function divi(arr, t) {
    t = arr.split('/');
    return parseInt(t[0]) / parseInt(t[1]);
}
let state = 0;
function display(i) {
    /*if(typeof(i)=="number") {
        document.getElementById('displayP').textContent+=i;
    }*/
    
    if(i != '=') {
        if(state == 1) {
            document.getElementById('displayP').textContent = '';
            state = 0;
        }
        document.getElementById('displayP').textContent += i;
        expArr[count] = i;
        count++;
    }
    else {
        arrToStr();
        state = 1;
    }
    

}

function arrToStr() {
    expStr = expArr.join('');
    splitExp(expStr);
}