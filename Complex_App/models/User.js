const userCollection = require('../db').db().collection("Customers");
const mail = require('validator');
const bcrypt = require('bcryptjs');
const md5 = require('md5');

/* const CustomerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please Enter Valid Email ID"]

    },
    password: {
        type: String,
        required: true,
        minlength: 6

    }
})
 */

let User = function(data)
{
    this.data = data;
    this.errors = [];
    //console.log("inside User Constructor",this.data)
} 
User.prototype.cleanUp = function()
{
    if(typeof(this.data.username) != "string"){this.data.username=""}
    if(typeof(this.data.email) != "string"){this.data.email=""}
    if(typeof(this.data.password) != "string"){this.data.password=""}
    //get Ridd of bogus properties
    this.data =
    {
        username: this.data.username.trim().toLowerCase(),
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password
    }
}
User.prototype.validate = function()
{
/* if(this.data.username == ""){this.errors.push("Please Enter Username")}
if(this.data.username != "" && !mail.isAlphanumeric(this.data.username)){this.errors.push("Username Can have only Letters and Numbers")}
if(this.data.email == ""){this.errors.push("Please Provide Your  Email")}
if(this.data.email != "" && !mail.isEmail(this.data.email)){this.errors.push("Your Email ID is Not Valid")} 
if(this.data.password == ""){this.errors.push("Please Provide Your Password")};
if(this.data.password.length > 0 && this.data.password.length < 6){this.errors.push("Your Password is too short")}
if(this.data.password.length > 50){this.errors.push("Your Password is too lengthy")} */
return new Promise(async (resolve, reject) => 
{
    //console.log(validator.isEmail(this.data.email));
    if(this.data.username == ""){this.errors.push("Please Enter Username")}
    if(this.data.username != "" && !mail.isAlphanumeric(this.data.username)){this.errors.push("Username Can have only Letters and Numbers")}
    if(this.data.email != "" && !mail.isEmail(this.data.email)){this.errors.push("Your Email ID is Not Valid")} 
    if(this.data.email == ""){this.errors.push("Please Provide Your  Email")}
    if(this.data.password == ""){this.errors.push("Please Provide Your Password")};
    if(this.data.password.length > 0 && this.data.password.length < 6){this.errors.push("Your Password is too short")}
    if(this.data.password.length > 50){this.errors.push("Your Password is too lengthy")}

    //Check if Username is Taken
    if(this.data.username.length > 2 && this.data.username.length < 31 && mail.isAlphanumeric(this.data.username))
    {
        let usernameCheck = await userCollection.findOne({username: this.data.username})
        if(usernameCheck){
            this.errors.push("This Username already exist!")
        }
    }
    //Check if Email is Taken
    if(mail.isEmail(this.data.email))
    {
        let emailCheck = await userCollection.findOne({email: this.data.email})
        if(emailCheck)
        {
            this.errors.push("This Email ID is already Taken!")
        }
    }
    resolve();
}) 

/* 
if(this.data.username.length > 2 && this.data.username.length < 31 && mail.isAlphanumeric(this.data.username))
    {
        let usernameCheck = await userCollection.findOne({username: this.data.username})
        if(usernameCheck){
            this.errors.push("This Username already exist!")
        }
    }

if(mail.isEmail(this.data.email))
    {
        let emailCheck = await userCollection.findOne({email: this.data.email})
        if(emailCheck)
        {
            this.errors.push("This Email ID is already Taken!")
        }
    } */

}
User.prototype.login = function()
{
/*     return new Promise((resolve,reject) => {
    //this.cleanUp()
    userCollection.findOne({username: this.data.username}, (err, attempteduser) =>
    {
        console.log(attempteduser)
        //console.log(attempteduser.password, this.data.attempteduser)
        if(attempteduser && bcrypt.compareSync(this.data.password,attempteduser.password))
        {
            resolve("Congratts!!!")
        }
        else{
            reject("No User Registered!")
        }
    })
    }) */
return new Promise((resolve,reject) => 
{  
    this.cleanUp()
    userCollection.findOne({username: this.data.username}).then((Userdata) => {
        //Here We Are CHecking if we can Compare and Match the entered password with Hashed One
        //console.log(Userdata);
        if(Userdata && bcrypt.compareSync(this.data.password,Userdata.password))
        {
            console.log("Logged in Successfully After Logged In User: ")
            resolve(Userdata);
        }
        else{
            reject("Invalid Credintials 😢, Please Enter Username and Password")
        }
    }).catch((err) => reject("Server Problem Occured, Try Again Later :)"))
})
}
User.prototype.register = async function ()
{
    return new Promise((resolve,reject) => {
        //Step #1 Data Validation and Data CLeanUp
        this.cleanUp();
        this.validate().then(async () => {
            if(!this.errors.length)
            {
                //Hash Pass
                //First we Generate salt and add this salt to the password
                let salt = bcrypt.genSaltSync(10);
                //Use Generated Salt to create a Real Hashed Password
                this.data.password = bcrypt.hashSync(this.data.password, salt);
                var registeredUser = await userCollection.insertOne(this.data);
                //console.log("Fresh Registered User", registeredUser.ops)
                resolve(registeredUser.ops);
            }
            else{
                reject(this.errors)
            }
        })

        })
      /*   if(!this.errors.length)
        {
            //Hash Pass
            let salt = bcrypt.genSaltSync(10);
            //Use Generated Salt to create a Real Hashed Password
            this.data.password = bcrypt.hashSync(this.data.password, salt);
            userCollection.insertOne(this.data);
            resolve(`<h1>Successfully Registered</h1>
            <a href="/">Home</a>`);
        }
        else{
            reject(this.errors)
        }
    }) */

  /*   return new Promise(async (resolve, reject) => 
{
    //Step #1 Data Validation and Data CLeanUp
    this.cleanUp();
    this.validate();

    //Step #2 Stoore the data if its accurate and valid
    //1st Adding the Cleaned up data
    if(!this.errors.length)
    {

        
    let salt = bcrypt.genSaltSync(5);
    console.log(salt)
    this.data.password = bcrypt.hashSync(this.data.password,salt);
    await userCollection.insertOne(this.data);
    resolve();
    }
    else
    {
        reject(this.errors);
    }
}) */
/* 
await this.validate()
if(this.errors.length==0)
{

    await userCollection.insertOne(this.data)
}
else{
    console.log("Error Occured", this.errors)
}

} */
    
}
module.exports = User;