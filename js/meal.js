// imports
import { islogin, navAction } from "./global.js";
// elements
const container = document.querySelector("div.container");
const Mealcard = document.querySelector("div.meal-card");
const links = document.querySelectorAll("li.actions");
const name = document.querySelector("li.User");
const mealId = window.location.search.split("=")[1];
navAction(links, name);
// protect Meal route
if (islogin().login === false) {
    window.location.href = "login.html";
}
const Api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

const getmeal = async () => {
    try {
        const res = await fetch(Api);
        const data = await res.json();
        const meal = data.meals[0];
        const ingredients = Object.keys(meal).filter((key) => key.startsWith("strIngredient") && meal[key])
          .map((key) => meal[key]);
        console.log(meal);
        Mealcard.innerHTML = ` 
          <div class="img">
          <img
            src="${meal.strMealThumb}"
            alt="${meal.strMeal}"
          />
        </div>
        <div class="meal-info">
          <h2 class="meal-title">${meal.strMeal}</h2>
          <h3>Instructions</h3>
          <p class="instructions">
            ${meal.strInstructions.substring(0, 300)}...
          </p>
          <p><b>Category:</b> ${meal.strCategory}</p>
          <p><b>Area:</b> ${meal.strArea}</p>
          <div class="ingredients">
            <h3>Ingredients</h3>
            <ul>
              ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")} 
            </ul>
          </div>
          <a
            class="youtube-link"
            href="${meal.strYoutube}"
            target="_blank"
          >
            ▶ Watch on YouTube
          </a>
        </div>`;
    }catch (Error) {
        console.error("Error fetching meal data:", Error);
    }
}
getmeal();