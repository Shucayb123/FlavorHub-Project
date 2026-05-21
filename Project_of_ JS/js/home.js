// imports
import { islogin, navAction, logout, ActiveNav } from "./global.js";
const links = document.querySelectorAll("li.actions");
const name = document.querySelector("li.User");
const reg = document.querySelector("a.reg");
const log = document.querySelector("a.log");
const navLinks = document.querySelectorAll("a.nav-link");
navAction(links, name);
logout(reg, log);
ActiveNav(navLinks);

const api = "https://www.themealdb.com/api/json/v1/1/categories.php";
const Grid = document.getElementById("categoriesGrid");
const getcat = async () => {
    try {
        const response = await fetch(api);
        const data = await response.json();
        data.categories.forEach(cat => {
            // console.log("Category:", cat);
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `<div class="card">
            <img
              src="${cat.strCategoryThumb}"
              alt="${cat.strCategory}"
            />
            <div class="card-content">
              <h3>
                <a href="meals.html?cat=${cat.strCategory}"> ${cat.strCategory} </a>
              </h3>
              <p>
                ${cat.strCategoryDescription.substring(1, 60)}
              </p>
            </div>
          </div>`;
            Grid.appendChild(card);
        });
    } catch (error) {
        console.error(error);
        Grid.innerHTML = `<p class="Error">${error.message}</p>`;
    }
}
getcat();
