const RECIPE_SEARCH_URL = 'https://api.edamam.com/search'; 

function getDataFromFoodApi(searchTerm, callback) {
  const query = {
    q: `${searchTerm}`,
    app_id: '51a032a8',
    app_key: 'd85f821aa086125ecc5ac0981a57b35b',
    from: 0, 
    to: 6
  };
  $.getJSON(RECIPE_SEARCH_URL, query, callback); 
}

function renderWrittenResult(result) {
  return `
  <div class="single-result">
    <h2 class ="js-result-name">
      <a href="${result.recipe.url}" target= "_blank">${result.recipe.label}</a>   
    </h2>
  
    <a href="${result.recipe.url}" target="_blank"><img src="${result.recipe.image}" class="thumbnail"></a>
    <div class="ingredientItems">
    <p class="ingredient-ul">Ingredients for this Recipe:
      ${makeUL(result.recipe.ingredientLines)}
      </div
    </p>
    
    <span class='videoIcon' title='Search Similar Video Recipes'> Search Related Video Recipes</span>
  </div>
  `; 
}

function displayRecipeData(data) {
  const results = data.hits.map((item,index) => renderWrittenResult(item)); 
  $('.search-results-written').html(results);
}



//Generate List for ingredient bar? 
function makeUL(array) {
  const list = document.createElement('ul'); 
  
  for(let i=0; i<array.length; i++) {
    const item = document.createElement('li'); 
    item.appendChild(document.createTextNode(array[i])); 
    list.appendChild(item); 
  }
  return list.outerHTML; 
}

//JQUERY FOR VIDEO RECIPES
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = "AIzaSyC9TravZTqMYX7RCCeotUOKvVYR3-oJ4Sg";

function getDataFromVideoApi(searchTerm, callback) {
  const query= {
    part: 'snippet', 
    key: API_KEY, 
    q: `${searchTerm} recipe`,
    maxResults: 5
  }; 
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback); 
}

function vidResult(data) {
  let relatedVideos=``;
  const x = data.items.map((item, i) => {
    //item.snippet.thumbnails.medium.url;
    relatedVideos += 
    `<div class= "videoPopUp">
      <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target = "_blank">
      <img src=' ${item.snippet.thumbnails.medium.url} '>
      </a>
    </div>`;
  });
  $('#vidResult .videoPopUp').remove(); 
  $('#vidResult').append(relatedVideos);
  $('#vidResult').fadeIn(300);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault(); 
    const queryTarget = $(event.currentTarget).find('.js-query'); 
    const query = queryTarget.val(); 
    queryTarget.val(""); 
    getDataFromFoodApi(query, displayRecipeData);
    $('.result-area').show(); 
  }); 
}

document.getElementById('closeButton').addEventListener('click', function(event) {
    event.preventDefault();
    this.parentNode.style.display = 'none';
}, false); 


//jQuery Events
//document.ready(() => 
$('.search-results-written').on('click', '.videoIcon', function() {
    let vidSearch = $('.js-result-name a', event.target.parentElement).text();
    getDataFromVideoApi(vidSearch, vidResult);
  });
  
$(document).ready(function () {
    $('div.hidden').fadeIn(1000).removeClass('hidden');
});
  



$(watchSubmit); 






