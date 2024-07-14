let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");

let width = $(".nav-tab").outerWidth();
$(".side-nav-menu").animate({ left: `-${width}px`},0)

$("#open-close-slider").on("click", function () {
    let width = $(".nav-tab").outerWidth();
    let left = $(".side-nav-menu").css("left")
    if (left == "0px") {
        $(".side-nav-menu").animate({ left: `-${width}px` }, 500)
        $("#open-close-slider").addClass("fa-align-justify").removeClass("fa-x")
        $(".links").hide(1000)
    }else{
        $(".side-nav-menu").animate({ left: 0 }, 500)
        $("#open-close-slider").addClass("fa-x").removeClass("fa-align-justify")
        $(".links").slideDown(1000)
    }

});

$(document).ready(() => {
    
    $(".loading-screen").fadeOut(500)
    $("body").css("overflow", "visible")

})

// document.addEventListener('DOMContentLoaded', function() {
//     var shouldRedirectToHome = localStorage.getItem('redirectToHome');

//     if (shouldRedirectToHome === 'true') {
//         localStorage.removeItem('redirectToHome');
//         window.location.href = 'index.html'; 
//     } else {
//         localStorage.setItem('redirectToHome', 'true');
//     }
// });










function displayMeals(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}


function showSearchInputs() {
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    rowData.innerHTML = ""
}
showSearchInputs()

async function searchByName(term) {
    rowData.innerHTML = ""
    $(".loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".loading-screen").fadeOut(300)
}

async function searchByFLetter(term) {
    rowData.innerHTML = ""
    $(".loading-screen").fadeIn(300)
    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".loading-screen").fadeOut(300)

}

async function getMealDetails(mealID) {
    rowData.innerHTML = ""
    $(".loading-screen").fadeIn(300)
    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
    $(".loading-screen").fadeOut(300)

}


function displayMealDetails(meal) {
    
    searchContainer.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = cartoona
}












$("#search").on("click",function(){
    window.location.href = "search.html"
})
$("#category").on("click",function(){
    window.location.href = "category.html"
})
$("#area").on("click",function(){
    window.location.href = "area.html"
})
$("#ingredients").on("click",function(){
    window.location.href = "ingredients.html"
})
$("#contact-us").on("click",function(){
    window.location.href = "contact.html"
})