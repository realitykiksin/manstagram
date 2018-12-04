var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
    
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/manterest");


var postSchema = new mongoose.Schema({
    title: String,
    image: String,
    caption: String
});

var Post = mongoose.model("Post", postSchema);

// var commentSchema = new mongoose.Schema({
//     user: String,
//     text: String
// });

// var Comment = new mongoose.Schema("Comment", commentSchema);

app.get("/", function (req, res){
        Post.find({}, function(err, allPosts){
            if(err){
                console.log(err);
            }else{
               res.render("posts/index", {posts:allPosts});
            }
        });
});

app.post("/", function(req, res){
    var title = req.body.title;
    var image = req.body.image;
    var caption = req.body.caption;  
    var newPost = {title: title, image: image, caption: caption};
    Post.create(newPost, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
           res.redirect("/");
        }
    });
});


app.get("/new", function (req, res){
    res.render("posts/new");
});


//show more info about the post
app.get("/show/:id", function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
       if(err){
            console.log(err);
       }else{
            res.render("posts/show", {post: foundPost});
       }
    });
});

//=================================
//COMMENTS ROUTES
//=================================

// new comment route
app.get("/show/:id/comments/new", function(req, res){
    Post.findById(req.params.id, function(err, post){
        if (err){
            console.log(err);
        }else{
            res.render("comments/new", {post: post});
        }
    });
    
});

app.post("/:id/comments", function(req, res){
    res.render("/comments/new")
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server IS LISNIN");
});  