const dot = require("dotenv");
dot.config();
const express = require("express");
const PORT = process.env.PORT || 3800;
const cors = require("cors");
// const corsOptions = require("./config/corsOptions");
const path = require("path");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
// cookie 数据解析
const cookieParser = require("cookie-parser");
const client = require("./config/dbConn");

const router = require("./routes/root");
const userRouter = require("./routes/userRoutes");

const app = express();
// test env run
// console.log("process.env.Node_ENV", process.env.Node_ENV);
// 中间
app.use(cors());
// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
// 服务器记录
app.use(logger);

// 连接数据库
try {
} catch (error) {
  console.log("error:", error);
}
// 静态资源路径定义
app.use(express.static("public"));
app.use("/api/v1", router);
app.use("/api/v2", userRouter);

// 拦截
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "/public/views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});
// 服务出错记录
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
