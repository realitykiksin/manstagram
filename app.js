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


app.get("/", function (req, res){
        Post.find({}, function(err, allPosts){
            if(err){
                console.log(err);
            }else{
               res.render("index", {posts:allPosts}); 
            }
        });
});

app.post("/", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var caption = req.body.caption;  
    var newPost = {name: name, image: image, caption: caption};
    Post.create(newPost, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
           res.redirect("/");
        }
    });
});


app.get("/new", function (req, res){
    res.render("new");
});


//show more info about the post
app.get("/show/:id", function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
       if(err){
            console.log(err);
       }else{
            res.render("show", {post: foundPost});
       }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server IS LISNIN");
});  