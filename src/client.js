const WebSocket = require("ws");
const readline = require("readline");

// Format timestamp
function formatTime(isoTime) {
    if (!isoTime) return "";
    const date = new Date(isoTime);
    return date.toLocaleTimeString();
}

function startClient(PORT = 3000) {
    const ws = new WebSocket(`ws://localhost:${PORT}`);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let username = "";

    ws.on("open", () => {
        console.log("✅ Connected to server");

        rl.question("Enter your username: ", (name) => {
            username = name.trim();

            if (!username) {
                console.log("❌ Username cannot be empty");
                process.exit(1);
            }

            ws.send(JSON.stringify({
                type: "join",
                user: username
            }));

            console.log(`Connected as ${username}`);
            console.log("Type messages:\n");

            rl.on("line", (input) => {
                if (!input.trim()) return;

                ws.send(JSON.stringify({
                    type: "message",
                    message: input
                }));
            });
        });
    });

    ws.on("message", (data) => {
        try {
            const parsed = JSON.parse(data.toString());
            const time = formatTime(parsed.timestamp);

            if (!parsed.type) {
                console.log("⚠️ Invalid message format");
                return;
            }

            if (parsed.type === "join") {
                console.log(`[${time}] 🔔 ${parsed.user} joined`);
            } else if (parsed.type === "leave") {
                console.log(`[${time}] ❌ ${parsed.user} left`);
            } else if (parsed.type === "message") {
                console.log(`[${time}] [${parsed.user}]: ${parsed.message}`);
            } else {
                console.log("⚠️ Unknown message type");
            }

        } catch (err) {
            console.log("⚠️ Invalid message received");
        }
    });

    ws.on("close", () => {
        console.log("❌ Disconnected from server");
        process.exit(0);
    });

    ws.on("error", (err) => {
        console.log("❌ Connection error:", err.message);
    });

   
    process.on("SIGINT", () => {
        console.log("\nDisconnecting...");
        ws.close();
        process.exit(0);
    });
}

module.exports = startClient;

if (require.main === module) {
    startClient(3000);
}