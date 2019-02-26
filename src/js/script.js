var pokemonRepository=(function () {
  var repository=[];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  var $modalContainer = document.querySelector('#modal-container');
  var $modalContainer1=document.querySelector('#modal-container1');

  /* showing details properties of pokemon object*/
  function showDetails(item) {
    pokemonRepository.showPleaseWait();
    pokemonRepository.loadDetails(item).then(function () {
    pokemonRepository.hidePleaseWait();
    pokemonRepository.showModal(item);
       });
  }

  /*Created a new modal to display wait message */
  function showPleaseWait()
  {
  /*var $newElement = document.createElement('div');
  $newElement.innerText = 'Please wait..';
  $newElement.setAttribute('id', 'new-id');
  $newElement.getAttribute('id');
   $newElement.classList.add('new-class');
  var $h1 = document.querySelector('h1');
    $h1.appendChild($newElement);*/
   $modalContainer1.innerHTML='';
    var modal1=document.createElement('div');
    modal1.classList.add('modal1');
    var text=document.createElement('p');
    text.innerHTML='please wait its loading';
    modal1.appendChild(text);
    $modalContainer1.appendChild(modal1);
    $modalContainer1.classList.add('is-visible');
  }

    /**
   * Hides "Please wait" overlay. See function showPleaseWait().
   */
  function hidePleaseWait() {
    /*var $elementToRemove = document.querySelector('.new-class');
    $elementToRemove.parentElement.removeChild($elementToRemove);*/
    $modalContainer1.classList.remove('is-visible');
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
    /*adding pointer event to display properties of pokemon*/
    $element.addEventListener('pointerdown', function(event)
    {
      /*Currently showing details for touch and mouse click */
      switch(event.pointerType) {
        case 'touch':
        case 'mouse':
          showDetails(new_element);
      }
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


  function showModal(item) {
    // Clear all existing modal content

    $modalContainer.innerHTML = '';

    var modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal content
    var closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('pointerdown', hideModal);

    var titleName = document.createElement('p');
    titleName.innerText = 'Name:'+ item.name;
    var titleHeight = document.createElement('p');
    titleHeight.innerText = 'Height:'+item.height;
    var titleType=document.createElement('p');
    titleType.innerText='Type:'+ item.types;
    var imgElement=document.createElement('img');
    imgElement.classList.add('responsive');
    imgElement.setAttribute('src',item.imageUrl);
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleName);
    modal.appendChild(titleHeight);
    modal.appendChild(titleType);
    modal.appendChild(imgElement);
    $modalContainer.appendChild(modal);
    $modalContainer.classList.add('is-visible');
  }

  /*To remove the modal display */
  function hideModal() {
    $modalContainer.classList.remove('is-visible');
  }


  /*  To remove the modal display  when Esc is pressed */
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  $modalContainer.addEventListener('pointerdown', (e) => {
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    var target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  });


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
    loadDetails:loadDetails,
    showPleaseWait:showPleaseWait,
    hidePleaseWait:hidePleaseWait,
    showModal:showModal,
    hideModal:hideModal

  };
})();

/*Promise operation for loadList*/
pokemonRepository.loadList().then(function() {
/*DOM Operation: Call addlistItem which manipulates the DOM and insert candidate pokemons */
pokemonRepository.getAll().forEach(function(new_pokemon)
{
  pokemonRepository.addListItem(new_pokemon);
}); });
