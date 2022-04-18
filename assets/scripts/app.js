const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");

function sendHttpRequest(method, url) {
  // promisifying http request with xmlHttpRequest
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    // configure to convert data from API to be an Array
    xhr.responseType = "json";

    xhr.onload = function () {
      resolve(xhr.response);
    };

    xhr.send();
  });

  return promise;
}

async function fetchPosts() {
  const responseData = await sendHttpRequest(
    "GET",
    "https://jsonplaceholder.typicode.com/posts"
  );
  /*
    using response key to response data from API

    parse convert JSON data to JavaScript array

    stringify convert JavaScript array to be JSON data

    there are two ways to convert data from API (JSON) to be an JavaScript array:
    1. configure it outside of this onload function (see line number 9)
        after that we could just use the response key to get the response from API
    2. convert it manually with JSON.parse(xhr.response)

    const listOfPost = xhr.response;
  */
  const listOfPost = responseData;
  listOfPost.forEach((post) => {
    const postEl = document.importNode(postTemplate.content, true);
    postEl.querySelector("h2").textContent = post.title.toUpperCase();
    postEl.querySelector("p").textContent = post.body;
    listElement.append(postEl);
  });
}

fetchPosts();
