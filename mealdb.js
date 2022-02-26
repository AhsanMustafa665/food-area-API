document.getElementById('error-message').style.display = 'none';

const searchFood = () => {
    const searchFeild = document.getElementById('search-field');
    const searchText = searchFeild.value;
    // clear data
    searchFeild.value = '';
    document.getElementById('error-message').style.display = 'none';
    if (searchText == '') {
        const h2 = document.createElement('h2')
        h2.innerText = `please write something`
        searchText.appendChild(h2)
    }
    else {
        // load data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`

        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals))
            .catch(error => displayError(error));
    }
}
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}




const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result')
    searchResult.textContent = '';
    meals.forEach(meal => {

        const div = document.createElement('div')
        div.innerHTML = `
        <div onclick="loadMealDetail(${meal.idMeal})" class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
            </div>
        </div>`;
        searchResult.appendChild(div)
    })
}
const loadMealDetail = async mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    const res = await fetch(url)
    const data = await res.json();
    displayMealDetail(data.meals[0]);
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayMealDetail(data.meals[0]))
}
const displayMealDetail = meal => {
    console.log(meal);
    const mealDetails = document.getElementById('meal-details')
    mealDetails.textContent = '';
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
        <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
    </div>`;
    mealDetails.appendChild(div)
}
