const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const formElement = document.querySelector("#new-post");
const fetchButton = document.querySelector("#available-posts button");
const postList = document.querySelector("ul");

function sendHttpRequest(method, url, body) {
  /*
    if we only use the fetch global built-in function
    by default we use the GET method, and fetch only take one
    arguments, and that argument is the URL to the data we looking for.
    by automatically, when we use fetch, we use the PROMISE based function.

    remember, then and catch will create a new promise
    return response.json we have to write it because we want to parse the
    JSON data into JavaScript array or JavaScript object.
    */
  return fetch(url).then((response) => {
    return response.json();
  });
}

async function fetchPosts() {
  const responseData = await sendHttpRequest(
    "GET",
    "https://jsonplaceholder.typicode.com/posts"
  );
  const listOfPost = responseData;
  listOfPost.forEach((post) => {
    const postEl = document.importNode(postTemplate.content, true);
    postEl.querySelector("h2").textContent = post.title.toUpperCase();
    postEl.querySelector("p").textContent = post.body;
    listElement.append(postEl);
  });
}

async function createPost(title, content) {}

fetchButton.addEventListener("click", fetchPosts);
