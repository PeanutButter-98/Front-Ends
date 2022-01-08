const Article = require('../model/modal')
module.exports.Readmore = (req,res) => {
    res.send(`<h2>Inside Articles readmore</h2>`);
}
module.exports.Edit = (req,res) => 
{
    const id = req.params.id
    console.log(id)
    res.send("Editing Page")
}

module.exports.Delete = (req,res) => {
    //console.log(req.params.id)
    const id =req.params.id
    Article.findByIdAndDelete(id, (err, docs)=> {
        if(err)
        {
            res.send(err)
        }
        else{
            console.log("Deleted")
            res.redirect('/articles')
        }
    })
}

module.exports.new = (req,res) => {
    res.render('new', { article: new Article()})
}
