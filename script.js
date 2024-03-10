

const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const cart = document.querySelector(".cart");
const cartArea = document.querySelector(".cart-area");
const addToCart = document.querySelector(".add-to-cart");

let contador = 0;

console.log(contador);
addToCart.addEventListener("click", (e) => {
  contador++;
  const count = document.querySelector(".count");
  const precoFinal = document.querySelector(".precoFinal");
  const newPrice = document.querySelector(".new-price");
  const countFinal = document.querySelector(".countFinal");
  const precoNormal = document.querySelector(".preco-normal");


  fetch("http://localhost:3000/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Fall Limited Edition Sneakers",
      preco: newPrice.textContent,
      quantity: count.textContent,
    }),
  }).then(() => {
    console.log("added to cart");
  });
});

cart.addEventListener("click", (e) => {
  console.log("clicked");
  if (cartArea.style.display === "block") {
    cartArea.style.display = "none";
    return;
  }
  cartArea.style.display = "block";

  if(hamb.style.display === "none"){
    listaMobile.style.display = "none";
    hamb.style.display = "block";
    close.style.display = "none";
  }
});

minus.addEventListener("click", (e) => {
  const count = document.querySelector(".count");
  if (parseInt(count.textContent) <= 0) {
    return;
  } else {
    count.textContent = parseInt(count.textContent) - 1;
  }
});

plus.addEventListener("click", (e) => {
  const count = document.querySelector(".count");
  count.textContent = parseInt(count.textContent) + 1;
});



async function fetchData(e) {
  const carrinhoEstoque = document.querySelector(".grid-cart");
  const response = await fetch("http://localhost:3000/cart");
  const data = await response.json();

  data.forEach((item) => {
    contador += parseInt(item.quantity);
    console.log(contador);
    carrinhoEstoque.innerHTML = `
        <img class="carrinho-tenis" src="./images/image-product-1-thumbnail.jpg" alt="">
            <p class="nameProduct">${item.name}</p>
            <div class="teste">
              <p class="preco-normal">$${item.preco}</p>
    
              <p><span class="countFinal">${contador}x</span> - <span class="precoFinal">$${
      item.preco * contador
    }</span></p>
            </div>
            <img class="close" src="./images/icon-delete.svg" alt="">
            
            <button class="check">Check out</button>
        `;

    const carrinhoVazio = document.querySelector(".carrinhoVazio");
    carrinhoVazio.innerHTML = contador;

    data.forEach((item) => {
      const empty = document.querySelector(".empty");
      if (item.quantity === 0) {
        empty.style.display = "block";
      }
      
      const close = document.querySelector(".close");
      close.addEventListener("click", () => {
        fetch(`http://localhost:3000/cart/${item.id}`, {
          method: "DELETE",
        }).then(() => {
          console.log("removed");
        });
      });
    });
  });
}

fetchData();

function carrinho() {
  const carrinhoVazio = document.querySelector(".carrinhoVazio");

  carrinhoVazio.innerHTML = contador;
}

carrinho();


const hamb = document.getElementById("hamb");
const close = document.getElementById("close");
const listaMobile = document.querySelector(".lista-mobile");

hamb.addEventListener("click", () => {
  listaMobile.classList.remove("active2")
  hamb.style.display = "none";
  close.style.display = "block";
  listaMobile.style.display = "block";
  listaMobile.style.top = "0";
  if (cartArea.style.display === "block") {
    cartArea.style.display = "none";
  }

  listaMobile.classList.add("animacao-menu");
  setTimeout(() => {
    listaMobile.classList.remove("animacao-menu");
  }, 500);
  listaMobile.classList.add("active1")

  close.addEventListener("click", () => {
    listaMobile.classList.remove("active1")
    listaMobile.classList.add("animacao-menu-reverse");
    setTimeout(() => {
      listaMobile.classList.remove("animacao-menu-reverse");
    }, 500);

    listaMobile.classList.add("active2")
    
    listaMobile.style.display = "block";
    hamb.style.display = "block";
    close.style.display = "none";
  });

});

