/* var http = require('http');
var fs = require('fs');
var url = require('url');

// Create a server
http.createServer( function (request, response) {  
   // Parse the request containing file name
   var pathname = url.parse(request.url).pathname;
   
   // Print the name of the file for which request is made.
   console.log("Request for " + pathname + " received.");
   
   // Read the requested file content from file system
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         
         // HTTP Status: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      } else {	
         //Page found	  
         // HTTP Status: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});	
         
         // Write the content of the file to response body
         response.write(data.toString());		
      }
      
      // Send the response body 
      response.end();
   });   
}).listen(5501);

// Console will print the message
console.log('Server running at http://127.0.0.1:5501/'); */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");
var multer = require('multer');


// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

//
const upload = multer({ dest: '/tmp/'}); // multer configuration
// Define a middleware function that uses multer
const uploadMiddleware = upload.single('file');

app.use(uploadMiddleware);



app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
})
 

 app.get('/process_get', function (req, res) {
    // Prepare output in JSON format
    response = {
       first_name:req.query.first_name,
       last_name:req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
 })

 app.post('/process_post', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    response = {
       first_name:req.body.first_name,
       last_name:req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
 })

app.get('/', function (req, res) {
    console.log("Got a GET request for the homepage");
    res.send('Hello World GET NodeJS using Express Framework!!');
});


app.post('/', function (req, res) {
    console.log("Got a POST request for the homepage");
    res.send('Hello World POST NodeJS using Express Framework!!');
});

app.delete('/del_user', function (req, res) {
    console.log("Got a DELETE request for /del_user");
    res.send('Hello World DELETE NodeJS using Express Framework!!');
});

app.get('/get_user', function (req, res) {
    console.log("Got a GET request for /get_user");
    res.send('Page Listing GET NodeJS using Express Framework!!');
});

app.get('/ab*cd', function (req, res) {
    console.log("Got a GET request for /ab*cd");
    res.send('Page Pattern Match GET NodeJS using Express Framework!!');
});

// File Upload
app.post('/file_upload', function (req, res) {
    /* console.log(req.files.file.name);
    console.log(req.files.file.path);
    console.log(req.files.file.type); */
    var file = __dirname + "/" + req.files.file.name;
    
    fs.readFile( req.files.file.path, function (err, data) {
       fs.writeFile(file, data, function (err) {
          if( err ) {
             console.log( err );
             } else {
                response = {
                   message:'File uploaded successfully',
                   filename:req.files.file.name
                };
             }
          
          console.log( response );
          res.end( JSON.stringify( response ) );
       });
    });
})

var user = {
    "user7" : {
       "name" : "Tsanou",
       "password" : "password7",
       "profession" : "Phamacist",
       "id": 7
    }
 }
 
 app.post('/addUser', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user7"] = user["user7"];
       console.log( data );
       res.end( JSON.stringify(data));
    });
 })

app.get('/listUsers', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
    });
})

app.get('/:id', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       var users = JSON.parse( data );
       var user = users["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
    });
})

var id = 2;

app.delete('/deleteUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data["user" + 2];
       
      console.log( data );
      res.end( JSON.stringify(data));
   });
})
var server = app.listen(5502, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});