const micro = document.querySelectorAll(".sec__img")

console.log("holaxd")

window.addEventListener('load', function() {

    const cart = document.querySelectorAll('.sec__img');

      const rot = gsap.timeline({ repeat: -1, repeatDelay: 2 });
      rot.to(cart, { rotation: 5, duration: .3 });
      rot.to(cart, { rotation: -10, duration: .6 });
      rot.to(cart, { rotation: 0, duration: .6 });
 
  
      // pos.timeScale(.4);
      // rot.timeScale(.4);
    
  
  });

