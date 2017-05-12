/**
 * Created by danstan on 5/12/17.
 */

import express from 'express'
import configs from '../config/config'
import connectMongo from 'connect-mongo'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

const MongoStore = connectMongo(session)
const app = express()
const dbURL = "mongodb://"+configs.dbHost+":"+configs.dbPort+"/"+configs.testDB

app.locals.pretty = true;
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('stylus').middleware({ src: __dirname + '/public' }));
app.use(express.static(__dirname + '/public'));

app.use(session({
        secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
        proxy: true,
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({ url: dbURL })
    })
)

//import './server/routes'
require('./server/routes')(app);

app.listen(configs.testPort)

console.log(">Server started running at http://localhost:"+configs.testPort)
console.log(">Connected to Database at "+dbURL)