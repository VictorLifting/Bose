
const db = firebase.firestore();
const admin =document.querySelector('.auth__profile')
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
      const newProduct = document.createElement('div');
      newProduct.classList.add('product');
      const url =`producto.html?${elem.id}-${elem.title}`
      newProduct.setAttribute('href', url);
      
    
      newProduct.innerHTML = `
      <a href="${url}" class="link" >
      <img class="product__img" src="${elem.img}" alt="">
      </a>
      <a href="${url}" class="link">
      <div
        <h3 class="product__title">${elem.title}</h3>
        <p class="product__price">$ ${elem.price}</p>
        <p class=""> ${elem.type}</p>
        <p class=""> ${elem.conectivity}</p>

        <div>
        </a>
        
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
        //form.image.value=elem.img;
        form.price.value=elem.price;
        selectedItem =elem;
      });
     
      if(userInfo && userInfo.admin) {
        deleteBtn.classList.remove('hidden');
        editBtn.classList.remove('hidden');


        admin.setAttribute('href', "index.html");

      }


    });
   
  }

    //leer los productos de firebase
 let objectsList =[]
  function getProducts(){

    productsRef.get().then((querySnapshot) => {
       objectsList = [];
      querySnapshot.forEach((doc) => {
          const obj = doc.data();
          obj.id= doc.id;
          objectsList.push(obj);
          console.log(`${doc.id} => ${doc.data()}`);
      });
      renderProducts(objectsList);
     //loader.classList.remove("loader--show")
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
     // img: form.image.value,
      price: form.price.value,
      details: form.details.value,
      type: form.type.value,
      conectivity: form.conectivity.value,
      color: form.color.value, 
      storageImg: imagePath,
     
    };

  //  loader.classList.add("loader--show");



    function handleThen(docRef) {
        
      getProducts();
      form.title.value = '';
      //form.image.value = '';
      form.price.value = '';  
      form.details.value = '';
      form.type.value = '';
      form.conectivity.value = '';
      form.color.value = '';
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
            var newImageRef = storageRef.child(`productos/${Math.floor(Math.random()*999999999)}.png`);
        
            var file = form.imageFile.files[0];// use the Blob or File API
        
            // Create file metadata including the content type
        
        
        // Upload the file and metadata
        
        
            newImageRef.put(file).then(function(snapshot) {
          console.log('Uploaded a blob or file!');
          imagePath= snapshot.metadata.fullPath
        });
  })

  //filtros

  const filterForm = document.querySelector('.filterform');
  filterForm.addEventListener('input', function() {
  
    let copy = objectsList.slice();
  
    const order = filterForm.order.value;
    switch(order){
      case 'price_asc':
        copy.sort(function(a, b){
          return a.price - b.price;
        });
        break;
      case 'price_desc':
        copy.sort(function(a, b){
          return b.price - a.price;
        });
        break;

        case 'alfabeticA':
          copy.sort(function (a, b) {
            return a.title.localeCompare(b.title);
          });
          break;

          case 'alfabeticZ':
            copy.sort(function (a, b) {
              return b.title.localeCompare(a.title);
            });
            break;

    }
    
    
    const typeFilter = filterForm.type.value;
    if(typeFilter != '') {
      copy = copy.filter(function(elem){
        if(elem.type===typeFilter) {
          return true;
        }
        return false;
      });
    }

 
    const conectivityFilter = filterForm.conectivity.value;
    if(conectivityFilter != '') {
      copy = copy.filter(function(elem){
        if(elem.conectivity===conectivityFilter) {
          return true;
        }
        return false;
      });
    }

    const colorFilter = filterForm.color.value;
    if(colorFilter != '') {
      copy = copy.filter(function(elem){
        if(elem.color===colorFilter) {
          return true;
        }
        return false;
      });
    }
    

    //nuevo
    /*
    if(nameFilter != '') {
      copy = copy.filter(function(elem){
        if(elem.conectivity.toLowerCase().includes(nameFilter)) {
          return true;
        }
        return false;
      });
    }
    */

    
  /*
    const price = filterForm.price.value;
    if(price) {
      copy = copy.filter(function(elem) {
        if(elem.price < parseInt(price)) {
          return true;
        }
      });
     
    }
  */
    renderProducts(copy);
  });



/*
  const filterForm = document.querySelector('.filter');
  filterForm.addEventListener('input', function() {
  
    let copy = objectsList.slice();
  



    if(nameFilter != '') {
      copy = copy.filter(function(elem){
        if(elem.conectivity.toLowerCase().includes(nameFilter)) {
          return true;
        }
        return false;
      });
    }




  
    renderProducts(copy);
  });
*/