let login = document.querySelector(".login button");
let register = document.querySelector(".register button");
let logout = document.querySelector(".logout button");

let helloUser = document.querySelector(".hello-user");
let cart = document.querySelector(".cart");
let badge = document.querySelector(".badge");
let fname = localStorage.getItem("fname");

let email = document.querySelector(`[type="email"]`);
let password = document.querySelector(`[type="password"]`);

let productsDiv = document.querySelector(".products .row");
let cartContent = document.querySelector(".cart-content");
let cartitems = document.querySelector(".cart-content div");
let searchby = document.querySelector("#search-selector");
let searchbar = document.querySelector(`[type="search"]`);
let searcbtn = document.querySelector(".search button");
let favSection = document.querySelector("#fav-icon");
let favItems = document.querySelector(".fav-items .row");

let products = [
  {
    id: 1,
    name: "ABS-1082",
    imgSrc: "images/ABS-1082 Black 2,250.jpg",
    category: "Classic",
    price: 2250,
    totalPrice: 2250,
    count: 0,
  },
  {
    id: 2,
    name: "ABS-S63",
    imgSrc: "images/ABS-S63 Black 1,266.jpeg",
    category: "Classic",
    price: 1266,
    totalPrice: 1266,
    count: 0,
  },
  {
    id: 3,
    name: "Dolcara",
    imgSrc: "images/Dolcara 3,665.jpg",
    category: "Classic",
    price: 3665,
    totalPrice: 3665,
    count: 0,
  },
  {
    id: 4,
    name: "Goodyear Welt",
    imgSrc: "images/Goodyear Welt 3,835.jpg",
    category: "Classic",
    price: 3835,
    totalPrice: 3835,
    count: 0,
  },
  {
    id: 5,
    name: "ACTIV AIRFORCE",
    imgSrc: "images/ACTIV AIRFORCE 2,249.jpeg",
    category: "Casual",
    price: 2249,
    totalPrice: 2249,
    count: 0,
  },
  {
    id: 6,
    name: "ADIDAS BREAKNET",
    imgSrc: "images/ADIDAS BREAKNET 3,229.jpeg",
    category: "Casual",
    price: 3229,
    totalPrice: 3229,
    count: 0,
  },
  {
    id: 7,
    name: "ADIDAS BREAKNET",
    imgSrc: "images/ADIDAS BREAKNET 3,999.jpeg",
    category: "Casual",
    price: 3999,
    totalPrice: 3999,
    count: 0,
  },
  {
    id: 8,
    name: "AIRLIFE",
    imgSrc: "images/AIRLIFE  400.jpeg",
    category: "Casual",
    price: 400,
    totalPrice: 400,
    count: 0,
  },
  {
    id: 9,
    name: "AIRLIFE SPORT",
    imgSrc: "images/AIRLIFE SPORT 600.jpeg",
    category: "Sports",
    price: 600,
    totalPrice: 600,
    count: 0,
  },
];

login.addEventListener("click", function () {
  window.location = "login.html";
});
register.addEventListener("click", function () {
  window.location = "register.html";
});

if (fname) {
  login.remove();
  register.remove();
  helloUser.innerHTML = `<span>Hello,${fname}</span>`;
  logout.style.display = "block";
  cart.style.display = "block";
  if (favSection) {
    favSection.style.display = "block";
  }
} else {
  helloUser.remove();
  logout.style.display = "none";
}
logout.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

if (favSection) {
  favSection.addEventListener("click", () => {
    location = "cart.html";
  });
}

let addedItems = localStorage.getItem("addedtocart")
  ? JSON.parse(localStorage.getItem("addedtocart"))
  : [];

function drawUi() {
  let draw = products
    .map(function (item) {
      return `
                        <div class="col-6 col-md-4 col-lg-3 d-flex item-${item.name.replaceAll(" ", "")} item-${item.category.replaceAll(" ", "")}">
                            <div class="product-item flex-fill d-flex flex-column">
                                <div class="product-img">
                                    <img src="${
                                      item.imgSrc
                                    }" alt="${item.name}">
                                    <div class="price"><p>${
                                      item.price
                                    } L.E</p></div>
                                </div>
                                <div class="product-info text-center">
                                    <h3>${item.name}</h3>
                                    <p>Category: ${item.category}</p>
                                </div>
                                <div class="product-btn">
                                    <i id="love-${
                                      item.id
                                    }" onclick="drawFav(${item.id})" class="fa-regular fa-heart"></i>
                                     <button class="add-item" onclick="check(${
                                       item.id
                                     }, this)">Add To Cart</button>
                                     <button class="remove-item" id="remove-${
                                       item.id
                                     }" style="display:none;" onclick="removeItem(${item.id})">Remove From Cart</button>
                                </div>
                            </div>
                        </div>
                        `;
    })
    .join("");
  productsDiv.innerHTML = draw;

  addedItems.forEach(function (i) {
    let removeBtn = document.querySelector(`#remove-${i.id}`);
    if (removeBtn) {
      removeBtn.style.display = "block";
      removeBtn.previousElementSibling.style.display = "none";
    }
  });
}
if (productsDiv) {
  drawUi();
}
let item;

let countcart = addedItems.length;
badge.innerHTML = countcart;

if (addedItems.length > 0) {
  addedItems.forEach((i) => {
    let product = products.find((p) => p.id == i.id);
    if (product) {
      product.count = i.count;
    }
    if (cartitems) {
      return (cartitems.innerHTML += `<div class="choosen-item" id="${product.id}">
                                        <div class="choosen-img"><img class="img-fluid" src="${product.imgSrc}" alt="ABS-1082"></div>
                                        <div class="choosen-info flex-fill">
                                         <div class="choosen-name"><p>${product.name}</p><p id="price-${product.id}">Price: ${product.totalPrice} L.E</p></div>
                                         <div class="btn-count text-center"><button onclick="subItem(${product.id},this)">-</button><span id="badge-${product.id}">${product.count}</span><button onclick="addItem(${product.id},this)">+</button></div>
                                        </div>
                                    </div>`);
    }
    calcPrice(product.id);
    calcTotalPrice();
  });
  updateCart();
}

function addtocart(id, btn) {
  let add = products.find(function (item) {
    return item.id == id;
  });
  add.count++;
  addedItems.push(add);
  localStorage.setItem("addedtocart", JSON.stringify(addedItems));

  if (cartitems) {
    cartitems.innerHTML += `<div class="choosen-item" id="${add.id}">
                                        <div class="choosen-img"><img class="img-fluid" src="${add.imgSrc}" alt="ABS-1082"></div>
                                        <div class="choosen-info flex-fill">
                                         <div class="choosen-name"><p>${add.name}</p><p id="price-${add.id}">Price: ${add.totalPrice} L.E</p></div>
                                         <div class="btn-count text-center"><button onclick="subItem(${add.id},this)">-</button><span id="badge-${add.id}">${add.count}</span><button onclick="addItem(${add.id},this)">+</button></div>
                                        </div>
                                    </div>`;
  }

  let removeBtn = document.querySelector(`#remove-${id}`);
  if (removeBtn) {
    btn.style.display = "none";
    removeBtn.style.display = "block";
  }
  calcPrice(id);
  calcTotalPrice();
}

function check(id, btn) {
  if (fname) {
    addtocart(id, btn);
    updateCart();
  } else {
    window.location = "register.html";
  }
}

let favProducts = localStorage.getItem("favProducts")
  ? JSON.parse(localStorage.getItem("favProducts"))
  : [];

if (favProducts.length > 0) {
  favProducts.forEach((i) => {
    let favItem = products.find((fav) => fav.id == i.id);
    if (favItem) {
      let favIcon = document.querySelector(`#love-${favItem.id}`);
      if (favIcon) {
        favIcon.className = "fa-solid fa-heart";
      }
      if (favItems) {
        return (favItems.innerHTML += ` <div class="col-6 col-md-4 col-lg-3 d-flex fav-${favItem.id}">
                           <div class="fav-item flex-fill d-flex flex-column">
                            <div class="fav-img"><img class="img-fluid" src="${favItem.imgSrc}" alt="${favItem.name}"></div>
                            <div class="fav-info">
                                <h3>${favItem.name}</h3>
                                <p>category: ${favItem.category}</p>
                                <i id="love-${favItem.id}" onclick="drawFav(${favItem.id})" class="fa-solid fa-heart"></i>
                            </div>
                        </div>
                    </div>`);
      }
    }
  });
}

function removeItem(id) {
  let removed = document.getElementById(`${id}`);
  if (removed) {
    removed.remove();
  }

  let item = products.find((p) => p.id == id);
  if (item) {
    item.count = 0;
  }

  let btn = document.getElementById(`remove-${id}`);
  if (btn) {
    btn.style.display = "none";
    btn.previousElementSibling.style.display = "block";
  }

  addedItems = addedItems.filter((item) => item.id != id);
  localStorage.setItem("addedtocart", JSON.stringify(addedItems));

  updateCart();
  calcTotalPrice();
  if (parseInt(badge.innerHTML) <= 0) {
    cartContent.style.display = "none";
    localStorage.removeItem("addedtocart");
  }
}

cart.addEventListener("click", function () {
  if (cartContent.style.display == "block") {
    cartContent.style.display = "none";
  } else {
    if (parseInt(badge.innerHTML) <= 0) {
      cartContent.style.display = "none";
      badge.innerHTML = 0;
    } else {
      cartContent.style.display = "block";
    }
  }
});
function updateCart() {
  let total = addedItems.reduce((sum, current) => sum + current.count, 0);
  badge.innerHTML = total;
  return total;
}
function calcPrice(id) {
  let item = addedItems.find((i) => i.id == id);
  if (item) {
    item.totalPrice = item.price * item.count;
    localStorage.setItem("addedtocart", JSON.stringify(addedItems));
    if (item.totalPrice == 0) {
      removeItem(item.id);
    }
    let updatePrice = document.getElementById(`price-${item.id}`);
    if (updatePrice) {
      updatePrice.innerHTML = `Price: ${item.totalPrice} L.E`;
    }
  }
}

function calcTotalPrice() {
  let total = 0;
  addedItems.forEach((i) => {
    total += i.totalPrice;
  });

  let showprice = document.querySelector(".total-price");
  if (showprice) {
    showprice.innerHTML = `<h4>Total Price: ${total} L.E</h4>`;
  }
}

function addItem(id, btn) {
  let item = products.find((i) => i.id == id);
  let added = addedItems.find((i) => i.id == id);

  if (item && added) {
    item.count++;
    added.count = item.count;
    localStorage.setItem("addedtocart", JSON.stringify(addedItems));
    btn.previousElementSibling.innerHTML = item.count;
    calcPrice(id);
    updateCart();
    calcTotalPrice();
  }
}
function subItem(id, btn) {
  if (parseInt(btn.nextElementSibling.innerHTML) >= 1) {
    let item = products.find((i) => i.id == id);
    let added = addedItems.find((i) => i.id == id);
    if (added && item) {
      item.count--;
      added.count = item.count;
      localStorage.setItem("addedtocart", JSON.stringify(addedItems));
      btn.nextElementSibling.innerHTML = item.count;
      calcPrice(id);
      updateCart();
      calcTotalPrice();
    }
  } else {
    removeItem(id);
  }
}

if (searcbtn) {
  searcbtn.addEventListener("click", function () {
    let s = searchbar.value.trim();
    let flag = true;

    document.querySelectorAll(".products .row .col-6").forEach((i) => {
      i.classList.add("show");
      i.classList.remove("hidden");
    });

    if (s == "") {
      location.reload();
    } else {
      if (searchby.value == "Search By Product Name") {
        let hiddenItems = products.filter(
          (product) => !product.name.toLowerCase().includes(s.toLowerCase())
        );

        hiddenItems.forEach((i) => {
          let searchedItem = document.querySelectorAll(
            `.item-${i.name.replaceAll(" ", "")}`
          );
          searchedItem.forEach((item) => {
            item.classList.add("hidden");
            item.classList.remove("show");
          });
        });

        let find = products.filter((product) =>
          product.name.toLowerCase().includes(s.toLowerCase())
        );
        if (find.length > 0) flag = false;
      } else if (searchby.value == "Search By Category") {
        let hiddenItems = products.filter(
          (product) => !product.category.toLowerCase().includes(s.toLowerCase())
        );

        hiddenItems.forEach((i) => {
          let searchedItem = document.querySelectorAll(
            `.item-${i.category.replaceAll(" ", "")}`
          );
          searchedItem.forEach((item) => {
            item.classList.add("hidden");
            item.classList.remove("show");
          });
        });

        let find = products.filter((product) =>
          product.category.toLowerCase().includes(s.toLowerCase())
        );
        if (find.length > 0) flag = false;
      } else {
        alert("choose method to search");
      }

      if (flag) {
        document.querySelector(".not-found").style.display = "block";
      } else {
        document.querySelector(".not-found").style.display = "none";
      }
    }
  });
}


