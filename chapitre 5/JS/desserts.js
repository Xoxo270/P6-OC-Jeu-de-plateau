
document.querySelector("button").addEventListener("click", function(){
   const nomDessert = prompt("Entrez le nom du nouveau dessert:");

   const dessertElt = document.createElement("li");
   dessertElt.textContent = nomDessert;
   dessertElt.addEventListener("click", function(e) {
     const nouveauNom = prompt("Modifiez le nom du dessert :", e.target.textContent);
     e.target.textContent = nouveauNom;
   });
   document.getElementById("desserts").appendChild(dessertElt);
});