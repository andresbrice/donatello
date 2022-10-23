"use strict";

class Producto {
  constructor(id, nombre, descripcion, precio, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.imagen = imagen;
    this.cantidad = 1;
  }
}

const pizzaMozzarella = new Producto(
  1,
  "Pizza Mozzarella",
  "Pizza grande de mozzarella",
  1950,
  "assets/img/pizzaMozzarella.jpg"
);
const pizzaEspecial = new Producto(
  2,
  "Pizza Especial",
  "Pizza grande de jamón y morrón",
  2180,
  "assets/img/pizzaEspecial.jpg"
);
const pizzaFugazzeta = new Producto(
  3,
  "Pizza Fugazzeta",
  "Pizza grande de fugazzeta",
  2810,
  "assets/img/pizzaFugazzeta.jpg"
);
const pizzaRucula = new Producto(
  4,
  "Pizza Rúcula",
  "Pizza grande de rúcula y parmesano",
  1950,
  "assets/img/pizzaRucula.jpg"
);
const pizzaNapolitana = new Producto(
  5,
  "Pizza Napolitana",
  "Pizza grande napolitana",
  2000,
  "assets/img/pizzaNapolitana.jpg"
);
const pizzaCalabresa = new Producto(
  6,
  "Pizza Calabresa",
  "Pizza grande calabresa",
  2500,
  "assets/img/pizzaCalabresa.jpg"
);
const empanadasJamonQueso = new Producto(
  7,
  "Empanadas de Jamón y Queso",
  "Docena",
  2500,
  "assets/img/empanadas.jpg"
);
const empanadasCarne = new Producto(
  8,
  "Empanadas de Carne",
  "Docena",
  2500,
  "assets/img/empanadas.jpg"
);
const empanadasPollo = new Producto(
  9,
  "Empanadas de Pollo",
  "Docena",
  2500,
  "assets/img/empanadas.jpg"
);

const faina = new Producto(10, "Faina", "Porcion", 180, "assets/img/faina.jpg");

const gaseosa = new Producto(
  11,
  "Gaseosa Coca Cola",
  "2lts",
  500,
  "assets/img/gaseosa.jpg"
);
const cerveza = new Producto(
  12,
  "Cerveza Heineken",
  "1lt",
  300,
  "assets/img/cerveza.jpg"
);

const productos = [
  pizzaMozzarella,
  pizzaEspecial,
  pizzaFugazzeta,
  pizzaRucula,
  pizzaNapolitana,
  pizzaCalabresa,
  empanadasJamonQueso,
  empanadasCarne,
  empanadasPollo,
  faina,
  gaseosa,
  cerveza,
];
console.log(productos);

const carrito = [];

const productosContainer = document.getElementById("productosContainer");

// Funcion para mostrar productos por pantalla dinamicamente
const mostrarProductos = () => {
  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
    card.innerHTML = `
    <div class="card">
      <img src="${producto.imagen}" class="card-img-top imagen-producto" alt="${producto.nombre}">
      <div class="card-body">
        <h4 class="card-title">${producto.nombre}</h3>
        <p class="card-text">${producto.descripcion}</p>
        <h5 class="card-text">$${producto.precio}</h5>
        <button class="btn btn-success" id="boton${producto.id}">Añadir</button>
      </div>
    </div>
    `;

    productosContainer.appendChild(card);
  });
};

mostrarProductos();
