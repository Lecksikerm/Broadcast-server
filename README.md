# 📡 Broadcast Server (WebSocket CLI App)

A simple real-time broadcast server built with **Node.js, Express, and WebSockets**.
This application allows multiple clients to connect and exchange messages instantly via a CLI interface.

---

## 🚀 Features

* 🔌 WebSocket-based real-time communication
* 👥 Multiple client support
* 📢 Broadcast messages to all connected clients
* 🧑 Username support
* 🕒 Message timestamps
* 🔔 Join and leave notifications
* 🧪 CLI-based interaction
* 🛡️ Error handling and graceful shutdown

---

## 🛠️ Tech Stack

* Node.js
* Express
* ws (WebSocket library)
* Commander (CLI tool)

---

## 📦 Installation

Clone the repository:

```bash
git clone <your-repo-url>
cd broadcast-server
```

Install dependencies:

```bash
npm install
```

(Optional) Link CLI globally:

```bash
npm link
```

---

## ▶️ Usage

### Start the server

```bash
broadcast-server start
```

or (without CLI):

```bash
node src/server.js
```

---

### Connect as a client

```bash
broadcast-server connect
```

or:

```bash
node src/client.js
```

---

## 💬 Example Output

```text
🚀 Server running on http://localhost:3000

Client 1:
Enter your username: John
[10:42:15 AM] 🔔 John joined

Client 2:
Enter your username: Mary
[10:42:18 AM] 🔔 Mary joined

[10:42:22 AM] [John]: Hello everyone
[10:42:25 AM] [Mary]: Hi John!

[10:43:01 AM] ❌ John left
```

---

## 🧪 Testing

To test the application:

1. Start the server:

   ```bash
   node src/server.js
   ```

2. Open multiple terminals and run:

   ```bash
   node src/client.js
   ```

3. Send messages from one client and confirm:

   * All clients receive the message
   * Join/leave notifications appear
   * Server does not crash

---

## 📁 Project Structure

```
broadcast-server/
├── src/
│   ├── server.js
│   ├── client.js
│   └── cli.js
├── package.json
└── README.md
```

---

## ⚠️ Error Handling

* Invalid JSON messages are safely ignored
* Unknown message types are logged
* Client disconnections are handled gracefully
* Server shuts down cleanly on `Ctrl + C`

---

## 🎯 Learning Goals

This project demonstrates:

* WebSocket communication
* Real-time data broadcasting
* CLI application development
* Event-driven architecture
* Handling multiple client connections

---

## 🚀 Future Improvements

* Message history (store last messages)
* Chat rooms (channels)
* Private messaging
* Authentication
* Web-based UI

---

## 📄 License

This project is open-source and available for learning purposes.

---

## 🙌 Acknowledgment

Built as part of a backend learning project to understand real-time systems and WebSocket communication.
