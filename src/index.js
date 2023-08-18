const tbody = document.querySelector("tbody");

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
const getUsuarios = async (page = 1) => {
  const url = `https://reqres.in/api/users?page=${page}&delay=3`;
  const response = await fetch(url);
  const { data } = await response.json();
  removeAllChildNodes(tbody);
  data.forEach(async user => await crearFila(user));
};
window.getUsuarios = getUsuarios;
getUsuarios(1);
