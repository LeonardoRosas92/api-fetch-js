const tbody = document.querySelector("tbody");
const parrafo = document.querySelector("p");
const crearFila = (user) => {
  const tr = document.createElement("tr");
  tr.classList.add("bg-white", "border-b", "hover:bg-gray-50");
  const td = document.createElement("td");
  td.classList.add("w-4", "p-4");
  const div = document.createElement("div");
  div.classList.add("flex", "items-center", "justify-center");
  div.innerHTML = user.id;

  td.appendChild(div);
  tr.appendChild(td);
  const th = document.createElement("th");
  th.classList.add("flex", "items-center", "px-6", "py-4", "text-gray-900", "whitespace-nowrap");
  const img = document.createElement("img");
  img.classList.add("w-10", "h-10", "rounded-full");
  img.src = user.avatar;
  const div1 = document.createElement("div");
  div1.classList.add("pl-3");
  const div2 = document.createElement("div");
  div2.classList.add("text-base", "font-semibold");
  div2.innerHTML = `${user.first_name} ${user.last_name}`;
  const div3 = document.createElement("div");
  div3.classList.add("font-normal", "text-gray-500");
  div3.innerHTML = user.email;
  div1.appendChild(div2);
  div1.appendChild(div3);

  th.appendChild(img);
  th.appendChild(div1);

  tr.appendChild(th);

  tbody.appendChild(tr);
};
const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};
const crearTabla = (data = []) => {
  removeAllChildNodes(tbody);
  data.forEach(user => {
    crearFila(user);
  });
};
const getUsuariosAsync = async () => {
  const url = "https://reqres.in/api/users?&delay=10";
  const response = await fetch(url);
  const { data } = await response.json();
  return data;
};
const crearStorage = (data) => {
  const timeSesion = Date.now();
  const sesion = { data, timeSesion };
  localStorage.setItem("sesion", JSON.stringify(sesion));
};
const getStorage = () => JSON.parse(localStorage.getItem("sesion"));
const validarSesion = () => {
  const sesion = JSON.parse(localStorage.getItem("sesion"));
  if (sesion) {
    return ((new Date() - new Date(sesion.timeSesion)) / 60000) < 1;
  }
  return null;
};
const mostrarMensaje = (msg) => {
  parrafo.innerText = msg;
};
const getUsuarios = async () => {
  const sesionValida = validarSesion();
  if (sesionValida) {
    console.log("Obtenemos datos de localstorage");
    const sesion = getStorage();
    crearTabla(sesion.data);
    const date = new Date(sesion.timeSesion);
    const hora = `${date.getHours()}:${date.getMinutes() + 1}:${date.getSeconds()}`;
    mostrarMensaje(`Obtenemos datos de localstorage, expiran a las ${hora}`);
  } else {
    console.log("Obtenemos datos de api");
    const data = await getUsuariosAsync();
    crearStorage(data);
    crearTabla(data);
    mostrarMensaje("Obtenemos datos de api");
  }
};

window.getUsuarios = getUsuarios;
getUsuarios(1);
