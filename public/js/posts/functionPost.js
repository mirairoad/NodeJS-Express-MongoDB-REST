console.log('/js/functionsPost.js');
function viewPosts(){
    const viewPosts = document.querySelector('#viewPosts');
    const createpost = document.querySelector('#createPost');

    createpost.classList.add('is-hidden');
   viewPosts.classList.remove('is-hidden');


};

function createPost(){
   const createpost = document.querySelector('#createPost');
   const viewPosts = document.querySelector('#viewPosts');
   createpost.classList.remove('is-hidden');
   viewPosts.classList.add('is-hidden');
};

function createClick(){
document.querySelector("#createClick").click();
}

function updateFormPostClick(id){
document.querySelector(`#updateFormPostClick-${id}`).click();
}


// update Post
async function patchPostForm(id){
const form = document.querySelector(`#formEditPost-${id}`);
const messageResponse = document.querySelector(`#messageResponse-${id}`);

console.log(id);

form.addEventListener("submit", async (e) => {
e.preventDefault();

// reset errors
messageResponse.textContent = "";

// get values
const post_title = form.post_title.value;
const post_description = form.post_description.value;

try {
   const res = await fetch(`/api/posts/${id}`, {
       method: "PATCH",
       body: JSON.stringify({
           title:post_title,
           description:post_description,
       }),
       headers: { "Content-Type": "application/json" },
   });

   const data = await res.json();
   // console.log(data);

   if (data.message) {
       if (data.message === "success") {
           messageResponse.textContent = "your post has been updated";
           setTimeout(function(){
             location.assign("/dashboard/posts");
           },1500)
       } else {
           messageResponse.textContent = "something went wrong, please try later";
       }
   }
} catch (err) {
   messageResponse.textContent = "something went wrong, please try later";
}

});
};

// create Post
async function createPostForm(){
const form = document.querySelector("#formCreatePost");
const messageResponse = document.querySelector("#messageResponse");

form.addEventListener("submit", async (e) => {
e.preventDefault();

// reset errors
messageResponse.textContent = "";

// get values
const post_title = form.post_title.value;
const post_description = form.post_description.value;


console.log(form);

try {
   const res = await fetch("/api/posts", {
       method: "POST",
       body: JSON.stringify({
           title:post_title,
           description:post_description,
       }),
       headers: { "Content-Type": "application/json" },
   });

   const data = await res.json();
   // console.log(data);

   if (data.message) {
       if (data.message === "success") {
           messageResponse.textContent = "your post has been created";
           setTimeout(function(){
             location.assign("/dashboard/posts");
           },1500)
       } else {
           messageResponse.textContent = "something went wrong, please try later";
       }
   }
} catch (err) {
   messageResponse.textContent = "something went wrong, please try later";
}

}); 
};

function editFormById(id){
const editClick = document.querySelector(`.overview-${id}`);
const cancelClick = document.querySelector(`.edit-${id}`);

editClick.classList.add('is-hidden');
cancelClick.classList.remove('is-hidden');

};

function cancelFormById(id){
const editClick = document.querySelector(`.overview-${id}`);
const cancelClick = document.querySelector(`.edit-${id}`);

editClick.classList.remove('is-hidden');
cancelClick.classList.add('is-hidden');

};
async function deleteFormPostClick(id) {
const emailError = document.querySelector(`#messageDelete-${id}`)

try {
const res = await fetch(`/api/posts/${id}`, {
 method: "DELETE",
 headers: { "Content-Type": "application/json" },
});

const data = await res.json();
// console.log(data);

if (data.message) {
   emailError.textContent = "post delete successfully";
 if (data.message) {
   setTimeout(function(){
       location.assign("/dashboard/posts");
   },1000);
 } else {
   emailError.textContent = "something went wrong, please try later";
 }
}
} catch (err) {
emailError.textContent = "something went wrong, please try later";
}
};

function closeModal(id){
const cancelClick = document.querySelector(`#modal-js-delete-${id}`);

cancelClick.classList.remove('is-active');

}

