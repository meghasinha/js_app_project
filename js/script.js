var pokemonRepository=(function () {
  var repository=[];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  /* showing details properties of pokemon object*/
  function showDetails(item)
  {
    pokemonRepository.loadDetails(item).then(function () {
    console.log(item);   });
  }

  /* This function  creats new element and adds into the DOM */
  function addListItem(new_element)
  {
    var $element=document.createElement('li');
    $element.classList.add('myList');
    var $button=document.createElement('button');
    $button.setAttribute('type', 'button');
    /*To add Textual content to DOM element*/
    $button.innerText = new_element.name;
    $element.appendChild($button);
    /* Now, steps for putting the new element in the DOM */
    var $ul = document.querySelector('.pokedox');
    $ul.appendChild($element);
    var $button1 = document.querySelector('button');
    /*adding click event to display properties of pokemon*/
    $element.addEventListener('click', function(event)
    {
     showDetails(new_element);
    });
  }


  /*Function verify candidate Pokemon and Adds verified Pokemons to the repository*/
  function add(new_pokemon)
  {
    var fill_object = 0;
    if(( typeof(new_pokemon) ==='object' ) )
    {
      Object.keys(new_pokemon).forEach(function(property) {
      fill_object = 0;
      if( (property == 'name') || (property == 'detailsUrl') )
      {
        fill_object = 1;
      }
      });
    }
    if(fill_object == 1)
    {
      repository.push(new_pokemon);
    }
  }

/*Getting List of Pokemons from the specified URL */
function loadList()
{
  return fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function (json) {
    json.results.forEach(function (item) {
    var pokemon = {
    name: item.name,
    detailsUrl: item.url
    };
    add(pokemon);
    });
  }).catch(function (e) {
    console.error(e);
  })
}

/*Fetching the details of each element from the specific URL*/
function loadDetails(item)
{
  var url = item.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    // Now we add the details to the item
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = Object.keys(details.types);
  }).catch(function (e) {
    console.error(e);
  });
}

  /*Function retrievs the complete repository*/
  function getAll()
  {
    return repository;
  }

  return  {
    add:add,
    addListItem:addListItem,
    getAll:getAll,
    showDetails:showDetails,
    loadList:loadList,
    loadDetails:loadDetails
  };
})();

/*Promise operation for loadList*/
pokemonRepository.loadList().then(function() {
/*DOM Operation: Call addlistItem which manipulates the DOM and insert candidate pokemons */
pokemonRepository.getAll().forEach(function(new_pokemon)
{
  pokemonRepository.addListItem(new_pokemon);
}); });
