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
var maxHeight=7;

for( var i = 0 ; i < repository.length ; i++ )
{
  if( repository[i].height > maxHeight)
  {
    document.write( repository[i].name + "\n" + "(" + "height:" + "\n" + repository[i].height + ")-Wow that's too big!" );
    document.write( "<br>" );
  }
  else
  {
    document.write( repository[i].name + "\n" + "(" + "height:" + "\n" + repository[i].height + ")" );
    document.write( "<br>" );
  }
}
