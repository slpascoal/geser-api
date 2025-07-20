import { ExpressAuth } from "@auth/express"
import express from "express"
import { authConfig } from "../config/auth";
 
const app = express.Router()
 
app.use("/auth", ExpressAuth(authConfig));

export default app;