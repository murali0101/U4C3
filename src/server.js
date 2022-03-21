const app = require("./index")

const connect = require("./configs/db")

app.listen(7500,async()=>{
    try {
        await connect()
        console.log("listening port 7500...")
    } catch (error) {
        console.log('error:', error)
        
    }
})