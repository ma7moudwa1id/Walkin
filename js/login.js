let email = document.querySelector(`[type="email"]`);
let password = document.querySelector(`[type="password"]`);
let loginbtn = document.querySelector(".login-btn");
let getEmail = localStorage.getItem("email");
let getPassword = localStorage.getItem("password");

loginbtn.addEventListener("click",function(){
    if (
  email.value.trim() &&
  email.value == getEmail &&
  password.value.trim() &&
  password.value == getPassword
) {
  setTimeout(()=>window.location="index.html")
}
else{
    alert("The Email or password Isn't Correct")
}

})