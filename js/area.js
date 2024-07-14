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





async function getArea() {
    document.getElementById("myData").innerHTML = ""
    $(".loading-screen").fadeIn(300)
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    req = await req.json()
    displayArea(req.meals)
    $(".loading-screen").fadeOut(300)

}

getArea()
function displayArea(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    document.getElementById("myData").innerHTML = cartoona
}

let mealsArr =[]
async function getAreaMeals(area) {
    document.getElementById("myData").innerHTML = ""
    $(".loading-screen").fadeIn(300)
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let data = await req.json()
    mealsArr= data.meals
    displayAreaMeals()
    $(".loading-screen").fadeOut(300)
}

function displayAreaMeals(){
    {
        let temp = ''
        mealsArr.forEach((element) => {
            let {idMeal,strMealThumb,strMeal} = element
            temp+=`<div class="col-md-3">
                    <div onclick="getMealDetails(${idMeal})" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${strMealThumb}" alt="">
                        <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                            <h3>${strMeal}</h3>
                        </div>
                    </div>
                </div>`
        })
       document.getElementById("myData").innerHTML = temp
    }
}




async function getMealDetails(mealID) {
    document.getElementById("myData").innerHTML = ""
    $(".loading-screen").fadeIn(300)
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();
    displayMealDetails(respone.meals[0])
    $(".loading-screen").fadeOut(300)

}


function displayMealDetails(meal) {
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

    document.getElementById("myData").innerHTML = cartoona
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