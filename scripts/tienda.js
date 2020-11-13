
const db = firebase.firestore();
  
const productsList = document.querySelector('.productslist');
const productsRef = db.collection("productos"); 
const loader = document.querySelector(".loader");
let selectedItem = null;

        // Create a root reference
        var storageRef = firebase.storage().ref();


  
  
  // creación de nuevos productos a partir de la lista
  function renderProducts (list) {
    productsList.innerHTML = '';
    list.forEach(function (elem) {
      const newProduct = document.createElement('a');
      newProduct.classList.add('product');
      const url =`producto.html?${elem.id}-${elem.title}`
      newProduct.setAttribute('href', url);
      
    
      newProduct.innerHTML = `
      <img class="product__img" src="${elem.img}" alt="">
      <div class="product__info">
        <h3 class="product__title">${elem.title}</h3>
        <p class="product__price">$ ${elem.price}</p>
        <button class="product__delete hidden showadmin">Eliminar</button>
        <button class="product__edit hidden showadmin">Editar</button>
      </div>
      `;

      if(elem.storageImg) {
          storageRef.child(elem.storageImg).getDownloadURL().then(function(url) {
            // Or inserted into an <img> element:
            var img = newProduct.querySelector('img');
            img.src = url;
          }).catch(function(error) {
            // Handle any errors
          });
       
      }   



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
      });
     
      if(userInfo && userInfo.admin) {
        deleteBtn.classList.remove('hidden');
        editBtn.classList.remove('hidden');
      }
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

  var imagePath ='';


 // 

  const form = document.querySelector('.form');
  form.addEventListener('submit', function (event) {
    event.preventDefault();





//para probar la subida de la imagen
 
  
    const newProduct = {
      title: form.title.value,
      img: form.image.value,
      price: form.price.value,
      storageImg: imagePath
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


  form.imageFile.addEventListener('change', function(){



        // Create a reference to 'mountains.jpg'
            var newImageRef = storageRef.child(`productos/${Math.floor(Math.random()*999999999)}.jpg`);
        
            var file = form.imageFile.files[0];// use the Blob or File API
        
            // Create file metadata including the content type
        
        
        // Upload the file and metadata
        
        
            newImageRef.put(file).then(function(snapshot) {
          console.log('Uploaded a blob or file!');
          imagePath= snapshot.metadata.fullPath
        });
  })


