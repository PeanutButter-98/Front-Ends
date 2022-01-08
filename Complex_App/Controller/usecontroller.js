const User = require('../models/User');

exports.OnlyloggedInUsers = function(req,res,next) 
    {
        if(req.session.sample)
        {
            next();
        }
        else
        {
            req.flash('errors', "You Must be Logged in to Create a Post");
            req.session.save(function() {
                res.redirect('/')
            })
        }
    }

exports.login = function(req,res)
{
    let user = new User(req.body);
    //console.log("(user object)User data in loging", user.data)
    //We can also pass call  back function 
    user.login().then(function(x){
        //This prints the sessionobjects Schema with associated values
        //console.log(req.session);
        //console.log("(user object)User datain loging", user.data)
        req.session.sample = {favColor: "Red", username: x.username, Id: x._id}
        //console.log("req.session.sample in Login",req.session.sample)
        //This save() ensures that databses is updated with final data (session) before redirecting user to dashboard
        req.session.save(function() 
        {
        res.render('home-dashboard',{username: req.session.sample.username})
        })
    })
    .catch((err) =>
    {
        //req.session.flash.errors = [err]
        req.flash('errors',err)
        req.session.save(function (){
            res.redirect('/')
        })
        //res.send(err)
    } 
    )
}

exports.register = function(req,res)
{
    //console.log(req.body);
     let user = new User(req.body);
    //console.log(user)
    user.register().then((x)=> 
    {
        //console.log("Passed Object to Register Function: ",x[0].username);
        req.session.sample = {favColor: "blue", username: x[0].username, Id: x[0]._id}
        req.session.save(function () {
            res.render('home-dashboard',{username: x[0].username})
            })
            console.log("Registered!!")
    })
    .catch(err=> 
        {
            req.flash('errors',err)
            req.session.save(function (){
            res.redirect('/')
        })
        })
    
    /* user.register().then(() => {
        req.session.user = {username: user.data.username}
        req.session.save(() => {
            res.redirect('/')
    })
    }).catch((regerrors) => {
         //res.send(user.errors);
         regerrors.forEach((err) => {
            req.flash('regerrors',err)
        })
        req.session.save(() => {
            res.redirect('/')
    })
    }) */
    
    //res.send(`<h1>You have submitted the data Succesfully</h1>`)
}

exports.homepage = function (req, res)
{
    if(req.session.sample)
    {
        //res.send(`<h1>Owned Session, Close the browser or logout for home page</h1>
        //<a href="/">Home</a>`)
        //Instaed of paassingg the data manually, we use middleware function in Base file where we attach retrieved object and use it for every request
        //console.log(sample)
        res.render('home-dashboard',{username: req.session.sample.username})
    }
    else
    {
        //We can use req.session.flash.errors but we have to delete it once we accessed it, thats why we use req.flash(property name) it will delete automatically once accessed by user
        res.render('home_guest', {errors: req.flash('errors')})
    }

    
//console.log(req.session.user)
    /* if(req.session.user)
    {
        //res.send("Welcome your cookie is ready and ur viewing stateful app");
        res.render('home-dashboard', {uname: req.session.user.username})
    }
    else{
        //console.log("loading")
        res.render('home_guest', {errors: req.flash('errors'), regerrors: req.flash('regerrors')})
    } */
    
}

exports.LogOut = function(req,res) {
    //The Destroy function will identify req.sessions id and will destroy it
    req.session.destroy(function() {
        res.redirect('/')
    });
    console.log("Logged Out!!")
} 
