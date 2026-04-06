import express from 'express';
import cors from 'cors';
import authRoutes from "./modules/auth/auth.routes.js"
import userRoutes from "./modules/user/user.routes.js"
import recordRoutes from "./modules/record/record.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";


const app = express();

// middlewares
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;