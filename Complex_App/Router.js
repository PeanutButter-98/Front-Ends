const express = require('express');
const router = express.Router();
const useController = require('./Controller/usecontroller');
const postcontroller = require('./Controller/postcontroller')

//This is List of All Possible links router can get us
router.get('/', useController.homepage);

/* router.get('/about', function(req, res){
    res.send("Aboutto Start")
}); */

//TO Register A new User
router.post('/register', useController.register);
//To Log in 
router.post('/login', useController.login);
router.post('/logout', useController.LogOut)


//Post Related Routes
router.get('/create_post', useController.OnlyloggedInUsers, postcontroller.getPost)
router.post('/create_post', useController.OnlyloggedInUsers, postcontroller.AddPost)

router.get('/Posts/:id', postcontroller.displayBlogs);

module.exports = router;

/*  <% regerrors.forEach((err) => { %>
          <div class="alert alert-danger small"><%= err %></div>
          <% }) %> 
          <% errors.forEach((err) => { %>
            <div class="alert alert-danger text-center"><%= err %></div>
              <% }) %> --> */