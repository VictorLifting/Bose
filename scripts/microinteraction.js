const micro = document.querySelectorAll(".sec__img")

console.log("holaxd")

window.addEventListener('load', function() {

    const cart = document.querySelectorAll('.sec__img');



  
      const rot = gsap.timeline({  });
      rot.to(cart, { rotation: 20, duration: .3 });
      rot.to(cart, { rotation: -40, duration: .6 });
      rot.to(cart, { rotation: 0, duration: .6 });
      pos.delay(.06);
  
      // pos.timeScale(.4);
      // rot.timeScale(.4);
    
  
  });

