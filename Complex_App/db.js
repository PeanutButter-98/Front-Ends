const mongodb = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

mongodb.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true}, function(err,client){
//console.log(client);
//We used Client Object instead client.db(), cuz we have leverage the db file in store property of sessionObject
module.exports = client
const app = require("./Base");
//console.log(app)
app.listen(process.env.PORT,()=>console.log("Listening On", process.env.PORT));
})