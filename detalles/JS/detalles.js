window.onload = () => {
    let imgGaleria = document.querySelector("#main-product-img");
    let imgs = document.querySelectorAll(".thumb");

    for (let i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener("click", (evt) => {
            imgGaleria.src = evt.target.src.replace("thumbs/", "");
            imgs.forEach((item) => item.classList.remove("active"));
            evt.target.classList.add("active");
        });
    }

    const currentPrice = document.querySelector(".current");
    const oldPrice = document.querySelector(".old");
    const discount = document.querySelector(".discount");

    let basePrice = 25;
    let cantidad = 1;

    let size = document.querySelectorAll(".size-btn");
    for (let i = 0; i < size.length; i++) {
        size[i].addEventListener("click", (evt) => {
            size.forEach((item) => item.classList.remove("active"));
            evt.target.classList.add("active");

            const selectedSize = evt.target.textContent.trim();
            if (selectedSize === "50ml") basePrice = 15;
            else if (selectedSize === "100ml") basePrice = 20;
            else basePrice = 25;

            calcularTotal();
        });
    }

    let decreaseBtn = document.getElementById("decrease");
    let increaseBtn = document.getElementById("increase");
    let quantity = document.getElementById("quantity");
    let min = 1;
    let max = 15;

    function validateQuantity() {
        let value = parseInt(quantity.value);

        if (isNaN(value) || value < min) {
            quantity.value = min;
        } else if (value > max) {
            quantity.value = max;
        }

        cantidad = parseInt(quantity.value);
        calcularTotal();
    }

    increaseBtn.addEventListener("click", () => {
        let current = parseInt(quantity.value);
        if (current < max) {
            quantity.value = current + 1;
            cantidad = current + 1;
            calcularTotal();
        }
    });

    decreaseBtn.addEventListener("click", () => {
        let current = parseInt(quantity.value);
        if (current > min) {
            quantity.value = current - 1;
            cantidad = current - 1;
            calcularTotal();
        }
    });

    quantity.addEventListener("keydown", (evt) => {
        if (evt.key === "Enter") {
            validateQuantity();
        }
    });

    function calcularTotal() {
        let descuento = 0;

        if (cantidad > 10) descuento = 0.2;
        else if (cantidad > 5) descuento = 0.1;

        const total = basePrice * cantidad * (1 - descuento);

        currentPrice.textContent = `$${total.toFixed(2)}`;
        oldPrice.textContent = `$${(basePrice * cantidad).toFixed(2)}`;
        discount.textContent = descuento > 0 ? `${descuento * 100}% OFF` : "Sin descuento";

        console.log(`Cantidad: ${cantidad}, Base: ${basePrice}, Total: ${total}`);
    }

    calcularTotal();
    const btnComentar = document.getElementById("btn-comentar");
const listaComentarios = document.getElementById("lista-comentarios");

const mostrarComentarios = () => {
  let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
  listaComentarios.innerHTML = "";
  comentarios.forEach((c) => {
    const div = document.createElement("div");
    div.classList.add("review");
    let estrellas = "⭐️".repeat(Math.round(c.rating));
    div.innerHTML = `
      <strong>${c.usuario}:</strong> ${c.comentario}
      <br><span>${estrellas} (${c.rating}/5)</span>
    `;
    listaComentarios.appendChild(div);
  });
};

btnComentar.addEventListener("click", () => {
  let usuario = document.getElementById("usuario").value.trim();
  let comentario = document.getElementById("comentario").value.trim();

  if (!usuario || !comentario) {
    alert("Llena los campos faltantes");
    return;
  }

  let randomRating = (Math.random() * 4 + 1).toFixed(1);

  let nuevoComentario = { usuario, comentario, rating: randomRating };
  let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
  comentarios.push(nuevoComentario);

  localStorage.setItem("comentarios", JSON.stringify(comentarios));

  document.getElementById("usuario").value = "";
  document.getElementById("comentario").value = "";

  mostrarComentarios();
});

mostrarComentarios();



};
