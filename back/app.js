const express = require("express");
const app = express();

const cors = require("cors");

const home = require("./routes/home");
const products = require("./routes/products");

app.use(express.json());

/*
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    next();
});
*/

let allowUrls = ["abc.com", "pounter.com", "trycatch.network"];
app.use(cors({
    origin: "*", // or use : allowUrls
    methods: ["GET"]
}));

app.use("/api/products", products);
app.use("/", home);

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});