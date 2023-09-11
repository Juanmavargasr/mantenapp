const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser"); //se instala cookie-parser para leer las cookies y entre ellas el token que se envió como cookie
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRoutes);
app.use("/api", taskRoutes);

module.exports = app;
