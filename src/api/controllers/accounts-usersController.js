/**
 * Created by danstan on 5/15/17.
 */
import collections from '../../server/common'

var user_accountsApi =  function (app) {

    console.log("####AccountsAPI Import Accounts-Users Collection:::::"+collections.confirmExport)
    app.get('/api/getUsers', (req,res)=>{
        collections.users.find().toArray((e,o)=>{
            console.log("#-----------###################-------------#")
            console.log("#-----------GET Users-----------------------#")
            console.log("#-----------###################-------------#")
            console.log("Current Users are :::")
            console.log(o)
            console.log("#-----------###################-------------#")
            res.send(o)
        })
    })


}

module.exports=user_accountsApi


