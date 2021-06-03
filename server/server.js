const express = require('express')
const app = express();
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const { readdirSync } = require('fs');
require('dotenv/config')




//database connection
mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false

    }).then((success) => {

        console.log("successfully connected");
    }).catch((err) => {

        console.log(err);
    })



//middlewares
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(cors())




// routes
readdirSync("./routes")
    .map((r) => app.use("/api", require("./routes/" + r))
    )



app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
})