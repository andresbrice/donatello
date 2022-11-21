//Donatello: donde tus antojos se hacen realidad
// TODO: hacer contador de productos en boton carrito
const arrayProductos = [];
let carrito = [];
const productosContainer = document.getElementById("productosContainer");
const tbody = document.getElementById("tbody");
const abrirCarrito = document.getElementById("abrirCarrito");
const finalizar = document.getElementById("finalizar");
const total = document.getElementById("total");

// EVENTOS
abrirCarrito.onclick = () => {
  mostrarCarrito();
  deshabilitarBoton();
};

finalizar.onclick = () => {
  Swal.fire({
    timer: 3000,
    title: "¡Pedido realizado con éxito!",
    text: "Pronto llegará a tu dirección",
    icon: "success",
    showConfirmButton: false,
  });
  carrito = [];
};

const obtenerProductos = async () => {
  const response = await fetch("productos.json");
  if (!response.ok) throw new Error("WARN", response.status);
  const data = await response.json();
  mostrarProductos(data);
};

obtenerProductos();

const mostrarProductos = (productos) => {
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
          <p class="card-text descripcion">${descripcion}</p>
          <h5 class="card-text">$${precio}</h5>
          <button class="btn btn-success my-3" id="agregar${id}">Añadir</button>
        </div>
      </div>
    `;

    productosContainer.appendChild(card);

    const agregar = document.getElementById(`agregar${id}`);

    agregar.onclick = () => {
      Toastify({
        text: `Se agrego el producto al carrito`,
        duration: 1000,
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
};

const agregarAlCarrito = (id) => {
  const producto = arrayProductos.find((producto) => producto.id === id);
  const existeProducto = carrito.find((producto) => producto.id === id);

  if (existeProducto) {
    existeProducto.cantidad++;
  } else {
    carrito.push(producto);
  }
  mostrarCarrito();
  deshabilitarBoton();
  console.log(carrito);
};

const mostrarCarrito = () => {
  tbody.innerHTML = "";
  carrito.forEach((producto) => {
    const { id, nombre, precio, cantidad } = producto;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        ${nombre}
      </td>
      <td>
        <button class="decrementar" id="decrementar${id}">
          <i class="bi bi-dash-circle"></i>
        </button>
        
        <span class="cantidad">${cantidad}</span>
        
        <button class="incrementar" id="aumentar${id}">
          <i class="bi bi-plus-circle"></i>
        </button>
      </td>
      <td>
        ${precio * cantidad}
      </td>
      <td>
        <button type="button" id="eliminar${id}" class="btn-close" 
        aria-label="Close"></button>
      </td>
    `;

    tbody.appendChild(tr);

    const aumentar = document.getElementById(`aumentar${id}`);
    aumentar.onclick = () => {
      aumentarCantidad(producto.id);
    };

    const decrementar = document.getElementById(`decrementar${id}`);
    decrementar.onclick = () => {
      decrementarCantidad(producto.id);
    };

    const eliminar = document.getElementById(`eliminar${id}`);
    eliminar.onclick = () => {
      Toastify({
        text: `Se elimino el producto del carrito`,
        duration: 1000,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "red",
        },
      }).showToast();

      eliminarProducto(producto.id);

      mostrarCarrito();
    };
  });
  calcularTotal();
};

const aumentarCantidad = (id) => {
  const producto = arrayProductos.find((producto) => producto.id === id);
  producto.cantidad++;
  mostrarCarrito();
};

const decrementarCantidad = (id) => {
  const producto = arrayProductos.find((producto) => producto.id === id);
  if (producto.cantidad > 1) {
    producto.cantidad--;
  } else {
    eliminarProducto(id);
  }
  mostrarCarrito();
};

const eliminarProducto = (id) => {
  const producto = arrayProductos.find((producto) => producto.id === id);
  const index = carrito.indexOf(producto);
  carrito.splice(index, 1);
  producto.cantidad = 1;
  mostrarCarrito();
  deshabilitarBoton();
};

const calcularTotal = () => {
  let totalCompra = 0;
  carrito.forEach((producto) => {
    const { precio, cantidad } = producto;
    totalCompra += precio * cantidad;
  });
  total.innerHTML = `$${totalCompra}`;
};

const deshabilitarBoton = () => {
  carrito.length > 0
    ? (finalizar.disabled = false)
    : (finalizar.disabled = true);
};
