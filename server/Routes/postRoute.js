const {
  viewPost,
  createPost,
  singlePost,
  updatePost,
  deletePost,
  likePost,
  getTimelinePosts,
} = require("../Controllers/postController");
//
const router = require("express").Router();
//
//
// view all post
router.get("/", viewPost);
//
// view single post
router.get("/:id", singlePost);
//
// create a post
router.post("/", createPost);
//
// update post
router.put("/:id", updatePost);
//
// delete post
router.delete("/:id", deletePost);
//
// like post
router.put("/:id/like", likePost);
//
// get timeline post
router.get("/:id/timelinepost", getTimelinePosts);
//
//
//
module.exports = router;
