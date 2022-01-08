const postCollection = require('../db').db().collection("Posts");
 const ObjectID = require('mongodb').ObjectID

let Post = function(data, userID)
{
    this.data = data;
    this.errors = [];
    this.userID = userID;
    //console.log("Inside Post: ",this.data,"UserID",this.userID)
}
Post.prototype.cleanup = function()
{
    if(typeof(this.data.title) != "string")
    {
        this.data.title = "";
    }
    if(typeof(this.data.title) != "string")
    {
        this.data.content = "";
    }
    
    this.data = {
        title: this.data.title.trim(),
        content: this.data.content.trim() ,
        createdDate: new Date(),
        author: ObjectID(this.userID)
    }
}
//console.log(Post.Value)
Post.prototype.validate = function()
 {
    
    if(this.data.title == ""){this.errors.push("Please Enter Title")}
    if(this.data.content == ""){this.errors.push("Content Cannot be Empty")}
}
Post.findSingleBlog = function(id)
{
    return new Promise(async (resolve, reject) => 
    {
        //First Check authenticity of ID, wheather it is string or not and
        //it conforms ObjectID type, and valid mongodb object ID
        //console.lo g(id)
        if(typeof(id) != "string" || !ObjectID.isValid(id))
        {
            reject()
            return;
        }
/*         let post = await postCollection.findOne({_id: new ObjectID(id)}) */
        //Aggregate performs one or more complex operations
        let posts = await postCollection.aggregate([
        {$match: {_id: new ObjectID(id)}},
        //lookup docs from other collection
        {$lookup: {from : "Customers", localField: "author", foreignField: "_id",as: "authorDocument"}},
        //SO this will help to retrieve data from project object 
        /* {$project: {
            title: 1,
            content: 1,
            createdDate: 1,
            author: {$arrayElemAt: ["$authorDocument", 0]}
        }} */ 
        ]).toArray()
        //console.log("Posts inside findSingle",posts)
        if(posts.length)
        {
            console.log(posts[0]);
            resolve(posts[0]);
        }
        else{
            reject();
        }
    })

}
Post.prototype.Create = function() 
{
return new Promise((resolve, reject) => {
    this.cleanup();
    this.validate();
    if(!this.errors.length)
    {
        postCollection.insertOne(this.data).then(() => 
        {
            console.log("Added Successfully")
            resolve("Added")
        })
        .catch((err) => reject(err));
    }
    else{
        reject(this.errors)
    }
})    

}

module.exports = Post;
