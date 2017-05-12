/**
 * Created by danstan on 5/12/17.
 */
let configs={
    dbPort: "27017",
    dbHost:"localhost",
    liveDB:"Node-Mongo-Login-Pro",
    testDB:"Node-Mongo-Login-Test",
    apiUrl: "http://localhost:3000/api",
    secret: "faeb4453e5d14fe6f6d04637f78077c76c73d1b4",
    livePort: process.env.NODEPORT,
    testPort:process.env.NODEPORT
}

module.exports=configs;