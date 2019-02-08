var pokemonRepository=(function () {
  var repository=[];

  /* showing details properties of pokemon object*/
  function showDetails(new_element)
  {
    console.log( new_element.name ,  new_element.height , new_element.type );
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
      if( (property == 'name') || (property == 'height') || (property == 'type') )
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

  /*Function retrievs the complete repository*/
  function getAll()
  {
    return repository;
  }

  return  {
    add:add,
    addListItem:addListItem,
    getAll:getAll,
    showDetails:showDetails
  };
})();

/*Declaring candidate Pokemons*/
var pokemon1 ={
  name:"Bulbasaur",
  height:7,
  type:"grass"
};
var pokemon2 ={
  name:"Ivysaur",
  height:6,
  type:"poison"
};
var pokemon3 ={
  name:"Venusaur",
  height:8,
  type:"grass"
};

var pokemon4 ={
  name:"Chikusaur",
  height:4,
  type:"grass",
  age: 10
};

/*Adding candidate Pokemon to the repository*/
pokemonRepository.add(pokemon1);
pokemonRepository.add(pokemon2);
pokemonRepository.add(pokemon3);
pokemonRepository.add(pokemon4);/*not a valid pokemon hence must not be added in the repository*/

/*DOM Operation: Call addlistItem which manipulates the DOM and insert candidate pokemons */
pokemonRepository.getAll().forEach(function(new_element)
{
  pokemonRepository.addListItem(new_element);
});
