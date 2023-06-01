const PostModel = require("../Models/postModel");
const UserModel = require("../Models/userModel");
//
//
// view all post
const viewPost = async (req, res) => {
  try {
    const posts = await PostModel.find().sort({ createdAt: -1 });
    res.send(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//
//
// view single post
const singlePost = async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await PostModel.findById(id);
    res.send(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//
//
// Creat new Post
const createPost = async (req, res) => {
  try {
    const newPost = await PostModel.create(req.body);
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};
//
//
// Update a post
const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
//
//
// delete a post
const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted successfully");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
//
// like/dislike a post
const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findOne({_id:id});
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post Unliked");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
//
// Get Timeline POsts
const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;
  try {
    const currentUserPosts = await PostModel.find({ userId: userId });
    const currentUserFollowing = await UserModel.findById(userId, "following");
    const followingUserIds = currentUserFollowing.following;

    const followingPosts = await PostModel.find({
      userId: { $in: followingUserIds },
    });
    const allPosts = currentUserPosts.concat(followingPosts);
    allPosts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json(error);
  }
};
//
//
//
module.exports = {
  viewPost,
  createPost,
  singlePost,
  updatePost,
  deletePost,
  likePost,
  getTimelinePosts,
};
