
const express = require('express')
require("dotenv").config()
const { connecting } = require('./Config/db')
const { userRouter } = require('./Routes/user.router')
const {noteRouter}=require("./Routes/note.routes")
const swaggerJSdoc=require("swagger-jsdoc")
const swaggerUI=require("swagger-ui-express")


const {auth}=require("./AuthMiddleware/Auth")
const cors=require("cors")
const app = express()
app.use(express.json())
app.use(cors())

// app.get("/", async(req, res) => {
//     let data= await MoviesModel.find()
//     res.send(data)
// })
//definition
const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Learning Swagger",
            version:"1.0.0"
        },
        servers:[
            {
                url:"http://localhost:4000"
            }
        ]
    },
    apis:["./Routes/*.js"]
}
//specification
const swaggerSpec= swaggerJSdoc(options)
//building UI
app.use("/documentation",swaggerUI.serve,swaggerUI.setup(swaggerSpec))


app.use("/user",userRouter)

// app.use(auth)

app.use("/note",auth,noteRouter)

app.listen(process.env.PORT, async () => {
    try {
        await connecting
        console.log("Connected to Database Succesfully");
    } catch (error) {
        console.log(error)
        console.log("error Occured while connectng to db");
    }
    console.log("server is connected to port number 4000");
})