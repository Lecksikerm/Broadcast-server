#!/usr/bin/env node

const { Command } = require("commander");
const program = new Command();

program
    .name("broadcast-server")
    .description("CLI for broadcast server")
    .version("1.0.0");

// START SERVER
program
    .command("start")
    .description("Start the broadcast server")
    .option("-p, --port <number>", "port to run server on", "3000")
    .action((options) => {
        const port = parseInt(options.port);
        require("./server")(port);
    });

// CONNECT CLIENT
program
    .command("connect")
    .description("Connect to broadcast server")
    .option("-p, --port <number>", "port to connect to", "3000")
    .action((options) => {
        const port = parseInt(options.port);
        require("./client")(port);
    });

program.parse(process.argv);