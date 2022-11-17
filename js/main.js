//Donatello: donde tus antojos se hacen realidad

const arrayProductos = [];
const carrito = [];
const mas = document.getElementById(`mas`);
const menos = document.getElementById(`menos`);
const productosContainer = document.getElementById("productosContainer");
const carritoContainer = document.getElementById("carritoContainer");
const vaciarCarrito = document.getElementById("vaciarCarrito");
const total = document.getElementById("total");

const obtenerProductos = async () => {
  try {
    const response = await fetch("productos.json");
    if (!response.ok) throw new Error("WARN", response.status);
    const data = await response.json();
    mostrarProductos(data);
  } catch (error) {
    console.log(error);
  }
};

obtenerProductos();

const mostrarProductos = (productos) => {
  try {
    productos.forEach((producto) => {
      arrayProductos.push(producto);
      const { id, nombre, descripcion, precio, imagen } = producto;
      const card = document.createElement("div");
      card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
      card.innerHTML = `
        <div class="card">
          <img src="${imagen}" class="card-img-top imagen-producto" alt="${nombre}">
          <div class="card-body">
            <h4 class="card-title">${nombre}</h3>
            <p class="card-text">${descripcion}</p>
            <h5 class="card-text">$${precio}</h5>
            <button class="btn btn-success my-3" id="boton${id}">Añadir</button>
          </div>
        </div>
      `;

      productosContainer.appendChild(card);

      const boton = document.getElementById(`boton${id}`);

      boton.onclick = () => {
        Toastify({
          text: `Se agrego el producto al carrito`,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "green",
          },
        }).showToast();

        agregarAlCarrito(id);
      };
    });
  } catch (error) {
    console.log(error);
  }
};

// let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const agregarAlCarrito = (id) => {
  const producto = arrayProductos.find((producto) => producto.id === id);
  const existeProducto = carrito.find((producto) => producto.id === id);

  if (existeProducto) {
    existeProducto.cantidad++;
    mostrarCarrito();
  } else {
    carrito.push(producto);
    mostrarCarrito();
    // localStorage.setItem("carrito", JSON.stringify(carrito));
  }
};

const mostrarCarrito = () => {
  carritoContainer.innerHTML = ""; //Para evitar duplicidad en carrito

  carrito.forEach((producto) => {
    const { id, nombre, descripcion, precio, imagen, cantidad } = producto;
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
    card.innerHTML = `
    <div class="card">
      <img src="${imagen}" class="card-img-top imagen-producto" alt="${nombre}">
      <div class="card-body">
      <h4 class="card-title">${nombre}</h3>
        <p class="card-text">${descripcion}</p>
        <p class="card-text"> <button id="menos"><i class="bi bi-dash-circle" ></i></button> ${cantidad} <button id="mas"><i class="bi bi-plus-circle"></i></button></p>
        <h5 class="card-text">$${precio * cantidad}</h5>
        <button class="btn btn-danger my-3" id="eliminar${id}">Eliminar</button>
      </div>
    </div>
    `;

    carritoContainer.appendChild(card);

    const boton = document.getElementById(`eliminar${id}`);
    boton.onclick = () => {
      eliminarProducto(producto.id);
    };
  });
  calcularTotal();
};

const eliminarProducto = (id) => {
  const producto = arrayProductos.find((producto) => producto.id === id);
  const index = carrito.indexOf(producto);
  carrito.splice(index, 1);
  mostrarCarrito();
  // localStorage.setItem("carrito", JSON.stringify(carrito));
};

vaciarCarrito.onclick = () => {
  eliminarTodoElCarrito();
};

const eliminarTodoElCarrito = () => {
  carrito.splice(0, carrito.length);
  mostrarCarrito();
  // localStorage.clear();
};

const calcularTotal = () => {
  let totalCompra = 0;
  carrito.forEach((producto) => {
    const { precio, cantidad } = producto;
    totalCompra += precio * cantidad;
  });
  total.innerHTML = `$${totalCompra}`;
};

// funcion para aumentar la cantidad del producto en el carrito

const aumentar = () => {
  mas.onclick = () => {
    console.log("suma");
    // aumentar(id);
  };
  const producto = arrayProductos.find((producto) => producto.id === id);
  producto.cantidad++;
};
