const express = require("express");
const server = express();
const port = 5000;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB
server.set("json spaces", 3);

server.get("/", (req, res) => {
	res.send("welcom to prisma-express");
});

server.get("/users/create", async (req, res) => {
	await prisma.user.create({
		data: {
			name: "Rich",
			email: parseInt(Math.random() * 10000) + "hello@prisma.com",
			posts: {
				create: {
					title: "My first post",
					body: "Lots of really interesting stuff",
					slug: "my-first-post",
				},
			},
		},
	});

	res.json("data created");
});

server.get("/users", async (req, res) => {
	// run inside `async` function
	const allUsers = await prisma.user.findMany({
		include: {
			posts: true,
		},
	});
	res.json(allUsers);
});

server.get("/users/:id", async (req, res) => {
	// run inside `async` function
	const user = await prisma.user.findUnique({
		where: {
			id: req.params.id,
		},
		select: {
			id: true,
			email: true,
			name: true,
            posts: true,
		},
		// include: {
		// 	posts: true,
		// },
	});
	res.json(user);
});
server.get("/users/edit/:id", async (req, res) => {
	const updateUser = await prisma.user.update({
		where: {
			id: req.params.id,
		},
		data: {
			name: parseInt(Math.random() * 10000) + "Viola the Magnificent",
		},
	});
	res.json(updateUser);
});
server.get("/users/delete/:id", async (req, res) => {
	const deleteUser = await prisma.user.delete({
		where: {
			id: req.params.id,
		},
	});
	res.json(deleteUser);
});

prisma
	.$connect()
	.then(() => {
		console.log("db connected");
		server.listen(port, () => {
			console.log("server running on http://127.0.0.1:" + port);
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
