var boxColor = "purple";
var data = [];
var playerPrev = undefined;
var player = undefined;

function main(){// Get the grid container element
var gridContainer = document.querySelector('.grid-container');

// Create and insert 100 grid items into the container
for (let i = 0; i < 100; i++) {
    let gridItem = document.createElement('div');
    gridItem.className = 'grid-item';
    gridContainer.appendChild(gridItem);
    gridItem.textContent = "";
    gridItem.addEventListener('click', function() {
        // Add the 'clicked' class to change the color
        gridItem.classList = [boxColor];
        if (boxColor === "player"){
            
            if (playerPrev != undefined && gridItem != player){
                playerPrev.classList = ["purple"];
            }
            player = gridItem
            data[i] = boxColor
            playerPrev = gridItem
        } else if (boxColor === "clear") {
            data[i] = 0
            gridItem.classList = [];
            gridItem.classList.add("grid-item")
        } else {
            data[i] = boxColor
        }
    });
    data.push(0)
}
}

function dropdownBtnClick(btn){
    switch(btn){
        case "player":
            boxColor = "player";
            break;
        case "purple":
            boxColor = "purple";
            break;
        case "green":
            boxColor = "green";
            break;
        case "clear":
            boxColor = "clear";
            break;
    }
}

function prepareData(){
    let data1 = [];
    let data2 = [];
    for (let i=0; i < data.length; i++){
        const v = data[i];
        if (v === "player"){
            data1.push(25);
            data2.push(10);
        } else if (data[i] === 0) {
            data1.push(0);
            data2.push(0);
        } else if (v === 'green') {   
            data1.push(25);
            data2.push(0);
        } else {
            data1.push(25);
            data2.push(67);
        }
    }
    return { data1, data2 }
}

function generateBtnClick(){
    // Make the POST request using the fetch API
    // Define the URL of the API or endpoint you want to send the POST request to
    const apiUrl = '/';

    // Data to be sent in the request (replace with your own data)

    // Define the request headers, including the method as 'POST' and the content type
    const headers = {
        'Content-Type': 'application/json', // Adjust the content type as needed
    };
    // Create the request options
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(prepareData())
    };
    fetch(apiUrl, requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response data as JSON
    })
    .then(data => {
        // Handle the response data here
        console.log('POST request successful', data);
    })
    .catch(error => {
        // Handle errors, such as network errors or server issues
        console.error('POST request failed', error);
    });
}

const buttons = document.querySelectorAll('.button');

buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        if (button.id === "playerbtn"){
            button.classList.add("button", "black-button");
        } else if (button.id === "purplebtn") {
            button.classList.add("button", "purple-button");
        } else if (button.id === "greenbtn") {
            button.classList.add("button", "green-button");
        } else if (button.id === "clearbtn") {
            button.classList.add("button", "white-button")
        }
    });

    button.addEventListener('mouseleave', () => {
        if (button.classList.contains("clicked")) return;
        button.classList = []
        button.classList.add("button", "white-button");
    });

    button.addEventListener('click', () => {
        buttons.forEach(btn => {
            if (btn !== button) {
                btn.classList = []
                btn.classList.add('button', 'white-button');
            } else {
                btn.classList.add("clicked")
            }
        });
        if (button.id === "playerbtn"){
            boxColor = "player"
        } else if (button.id === "purplebtn") {
            boxColor = "purple"
        } else if (button.id === "greenbtn") {
            boxColor = "green"
        } else if (button.id === "clearbtn") {
            boxColor = "clear"
        }
    });
});
main();
