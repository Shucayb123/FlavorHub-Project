//imports
import { ActiveNav, navAction  } from "./global.js";
const cat = window.location.search.split("=")[1];
const title = document.querySelector("h2.section-title");
title.textContent = `${cat} meals list`;
const links = document.querySelectorAll("li.actions");
const name = document.querySelector("li.User");
const grid = document.getElementById("categoriesGrid");
const navLinks = document.querySelectorAll("a.nav-link");
ActiveNav(navLinks);
navAction(links, name);

const api = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`;

const getcatmeals = async () => {
    try {
        const res = await fetch(api);
        const data = await res.json();
        console.log("Meals Data:", data);
        data.meals.forEach(meal => {
            console.log("Meal:", meal);
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `  <div class="card">
            <img
              src="${meal.strMealThumb}"
              alt="${meal.strMeal}"
            />
            <div class="card-content">
              <h3>
                <a href="meal.html?id=${meal.idMeal}"> ${meal.strMeal} </a>
              </h3>
            </div>
          </div>`;
            grid.appendChild(card);
        });
        
}catch (Error) {
        grid.innerHTML = `<p class="Error">${Error.message}</p>`;
    }
}
getcatmeals();