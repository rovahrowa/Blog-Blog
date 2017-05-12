/**
 * Created by danstan on 5/12/17.
 */
import session from 'express-session'
import express from 'express'
import configs from '../config/config'


const app = express()

const dbURL = "mongodb://"+configs.dbHost+":"+configs.dbPort+"/"+configs.testDB

app.get('/',  (req, res) => {
    res.send("Hello World")
})

// app.use(session({
//         secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
//         proxy: true,
//         resave: true,
//         saveUninitialized: true,
//         store: new MongoStore({ url: dbURL })
//     })
// );

app.listen(configs.testPort)

console.log(">Server started running at http://localhost:"+configs.testPort)
console.log(">Connected to Database at "+dbURL)