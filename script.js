let users = [];
function showLogin() {
  fetch("https://jsonplaceholder.typicode.com/users/")
    .then((res) => res.json())
    .then((data) => displayUsers(data))
    .catch((err) => console.log(err));
}

function showPosts(id) {
  let str = "<h3>My Post</h3>";
  //console.log(`https://jsonplaceholder.typicode.com/posts/userId=${id}`)
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    .then((res) => res.json())
    .then((data) => {
      data &&
        data.map((value) => {
          str += `
        <b>${value.title}</b>
        <p>${value.body}</p>
        </div>`;
        });
      content.innerHTML = str;
    })
    .catch((err) => console.log(err));
}

function showProfile(id) {
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
      
      let str = `<h3>My Profile</h3><div>
      <b>${data.name}</b>
      <p>${data.email}</p>
      </div>`;
      content.innerHTML = str;
    })
    .catch((err) => console.log(err));
}
function showAlbums(id) {
  fetch(`https://jsonplaceholder.typicode.com/albums?userId=${id}`)
    .then((res) => res.json())
    .then((data) => {
      let str = "<h3>My Albums</h3>";
      data &&
      data.map((value) => {
        str += `<div>
      <b>${value.title}</b>
      </div>`;
      });
      content.innerHTML = str;
    })
    .catch((err) => console.log(err));
}
function toDo(id){
  fetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`)
    .then((res) => res.json())
    .then((data) => {
      let str = "<h3>My ToDos</h3>";
      data &&
      data.map((value) => {
        str += `<div><input type='checkbox' ${value.completed && 'checked' }> 
      <b>${value.title}</b>
      </div>`;
      });
      content.innerHTML = str;
    })
    .catch((err) => console.log(err));

}


function showHome() {
  let userId = selUser.value;
  let userName = selUser.options[selUser.selectedIndex].text;
  let str = `<div>
  <div class=' container-fluid'  >
    <div class='row'>
      <div class='d-flex justify-content-between bg-success text-white '>
        <div class='h1'> WebHouse</div>
        <div class='h2' id='username'>${userName}</div>
      </div>
    </div>
    <div class='d-flex flex-row'>
      <div class='d-flex flex-column col-1 bg-light p-2'>
      <a href='#' class='text-black h3' onclick='showPosts(${userId})'>Home</a>
      <a href='#' class='text-black h3 ' onclick='showAlbums(${userId})'>Albums</a>
      <a href='#' class='text-black h3 ' onclick='toDo(${userId})'>ToDos</a>
      <a href='#' class='text-black h3 ' onclick='showProfile(${userId})'>Profile</a>
      <a href='#' class='text-black h3 ' onclick='showLogin()'>Logout</a>
      </div>
      <div class='d-flex flex-column col-11' id='content'></div>
      </div>
      </div>
      <div class='row'>
      <div class='d-flex justify-content-center bg-success text-white p-5 '>
      <p>@Copyright 2025. All rights reserved.</p>
   
        </div>
      </div>
  </div>`;
  root.innerHTML = str;
  showPosts(userId);
  toDo(userId);

}

function displayUsers(data) {
  let str = `
  <div class='d-flex box justify-content-center p-5'>
  <div class='p-5 text-white'>
  <h2>WebHouse</h2>
  <p>This is the caption of the website.</p>
  </div>
  <div class='p-5'>
  <select class='form-control m-3' id='selUser'>
  <option value='0'>--Select User--</option>`;
  data.map((value) => {
    str += `<option value=${value.id}>${value.name}</option>`;
  });
  str += `</select><p><button class='form-control text-center m-3 btn btn-success' onclick='showHome()'><h4>Log In</h4></button></p></div></div>`;
  root.innerHTML = str;
}
