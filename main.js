let symbolArray = [7, 8, 9, '/', 4, 5, 6, '*', 1, 2, 3, '-', 0, '.', '=', '+'];
let expArr = [];
let expStr;
let count = 0;
let state = 0;

function makeGrid(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);

    for (let i = 0; i < symbolArray.length; i++) {
        let cell = document.createElement("div");
        cell.innerHTML = symbolArray[i];
        container.appendChild(cell).className = "grid-item";
        container.appendChild(cell).id = symbolArray[i];
    };

};

makeGrid(4, 4);
//document.getElementById('displayP').textContent=1;
let con = document.addEventListener('keydown', function(event) {
    if (event.key == 'Enter' || event.key == '=') {
        display('=');
        console.log("inside enter")
        console.log(event.key);
        //console.log("sending ${event.key}");
    } else if (event.key.match(/[0-9]|[\+\-\/\*\.]/g)) {
        display(String(event.key));
        console.log("inside num");
        console.log(event.key);
    } else if(event.key == 'Backspace') {
        display('b');
    }
    
});
let divArray = document.getElementById('container').children;
for (let i of divArray) {

    /*i.addEventListener('keydown', function (event) {
        if (event.key == 'Enter' || event.key == '=') {
            display('=');
            console.log("inside enter")
            console.log(event.key);
            //console.log("sending ${event.key}");
        } else if (event.key.match(/[0-9]|[\+\-\/\*]/g)) {
            display(String(event.key));
            console.log("inside num");
            console.log(event.key);
        }

    });*/
    i.addEventListener('click', function () {
        display(i.getAttribute('id'));
        console.log(i.getAttribute('id'));
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
        expStr = tempStr[0].match(addBrek) ? expStr.replace(tempStr[0], add(tempStr[0])) : expStr.replace(tempStr[0], subs(tempStr[0]));
    }
    //console.log(expStr);
    document.getElementById('displayP').textContent = expStr;
    expStr = '';
    expArr = [];
}


function add(arr, t) {
    if(t=arr.match(/^\+*/g,'')) {
        arr=arr.replace(/^\+*/g,'');
    }                                      
    t=arr.split('+');
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

function display(i) {
    if(i=='b') {
        if(expArr.length != 0) {
            expArr.pop();
            let s= document.getElementById('displayP');
            s.textContent = s.textContent.substring(0,s.textContent.length-1);
            count--;
        }
    }
    else if (i != '=') {
        if (state == 1) {
            document.getElementById('displayP').textContent = '';
            state = 0;
        }
        if (document.getElementById('displayP').innerHTML == "Enter Expression") {
            document.getElementById('displayP').textContent = '';
        }
        
        document.getElementById('displayP').textContent += i;
        expArr[count] = i;
        count++;
    }
    else if(i == '=') {
        arrToStr();
        state = 1;
    }


}

function arrToStr() {

    expStr = expArr.join('');
    splitExp(expStr);
    expArr = [];
}
function backspace(str) {
    str.subString(0,str.length-1);

}