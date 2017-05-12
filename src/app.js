/**
 * Created by danstan on 5/12/17.
 */
import express from 'express'

const app=express()

app.get('/', function (req, res) {
    res.send("Hellow World");
});

app.listen(4000)

console.log("Server started running at http://localhost:"+4000)