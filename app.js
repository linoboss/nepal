const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

const server = http.createServer((req, res) => {
    const contentTypeMap = {
        ".json": "application/json",
        ".js": "application/javascript",

    }
    if (req.method === 'POST') {
        // Event handler for receiving data
        let requestData = '';
        req.on('data', (data) => {
            requestData += data;
        });

        // Event handler for the end of the request
        req.on('end', () => {
            // Here, you can process the received data
            console.log('Received POST data:', requestData);

            let requestJson = JSON.parse(requestData)

            save(requestJson, "example.json")

            // Respond to the client
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify({ok:"ok"}));
        });

    } else if(req.method == 'GET'){
        serveFile(res, req.url.replace(/\?.*/g, ''), mime.getType(req.url));
    }
});

function serveFile(res, filename, contentType) {
    const filePath = path.join(__dirname, filename);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end(err.toString());
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

const port = process.env.PORT || 3000; // Use the provided PORT or default to 3000
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

function save(data, filePath){
    // The content you want to write to the file
    const content = to_json(data);

    // Write the content to the file
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error('Error writing to the file:', err);
        } else {
            console.log('Content has been written to the file:', filePath);
        }
    });
}

function to_json(data){
    let data1 = data.data1
    let data2 = data.data2

    const jsonContent = JSON.parse(fs.readFileSync('template.json').toString());
    const i1 = jsonContent.layers.findIndex(({ type }) => "tilelayer" === type);
    const i2 = jsonContent.layers.findIndex(({ type }, i) => "tilelayer" === type && i > i1);
    jsonContent.layers[i1].data = data1;
    jsonContent.layers[i2].data = data2;
    return JSON.stringify(jsonContent);
}