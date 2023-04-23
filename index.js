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
	await prisma.user.create({
		data: {
			name: "Rich",
			email: "hello@prisma.com",
			posts: {
				create: {
					title: "My first post",
					body: "Lots of really interesting stuff",
					slug: "my-first-post",
				},
			},
		},
	});

	const allUsers = await prisma.user.findMany({
		include: {
			posts: true,
		},
	});
	res.json(allUsers);
});

prisma
	.$connect()
	.then(() => {
		server.listen(port, () => {
			console.log("server running on http://127.0.0.1: " + port);
		});
	})
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
