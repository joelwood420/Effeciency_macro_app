const macroForm = document.getElementById("macroForm");
const overlay = document.getElementById("overlay");
const breakfastBtn = document.getElementById("BreakfastMacros");
const closeBtn = document.getElementById("closeForm");

const maxWeightBtn = document.getElementById("maxWeightBtn");
const maxWeightOverlay = document.getElementById("MaxWeightoverlay");
const closeMaxWeightBtn = document.getElementById("closeMaxWeightForm");
const maxWeightForm = document.getElementById("maxWeightForm");


const today = new Date().toISOString().split("T")[0];
document.addEventListener("DOMContentLoaded", function () {
  const mealDateInput = document.getElementById("mealDate");
  if (mealDateInput) {
    mealDateInput.max = today;
    mealDateInput.value = today; 
  }
  
  const weightDateInput = document.getElementById("weightDate");
  if (weightDateInput) {
    weightDateInput.max = today;
    weightDateInput.value = today;
    console.log("Weight date set to:", today);
  } else {
    console.log("weightDate input not found");
  }
});

//overlay functions that accept elements as arguments
function showOverlay(overlayElement) {
  if (overlayElement) {
    overlayElement.style.display = "flex";
  }
}

function hideOverlay(overlayElement) {
  if (overlayElement) {
    overlayElement.style.display = "none";
  }
}

function setupOverlay(triggerBtn, overlayElement, closeBtn, formElement, submitHandler) {
  
  if (triggerBtn) {
    triggerBtn.addEventListener("click", function () {
      showOverlay(overlayElement);
      
      if (overlayElement && overlayElement.id === "MaxWeightoverlay") {
        const weightDateInput = document.getElementById("weightDate");
        if (weightDateInput) {
          weightDateInput.max = today;
          weightDateInput.value = today;
        }
      }
    });
  } else {
    console.error("Missing trigger button");
  }

  
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      hideOverlay(overlayElement);
    });
  } else {
    console.error("Missing close button");
  }

  
  if (overlayElement) {
    overlayElement.addEventListener("click", function (event) {
      if (event.target === overlayElement) {
        hideOverlay(overlayElement);
      }
    });
  }

  if (formElement) {
    formElement.addEventListener("submit", function(event) {
      submitHandler(event, overlayElement);
    });
  } else {
    console.error("Missing form element");
  }
}


function categorizeProteinAndCarbs(protein, carbs) {
  if (protein > 25 && carbs < 15) {
    return "High Protein";
  } else if (protein < 15 && carbs > 30) {
    return "High Carb";
  } else {
    return "Balanced";
  }
}

function categorizeFats(fat) {
  if (fat > 20) {
    return "High Fat";
  } else {
    return "Low Fat";
  }
}


function handleMacroForm(event, overlayElement) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const mealDate = formData.get("mealDate");
  const protein = parseFloat(formData.get("protein")) || 0;
  const carbs = parseFloat(formData.get("carbs")) || 0;
  const fat = parseFloat(formData.get("fat")) || 0;

  if (protein < 0 || carbs < 0 || fat < 0) {
    alert("Please enter valid positive numbers for all macros.");
    return;
  }

  const newEntry = {
    protein,
    carbs,
    fat,
    macroCategory: categorizeProteinAndCarbs(protein, carbs),
    fatCategory: categorizeFats(fat),
    date: mealDate,
    totalCalories: Math.round(protein * 4 + carbs * 4 + fat * 9),
  };

  try {
    const existingData = JSON.parse(localStorage.getItem("macroData") || "[]");
    const existingEntryIndex = existingData.findIndex(entry => entry.date === mealDate);
    
    let updatedData;
    let actionMessage;
    
    if (existingEntryIndex !== -1) {
      existingData[existingEntryIndex] = { 
        ...existingData[existingEntryIndex], 
        ...newEntry 
      };
      updatedData = existingData;
      actionMessage = "updated";
    } else {
      // Add new entry
      updatedData = Array.isArray(existingData) 
        ? [...existingData, newEntry] 
        : [newEntry];
      actionMessage = "logged";
    }

    localStorage.setItem("macroData", JSON.stringify(updatedData));

    console.log(`Macro entry ${actionMessage}:`, newEntry);
    alert(`Macros ${actionMessage} successfully for ${mealDate}! Total calories: ${newEntry.totalCalories}`);


    if (typeof window.renderVisualization === 'function') {
      window.renderVisualization();
    }

    hideOverlay(overlayElement);
    event.target.reset();
  } catch (error) {
    console.error("Error saving macro data:", error);
    alert("Failed to save macro data. Please try again.");
  }
}


function handleMaxWeightForm(event, overlayElement) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const maxWeight = parseFloat(formData.get("maxWeight")) || 0;
  const weightDate = formData.get("weightDate") || new Date().toISOString().split("T")[0]; // Use form date or default to today

  if (maxWeight <= 0) {
    alert("Please enter a valid positive number for max weight.");
    return;
  }

  const newEntry = {
    maxWeight,
    date: weightDate,
  };

  try {
    const macroData = JSON.parse(localStorage.getItem("macroData") || "[]");
    const matchingEntryIndex = macroData.findIndex(entry => entry.date === weightDate);
    
    let actionMessage;
    
    if (matchingEntryIndex !== -1) {
      
      macroData[matchingEntryIndex].maxWeight = maxWeight;
      actionMessage = "updated";
    } else {
    

      macroData.push({
        date: weightDate,
        maxWeight: maxWeight
      });
      actionMessage = "logged";
    }

    localStorage.setItem("macroData", JSON.stringify(macroData));

    console.log(`Max weight entry ${actionMessage}:`, newEntry);
    alert(`Max weight ${actionMessage} successfully for ${weightDate}: ${maxWeight} kg`);

    hideOverlay(overlayElement);
    event.target.reset();
  } catch (error) {
    console.error("Error saving max weight data:", error);
    alert("Failed to save max weight data. Please try again.");
  }
}
setupOverlay(breakfastBtn, overlay, closeBtn, macroForm, handleMacroForm);
setupOverlay(maxWeightBtn, maxWeightOverlay, closeMaxWeightBtn, maxWeightForm, handleMaxWeightForm);



