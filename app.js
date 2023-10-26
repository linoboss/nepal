const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
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

            save(requestJson.data, requestJson.player, "example.json")

            // Respond to the client
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify({ok:"ok"}));
        });

    } else if(req.method == 'GET'){

        // Handling different types of requests
        if (req.url === '/') {
            // Serve the HTML file
            serveFile(res, 'editor.html', 'text/html');
        } else if (req.url.endsWith('.js')) {
            // Serve JavaScript files
            serveFile(res, req.url, 'application/javascript');
        } else if (req.url.endsWith('.css')) {
            // Serve CSS files
            serveFile(res, req.url, 'text/css');
        } else {
            // Return a 404 error for other requests
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        }
    }
});

function serveFile(res, filename, contentType) {
    const filePath = path.join(__dirname, filename);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 Internal Server Error');
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

function save(data, player, filePath){
    // The content you want to write to the file
    const content = to_json(data, player);

    // Write the content to the file
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error('Error writing to the file:', err);
        } else {
            console.log('Content has been written to the file:', filePath);
        }
    });
}
function to_json(data, player){
    let data1 = data
    let data2 = []
    console.log("aasdfasdf", data.length, typeof(data))
    for (let i=0; i < data.length; i++){
        if (i === player){
            data2.push(10);
        } else if (data[i] === 0) {
            data2.push(0);
        } else {   
            data2.push(63);
        }
    }
    return `{ "height":10,
"layers":[
       {
        "data":${JSON.stringify(data1)},
        "height":10,
        "name":"Tile Layer 1",
        "opacity":1,
        "type":"tilelayer",
        "visible":true,
        "width":10,
        "x":0,
        "y":0
       }, 
       {
        "data":${JSON.stringify(data2)},
        "height":10,
        "name":"Tile Layer 2",
        "offsetx":0,
        "offsety":-64,
        "opacity":1,
        "type":"tilelayer",
        "visible":true,
        "width":10,
        "x":0,
        "y":0
       }, 
       {
        "draworder":"topdown",
        "name":"Object Layer 1",
        "objects":[
               {
                "gid":76,
                "height":152,
                "id":44,
                "name":"",
                "rotation":0,
                "type":"",
                "visible":true,
                "width":133,
                "x":238,
                "y":118
               }, 
               {
                "gid":77,
                "height":156,
                "id":45,
                "name":"",
                "rotation":0,
                "type":"",
                "visible":true,
                "width":150,
                "x":238.5,
                "y":555.5
               }, 
               {
                "gid":19,
                "height":195,
                "id":46,
                "name":"",
                "properties":
                   {
                    "objectAnchor":"{\"x\": 1, \"y\": 0, \"z\": 5}"
                   },
                "propertytypes":
                   {
                    "objectAnchor":"string"
                   },
                "rotation":0,
                "type":"",
                "visible":true,
                "width":153,
                "x":113.5,
                "y":340.5
               }, 
               {
                "gid":78,
                "height":84,
                "id":64,
                "name":"",
                "rotation":0,
                "type":"",
                "visible":true,
                "width":97,
                "x":56.5,
                "y":111.5
               }, 
               {
                "gid":79,
                "height":33,
                "id":66,
                "name":"",
                "rotation":0,
                "type":"",
                "visible":true,
                "width":47,
                "x":213,
                "y":-49
               }, 
               {
                "gid":80,
                "height":34,
                "id":67,
                "name":"",
                "rotation":0,
                "type":"",
                "visible":true,
                "width":57,
                "x":233.5,
                "y":658.5
               }, 
               {
                "gid":81,
                "height":71,
                "id":68,
                "name":"",
                "rotation":0,
                "type":"",
                "visible":true,
                "width":115,
                "x":487.5,
                "y":258.5
               }],
        "opacity":1,
        "type":"objectgroup",
        "visible":true,
        "x":0,
        "y":0
       }, 
       {
        "draworder":"topdown",
        "name":"Object Layer 2",
        "objects":[
               {
                "gid":71,
                "height":14,
                "id":47,
                "name":"",
                "rotation":0,
                "type":"",
                "visible":true,
                "width":24,
                "x":212.5,
                "y":373.5
               }, 
               {
                "gid":74,
                "height":20,
                "id":53,
                "name":"",
                "rotation":0,
                "type":"",
                "visible":true,
                "width":44,
                "x":248,
                "y":124
               }, 
               {
                "gid":74,
                "height":20,
                "id":54,
                "name":"",
                "rotation":0,
                "type":"",
                "visible":true,
                "width":44,
                "x":241,
                "y":563
               }, 
               {
                "gid":69,
                "height":182,
                "id":55,
                "name":"",
                "rotation":0,
                "type":"",
                "visible":true,
                "width":114,
                "x":243.5,
                "y":328.5
               }, 
               {
                "gid":68,
                "height":51,
                "id":56,
                "name":"",
                "rotation":0,
                "type":"",
                "visible":true,
                "width":41,
                "x":238.5,
                "y":365.5
               }, 
               {
                "gid":73,
                "height":10,
                "id":61,
                "name":"",
                "properties":
                   {
                    "trigger":"{\"x\": 5, \"y\": -1, \"z\": 5}"
                   },
                "propertytypes":
                   {
                    "trigger":"string"
                   },
                "rotation":0,
                "type":"",
                "visible":true,
                "width":18,
                "x":252,
                "y":376
               }, 
               {
                "gid":72,
                "height":61,
                "id":62,
                "name":"",
                "rotation":0,
                "type":"",
                "visible":true,
                "width":90,
                "x":298.5,
                "y":373.5
               }],
        "offsetx":0,
        "offsety":-64,
        "opacity":1,
        "type":"objectgroup",
        "visible":true,
        "x":0,
        "y":0
       }, 
       {
        "draworder":"topdown",
        "name":"Object Layer 3",
        "objects":[
               {
                "gid":70,
                "height":90,
                "id":58,
                "name":"",
                "properties":
                   {
                    "objectAnchor":"{\"x\": 1, \"y\": -1, \"z\": 5}"
                   },
                "propertytypes":
                   {
                    "objectAnchor":"string"
                   },
                "rotation":0,
                "type":"",
                "visible":true,
                "width":55,
                "x":77.772727272727,
                "y":344.227272727273
               }, 
               {
                "gid":70,
                "height":90,
                "id":60,
                "name":"",
                "properties":
                   {
                    "objectAnchor":"{\"x\": 1, \"y\": -1, \"z\": 5}"
                   },
                "propertytypes":
                   {
                    "objectAnchor":"string"
                   },
                "rotation":0,
                "type":"",
                "visible":true,
                "width":55,
                "x":73,
                "y":261.666666666667
               }, 
               {
                "gid":75,
                "height":80,
                "id":69,
                "name":"",
                "rotation":0,
                "type":"",
                "visible":true,
                "width":80,
                "x":219.5,
                "y":540.5
               }, 
               {
                "gid":75,
                "height":80,
                "id":70,
                "name":"",
                "rotation":0,
                "type":"",
                "visible":true,
                "width":80,
                "x":227,
                "y":103
               }],
        "offsetx":0,
        "offsety":-128,
        "opacity":1,
        "type":"objectgroup",
        "visible":true,
        "x":0,
        "y":0
       }],
"nextobjectid":72,
"orientation":"isometric",
"renderorder":"right-down",
"tiledversion":"1.0.2",
"tileheight":64,
"tilesets":[
       {
        "firstgid":1,
        "source":"level1_tileset.json"
       }],
"tilewidth":128,
"type":"map",
"version":1,
"width":10
}`
}