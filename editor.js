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
    gridItem.textContent = i;
    gridItem.addEventListener('click', function() {
        // Add the 'clicked' class to change the color
        gridItem.classList = [boxColor];
        if (boxColor === "player"){
            player = i
            if (playerPrev != undefined){
                playerPrev.classList = ["purple"];
            }
            playerPrev = gridItem
        }
        data[i] = boxColor
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
    }
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
        body: JSON.stringify({data, player})
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

main();
