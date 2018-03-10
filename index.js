const RECIPE_SEARCH_URL = 'https://api.edamam.com/search'; 

function getDataFromFoodApi(searchTerm, callback) {
  const query = {
    q: `${searchTerm}`,
    app_id: '51a032a8',
    app_key: 'd85f821aa086125ecc5ac0981a57b35b',
    from: 0, 
    to: 5
  };
  $.getJSON(RECIPE_SEARCH_URL, query, callback); 
}

function renderWrittenResult(result) {
  return `
  <div>
    <h2> 
      <a class="js-result-name" href="${result.recipe.url}" target = "_blank">${result.recipe.label}</a>   
    </h2>
    <a href="${result.recipe.url}" target="_blank"><img src="${result.recipe.image}"></a>
  </div>
  `; 
}

function displayRecipeData(data) {
  const results = data.hits.map((item,index) => renderWrittenResult(item)); 
  $('.js-search-results-written').html(results); 
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

function renderVideoResult(result) {
  return `
  <div>
    <h2>
    <a class ="js-result-name-video" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">${result.snippet.title}</a> 
    </h2>
    <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><img src="${result.snippet.thumbnails.medium.url}"></a>
  </div>
  `; 
}

function displayVideoData(data) {
  const results = data.items.map((item,index) =>renderVideoResult(item)); 
  $('.js-search-results-video').html(results); 
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault(); 
    const queryTarget = $(event.currentTarget).find('.js-query'); 
    const query = queryTarget.val(); 
    queryTarget.val(""); 
    getDataFromFoodApi(query, displayRecipeData);
    getDataFromVideoApi(query, displayVideoData); 
  }); 
}

$(watchSubmit); 
