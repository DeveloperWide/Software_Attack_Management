const mongoose = require("mongoose");

module.exports.connectDb = async () => {
    try{
        let conn = await mongoose.connect("mongodb://127.0.0.1:27017/sasm");
        console.log(`Connected to Database on ${conn.connection.host}`)
    }catch(err){
        console.log(err)
    }
}