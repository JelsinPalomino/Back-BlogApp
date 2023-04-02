import express from "express";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

if (!process.env.PORT) {
    console.log("La variable de entorno PORT no se ha configurado.");
}

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${process.env.PORT}`)
})