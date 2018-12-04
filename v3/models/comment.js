var mongoose = require(mongoose);

var commentSchema = new mongoose.Schema({
    user: String,
    text: String
});

module.export = mongoose.model("Comment", commentSchema);

// module.export = comment;
    