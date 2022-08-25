let postsArray = []
const titleInput = document.getElementById("post-title")
const bodyInput = document.getElementById("post-body")
function renderPosts() {
        let html = ""
        for (let post of postsArray) {
            html += `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <hr />
            `
        }
        document.getElementById("blog-list").innerHTML = html
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        postsArray = data.slice(0, 5)
        renderPosts()
    })
    
// Submitting Data
document.getElementById("new-post").addEventListener("submit", function(event){
  event.preventDefault()
  const data = { 
            title: titleInput.value,
            body: bodyInput.value
        }
  
  fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(newPost => 
    { 
      if (newPost.title == "" || newPost.body == "") {
            renderPosts()
      } else {
        postsArray.unshift(newPost)
        renderPosts()
      }
    })
  titleInput.value = '';
  bodyInput.value = '';
 
});