import express from "express";
import dotenv from "dotenv";
import { ConnectDb } from "./Database/ConnectDB.js";
import UserRouter from "./Routes/UserRout.js";
import PostRouter from "./Routes/PostRout.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import cloudinary from "cloudinary";

const app = express();

ConnectDb();

dotenv.config({ path: ".env" });

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://frontend-social-9o9mj6ycb-nomib508-gmailcom.vercel.app",
      "https://frontend-social-app.vercel.app"
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
    allowedHeaders: ["Content-Type"],
  })
);

cloudinary.config({
  cloud_name: "dfwahwlbc",
  api_key: "874725767414532",
  api_secret: "q7Xg6sDeCDB7S41C_2MGG7iIwFM",
});

//middlewares
const limit = { limit: "50mb" };
app.use(express.json(limit));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/user", UserRouter);
app.use("/post", PostRouter);

// *************

app.listen(process.env.PORT, () => {
  console.log(`server is listening of port ${process.env.PORT}`);
});

// *****************
app.get("/", (req, res) => {
  res.send("<h1>Working !!!!</h1>");
});

export default app;
