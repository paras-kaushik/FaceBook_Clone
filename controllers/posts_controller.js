const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = function (req, res) {
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err, post) {
      if (err) {
        console.log("error in creating a post");
        return;
      }

      return res.redirect("back");
    }
  );
};

module.exports.destroy = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    // notice how we are accessing params
    // .id means converting the object id into string
    if (post.user == req.user.id) {
      // YOU CAN ONLY DELETE YOUR POST
      post.remove();
      // we did not use _id above as we need to compare strings , so mongoose has this bult in ie id would return string id
      Comment.deleteMany({ post: req.params.id }, function (err) {
        return res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  });
};
