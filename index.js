const macroForm = document.getElementById("macroForm");
const breakfastOverlay = document.getElementById("overlay");
const breakfastBtn = document.getElementById("BreakfastMacros");
const closeBtn = document.getElementById("closeForm");

const maxWeightBtn = document.getElementById("maxWeightBtn");
const maxWeightOverlay = document.getElementById("MaxWeightoverlay");
const closeMaxWeightBtn = document.getElementById("closeMaxWeightForm");
const maxWeightForm = document.getElementById("maxWeightForm");


// Helper function to get Auckland date in YYYY-MM-DD format for HTML inputs
function getAucklandDate(daysOffset = 0) {
  const date = new Date();
  if (daysOffset !== 0) {
    date.setDate(date.getDate() + daysOffset);
  }
  
  // Convert to Auckland timezone
  const aucklandDate = new Date(date.toLocaleString("en-US", { timeZone: "Pacific/Auckland" }));
  
  // Format as YYYY-MM-DD
  const year = aucklandDate.getFullYear();
  const month = String(aucklandDate.getMonth() + 1).padStart(2, '0');
  const day = String(aucklandDate.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

const today = getAucklandDate();
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

  const hasValidMacros = protein >= 0 && carbs >= 0 && fat >= 0;
  if (!hasValidMacros) {
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
    const hasEntryForDate = existingEntryIndex !== -1;
    
    let updatedData;
    let actionMessage;
    
    if (hasEntryForDate) {
      existingData[existingEntryIndex] = { 
        ...existingData[existingEntryIndex], 
        ...newEntry 
      };
      updatedData = existingData;
      actionMessage = "updated";
    } else {
     
      updatedData = Array.isArray(existingData) 
        ? [...existingData, newEntry] 
        : [newEntry];
      actionMessage = "logged";
    }

    localStorage.setItem("macroData", JSON.stringify(updatedData));

    console.log(`Macro entry ${actionMessage}:`, newEntry);
    alert(`Macros ${actionMessage} successfully for ${mealDate}! Total calories: ${newEntry.totalCalories}`);

    updateAllVisualizations();

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
  const weightDate = formData.get("weightDate") || getAucklandDate();

  const isValidWeight = maxWeight > 0;
  if (!isValidWeight) {
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
    const hasExistingEntryForDate = matchingEntryIndex !== -1;
    
    let actionMessage;
    
    if (hasExistingEntryForDate) {
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

    
    updateAllVisualizations();

    hideOverlay(overlayElement);
    event.target.reset();
  } catch (error) {
    console.error("Error saving max weight data:", error);
    alert("Failed to save max weight data. Please try again.");
  }
}
setupOverlay(breakfastBtn, breakfastOverlay, closeBtn, macroForm, handleMacroForm);
setupOverlay(maxWeightBtn, maxWeightOverlay, closeMaxWeightBtn, maxWeightForm, handleMaxWeightForm);


function updateAllVisualizations() {

  if (typeof window.renderVisualization === 'function') {
    window.renderVisualization();
  }
  
  if (typeof addDataToTable === 'function') {
    addDataToTable();
  }
}


// Generate 30 days of research-based BREAKFAST macro data for demo purposes
// Based on breakfast nutrition research and meal timing studies
(function generatePast30DaysMacroData() {
      const today = new Date();
      const macroData = [];
      
      // Research-based breakfast assumptions:
      // - Breakfast typically 20-25% of daily calories (400-600 kcal)
      // - Protein: 15-40g per breakfast (research on satiety and muscle protein synthesis)
      // - Carbs: Variable based on training day vs rest day breakfast timing
      // - Fat: 5-20g per breakfast (satiety and hormone production)
      
      for (let i = 0; i < 30; i++) {
            const dateStr = getAucklandDate(-i); // Get date i days ago in Auckland time
            
            const daysSinceStart = 29 - i; // 0 to 29 progression
            const progressFactor = daysSinceStart / 29; // 0 to 1 progression
            
            // Simulate training periodization
            const isTrainingDay = Math.random() < (0.5 + progressFactor * 0.3); // More training days as progress
            const isEarlyTraining = isTrainingDay && Math.random() < 0.7; // 70% of training days are morning
            
            // Research-based breakfast protein (muscle protein synthesis studies)
            // Higher protein breakfasts (25-40g) show better satiety and muscle building
            let proteinBase;
            if (progressFactor < 0.3) {
                // Early phase: Standard breakfast protein
                proteinBase = 15 + Math.random() * 15; // 15-30g
            } else {
                // Later phase: Higher protein focus for performance
                proteinBase = 20 + Math.random() * 20; // 20-40g
            }
            
            let protein = Math.round(proteinBase + (Math.random() * 6 - 3)); // ±3g variation
            
            // Simulate low protein breakfast days (cereal, toast only, etc.)
            if (Math.random() < 0.12) {
                protein = Math.round(5 + Math.random() * 10); // 5-15g (typical low-protein breakfast)
            }
            
            // Research-based breakfast carbohydrates
            let carbBase;
            if (isEarlyTraining) {
                // Pre-training breakfast: Higher carbs for energy (capped at 50g for realistic breakfast)
                carbBase = 30 + Math.random() * 20; // 30-50g
            } else if (isTrainingDay) {
                // Training day but later: Moderate carbs
                carbBase = 20 + Math.random() * 25; // 20-45g
            } else {
                // Rest day: Lower carbs, focus on protein and fat
                carbBase = 10 + Math.random() * 25; // 10-35g
            }
            
            let carbs = Math.round(Math.min(50, carbBase + (Math.random() * 8 - 4))); // ±4g variation, max 50g
            
            // Simulate low-carb breakfast experimentation (eggs, avocado, etc.)
            if (Math.random() < 0.15) {
                carbs = Math.round(2 + Math.random() * 8); // 2-10g (very low carb breakfast)
            }
            
            // Research-based breakfast fat (hormone production and satiety)
            // Higher fat breakfasts improve satiety for 4-6 hours (research)
            let fatBase;
            if (carbs < 15) {
                // Low carb breakfast: Higher fat for satiety
                fatBase = 12 + Math.random() * 15; // 12-27g
            } else {
                // Moderate carb breakfast: Moderate fat
                fatBase = 6 + Math.random() * 12; // 6-18g
            }
            
            let fat = Math.round(Math.max(3, fatBase + (Math.random() * 4 - 2))); // ±2g, min 3g
            
            // Add some deliberate high fat breakfast days (avocado toast, nuts, full fat dairy)
            if (Math.random() < 0.25) { // 25% chance of high fat day
                fat = Math.round(20 + Math.random() * 15); // 20-35g (high fat breakfast)
            }
            
            // Research-based strength progression with macro correlation
            const weeklyGainRate = 0.015 * (1 - progressFactor * 0.7); // Diminishing returns
            const weeksProgressed = progressFactor * 4.3; // ~30 days = 4.3 weeks
            const strengthGain = Math.pow(1 + weeklyGainRate, weeksProgressed);
            
            const baselineMax = 80; // 80kg starting bench press
            const plateauEffect = Math.sin(progressFactor * Math.PI * 2.5) * 1.5; // Natural plateaus
            
            // Macro-based performance modifiers (research: carbs fuel performance, protein aids recovery)
            let nutritionModifier = 0;
            
            // Carb effect on performance (research: higher carbs = better power output)
            if (carbs > 50) {
                nutritionModifier += 3; // High carb days: +3kg performance boost
            } else if (carbs > 30) {
                nutritionModifier += 1.5; // Moderate carb days: +1.5kg boost
            } else if (carbs < 10) {
                nutritionModifier -= 2; // Very low carb days: -2kg (glycogen depletion)
            }
            
            // Protein effect on performance (research: adequate protein supports strength)
            if (protein > 30) {
                nutritionModifier += 1; // High protein days: +1kg (good recovery)
            } else if (protein > 25) {
                nutritionModifier += 0.5; // Moderate high protein: +0.5kg
            } else if (protein < 12) {
                nutritionModifier -= 1.5; // Low protein days: -1.5kg (poor recovery)
            }
            
            // Fat effect (research: very high fat can impair power, adequate fat supports hormones)
            if (fat > 30) {
                nutritionModifier -= 0.5; // Very high fat: slight negative (feeling heavy)
            }
            
            const maxWeight = Math.round(baselineMax * strengthGain + plateauEffect + nutritionModifier + (Math.random() * 1.5 - 0.75));

            const macroCategory = categorizeProteinAndCarbs(protein, carbs);
            const fatCategory = categorizeFats(fat);
            const totalCalories = Math.round(protein * 4 + carbs * 4 + fat * 9);

            macroData.push({
                  protein,
                  carbs,
                  fat,
                  macroCategory,
                  fatCategory,
                  date: dateStr,
                  totalCalories,
                  maxWeight,
                  isTrainingDay // Additional data for analysis
            });
      }
      
      // Sort by date (oldest to newest for better visualization)
      macroData.sort((a, b) => new Date(a.date) - new Date(b.date));
      
      localStorage.setItem("macroData", JSON.stringify(macroData));
      updateAllVisualizations();
})();



