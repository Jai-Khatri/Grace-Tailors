import express from "express"
import dotenv from "dotenv"
import customerRoutes from "./routes/order.routes.js"
import ConnectToDB from "./lib/mongo.js"
import AccountRoutes from "./routes/account.routes.js";
import cors from "cors";
import path from "path"

const __dirname = path.resolve();

const app = express();

dotenv.config()

const PORT = process.env.PORT || null;

app.use(express.json())
app.use(cors());
app.use("/api" , customerRoutes)
app.use("/api" , AccountRoutes )

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*" , (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist" , "index.html"))
    })
}


app.listen(PORT , () => {
    ConnectToDB;
    console.log("Server is running on PORT:- " , PORT)
})