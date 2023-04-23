const express = require("express");
const server = express();
const port = 5000;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

server.get("/", (req, res) => {
	res.send("welcom to prisma-express");
});

server.get("/users", async (req, res) => {
	// run inside `async` function
	const newUser = await prisma.user.create({
		data: {
			name: "Alice",
			email: "alice@prisma.io",
		},
	});

	const users = await prisma.user.findMany();
	res.json(users);
});

server.listen(port, () => {
	console.log("server running on http://127.0.0.1: " + port);
});
