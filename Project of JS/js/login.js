// imports
import { ProtectedRoutes, ActiveNav } from "./global.js";
ProtectedRoutes();
const navLinks = document.querySelectorAll("a.nav-link");
ActiveNav(navLinks);

// form validation
const Form = document.getElementById("loginForm");
// get users from local storage
const LgUser = localStorage.getItem("Users");
const Users = JSON.parse(LgUser) || [];


// login form handling
Form.addEventListener("submit", function (e) {
    e.preventDefault();

    // get form data
    const formData = new FormData(Form);
    const email = formData.get("email");
    const password = formData.get("password");

    // validation
    if (!email || !password) {
        alert("please fill in all required fields");
        return;
    }

    // check if user already exists
    const checkUser = () => {
        const check = Users.filter((user) => user.email === email);
        return check.length < 1 ? false : true;
    }
    if (checkUser() === false) {
        swal("This email is not found!", "please use a different email!", "error");
        return;
    }

    // check if password is correct
    const checkPassword = () => {
    const check = Users.filter((user) => user.email === email);
    const User = check[0];
    console.log(User);
     const UserPassword = atob(User.password);
      if (UserPassword === password) {
         const btnsubmit = document.querySelector( 'button[type="submit"]' );
          btnsubmit.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Signing In`;
           btnsubmit.disabled = true;

            // save user info
         swal(
                "Login successful !",
                "Welcome to FlavorHub ",
                "success"
            );
          setTimeout(() => {
          localStorage.setItem( "User", JSON.stringify(User) );

             // redirect to home page
             window.location.href = "index.html";
          }, 2000);

        } else {
           swal(
                "Your password is incorrect",
                "Please use different Email Or signup a new account ...",
                "error"
            );

        }

    };

    checkPassword();
});