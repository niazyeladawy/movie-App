const API_KEY = "api_key=37ded266a817b10c2533ed925229e1ee";
const BASE_URL = 'https://api.themoviedb.org/3';
let DeURL = '/discover/movie?sort_by=popularity.desc&';
const API_URL = BASE_URL+DeURL+API_KEY;

fetchUrl(API_URL);

let index = 0;

const URLS = ["/movie/now_playing?","/discover/movie?sort_by=popularity.desc&","/movie/top_rated?","/trending/all/day?","/movie/upcoming?"]

async function fetchUrl(URL){
    let result =await fetch(URL);
    result = await result.json();
    console.log(result);
    displayPopular(result.results)
}

function displayPopular(data){
    var temp =''
    for(let i =0; i<data.length ; i++){
        temp += `
            <div class="col-md-4 mb-4">
                <div class="post overflow-hidden position-relative">
                    <img src="https://image.tmdb.org/t/p/original${data[i].poster_path}" class="w-100" alt="">
                    <div class="post-overlay position-absolute   start-0 w-100 h-100 d-flex align-items-center text-center">
                       <div>
                        <h3>${data[i].original_title}</h3>
                        <p>${data[i].overview}</p>
                        <p id="rate">rate: ${data[i].vote_average}</p>
                        <p id="date">${data[i].release_date}</p>
                       </div>
                    </div>
                </div>
            </div>
        `
    }

    $('#movies').html(temp);
}

$("#open").click(function(){
    $(".sidebar").animate({left:'0'},500);
    $(".header-content").animate({marginLeft:"250px"},500);
    $("#open").fadeOut(function(){
        $("#close").fadeIn();
    });
    $(".anchors .item1").animate({ opacity: "1", paddingTop: "25px" }, 1100),
    $(".anchors .item2").animate({ opacity: "1", paddingTop: "25px" }, 1200),
    $(".anchors .item3").animate({ opacity: "1", paddingTop: "25px" }, 1300),
    $(".anchors .item4").animate({ opacity: "1", paddingTop: "25px" }, 1400),
    $(".anchors .item5").animate({ opacity: "1", paddingTop: "25px" }, 1500),
    $(".anchors .item6").animate({ opacity: "1", paddingTop: "25px" }, 1600)
});

$("#close").click(function(){
    $(".sidebar").animate({left:'-250px'},500);
    $(".header-content").animate({marginLeft:"0"},500);
    $("#close").fadeOut(function(){
        $("#open").fadeIn();
    });
    $(".anchors li").animate({ opacity: "1", paddingTop: "500px" }, 500)
});

let sideLinks =  Array.from(document.querySelectorAll(".sideLinks"));
console.log(sideLinks);
category = "";

for(let i=0;i<sideLinks.length ; i++){
    sideLinks[i].addEventListener("click",function(e){
        "Now playing" == (category = e.target.innerHTML) && (fetchUrl(BASE_URL+URLS[0]+API_KEY) ),
        "Popular" == category
            ? (fetchUrl(BASE_URL+URLS[1]+API_KEY) )
            : "Top Rated" == category
            ? (fetchUrl(BASE_URL+URLS[2]+API_KEY) )
            : "Trending" == category
            ? (fetchUrl(BASE_URL+URLS[3]+API_KEY) )
            : "Upcoming" == category && (fetchUrl(BASE_URL+URLS[4]+API_KEY) );
    });

}


let searchWord = document.getElementById("searchWord");
searchWord.addEventListener("keyup",function(e){
    let searchWordValue  = searchWord.value;
    fetchUrl(`https://api.themoviedb.org/3/search/movie?api_key=37ded266a817b10c2533ed925229e1ee&language=en-US&query=${searchWordValue}&page=1&include_adult=false`);

})


let uName = document.getElementById("uName");
let uEmail = document.getElementById("uEmail");
let uPhone = document.getElementById("uPhone");
let uAge = document.getElementById("uAge");
let uPassword = document.getElementById("uPassword");
let uRPassword = document.getElementById("uRPassword");


uName.addEventListener("focusout",validateName)
function validateName(){
    var regex = /^(?!\s*$).+/;
    if(regex.test(uName.value)){
        $("#nameAlert").fadeOut();
        return true;
        
    }
    else{
        $("#nameAlert").fadeIn();
        return false;
    }
}


uEmail.addEventListener("focusout",validateEmail);
function validateEmail() {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(uEmail.value)) {
        $("#emailAlert").fadeOut();
        return true;
    }
    else {
        $("#emailAlert").fadeIn();
        return false;
    }
}

uPhone.addEventListener("focusout",validatePhone)
function validatePhone(){
    var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if(regex.test(uPhone.value)){
        $("#phoneAlert").fadeOut();
        return true;
    }
    else{
        $("#phoneAlert").fadeIn();
        return false;
    }
}

uAge.addEventListener("focusout",validateAge)
function validateAge(){
    var regex = /^(?:1[01][0-9]|120|1[7-9]|[2-9][0-9])$/;
    if(regex.test(uAge.value)){
        $("#ageAlert").fadeOut();
        return true;
       
    }
    else{
        $("#ageAlert").fadeIn();
        return false;
    }
}

uPassword.addEventListener("focusout",validatePassword)
function validatePassword(){
    var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(regex.test(uPassword.value)){
        $("#passwordAlert").fadeOut();
        return true;
    }
    else{
        $("#passwordAlert").fadeIn();
        return false;
    }
}


uRPassword.addEventListener("focusout",validateRPassword)
function validateRPassword(){
    if(uRPassword.value == uPassword.value){
        $("#rPasswordAlert").fadeOut();
        return true;
    }
    else{
        $("#rPasswordAlert").fadeIn();
        return false;
    }
    
}

let button = document.getElementById("submit")

document.getElementById("contact").addEventListener("click", function () {
    validateName()&& validateEmail() && validatePhone() && validateAge()&&validatePassword() &&validateRPassword() ? (button.disabled = !1) : (button.disabled = !0);
});

