 import express from "express";
 import bodyParser from "body-parser";
 import mongoose from "mongoose";
 import cors from "cors";
 import dotenv from "dotenv";
 import multer from "multer";
 import helmet from "helmet";
 import morgan from "morgan";
 import path from "path";
 import { fileURLToPath } from "url";
 import authRoutes from "./routes/auth.js";
 import userRoutes from "./routes/users.js";
 import postRoutes from "./routes/posts.js"; 
 import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js "; 
import { verifyToken } from "./middleware/auth.js";

 /*Configurations*/ 
 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);
 dotenv.config();
 const app = express();
 app.use(express.json());
 app.use(helmet());
 app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
 app.use(morgan("common"));
 app.use(bodyParser.json({ limit: "30mb", extended: true}));
 app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
 app.use(cors());
 app.use("/assets", express.static(path.join(__dirname, 'public/assets')));
 /*File stoarge */
 const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/assets");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
 });
 const upload = multer ({storage});
 /* Routes with files */
 app.post("/auth/register", upload.single("picture"), register);
 app.post("/post", verifyToken, upload.single("picture"), createPost);
 /*Routes */
 app.use("auth", authRoutes);
 app.use("/users", userRoutes);
 app.use("/posts", postRoutes);
  
 /* MONGOOSE*/
 const PORT = process.env.PORT || 6001;
const connectionParams= {
    useNewUrlParser: true,
    
    useUnifiedTopology: true
}
 mongoose.connect(process.env.MONGO_URL, {

  })
  
 .then(() => {
   app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
 })
 .catch((error) => console.error("MongoDB connection error:", error));