const express = require("express");
const app = express();
const mongoose = require("mongoose")
const router = require('./router/articles');
const PORT =  2000;
const Article = require("./model/modal")
app.use(express.urlencoded({extended: false}))




//We mention the listen request inside promise, cuz if we 
//defined it outside promise, then we wont be able to proceed with request becuz all the data is present inside db and node cant process data until and unless db connection is established.
mongoose.connect("mongodb://localhost/newdb", 
  {useNewUrlParser: true, useUnifiedTopology: true
  }).then(() => app.listen(PORT, console.log("Listening On", PORT)))
  .catch((err) => console.log(err)); 
app.set("view engine", "ejs");
app.set("Views", "view")

app.use('/articles', router)
 app.get('/', (req,res) => {
  res.redirect('/articles')
}) 
app.get('/articles', async (req,res) => 
{
    const articles = await Article.find().sort({createdAt: -1});
    //console.log(articles)
    res.render("index", {articles: articles});
})



app.use('*', (req,res) => {
  res.render('404')
})




/*<a href="/articles/new" class="btn btn-success">New Article</a>

 <% articles.forEach(article => { %>
  <div class="card mt-4">
    <div class="card-body">
      <h4 class="card-title"><%= article.title %></h4>
      <div class="card-subtitle text-muted mb-2">
        <%= article.createdAt.toLocaleDateString() %>
      </div>
      <div class="card-text mb-2"><%= article.description %></div>
      <a href="articles/<%= article.slug %>" class="btn btn-primary">Read More</a>
      <a href="articles/edit/<%= article.id %>" class="btn btn-info">Edit</a>
      <form action="/articles/<%= article.id %>?_method=DELETE" method="POST" class="d-inline">
        <button type="submit" class="btn btn-danger">Delete</button>
      </form>
    </div>
  </div>
<% }) %>  


<!-- <a href="/" class="btn btn-secondary">All Articles</a>
<a href="/articles/edit/<%= article.id %>" class="btn btn-info">Edit</a>  -->*/