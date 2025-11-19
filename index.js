document.getElementById("macroForm").addEventListener("submit", handleMacroForm);




function categorizeProteinAndCarbs(protein, carbs,) {
   if (protein > 25 && carbs < 15){
         return "High Protein";
   }
   else if (protein < 15 &&  carbs > 30){
         return "High Carb";
   }
   else {
         return "Balanced";
   }
}



function categorizeFats(fat) {
   if (fat > 20) {
         return "High Fat";
   }
   else {
         return "Low Fat";
   }
}



function handleMacroForm(event) {
   event.preventDefault();

   const protein = parseFloat(document.getElementById("protein").value);
   const carbs = parseFloat(document.getElementById("carbs").value);
   const fat = parseFloat(document.getElementById("fat").value);

   let macroCategory = categorizeProteinAndCarbs(protein, carbs);
   let fatCategory = categorizeFats(fat);

        console.log(macroCategory);
        console.log(fatCategory);


        
}




