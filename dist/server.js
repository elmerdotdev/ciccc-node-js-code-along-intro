"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http")); // Import HTTP module
const dotenv_1 = __importDefault(require("dotenv")); // Import dotenv package
dotenv_1.default.config(); // Reads .env file
const server = http_1.default.createServer((request, response) => {
    // Home route
    if (request.url === "/") {
        console.log("Someone is visiting home route...");
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end("<h1>Welcome to my server!</h1>");
        return;
    }
});
const PORT = process.env.BACKEND_PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
