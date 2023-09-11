const app = require("./app");
const { connectDB } = require("./db");

connectDB();
app.listen(3000);
console.log("server on port", 3000);
