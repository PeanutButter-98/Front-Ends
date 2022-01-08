const express = require('express');
const app = express();
const flash = require("connect-flash");
const session = require("express-session")
const MongoStore = require('connect-mongo')(session)
const router = require('./Router.js')
//This sets Base Route to Use Our route import
//Which URL we Want to use for this router variable
/* app.use('/', router); 
app.use('/start', router);*/

let sessionObject = session({
    secret: "VSCode",
    //by default (without Store, this will store in servers memory, This statement will help us to store the session data on database
    store: new MongoStore({client: require('./db')}),
    //Unexplained Terms
    resave: false,
    saveUninitialized: false,
    //Age Of Cookie until we close browser
    cookie: {maxAge: 1000* 60 * 60 * 24, httpOnly: true}
})

app.use(sessionObject)
app.use(flash())


/* 

  console.log(typeof hello.bind, hello("Naz"));
    function hello(manname)
    {
        return `Hello ${manname}`;
    }
    const b = function (){ return "HELLO"}
    const a =  (item)=> {return typeof item === 'number'}
    console.log(typeof a, a.name)
    console.log(typeof b, b.name)
    const numbers = [1,'str1',true, 2,4,false,3,'str2'].filter(a);
    console.log(numbers)
 */
/* app.use(async function (req,res,next) {
        console.log("Every TIme???")
        res.locals.user = await req.session.sample;
        console.log(res.locals.user)
        next()
}) */


//Set is use to setemplate engine in this case, EJS and what folder do we use to access HTML file, template engine is use to render dynamic html file, which accepts user input from user.
//Views is folder name and other view is a property used to render html file.
app.set('views', 'views');
//Sets EJS as template engine
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.use(express.static('public'));
app.use('/', router);
/* app.use(function(req, res, next) {
    //This res.locals object will be accessible in our ejs template and we can attach any object we wan t to access
    res.locals.sample = req.session.sample;
    console.log(res.locals.sample)
    next();
  });
 */
app.use('*', (req,res) => {
    res.send(`<div>
    <a href="">Home</a>
    <h4>Sorry We could not help with that URL :( </h4></div>`)
})

module.exports = app;


/* 
let sampleobject = () =>
    {
    name: "Sam",
    Age: 20,
    Address: "New York",
    /* fun: function a(){
        console.log(this.name,this.Age)
    
    }() */
/*app.use(sampleobject); */