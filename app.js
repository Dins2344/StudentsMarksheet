const express  = require('express')
const logger = require("morgan");
const router = require("./routes/userRoutes")
const dbConnect = require('./configure/mongoConnection')
const path = require('path')

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dbConnect()

app.use('public',express.static(path.join(__dirname,'public')))
app.use('/',router)


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
