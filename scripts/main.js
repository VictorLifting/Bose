const carrousel = document.querySelector('.carrousel');
const carrouselStripe = document.querySelector('.carrousel__stripe');
let btnInteraction = document.querySelectorAll('btn btn--interaction');
let current=0;

carrousel.addEventListener('click', function(){
    current++;
    if(current>3){
        current=0;
    }

    carrouselStripe.style.transform ='translate(-'+(1500*current)+'px, 0px)'
    console.log(800*current)

})

for (let i = 0; i < btnInteraction.length; i++) {
    console.log('holas');
     
    

    

}
