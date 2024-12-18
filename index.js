const express = require('express')
const app = express();
const path = require('path')
const methodOverride = require('method-override')
const {v4: uuid} = require('uuid');

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method'))


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'))

let comments = [
    {
        id:uuid(),
        username: "Todd",
        comment: "lololol thats so funny"
    },
    {
        id:uuid(),
        username: "bob",
        comment: "lololol am fed up"
    },
    {
        id:uuid(),
        username: "Meb",
        comment: "lololol that not working"
    },
    {
        id:uuid(),
        username: "Pearl",
        comment: "lololol am glad"
    },
    {
        id:uuid(),
        username: "Carol",
        comment: "lololol not where i imaginesd"
    },
]

app.get('/comments', (req,res) => {
    res.render('comments/index', {comments})
})

app.get('/comments/new', (req,res) => {
    res.render('comments/new')
})
app.post('/comments', (req,res) => {
    const {username, comment, id} = req.body
    comments.push({username,comment,id: uuid()})
    res.redirect('/comments')
})
app.get('/comments/:id', (req,res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id ===id);
    res.render('comments/show',{comment})
})
app.get('/comments/:id/edit', (req,res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id ===id);
    res.render('comments/edit', {comment})


})

app.patch('/comments/:id', (req,res) => {
    const {id} = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find (c => c.id ===id)
    foundComment.comment = newCommentText;
    res.redirect('/comments')
})

app.delete('/comments/:id', (req,res) => {
  const {id} = req.params;
 comments =  comments.filter(c => c.id !== id);
 res.redirect('/comments');
})


app.get('/tacos', (req,res) => {
    res.send("Get/tacos response")
})
app.post('/tacos', (req,res) => {
    const {meat,qty} = req.body;
    res.send(`okay, here is your ${qty} ${meat} tacos`)
   
})

app.listen(3000, () => {
    console.log("On port 3000!")
})