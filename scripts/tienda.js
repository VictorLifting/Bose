
const db = firebase.firestore();
const loader = document.querySelector(".loader");
let selectedItem = null;

  
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
        selectedItem =elem;
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

    // Create a root reference
    var storageRef = firebase.storage().ref();

// Create a reference to 'mountains.jpg'
    var newImageRef = storageRef.child('mountains.jpg');

    var file = form.imageFile.files[0];// use the Blob or File API

    // Create file metadata including the content type


// Upload the file and metadata


    newImageRef.put(file).then(function(snapshot) {
  console.log('Uploaded a blob or file!');
});



//para probar la subida de la imagen
return;
  
    const newProduct = {
      title: form.title.value,
      img: form.image.value,
      price: form.price.value
    };

    loader.classList.add("loader--show");



    function handleThen(docRef) {
        
      getProducts();
      form.title.value = '';
      form.image.value = '';
      form.price.value = '';
      selectedItem =null;

  }



  function handleCatch  (error) {
    console.error("Error adding document: ", error);
}

// si existe, es decir que va a editar
    if(selectedItem){
      productsRef.doc(selectedItem.id).set(newProduct).
      then(handleThen)
    .catch(handleCatch);

    }
    else{
      
    //si no existe es porque es un nuevo producto


    productsRef.add(newProduct)
  .then(handleThen)
  .catch(handleCatch);
  }
  });




