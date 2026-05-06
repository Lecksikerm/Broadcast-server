const express = require("express");
const http = require("http");
const WebSocket = require("ws");

module.exports = function startServer(PORT = 3000) {
    const app = express();

    app.get("/", (req, res) => {
        res.send("Broadcast server is running");
    });

    const server = http.createServer(app);
    const wss = new WebSocket.Server({ server });

    const clients = new Set();

    function getTimestamp() {
        return new Date().toISOString();
    }

    function broadcast(data) {
        const message = JSON.stringify(data);

        clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }

    // ✅ WebSocket server error handling
    wss.on("error", (err) => {
        console.error("❌ WebSocket server error:", err.message);
    });

    wss.on("connection", (ws) => {
        console.log("New client connected");
        clients.add(ws);

        ws.on("message", (data) => {
            let parsed;

            try {
                parsed = JSON.parse(data.toString());
            } catch (err) {
                console.log("⚠️ Invalid JSON received");
                return;
            }

            if (!parsed.type) {
                console.log("⚠️ Missing message type");
                return;
            }

            // JOIN
            if (parsed.type === "join") {
                ws.username = parsed.user;

                broadcast({
                    type: "join",
                    user: ws.username,
                    timestamp: getTimestamp()
                });
            }

            // MESSAGE
            else if (parsed.type === "message") {
                if (!ws.username) return;

                broadcast({
                    type: "message",
                    user: ws.username,
                    message: parsed.message,
                    timestamp: getTimestamp()
                });
            }

            else {
                console.log("⚠️ Unknown message type:", parsed.type);
            }
        });

        ws.on("close", () => {
            console.log("Client disconnected");

            if (ws.username) {
                broadcast({
                    type: "leave",
                    user: ws.username,
                    timestamp: getTimestamp()
                });
            }

            clients.delete(ws);
        });

        ws.on("error", (err) => {
            console.log("⚠️ Client error:", err.message);
            clients.delete(ws);
        });
    });

    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });

    process.on("SIGINT", () => {
        console.log("\nShutting down server...");
        server.close(() => {
            process.exit(0);
        });
    });
};

if (require.main === module) {
    module.exports(3000);
}