"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http")); // Import HTTP module
const dotenv_1 = __importDefault(require("dotenv")); // Import dotenv package
dotenv_1.default.config(); // Reads .env file
const todos = [
    { id: 1, task: "Wash dishes", isCompleted: false },
    { id: 2, task: "Feed chicken", isCompleted: false }
];
const server = http_1.default.createServer((request, response) => {
    var _a, _b;
    const { url, method } = request;
    // Home route
    if (url === "/" && method === "GET") {
        console.log("Someone is visiting home route...");
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end("<h1>Welcome to my server!</h1>");
        return;
    }
    // About Us route
    if (url === "/about-us" && method === "GET") {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end("<h1>About page</h1>");
        return;
    }
    // Admin-only
    if (request.url === "/admin") {
        response.writeHead(403, { "Content-Type": "text/plain" });
        response.end("You are not allowed to visit this page!");
        return;
    }
    // Checkout
    if (request.url === "/checkout") {
        response.writeHead(402, { "Content-Type": "text/html" });
        response.end(`<h1>Checkout failed. Need money!</h1>`);
        return;
    }
    // Get todos route
    if (request.url === "/api/todos" && request.method === "GET") {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(todos));
        return;
    }
    // Get todo by id (/api/todos/item/2)
    if (((_a = request.url) === null || _a === void 0 ? void 0 : _a.startsWith("/api/todos/item")) && request.method === "GET") {
        const id = parseInt(request.url.split("/")[4]);
        const todo = todos.find(todo => todo.id === id);
        if (!todo) {
            response.writeHead(404, { "Content-Type": "text/plain" });
            response.end("Todo not found!");
            return;
        }
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(todo));
        return;
    }
    // Add todos route
    if (request.url === "/api/todos" && request.method === "POST") {
        let body = "";
        request.on("data", (chunk) => {
            body += chunk.toString();
        });
        console.log(body);
        request.on("end", () => {
            try {
                const { task } = JSON.parse(body);
                if (!task)
                    throw new Error("Task is required");
                const newTodo = { id: todos.length + 1, task, isCompleted: false };
                todos.push(newTodo); // Add newTodo to todos list
                response.writeHead(201, { "Content-Type": "application/json" });
                response.end(JSON.stringify(newTodo));
            }
            catch (error) {
                response.writeHead(500, { "Content-Type": "text/plain" });
                response.end("Something went wrong :(");
            }
        });
        return;
    }
    // Delete todo route
    if (((_b = request.url) === null || _b === void 0 ? void 0 : _b.startsWith("/api/todos")) && request.method === "DELETE") {
        const id = parseInt(request.url.split("/")[3]);
        const findIndex = todos.findIndex(todo => todo.id === id);
        if (findIndex !== -1) {
            todos.splice(findIndex, 1);
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.end("Todo deleted successfully!");
            return;
        }
        else {
            response.writeHead(404, { "Content-Type": "text/plain" });
            response.end("Todo not found :(");
            return;
        }
    }
    // 404 Fallback
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("Page not found");
    return;
});
const PORT = process.env.BACKEND_PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
