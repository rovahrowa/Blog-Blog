/**
 * Created by danstan on 5/13/17.
 */
let apiRoutes = (app) =>{
    app.get('/api',function (rq,rs) {
        rs.json({
            saying:"I love js"
        })

    })
}

module.exports=apiRoutes