import { apiHandler } from "@/helpers/api/api-handler";
import { postsRepo } from "@/helpers/api/posts-repo";

export default apiHandler({
  get: getAllPosts,
  post: createpost,
});

function getAllPosts(req, res) {
  const posts = postsRepo.getAll();
  return res.status(200).json(posts);
}

function createpost(req, res) {
  // spread post details
  const { ...post } = req.body;

  // will have to add validation in the future:
  // check if post is being made and assigned to the correct family

  postsRepo.create(post);
  return res.status(200).json({});
}
