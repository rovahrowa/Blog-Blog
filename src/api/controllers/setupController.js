/**
 * Created by danstan on 5/7/17.
 */
import collections from '../../server/common'


 var todoSeed= function (app) {

    app.get('/api/seed', function (req, res) {

            var starterTodos = [

                {
                    username: "mack",
                    todo: "Updating Git Project",
                    isDone: true,
                    hasAttachment: false
                },
                {
                    username: "shem",
                    todo: "Buy Milk for Mom",
                    isDone: true,
                    hasAttachment: false
                },
                {
                    username: "danstan",
                    todo: "Cloning the betting application",
                    isDone: true,
                    hasAttachment: false
                },
                {
                    username: "fred",
                    todo: "Checking Logs",
                    isDone: true,
                    hasAttachment: false
                },
                {
                    username: "slow",
                    todo: "Checking Logs",
                    isDone: true,
                    hasAttachment: false
                },
                {
                    username: "danstan",
                    todo: "Setting up v8 Datacenter",
                    isDone: true,
                    hasAttachment: false
                }
            ];

        collections.todos.insert(starterTodos,  (e, o) =>{

                res.send(o);
            })
    })



}

module.exports=todoSeed