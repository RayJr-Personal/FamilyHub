// UPDATE THIS
// Specifically the register function
import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";

import { fetchWrapper } from "@/helpers/fetch-wrapper";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/posts`;
const postSubject = new BehaviorSubject(
  process.window && JSON.parse(localStorage.getItem("post"))
);

export const postService = {
  post: postSubject.asObservable(),
  get postValue() {
    return postSubject.value;
  },
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost: _delete,
};

function createPost(post) {
  return fetchWrapper.post(`${baseUrl}/post`, post);
}

function getAllPosts() {
  return fetchWrapper.get(`${baseUrl}/post`);
}

function getPostById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function updatePost(id, params) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params).then((x) => {
    // update stored post if the logged in post updated their own record
    if (id === postSubject.value.id) {
      // update local storage
      const post = { ...postSubject.value, ...params };
      localStorage.setItem("post", JSON.stringify(post));

      // publish updated post to subscribers
      postSubject.next(post);
    }
    return x;
  });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}
