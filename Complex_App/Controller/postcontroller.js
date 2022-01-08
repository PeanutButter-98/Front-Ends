const Post = require('../models/Post')

//Post Related routes
exports.getPost = function(req,res)
{
    res.render('create_post',{username: req.session.sample.username})
}

exports.AddPost = (req,res) => 
{
    //console.log(req.session.sample)
    
    let post = new Post(req.body, req.session.sample.Id);
    post.Create().then(function(x) {
        console.log("created");
        res.redirect('/')
    }).catch(function(err) {
        console.log(err)
        res.send("Wronged");
    })
}

exports.displayBlogs = async (req,res) => 
{
    try
    {
        let post = await Post.findSingleBlog(req.params.id);
        //console.log("Post Inside DisplayBlogs: ",post)
        res.render('post', {post: post});
    }
    catch{
        res.render('404err');
    }

}