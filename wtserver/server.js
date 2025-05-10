const http = require('http');
const querystring = require('querystring');

const PORT = 3000;

const renderForm = () => `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f0f2f5;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        form {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 300px;
        }
        input[type="text"],
        input[type="number"],
        input[type="date"] {
          width: 100%;
          padding: 8px;
          margin: 5px 0 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        input[type="submit"] {
          background-color: #4CAF50;
          color: white;
          padding: 10px;
          width: 100%;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        input[type="submit"]:hover {
          background-color: #45a049;
        }
      </style>
    </head>
    <body>
      <form action="/submit" method="Post">
        Name: <input type="text" name="name" required><br><br>
        Age: <input type="number" name="age" required><br><br>
        DOB: <input type="date" name="dob" required><br><br>
        Address: <input type="text" name="address" required><br><br>
        Pincode: <input type="text" name="pincode" required><br><br>
        Mobile No: <input type="text" name="mobile" required><br><br>
        <input type="submit" value="Submit">
      </form>
    </body>
  </html>
`;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(renderForm());

  } else if (req.method === 'POST' && req.url === '/submit') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const data = querystring.parse(body);

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f0f2f5;
                padding: 20px;
              }
              .container {
                background: white;
                padding: 20px;
                border-radius: 10px;
                max-width: 400px;
                margin: auto;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              a {
                display: inline-block;
                margin-top: 15px;
                color: #4CAF50;
                text-decoration: none;
              }
              a:hover {
                text-decoration: underline;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Submitted Details:</h2>
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Age:</strong> ${data.age}</p>
              <p><strong>DOB:</strong> ${data.dob}</p>
              <p><strong>Address:</strong> ${data.address}</p>
              <p><strong>Pincode:</strong> ${data.pincode}</p>
              <p><strong>Mobile No:</strong> ${data.mobile}</p>
              <a href="/">Go Back</a>
            </div>
          </body>
        </html>
      `);
    });

  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('IT IS A GET METHOD');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
