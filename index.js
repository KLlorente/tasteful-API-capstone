const RECIPE_SEARCH_URL = 'https://api.edamam.com/search'; 

function getDataFromApi(searchTerm, callback) {
  const query = {
    q: `${searchTerm}`,
    app_id: '51a032a8',
    app_key: 'd85f821aa086125ecc5ac0981a57b35b',
    from: 0, 
    to: 5
  };
  $.getJSON(RECIPE_SEARCH_URL, query, callback); 
}

function renderResult(result) {
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
  const results = data.hits.map((item,index) => renderResult(item)); 
  $('.js-search-results').html(results); 
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault(); 
    const queryTarget = $(event.currentTarget).find('.js-query'); 
    const query = queryTarget.val(); 
    queryTarget.val(""); 
    getDataFromApi(query, displayRecipeData); 
  }); 
}

$(watchSubmit); 
