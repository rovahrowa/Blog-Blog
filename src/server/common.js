/**
 * Created by danstan on 5/14/17.
 */
import crypto from 'crypto'
import server from 'mongodb'
import configs from '../../config/config'
import mongodb from 'mongodb'


const MongoDB=mongodb.Db
const Server=server.Server
/*
 ESTABLISH DATABASE CONNECTION
 */


var dbName = process.env.DB_NAME || 'Node-Login-Template';
var dbHost = process.env.DB_HOST || 'localhost'
var dbPort = process.env.DB_PORT || 27017

const dbURL = "mongodb://"+configs.dbHost+":"+configs.dbPort+"/"+configs.testDB
var db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1})
db.open((e, d)=>{
    if (e) {
        console.log(e)
    } else {
        if (process.env.NODE_ENV == 'live') {
            db.authenticate(process.env.DB_USER, process.env.DB_PASS, (e, res)=> {
                if (e) {
                    console.log('mongo :: error: not authenticated-User Details Error', e)
                }
                else {
                    console.log('mongo :: authenticated and connected to database :: "'+dbName+'"')
                }
            })
        }	else{
            console.log(">Connected to Database at "+dbURL)
        }
    }
})

var accounts = db.collection('accounts')
var users=db.collection('users')
var todos=db.collection('todos')

module.exports= {

        accounts : db.collection('accounts'),
        users:db.collection('users'),
        todos:db.collection('todos'),
        confirmExport:"Succesfull"

}
