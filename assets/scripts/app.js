const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const formElement = document.querySelector("#new-post");
const fetchButton = document.querySelector("#available-posts button");
const postList = document.querySelector("ul");

function sendHttpRequest(method, url, body) {
  // promisifying http request with xmlHttpRequest
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    // configure to convert data from API to be an Array
    xhr.responseType = "json";

    xhr.onload = function () {
      resolve(xhr.response);
    };

    /*
    send() method will handle if there is a request for body
    and here we pass the body parameter and pass the actual data
    when we call it as an argument
    before that, we have to parse it to stringify first to
    convert the JavaScript data to be a JavaScript array
    */
    xhr.send(JSON.stringify(body));
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
    1. configure it outside of this onload function (see line number 14)
        after that we could just use the response key to get the response from API
    2. convert it manually with JSON.parse(xhr.response)

    const listOfPost = xhr.response;
  */
  const listOfPost = responseData;
  listOfPost.forEach((post) => {
    const postEl = document.importNode(postTemplate.content, true);
    postEl.querySelector("h2").textContent = post.title.toUpperCase();
    postEl.querySelector("p").textContent = post.body;
    // add the ID to looking the right ID for each post
    postEl.querySelector("li").id = post.id;
    listElement.append(postEl);
  });
}

async function createPost(title, content) {
  const userId = Math.random();
  // creating a post object and match it as expected key-value from API
  const post = {
    title: title,
    body: content,
    userId: userId,
  };

  // sending a post with sendHttpRequest function
  sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", post);
}

// connecting to button at UI
fetchButton.addEventListener("click", fetchPosts);
/*
connecting to form at UI
the eventlistener should be submit because we working with form
and by default when we using eventlistener we get the the event property.
And we preventDefault() the default behaviour of the form element (reloading the entire page)
when we submitting something init.
*/
formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  /*
  currentTarget which mean is the input element inside of form element
  and the value means the value that entered by user
  currentTarget by default is null, that is why we using querySelector
  and select the selector to fill in the null with the concrete tagElement
  in HTML
  */
  const enteredTitle = event.currentTarget.querySelector("#title").value;
  const enteredContent = event.currentTarget.querySelector("#content").value;

  // passing createPost function to creating a post
  createPost(enteredTitle, enteredContent);
});

postList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    /* because we looking and click the button
    we can use the closest selector to select the li
    (because li is the closest tag to the delete button tag)
    and delete the list item  */
    const postId = event.target.closest("li").id;
    sendHttpRequest(
      "DELETE",
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }
});
