const express = require("express");
const { connectDb } = require("./config/db");
const app = express();
const cors = require("cors");
const session = require("express-session");
const userRoutes = require("./routes/userRoutes");


app.use(session({
    secret: "mysecretString",
    resave: false,
    saveUninitialized: true
}))

// Cors Options
let corsOptions = {
    origin: "http://localhost:5173"
}

// Connect to Database
connectDb();

// middlewares
app.use(cors(corsOptions));

//Parse URLEncodded Data
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get("/api", (req, res) => {
    res.send("You are on root path")
});

// All Routes
app.use("/api/users" , userRoutes)

app.listen(8080, () => {
    console.log(`Server is listing on PORT ${8080}`)
})