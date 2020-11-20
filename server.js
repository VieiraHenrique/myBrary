require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const { static } = require("express");
const indexRouter = require("./routes/index");

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to DB"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.set("layout", path.join(__dirname, "/layouts/layout"));
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "/public")));

app.use("/", indexRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log("Server started on port 5000");
});
