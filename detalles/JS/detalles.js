window.onload=()=>{
    let imgGaleria=document.querySelector("#main-product-img")
    let imgs= document.querySelectorAll(".thumb")
    for(let i=0; i<imgs.length;i++){
        imgs[i].addEventListener('click',(evt)=>{
            console.log(evt.target)
            
            imgGaleria.src=evt.target.src.replace("thumbs/","")
            imgs.forEach(item=>{
                item.classList.remove('active')
            })
            evt.target.classList.add('active')
        })
    }
    let size=document.querySelectorAll(".size-btn")
    for(let i=0; i<size.length;i++){
        size[i].addEventListener('click',(evt)=>{
            console.log(evt.target)
            
            size.forEach(item=>{
                item.classList.remove('active')
            })
            evt.target.classList.add('active')
        })
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
    }

    increaseBtn.addEventListener("click", () => {
        let current = parseInt(quantity.value);
        if (current < max) {
            quantity.value = current + 1;
        }
    });

    decreaseBtn.addEventListener("click", () => {
        let current = parseInt(quantity.value);
        if (current > min) {
            quantity.value = current - 1;
        }
    });

    quantity.addEventListener("keydown", (evt) => {
        if (evt.key === "Enter") {
            validateQuantity();
            console.log(quantity.value);
        }
    });
// Precio base del producto
let priceCurrent = document.querySelector(".price .current");
let unitPrice = parseFloat(priceCurrent.textContent.replace("$", ""));
let total = unitPrice;

// Función para calcular total y aplicar descuentos
function calcularTotal() {
  let cant = parseInt(quantity.value);
  let descuento = 0;

  if (cant > 10) {
    descuento = 0.20; // 20%
  } else if (cant > 5) {
    descuento = 0.10; // 10%
  }

  total = unitPrice * cant * (1 - descuento);

  console.log(`Cantidad: ${cant} | Descuento: ${descuento * 100}% | Total: $${total.toFixed(2)}`);
}

calcularTotal();



}