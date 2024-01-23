const buttonContainer = document.querySelector('.calc-bottom');
const numDisp = document.querySelector('.num-disp');





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
            newButton.textContent = '='
            buttonRow.appendChild(newButton);
            console.log(buttonRow)
            
        }

    });

};

rowGen(5);
buttonGen(4);