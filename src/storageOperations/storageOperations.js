// Auth
export const storageUsers = () => JSON.parse(localStorage.getItem("users")) || []
export const loggedInUser = () => JSON.parse(localStorage.getItem("loggedInUser"))
export const setStorageUsers = (users) => localStorage.setItem("users", JSON.stringify(users))
export const setLoggedInUser = (user) => localStorage.setItem("loggedInUser", JSON.stringify(user))
export const removeLoggedInUser = () => localStorage.removeItem("loggedInUser")

// Posts
export const storagePosts = () => JSON.parse(localStorage.getItem("posts")) || []
export const setStoragePosts = (posts) => localStorage.setItem("posts", JSON.stringify(posts))

// Get index of post by it's ID
export const getIndexById = (id) => {
  let index = -1
  const post = storagePosts().find(e => {
    index++;
    return id == e.id
  })
  return index
}

// Delete Post
export const deletePost = (id) => {
  let posts = storagePosts()
  posts.splice(getIndexById(id), 1)
  setStoragePosts(posts)
}

// Update Post
export const updatePost = (post) => {

  let allPosts = storagePosts()
  allPosts[getIndexById(post.id)] = post
  setStoragePosts(allPosts)

}

// Like Post
export const likePost = (post) => {
  let allPosts = storagePosts()

  if (Array.isArray(post?.liked)) {
    if (post.liked.includes(loggedInUser().email)) {
      // Remove user email to liked array
      post.liked.find((e, i) => {
        if (e === loggedInUser().email) {
          post.liked.splice(i, 1)
        }
      })
    } else {
      // Add user email to liked array
      post.liked = [...post.liked, loggedInUser().email]
    }

  } else {
    post.liked = [loggedInUser().email]
  }

  // Put new post to old one
  allPosts[getIndexById(post.id)] = post

  // Put new posts to local storage
  setStoragePosts(allPosts)
}

// Comment on Post
export const commentOnPost = (post, comment) => {

  const commentObj = {
    comment,
    commentBy: {
      email: loggedInUser().email,
      name: loggedInUser().name
    }
  }

  if (Array.isArray(post?.comments)) {
    post.comments.push(commentObj)
  } else {
    post.comments = [commentObj]
  }

  let storagePostsL = storagePosts()
  storagePostsL[getIndexById(post.id)] = post

  setStoragePosts(storagePostsL)

}