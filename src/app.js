/**
 * Created by danstan on 5/12/17.
 */
import express from 'express'
import configs from '../config/config'


const app=express()



app.get('/', function (req, res) {
    res.send("Hellow World");
});


app.listen(configs.productionPort)

console.log("Server started running at http://localhost:"+configs.productionPort)