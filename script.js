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
            console.log(buttonRow)
            
        }

    });

};

const init = () => {
    rowGen(5);
    buttonGen(4);

    const calcButtons = document.querySelectorAll('.calc-button');
    const disp = document.querySelector('.num-disp');

    calcButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            let currentButton = document.querySelector(`#${buttonIdentities.find((button) =>      button.id==e.target.id).id}`)
            console.log(currentButton.textContent)


        })
    })


    disp.textContent = '';

    // seven.addEventListener('click', e => {
    //     e.preventDefault();
    //     disp.textContent += '7'
    // })



    // calcButtons.forEach((button) => {
    //     button.addEventListener('click', e => {
    //         e.preventDefault()
    //         console.log(e)
    //         console.log(e.target)
    //     })
    // })
}

init();