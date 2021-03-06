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

    second argument inside of fetch method is place where we do our configuration
    to consume the data from API, basically we use the method and body property inside
    of fetch method.
    Special for body properties, we don't just pass the body itself, BUT IT HAS TO BE
    PARSING THE DATA => JSON.stringify to convert our JavaScript array into JSON data type.
    */
  return fetch(url, {
    method: method,
    body: body,

    /*
    if we use the formData, we don't have to parse it to stringify
    and tell he headers type to the server that we sending a JSON data.
    two those things automatically done by the formData, instead we just have to
    pass the body inside of body key see line 26

    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    }, */
  })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        return response.json().then((errorData) => {
          console.log(errorData);
          throw new Error("Something went wrong on our server!");
        });
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error("No internet connection");
    });
}

async function fetchPosts() {
  try {
    const responseData = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const listOfPost = responseData.data;
    listOfPost.forEach((post) => {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector("h2").textContent = post.title.toUpperCase();
      postEl.querySelector("p").textContent = post.body;
      postEl.querySelector("li").id = post.id;
      listElement.append(postEl);
    });
  } catch (error) {
    alert(error.message);
  }
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };

  // playing around with formData
  const formData = new FormData();
  formData.append("title", title);
  formData.append("body", content);
  formData.append("userId", userId);

  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    formData
  );
  console.log(response);
}

fetchButton.addEventListener("click", fetchPosts);
formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const enteredTitle = event.currentTarget.querySelector("#title").value;
  const enteredBody = event.currentTarget.querySelector("#content").value;

  createPost(enteredTitle, enteredBody);
});
postList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const postId = event.target.closest("li").id;
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  }
});
