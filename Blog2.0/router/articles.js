const express = require("express");
const router = express.Router();
const Article = require("../model/modal");

const controller = require('../controller/Controls');
router.get("/readmore", controller.Readmore)

router.get("/edit/:id", controller.Edit)
router.get("/delete/:id", controller.Delete)
router.get("/new", controller.new) 

router.get('/:id', async (req,res) => {
    const id = req.params.id;
    //console.log(id)
/*     Article.findById(id)
    .then(result => res.render('index', {articles: result}))
    .catch(err => console.log(err)) */
    try{
        const articles = await Article.findById(req.params.id);
        //console.log(articles)
        res.render('show', {article: articles})
    }
    catch(e){
    console.log(e.message)
/*     res.send(`<h1>Sorry, Could Not Found You Are Looking For 😔</h1>
    <a href="/articles">Home</a>`) */
    res.render('')
}
    //res.send("Reached")
  })
/* router.get('/:id', async (req,res) => {
    //res.send(req.params.id);
    var articles = await Article.findById(req.params.id);
   // console.log(articles)
   if(articles == null) res.redirect('/') 
    res.render('show', {article: articles})
}) */

router.post('/', async (req,res) => {
    let article = new Article({
        title: req.body.title,
        metaData: req.body.metaData,
        Markdown: req.body.markdown,
        createdAt: req.body.createdAt
    })
    try
    {
        article = await article.save()
        //console.log(article)
        res.redirect(`articles/${article.id}`)
    }
    catch(e)
    {
        console.log(e)
        res.redirect('new', {article: article})
    } 
})
module.exports = router;