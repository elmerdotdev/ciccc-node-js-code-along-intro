import http from 'http' // Import HTTP module
import dotenv from 'dotenv' // Import dotenv package
dotenv.config() // Reads .env file

const server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
  // Home route
  if (request.url === "/") {
    console.log("Someone is visiting home route...")
    response.writeHead(200, { "Content-Type": "text/html" })
    response.end("<h1>Welcome to my server!</h1>")
    return;
  }
})

const PORT = process.env.BACKEND_PORT || 3000
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})