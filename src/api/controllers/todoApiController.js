/**
 * Created by danstan on 5/7/17.
 */
import collections from '../../server/common'
import mongo from 'mongodb'

var todosApiController =  function (app) {

    console.log("#####TodApi Collections Import :::::"+collections.confirmExport)
    app.get('/api/getTodoByUser/:username', function (req,res) {
        collections.todos.find().toArray((e,o)=>{
            console.log("#-----------###################-------------#")
            console.log("#-----------GET TODOS BY USER---------------#")
            console.log("#-----------###################-------------#")
            console.log(req.params.username+"'s "+"Todos:::")
            console.log(o)
            console.log("#-----------###################-------------#")
            res.send(o)
        });

    })

    app.get('/api/getTodoById/:id', function (req,res) {
        let o_id = new mongo.ObjectID(req.params.id);
        collections.todos.find({'_id':o_id}).toArray(function (e, o) {
            console.log("#-----------###################-------------#")
            console.log("#-----------GET TODOS BY ID-----------------#")
            console.log("#-----------###################-------------#")
            console.log("Todo with ID: "+req.params.id)
            console.log(o)
            console.log("#-----------###################-------------#")
            res.send(o)
        })

    })

   app.post('/api/createTodo', (req,res)=>{
       let newTodo={
           username:req.body.username,
           todo:req.body.todo,
           isDone:req.body.isDone,
           hasAttachment:req.body.hasAttachment
       }

       collections.todos.insert(newTodo, {safe: true}, function(e,o){
           if (!e){
               console.log("#-----------###################-------------#")
               console.log("#-----------New Todo Added-------------#")
               console.log("#-----------###################-------------#")
               console.log("Todo Created as:::")
               console.log("#-----------###################-------------#")
               console.log(o)
               res.send("Created")

           }
           else throw errors
       })
   })
    app.put('/api/updateTodo', (req,res)=>{
        let o_id = new mongo.ObjectID(req.body.id);
        collections.todos.find({_id:o_id}).toArray(function(e, o){
            if (o[0]==null){
                res.send("Object no found")
            }

            else {
                console.log(o[0])
                o[0].username= req.body.username;
                o[0].isDone=req.body.isDone;
                o[0].todo=req.body.todo;
                o[0].hasAttachment= req.body.hasAttachment;
                console.log(o[0])
                collections.todos.save(o[0], {safe: true}, function (e) {
                    if (e) throw(e);
                    else {
                        console.log("#-----------###################-------------#")
                        console.log("#-----------Todo Updated--------------------#")
                        console.log("#-----------###################-------------#")
                        console.log("Todo Updated as:::")
                        console.log("#-----------###################-------------#")
                        console.log(o[0])
                        res.send("Updated")
                    }

                });
            }
        });


    })



}

module.exports=todosApiController