(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const m=document.querySelector("tbody"),p=document.querySelector("p"),f=e=>{const t=document.createElement("tr");t.classList.add("bg-white","border-b","hover:bg-gray-50");const n=document.createElement("td");n.classList.add("w-4","p-4");const r=document.createElement("div");r.classList.add("flex","items-center","justify-center"),r.innerHTML=e.id,n.appendChild(r),t.appendChild(n);const s=document.createElement("th");s.classList.add("flex","items-center","px-6","py-4","text-gray-900","whitespace-nowrap");const o=document.createElement("img");o.classList.add("w-10","h-10","rounded-full"),o.src=e.avatar;const a=document.createElement("div");a.classList.add("pl-3");const i=document.createElement("div");i.classList.add("text-base","font-semibold"),i.innerHTML=`${e.first_name} ${e.last_name}`;const c=document.createElement("div");c.classList.add("font-normal","text-gray-500"),c.innerHTML=e.email,a.appendChild(i),a.appendChild(c),s.appendChild(o),s.appendChild(a),t.appendChild(s),m.appendChild(t)},g=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},d=(e=[])=>{g(m),e.forEach(t=>{f(t)})},h=async()=>{const t=await fetch("https://reqres.in/api/users?&delay=10"),{data:n}=await t.json();return n},y=e=>{const t=Date.now(),n={data:e,timeSesion:t};localStorage.setItem("sesion",JSON.stringify(n))},b=()=>JSON.parse(localStorage.getItem("sesion")),w=()=>{const e=JSON.parse(localStorage.getItem("sesion"));return e?(new Date-new Date(e.timeSesion))/6e4<1:null},l=e=>{p.innerText=e},u=async()=>{if(w()){console.log("Obtenemos datos de localstorage");const t=b();d(t.data);const n=new Date(t.timeSesion),r=`${n.getHours()}:${n.getMinutes()+1}:${n.getSeconds()}`;l(`Obtenemos datos de localstorage, expiran a las ${r}`)}else{console.log("Obtenemos datos de api");const t=await h();y(t),d(t),l("Obtenemos datos de api")}};window.getUsuarios=u;u();