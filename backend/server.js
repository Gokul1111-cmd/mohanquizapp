import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import quizRouter from "./routes/quizRoutes.js"
import userRouter from "./routes/userRoutes.js"
import questionRouter from "./routes/questionRoutes.js"
import resultRouter from "./routes/resultRoutes.js"
import authRouter from "./routes/authRoutes.js"
import dotenv from "dotenv"

dotenv.config();
const app = express()
app.use(express.json())
const allowedOrigins = new Set(
        [
                process.env.CLIENT_URL,
                process.env.FRONTEND_URL,
                "http://localhost:5173",
                "http://127.0.0.1:5173"
        ].filter(Boolean)
)
app.use(cors({
        origin(origin, callback) {
                if (!origin || allowedOrigins.has(origin)) {
                        return callback(null, true)
                }

                return callback(new Error(`CORS blocked for origin ${origin}`))
        }
}));

app.use("/quiz", quizRouter);
app.use("/user", userRouter);
app.use("/question", questionRouter);
app.use("/result", resultRouter);
app.use("/auth", authRouter)

export async function connectDatabase() {
        if (!process.env.MONGO_DB) {
                throw new Error("Missing MONGO_DB environment variable")
        }

        await mongoose.connect(process.env.MONGO_DB, { family: 4 })
        console.log("db connected")
}

export default app;