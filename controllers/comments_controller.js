const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function (req, res) {
  Post.findById(req.body.post, function (err, post) {
    //post contains post._id sent by view
    // although we have a post id we will check if the post exist ! and findit

    if (post) {
      Comment.create(
        {
          content: req.body.content,
          post: req.body.post,
          user: req.user._id, // courtesy passport
        },
        function (err, comment) {
          // handle error

          post.comments.push(comment);
          post.save();

          res.redirect("/");
        }
      );
    }
  });
};

module.exports.destroy = function (req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if (comment.user == req.user.id) {
      // we did the sae check while deleting post
      let postId = comment.post;

      comment.remove();

      Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: req.params.id } }, // this ID we are pulling out from comments array
        function (err, post) {
          return res.redirect("back");
        }
      );
    } else {
      return res.redirect("back");
    }
  });
};
