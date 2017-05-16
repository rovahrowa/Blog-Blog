/**
 * Created by danstan on 5/13/17.
 */

let apiRoutes = (app) =>{
    app.get('/api', function (req, res) {
        res.send({

            APIName:"DanstanDToDoApp",
            getTodosByUser:"/api/getTodoByUser/:username",
            getTodosByID:"/api/getTodoById/:id",
            createTodos:"/api/createTodo",
            updateTodo:"/api/updateTodo",
            deleteTodo:"/api/deleteTodo/:id"

        })

    })

}

module.exports=apiRoutes