let cartItems = document.querySelector(".cart-items .row");

function drawCart(item) {
  if (cartItems) {
    return (cartItems.innerHTML += `
    <div class="col-12 col-lg-6" id="${item.id}">
      <div class="cart-item">
        <div class="itemcart-img">
          <img class="img-fluid" src="${item.imgSrc}" alt="${item.name}">
        </div>
        <div class="itemcart-info flex-fill py-4 px-3">
          <div class="itemcart-name">
            <h3>${item.name}</h3>
            <p>Category: ${item.category}</p>
            <p id="price-${item.id}">Price: ${item.totalPrice} L.E</p>
          </div>
          <div class="cartitem-btns text-center">
            <div class="btns-count">
              <button onclick="subItem(${item.id},this)">-</button><span>${item.count}</span><button onclick="addItem(${item.id},this)">+</button>
            </div>
            <button class="remove-item d-block" id="remove-${item.id}" onclick="removeItem(${item.id})">Remove From Cart</button> 
          </div>
        </div>
      </div>
    </div>`);
  }
}

if (addedItems.length > 0) {
  addedItems.forEach((item) => {
    drawCart(item);
  });
}

function deleteFav(id) {
  let find = favProducts.find((i) => i.id == id);
  if (find) {
    favProducts = favProducts.filter((i) => i.id != id);
    localStorage.setItem("favProducts", JSON.stringify(favProducts));

    let favIcon = document.querySelector(`#love-${id}`);
    if (favIcon) {
      favIcon.className = "fa-regular fa-heart";
    }

    let remove = document.querySelector(`.fav-${find.id}`);
    if (remove) remove.remove();

    return true;
  } else {
    return false;
  }
}

function drawFav(id) {
  let isDeleted = deleteFav(id);
  if (!isDeleted) {
    if (fname) {
      let favItem = products.find((i) => i.id == id);
      if (favItem) {

        let favIcon = document.querySelector(`#love-${id}`);
        if (favIcon) {
          favIcon.className = "fa-solid fa-heart";
        }

        favProducts.push(favItem);
        localStorage.setItem("favProducts", JSON.stringify(favProducts));
        
        if (favItems) {
          favItems.innerHTML += `
    <div class="col-6 col-md-4 col-lg-3 d-flex fav-${favItem.id}">
      <div class="fav-item flex-fill d-flex flex-column">
        <div class="fav-img"><img class="img-fluid" src="${favItem.imgSrc}" alt="${favItem.name}"></div>
        <div class="fav-info">
          <h3>${favItem.name}</h3>
          <p>category: ${favItem.category}</p>
          <i id="love-${favItem.id}" onclick="drawFav(${favItem.id})" class="fa-solid fa-heart"></i>
        </div>
      </div>
    </div>`;
        }
      } 
    } else {
      window.location = "register.html";
    }
  }
}
