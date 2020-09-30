const carrousel = document.querySelector('.carrousel');
const carrouselStripe = document.querySelector('.carrousel__stripe');
var btnInteraction = document.querySelectorAll('.btn--interaction');
const img = document.querySelector('.interaction__image');
let current=0;

carrousel.addEventListener('click', function(){
    current++;
    if(current>2){
        current=0;
    }

    carrouselStripe.style.transform ='translate(-'+(1920*current)+'px, 0px)'
    console.log(800*current)

})

function interactionHandle (event){
    var bot = event.target.getAttribute('name');


if(bot=='black'){
    img.setAttribute('src',"./imgs/negro.png");
    



}
if(bot=='white'){
    img.setAttribute('src',"./imgs/white.png");

}
    
}

btnInteraction.forEach(function(elem,index){
  elem.addEventListener('click', interactionHandle)  

})
