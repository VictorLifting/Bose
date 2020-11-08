const firebaseConfig = {
  apiKey: "AIzaSyCpN03-M6EEOmqPg1oJYmrDsQlc3KgpEcY",
  authDomain: "bose-7ede1.firebaseapp.com",
  databaseURL: "https://bose-7ede1.firebaseio.com",
  projectId: "bose-7ede1",
  storageBucket: "bose-7ede1.appspot.com",
  messagingSenderId: "483009449933",
  appId: "1:483009449933:web:ebec51372b0376fb3f7e84",
  measurementId: "G-027XFDSE3N"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const loader = document.querySelector(".loader");

  
  const productsList = document.querySelector('.productslist');
  const productsRef = db.collection("productos");
  
  
  // creación de nuevos productos a partir de la lista
  function renderProducts (list) {
    productsList.innerHTML = '';
    list.forEach(function (elem) {
      const newProduct = document.createElement('article');
      newProduct.classList.add('product');
      
    
      newProduct.innerHTML = `
      <img class="product__img" src="${elem.img}" alt="">
      <div class="product__info">
        <h3 class="product__title">${elem.title}</h3>
        <p class="product__price">$ ${elem.price}</p>
        <button class="product__delete">Eliminar</button>
        <button class="product__edit">Editar</button>
      </div>
      `;
      //eliminar producto
      const deleteBtn = newProduct.querySelector('.product__delete');

      deleteBtn.addEventListener('click',function(){
  
  
        productsRef.doc(elem.id).delete().then(function() {
            getProducts();
  
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        })
      

      productsList.appendChild(newProduct);

      const editBtn = newProduct.querySelector('.product__edit');
      editBtn.addEventListener('click',function(){
        form.title.value=elem.title;
        form.image.value=elem.img;
        form.price.value=elem.price;
      })
     
      
    });
   
  }

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


 // 

  const form = document.querySelector('.form');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
  
    const newProduct = {
      title: form.title.value,
      img: form.image.value,
      price: form.price.value
    };

    loader.classList.add("loader--show");

    productsRef.add(newProduct)
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      getProducts();
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });

  });




