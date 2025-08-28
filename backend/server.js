// import path from "path";
// import express from "express";
// import dotenv from "dotenv";

// import cookieParser from "cookie-parser";
// import { v2 as cloudinary } from "cloudinary";

// import authRoutes from "./routes/auth.route.js";
// import userRoutes from "./routes/user.route.js";
// import postRoutes from "./routes/post.route.js";
// import notificationRoutes from "./routes/notification.route.js";


// import connectMongoDB from "./db/connectMongoDB.js";
// dotenv.config();


// cloudinary.config({
// 	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// 	api_key: process.env.CLOUDINARY_API_KEY,
// 	api_secret: process.env.CLOUDINARY_API_SECRET, 
// });

// const app = express();
// const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();

// app.use(express.json({ limit: "5mb" })); // to parse req.body
// // limit shouldn't be too high to prevent DOS
// app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)

// app.use(cookieParser());

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/notifications", notificationRoutes);

// // if (process.env.NODE_ENV === "production") {
// // 	app.use(express.static(path.join(__dirname, "/frontend/dist")));

// // 	app.get("*", (req, res) => {
// // 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// // 	});
// // }


// app.listen(PORT, () => {
// 	console.log(`Server is running on port ${PORT}`);
// 	connectMongoDB();
// });


import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import connectMongoDB from "./db/connectMongoDB.js";


import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "remarkable-youtiao-572aea.netlify.app"], 
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// your backend routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
connectMongoDB();
