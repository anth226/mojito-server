import express from "express";
import bodyParser from "body-parser";
import database from "./config/db";
import userController from "./controllers/user-controllers";
import userRouter from "./routers/user-router";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// API endpoints
app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/users", userRouter);

// Connect to MongoDB
database.connect();

// Connect to RabbitMQ
// rabbitmq.connect();

// Start server
app.listen(PORT, () => console.log(`Data server listening on port ${PORT}`));
