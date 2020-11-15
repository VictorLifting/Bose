
const db = firebase.firestore();
  
const productsList = document.querySelector('.productslist');
var userId = localStorage.getItem("userId");
const productsRef = db.collection('users').doc(userId).collection('carrito')
var totalPrice = 0;
const loader = document.querySelector(".loader");
const total =document.querySelector(".total");
let selectedItem = null;

        // Create a root reference
        var storageRef = firebase.storage().ref();


  
  
  // creación de nuevos productos a partir de la lista
  function renderProducts (list) {
    productsList.innerHTML = '';
    list.forEach(function (elem) {
      const newProduct = document.createElement('div');
      newProduct.classList.add('product');
      const url =`producto.html?${elem.id}-${elem.title}`
      newProduct.setAttribute('href', url);
      
    
      newProduct.innerHTML = `
 
     
      
      <div class="product__info">
        <h3 class="product__title">${elem.title}</h3>
        <p class="product__price">$ ${elem.price}</p>
        </div>

      `;
      
      productsList.appendChild(newProduct);

      parseInt(elem.price);
      totalPrice += elem.price;

      console.log(totalPrice)

    });
   
  }
 // console.log(elem.price)

    //leer los productos de firebase

  function getProducts(){

    productsRef.get().then((querySnapshot) => {
      var objects = [];
      querySnapshot.forEach((doc) => {
          const obj = doc.data();
          obj.id= doc.id;
          objects.push(obj);
          console.log(`${doc.id} => ${doc.data()}`);
      });
      renderProducts(objects);
     loader.classList.remove("loader--show")
  });

  }

  getProducts();

  var imagePath ='';


 // 




