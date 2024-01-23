const buttonContainer = document.querySelector('.calc-bottom');
const numDisp = document.querySelector('.num-disp');

let buttonIdIndex = 0;
const buttonIdentities = [
    {'text': 'C', 'id': 'button-clear'},
    {'text': '()', 'id': 'button-parenthesis'},
    {'text': '%', 'id': 'button-percentage'},
    {'text': '/', 'id': 'button-division'},
    {'text': '7', 'id': 'button-7'},
    {'text': '8', 'id': 'button-8'},
    {'text': '9', 'id': 'button-9'},
    {'text': 'X', 'id': 'button-multiply'},
    {'text': '4', 'id': 'button-4'},
    {'text': '5', 'id': 'button-5'},
    {'text': '6', 'id': 'button-6'},
    {'text': '-', 'id': 'button-minus'},
    {'text': '1', 'id': 'button-1'},
    {'text': '2', 'id': 'button-2'},
    {'text': '3', 'id': 'button-3'},
    {'text': '+', 'id': 'button-plus'},
    {'text': '+/-', 'id': 'button-change-sign'},
    {'text': '0', 'id': 'button-0'},
    {'text': '.', 'id': 'button-decimal'},
    {'text': '=', 'id': 'button-equal'}
]

const operationsObj = {
    '()': '',
    '%' : function (num1) {return num1/100},
    '/' : function (num1,num2) {return num1/num2},
    'X' : function (num1,num2) {return num1/num2},
    '-' : function (num1,num2) {return num1 - num2},
    '+' : function (num1,num2) {return num1 + num2},
}



const rowGen = (rowCount) => {
    for (let i=0; i<rowCount; i++) {
        const buttonRow = document.createElement('div');
        buttonRow.classList.add('button-row');
        buttonContainer.appendChild(buttonRow);
    };
};

// Remember: Must run rowGen() first
const buttonGen = (buttonCount, classType='calc-button') => {
    const buttonRows = document.querySelectorAll('.button-row');
    buttonRows.forEach((buttonRow, row) => {
        for (let i=0; i<buttonCount; i++) {
            const newButton = document.createElement('button');
            // Special Case for styling top row:
            if (row == 0) newButton.classList.add('calc-button-top-row');
            // Special Case for styling last column:
            if (i == buttonCount-1) newButton.classList.add('calc-button-last-col');
            newButton.classList.add(classType);           
            newButton.textContent = buttonIdentities[buttonIdIndex].text;
            newButton.id = buttonIdentities[buttonIdIndex].id;
            buttonIdIndex ++;
            buttonRow.appendChild(newButton);            
        }

    });

};

const init = () => {
    rowGen(5);
    buttonGen(4);
    let num1 = 'empty';
    let num2 = 'empty';
    let operation = 'empty';
    let total = 'empty';

    const calcButtons = document.querySelectorAll('.calc-button');
    const disp = document.querySelector('.num-disp');

    // Clear Screen
    const cls = (complete=0, display=1) => {

        if (display) {
            disp.textContent = '';
        }

        if (complete==1) {
            num1 = 'empty';
            num2 = 'empty';
            operation = 'empty';
        }

    }

    cls();    

    calcButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            
            let currentButton = document.querySelector(`#${buttonIdentities.find((button) =>      button.id==e.target.id).id}`)

            console.log(currentButton.textContent)

            // Check if number:
            const isNumber = (testNum) => (Number(testNum)-9999999999) ?  true : false;
            // Is screen clear
            const screenClear = () => disp.textContent === ''? true : false;
            // Is there a operator?
            const operatorCheck = () => {
                if (disp.textContent == '/' || disp.textContent == 'X' || disp.textContent == '-' || disp.textContent == '+') {return true}
                return false; 
            };
            // Is currentbutton '='
            const equals = () => currentButton.textContent == '='? true: false;

            // Is current button an operator
            const isOperator = () => {
                if (currentButton.textContent == '/' || currentButton.textContent == 'X' || currentButton.textContent == '-' || currentButton.textContent == '+') {return true};
                return false;
            }

            // Conditions to manipulate screen
            if (currentButton.textContent == 'C') {cls(1); console.log(num1)} 
            if (isNumber(currentButton.textContent) && isNumber(disp.textContent) &&!screenClear()) disp.textContent += currentButton.textContent;
            if (screenClear() && isNumber(currentButton.textContent)) disp.textContent += currentButton.textContent;

            if (!operatorCheck() && isOperator() && isNumber(disp.textContent) && !isNumber(num1)) {
                num1 = disp.textContent;
                operation = currentButton.textContent;
                cls();

                disp.textContent = currentButton.textContent;
            }
            if (operatorCheck() && isNumber(currentButton.textContent)) {
                cls();
                disp.textContent += currentButton.textContent;
            }
            
            if (!operatorCheck() && !(num1 === 'empty') && equals()) {
                num2 = disp.textContent;
                cls();
                total = Math.round(operationsObj[`${operation}`](Number(num1),Number(num2))*1000000000000)/1000000000000;

                disp.textContent = total;
                cls(1,0);

            }

            
        })
    })




    

}

init();