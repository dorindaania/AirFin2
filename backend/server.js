import express from "express";
import bodyParser from 'body-parser';
import webhookRoutes from'./webhooks/clerk';
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import accountRoutes from "./routes/accounts.js";
import transactionRoutes from "./routes/transactions.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

app.use('/webhooks', webhookRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/transactions", transactionRoutes);

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})