require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

const posts = [
	{
		username: "Fenix",
		postTitle: "Gears of War",
		postDetail:
			"Gears of War is a third-person shooter video game created by Epic Games. It is compatible for the Xbox 360 and is rated M in the USA, 18 in the UK and MA15+ in Australia. It's platforms included the Xbox 360 console and the PC and sold over 3 million copies since it's release on November 7, 2006. ",
	},
	{
		username: "Dom",
		title: "Gears of War 2",
		postDetail:
			"Gears of War 2 is a tactical, third-person, over the shoulder, shooter video game developed by Epic Games and published by Microsoft Game Studios exclusively for the Xbox 360. It is the sequel to the critically acclaimed best-seller Gears of War and the predecessor to Gears of War 3. It was announced by lead designer Cliff Bleszinski during the 2008 Game Developers Conference on February 20, 2008. It was released on November 7, 2008 and uses an updated version of the Unreal Engine 3",
	},
];

app.get("/posts", authenticateToken, (req, res) => {
	res.json(posts.filter((post) => post.username === req.user.name));
});

function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (token == null) return res.sendStatus(401);

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		console.log(err);
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
}

app.listen(3000);
