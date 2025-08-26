let registerbtn = document.querySelector(".register-btn");
let fname = document.querySelector(".fname input");
let lname = document.querySelector(".lname input");
let email = document.querySelector(`[type="email"]`);
let password = document.querySelector(`[type="password"]`);
let setName;
let setEmail;
let setPassword;

registerbtn.addEventListener("click", function register(e) {
  e.preventDefault();
  if ( fname.value=="" || lname.value=="" || email.value=="" || password.value=="") {
    alert("Please Complete The Form");
  } else {
    setName = localStorage.setItem("fname", fname.value);
    localStorage.setItem("lname", lname.value);
    setEmail = localStorage.setItem("email", email.value);
    setPassword = localStorage.setItem("password", password.value);
    setTimeout(() => (window.location = "login.html"), 1500);
  }
});
