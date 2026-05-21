// imports
import { ProtectedRoutes, ActiveNav } from "./global.js";
ProtectedRoutes();
const navLinks = document.querySelectorAll("a.nav-link");
ActiveNav(navLinks);


const passwordInput = document.getElementById("password");
const strengthfill = document.querySelector("div.strength-fill");
const strengthText = document.querySelector("span.strength-text");
const Form = document.getElementById("signupForm");


passwordInput.addEventListener("input", function () {
    const password = this.value;
    const strength = passwordCheckstrength(password);
    strengthfill.style.width = `${strength.percentage}%`;
    strengthfill.className = `strength-fill ${strength.class}`; // classList.add(strength.class);
    strengthText.textContent = strength.Text;
    // console.log(strength.percentage);
    // console.log(strength.class);
    // console.log(strength.Text);

});
const passwordCheckstrength = (password) => {
    let score = 0;
    let feedback = [];

    if (password.length >= 8) {
        score += 25;
    } else {
        feedback.push("at least 8 characters");
    } if (/[a-z]/.test(password)) {
        score += 25;
    } else {
        feedback.push("lowercase letters");
    } if (/[A-Z]/.test(password)) {
        score += 25;
    } else {
        feedback.push("Uppercase letters");
    } if (/[0-9]/.test(password)) {
        score += 25;
    } else {
        feedback.push("numbers");
    } if (score < 50) {
        return {
            percentage: score,
            class: "weak",
            Text: `Week - add ${feedback.join(", ")}`
        };

    } else if (score < 75) {

        return {
            percentage: score,
            class: "medium",
            Text: "medium - Good Password"
        };

    } else {
        return {
            percentage: score,
            class: "strong",
            Text: "Strong Password",
        };

    }

};

const LgUser = localStorage.getItem("Users");
const Users = JSON.parse(LgUser) || [];

// signup form handling
Form.addEventListener("submit", function (e) {
    e.preventDefault();

    // get form data
    const formData = new FormData(Form);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");

    // validation
    if (!firstName || !lastName || !email || !password) {
        alert("please fill in all required fields");
        return;

    }

    const CurrentUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: btoa(password),
    };
     // check if user already exists
    const checkUser = () => {
        const check = Users.filter((user) => user.email === CurrentUser.email);
       return check.length < 1 ? false : true;
    } 
    if (checkUser() === true) {
       swal("This email is already exit!", "please use a different email!", "error");
        return;
    }
    const bntsubmit = document.querySelector('button[type="submit"]');
    bntsubmit.innerHTML = `<i class="fas fa-spinner fa-spin"></i> creating account...`;

    // save user to local storage
    setTimeout(() => {
        Users.push(CurrentUser);
        localStorage.setItem("User", JSON.stringify(CurrentUser));
        localStorage.setItem("Users", JSON.stringify(Users));
         alert("Account created successfully, welcome to FlavorHub!");

         // redirect to Home page after 2 seconds
        window.location.href = "index.html";
    }, 2000);

});
