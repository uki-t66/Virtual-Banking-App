(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(r){if(r.ep)return;r.ep=!0;const i=o(r);fetch(r.href,i)}})();let u;document.querySelector("#initial-form"),document.querySelector("#main-bank-page");class v{constructor(e,o,a,r,i,n){this.firstName=e,this.lastName=o,this.email=a,this.type=r,this.accountNumber=i,this.money=n,this.initialDeposit=n}getFullName(){return this.firstName+" "+this.lastName}}const w=(t,e)=>Math.floor(Math.random()*(e-t)+t),B=()=>{const t=document.querySelector("#initial-form");u=new v(t.querySelector("#first-name").value,t.querySelector("#last-name").value,t.querySelector("#email").value,t.querySelector("input[name='userAccountType']:checked").value,w(1,Math.pow(10,8)),parseInt(t.querySelector("#deposit").value)),t.style.display="none",p()};document.addEventListener("DOMContentLoaded",()=>{document.querySelector("#initial-form").addEventListener("submit",e=>{e.preventDefault(),B()})});const k=t=>{const e=document.createElement("div");e.id="bank-page",e.classList.add("grid","place-items-center","h-screen","bg-gray-700");const o=document.createElement("div");o.classList.add("grid","border-gray-500","w-2/3","h-2/5","bg-[#4BA3A1]","px-6","py-4");const a=document.createElement("div");a.classList.add("text-white","flex","flex-col","items-end","space-y-1"),[`Your Name: ${t.firstName} ${t.lastName}`,`Your Bank ID: ${t.accountNumber}`,`Your First Deposit: $${t.initialDeposit.toFixed(2)}`].forEach((l,b)=>{const d=document.createElement("p");d.classList.add("text-xl"),b===0&&d.classList.add("m-0","mt-1"),d.textContent=l,a.appendChild(d)});const i=document.createElement("div");i.classList.add("grid","grid-cols-2","grid-rows-[4rem]","items-center","text-white","bg-red-600","h-16","px-4");const n=document.createElement("p");n.classList.add("justify-self-start","self-center","text-3xl"),n.textContent="Available Balance";const s=document.createElement("p");s.classList.add("justify-self-end","self-center","text-3xl"),s.textContent=`$${t.money.toFixed(2)}`,i.appendChild(n),i.appendChild(s);const c=document.createElement("div");return c.classList.add("grid","grid-cols-3","gap-2"),[{text:"WITHDRAWAL",icon:"fa-wallet",onClick:h},{text:"DEPOSIT",icon:"fa-coins",onClick:x},{text:"COME BACK LATER",icon:"fa-house-chimney",onClick:C}].forEach((l,b)=>{const d=document.createElement("button");d.classList.add("flex","flex-col","items-center","justify-center","bg-[#1A4567]","hover:bg-opacity-75","cursor-pointer"),l.onClick&&d.addEventListener("click",l.onClick);const f=document.createElement("div");f.classList.add("flex","flex-col","items-center","justify-center","gap-3");const y=document.createElement("span");y.classList.add("text-2xl","text-white"),y.textContent=l.text;const g=document.createElement("i");g.classList.add("fa-solid",l.icon,"text-4xl","text-white"),f.appendChild(y),f.appendChild(g),d.appendChild(f),c.appendChild(d)}),o.appendChild(a),o.appendChild(i),o.appendChild(c),e.appendChild(o),e},p=()=>{const t=document.getElementById("main-bank-page"),e=document.getElementById("confirmation-page"),o=document.getElementById("withdraw-page");e&&(e.style.display="none"),o&&(o.style.display="none"),t.innerHTML="",t.appendChild(k(u)),t.style.display="block"},h=()=>{const t=document.getElementById("main-bank-page");t.style.display="none";const e=document.getElementById("withdraw-page");e.innerHTML="";const o=`
        <div id="withdraw" class="bg-gray-700 h-screen w-screen flex justify-center items-center">
            <div class="container grid grid-cols-1 space-y-6 bg-white w-1/2 h-2/3 p-6">
                <div class="container flex justify-center items-center">
                    <h2 class="text-3xl">Please Enter The Withdrawal Amount</h2>
                </div>
                <div class="container w-full grid grid-cols-10 gap-4">
                    ${[100,50,20,10,5,1].map(n=>`
                        <label for="${n}" class="flex items-center justify-center col-span-2 text-xl">$${n}</label>
                        <input type="number" id="${n}" class="border border-black col-span-8 p-2" min="0" value="0">
                    `).join("")}
                </div>
                <div class="container flex items-center justify-center bg-[#1A4567]">
                    <p id="total-amount" class="text-white">$0.00</p>
                </div>
                <div class="container flex items-center justify-center">
                    <a href="#" class="flex items-center justify-center border border-blue-800 text-blue-600 w-1/2 h-2/3 mr-4 rounded font-bold hover:text-white hover:bg-blue-600 hover:transition duration-300 ease-in-out">
                        <button>Go Back</button>
                    </a>
                    <a href="#" class="flex items-center justify-center border border-blue-800 bg-blue-600 w-1/2 h-2/3 rounded font-bold text-white hover:bg-opacity-75 hover:transition duration-300 ease-in-out">
                        <button>Next</button>
                    </a>
                </div>
            </div>
        </div>
    `;e.innerHTML=o,e.style.display="block";const a=()=>{const n=[100,50,20,10,5,1].reduce((s,c)=>{const m=document.getElementById(c.toString());return s+(parseInt(m.value)||0)*c},0);document.getElementById("total-amount").textContent=`$${n.toFixed(2)}`};[100,50,20,10,5,1].forEach(n=>{document.getElementById(n.toString()).addEventListener("input",a)}),e.querySelector("a:first-of-type").addEventListener("click",n=>{n.preventDefault(),e.style.display="none",t.style.display="block"}),e.querySelector("a:last-of-type").addEventListener("click",n=>{n.preventDefault();const s=[100,50,20,10,5,1].map(c=>({denomination:c,count:parseInt(document.getElementById(c.toString()).value)||0}));E(s)})},E=t=>{const e=document.getElementById("withdraw-page");e.style.display="none";const o=document.getElementById("confirmation-page");o.innerHTML="";const a=t.reduce((s,c)=>s+c.denomination*c.count,0),r=`
        <div class="h-screen w-screen flex justify-center items-center bg-gray-700">
            <div class="container grid grid-cols-1 space-y-6 bg-white w-1/2 h-2/3 p-6">
                <div class="container flex justify-center items-center">
                    <h2 class="text-4xl">The money you are going to take is …</h2>
                </div>
                <div class="container flex flex-col justify-between bg-[#1A4567] mx-auto w-2/3 p-2">
                    ${t.map(s=>s.count>0?`<p class="text-2xl flex justify-end border-2 border-white text-white p-2">${s.count} x $${s.denomination}</p>`:"").join("")}
                    <p class="text-2xl flex justify-end text-white p-2">total: $${a.toFixed(2)}</p>
                </div>
                <div class="container flex items-center justify-center">
                    <a href="#" class="flex items-center justify-center border border-blue-800 text-blue-600 w-1/2 h-2/3 mr-4 rounded font-bold hover:text-white hover:bg-blue-600 hover:transition duration-300 ease-in-out">
                        <button>Go Back</button>
                    </a>
                    <a href="#" class="flex items-center justify-center border border-blue-800 bg-blue-600 w-1/2 h-2/3 rounded font-bold text-white hover:bg-opacity-75 hover:transition duration-300 ease-in-out">
                        <button>Confirm</button>
                    </a>
                </div>
            </div>
        </div>
    `;o.innerHTML=r,o.style.display="block",o.querySelector("a:first-of-type").addEventListener("click",s=>{s.preventDefault(),o.style.display="none",h()}),o.querySelector("a:last-of-type").addEventListener("click",s=>{s.preventDefault();const c=t.reduce((m,l)=>m+l.denomination*l.count,0);u.money-=c,p()})},x=()=>{const t=document.getElementById("main-bank-page");t.style.display="none";const e=document.getElementById("deposit-page");e.innerHTML="";const o=`
        <div class="h-screen w-screen flex items-center justify-center bg-gray-700">
            <div class="container grid grid-cols-1 gap-4 w-2/3 bg-white p-6">
                <div class="container flex justify-center items-center ">
                    <h2 class="text-4xl">Please Enter The Deposit Amount</h2>
                </div>
                <div>
                    <input type="text" id="deposit-amount" placeholder="$0" class="border-2 border-gray-300 w-full p-2">
                </div>
                <div class="container flex items-center justify-center">
                    <a href="#" class="flex items-center justify-center border border-blue-800 text-blue-600 w-1/2 h-2/3 p-4 mr-4 rounded font-bold hover:text-white hover:bg-blue-600 hover:transition duration-300 ease-in-out">
                        <button>Go Back</button>
                    </a>
                    <a href="#" class="flex items-center justify-center border border-blue-800 bg-blue-600 w-1/2 h-2/3 p-4 rounded font-bold text-white hover:bg-opacity-75 hover:transition duration-300 ease-in-out">
                        <button>Confirm</button>
                    </a>
                </div>
            </div>
        </div>
    `;e.innerHTML=o,e.style.display="block",e.querySelector("a:first-of-type").addEventListener("click",i=>{i.preventDefault(),e.style.display="none",t.style.display="block"}),e.querySelector("a:last-of-type").addEventListener("click",i=>{i.preventDefault();const n=parseFloat(document.getElementById("deposit-amount").value.replace("$",""));if(isNaN(n)||n<=0){alert("Please enter a valid deposit amount.");return}L(n)})},L=t=>{const e=document.getElementById("deposit-page");e.style.display="none";const o=document.getElementById("deposit-confirmation-page");o.innerHTML="";const a=`
        <div class="h-screen w-screen flex items-center justify-center bg-gray-700">
            <div class="container grid grid-cols-1 gap-4 w-2/3 bg-white p-6">
                <div class="container flex justify-center items-center">
                    <h2 class="text-4xl">Confirm Your Deposit</h2>
                </div>
                <div class="container flex flex-col justify-between bg-[#1A4567] mx-auto w-2/3 p-4">
                    <p class="text-2xl text-white text-center">You are about to deposit:</p>
                    <p class="text-3xl text-white text-center font-bold">$${t.toFixed(2)}</p>
                </div>
                <div class="container flex items-center justify-center">
                    <a href="#" class="flex items-center justify-center border border-blue-800 text-blue-600 w-1/2 h-2/3 p-4 mr-4 rounded font-bold hover:text-white hover:bg-blue-600 hover:transition duration-300 ease-in-out">
                        <button>Go Back</button>
                    </a>
                    <a href="#" class="flex items-center justify-center border border-blue-800 bg-blue-600 w-1/2 h-2/3 p-4 rounded font-bold text-white hover:bg-opacity-75 hover:transition duration-300 ease-in-out">
                        <button>Confirm</button>
                    </a>
                </div>
            </div>
        </div>
    `;o.innerHTML=a,o.style.display="block",o.querySelector("a:first-of-type").addEventListener("click",n=>{n.preventDefault(),o.style.display="none",x()}),o.querySelector("a:last-of-type").addEventListener("click",n=>{n.preventDefault(),u.money+=t,p()})},C=()=>{const t=document.getElementById("main-bank-page");t.style.display="none";const e=document.getElementById("come-back-later-page");e.innerHTML="";const o=`
        <div class="h-screen w-screen flex items-center justify-center bg-gray-700">
            <div class="container grid grid-cols-1 gap-4 w-2/3 bg-white p-6">
                <div class="container flex justify-center items-center">
                    <h2 class="text-4xl">Come Back Later</h2>
                </div>
                <div>
                    <label for="days-away" class="block text-sm font-medium text-gray-700">Number of days to come back later:</label>
                    <input type="number" id="days-away" min="1" class="mt-1 block w-full border-2 border-gray-300 p-2" placeholder="Enter number of days">
                </div>
                <div class="container flex items-center justify-center">
                    <a href="#" class="flex items-center justify-center border border-blue-800 text-blue-600 w-1/2 h-2/3 p-4 mr-4 rounded font-bold hover:text-white hover:bg-blue-600 hover:transition duration-300 ease-in-out">
                        <button>Go Back</button>
                    </a>
                    <a href="#" class="flex items-center justify-center border border-blue-800 bg-blue-600 w-1/2 h-2/3 p-4 rounded font-bold text-white hover:bg-opacity-75 hover:transition duration-300 ease-in-out">
                        <button>Confirm</button>
                    </a>
                </div>
            </div>
        </div>
    `;e.innerHTML=o,e.style.display="block",e.querySelector("a:first-of-type").addEventListener("click",i=>{i.preventDefault(),e.style.display="none",t.style.display="block"}),e.querySelector("a:last-of-type").addEventListener("click",i=>{i.preventDefault();const n=parseInt(document.getElementById("days-away").value);if(isNaN(n)||n<=0){alert("Please enter a valid number of days.");return}j(n)})},j=t=>{const a=u.money*.00027397260273972606*t,r=u.money+a;u.money=r,alert(`You've earned $${a.toFixed(2)} in interest. Your new balance is $${r.toFixed(2)}.`),p()};
