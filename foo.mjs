/*
create a class that represents a web server
calling methods on that class will add paths ... maps to functions
class request
http://localhost:3000/ramen.html ---><h1>ramen</h1>
http://localhost:3000/waffles.html ---><h1>waffles</h1>
add stylesheet
http://localhost:3000/styles.css ---> h1 {color: blue;}
*/
import {createServer} from 'net' // allows tcp/ip servers and clients
import { readFile } from 'fs'

class Request {
  constructor(s)  {
    const [method, path, version, ...other] = s.split(' ')
    this.path = path
    this.method = method
  }
}

const STATUS_CODES = {
  404: 'Not Found',
  200: 'OK'
}

class Response {
  constructor(sock, statusCode=200, contentType='text/html') {
    this.sock = sock
    this.statusCode = statusCode
    this.contentType = contentType
  }

  send(body) {
    const statusLine = `HTTP/1.1 ${this.statusCode} ${STATUS_CODES[this.statusCode]}`
    const headers = `Content-Type: ${this.contentType}`
    this.sock.write(statusLine + '\r\n' + headers + '\r\n\r\n')
    this.sock.write(body)
    this.sock.end()
  }
}

class App {
  constructor() {
    // hold tcp ip server as attribute on instance
    // keep reference to this as instance
    this.server = createServer(sock => this.handleConnect(sock))

    // keep our routes in a mapping: object or map
    // keys are paths
    // values are functions to call
    this.routes = {}
  }

  handleData(sock, data) {
    const req = new Request(data + '')
    const res = new Response(sock)
    // if path is supported in our routes object
    if(Object.hasOwn(this.routes, req.path)) {
      // call callback function
      this.routes[req.path](req, res)
    } else {
      res.statusCode = 404
      res.send('not found')
    }
  }

  handleConnect(sock) {
    console.log('connected')
    sock.on('data', data => this.handleData(sock, data))
  }

  get(path, routeHandler) {
    this.routes[path] = routeHandler
  }


  listen(port, host) {
    this.server.listen(port, host)
  }
}

const cssFilePath = process.argv[2]
if (cssFilePath === undefined) {
    const app = new App()
    app.get('/pancake.html', (req, res) => {
        const html = "<h1>pancakes ftw</h1>"
        res.send(html)
    })
    app.get('/muffin.html', (req, res) => {
        const html = "<h1>muffins ftw</h1>"
    res.send(html)
    })
    
    app.listen(3000, '0.0.0.0')
} else {
    readFile(cssFilePath, "utf-8", (err, data) => {
        if (err) {
            console.log("error trying to open data")
        } else {
            const cssFileData = data
            const app = new App()
            app.get('/pancake.html', (req, res) => {
                const html = `
                <html>
                    <head>
                    <link rel="stylesheet" type="text/css" href="/style.css">
                    </head>
                    <body>
                    <h1>pancakes ftw</h1>
                    </body>
                </html>
                `
                res.send(html)
            })
            app.get('/muffin.html', (req, res) => {
                const html = `
                    <html>
                    <head>
                        <link rel="stylesheet" type="text/css" href="/style.css">
                    </head>
                    <body>
                        <h1>muffins ftw</h1>
                    </body>
                    </html>
                `
            res.send(html)
            })

            app.get('/style.css', (req, res) => {
                res.contentType = 'text/css'
                res.send(cssFileData)
            })
            
            app.listen(3000, '0.0.0.0')
        }
    })
}