var pokemonRepository=(function () {
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

  var repository=[pokemon1,pokemon2,pokemon3];
  var count_property = 0;


  function add(repositorys)
  {
    var fill_object = 0;
    if(( typeof(repositorys) ==='object' ) )
    {
      Object.keys(repositorys).forEach(function(property) {
      fill_object = 0;
      if( (property == 'name') || (property == 'height') || (property == 'type') )
      {
        fill_object = 1;
      }
      });
    }
    if(fill_object == 1)
    {
      repository.push(repositorys);
    }
  }
  function getAll()
  {
    return repository;
  }
  return{
    add:add,
    getAll:getAll
  };
})();


var pokemon4 ={
  name:"Charmander",
  height:8,
  type:"grass"
};

pokemonRepository.add(pokemon4);

pokemonRepository.getAll().forEach(function(element)
{
  if( element.height > 7)
  {
    document.write( element.name + "\n" + "(" + "height:" + "\n" + element.height + ")-Wow that's too big!" );
    document.write( "<br>" );
  }
  else
  {
    document.write( element.name + "\n" + "(" + "height:" + "\n" + element.height + ")" );
    document.write( "<br>" );
  }

});
