// Create web server
// 1. Create a web server
// 2. Create a route for the home page
// 3. Create a route for the comments page
// 4. Create a route for the submit page
// 5. Create a route for the about page
// 6. Create a route for the contact page
// 7. Create a route for the 404 page
// 8. Create a route for the 500 page
// 9. Start the web server

// 1. Create a web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(`Request for ${req.url} by method ${req.method}`);

  // 2. Create a route for the home page
  if (req.method === 'GET') {
    let fileUrl = req.url;
    if (fileUrl === '/') {
      fileUrl = '/home';
    }
    const filePath = path.resolve('./public' + fileUrl + '.html');
    const fileExt = path.extname(filePath);
    if (fileExt === '.html') {
      fs.access(filePath, err => {
        if (err) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
          return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream(filePath).pipe(res);
      });
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end(`<html><body><h1>Error 404: ${fileUrl} not an HTML file</h1></body></html>`);
    }
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
  }
});

// 9. Start the web server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});