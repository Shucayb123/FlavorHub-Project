const islogin = () => {
    const User = JSON.parse(localStorage.getItem("User"));
    if (User) {
        return {
            login: true,
            name: User.firstName,
            email: User.email,
        }
    } else {
        return {
            login: false,
        }
    }
}

// navigation handling
const navAction = (elements, userelement) => {

    const auth = islogin();
    if (auth.login === true) {
        elements.forEach((element) => {
            element.style.display = "none";
        });
        userelement.innerHTML = `Welcome 🤝 <span>${auth.name}</span>`;
        userelement.style.display = "block";
    } else {
        elements.forEach((element) => {
            element.style.display = "block";
        });
        userelement.style.display = "none";
    }
};

// logout handling
const logout = (reg, log) => {
    if (islogin().login === true) {
        reg.style.display = "none";
        log.style.display = "block";
        log.addEventListener("click", () => {
            localStorage.removeItem("User");
            window.location.href = "index.html";
        });
    } else {
        log.style.display = "none";
    }
}

// Handling Routers
const ProtectedRoutes = () => {
    if (islogin().login === true) {
        const path = window.location.pathname;
        if (path.endsWith("/login.html") || path.endsWith("/signup.html")) {
            window.location.href = "index.html";
        }
    }
};

// handling activeNav
const ActiveNav = (Links) => {
    Links.forEach((Link) => {
       const path = Link.getAttribute("href");
       console.log(path);
       console.log(window.location.pathname);
        if (window.location.pathname.endsWith(path)) {
            Link.classList.add("active");
        } else {
            Link.classList.remove("active");
        }

    });
};

// Exports
export { islogin, navAction, logout, ProtectedRoutes, ActiveNav };
