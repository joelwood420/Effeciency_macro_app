const macroForm = document.getElementById("macroForm");
const overlay = document.getElementById("overlay");
const breakfastBtn = document.getElementById("BreakfastMacros");
const closeBtn = document.getElementById("closeForm");

// Add event listeners
if (macroForm) {
  macroForm.addEventListener("submit", handleMacroForm);
} else {
  console.error("Missing macroForm element from DOM");
}

// Show overlay when breakfast button is clicked
if (breakfastBtn) {
  breakfastBtn.addEventListener('click', function() {
    overlay.style.display = 'flex';
  });
} else {
  console.error("Missing BreakfastMacros button");
}

// Hide overlay when close button is clicked
if (closeBtn) {
  closeBtn.addEventListener('click', function() {
    overlay.style.display = 'none';
  });
} else {
  console.error("Missing closeForm button");
}

// Hide overlay when clicking outside the form container
if (overlay) {
  overlay.addEventListener('click', function(event) {
    if (event.target === overlay) {
      overlay.style.display = 'none';
    }
  });
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

function handleMacroForm(event) {
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
    const updatedData = Array.isArray(existingData)
      ? [...existingData, newEntry]
      : [newEntry];

    localStorage.setItem("macroData", JSON.stringify(updatedData));

    console.log("Macro entry saved:", newEntry);
    alert(
      `Macros logged successfully! Total calories: ${newEntry.totalCalories}`
    );

    // Hide overlay and reset form after successful submission
    overlay.style.display = 'none';
    event.target.reset();
  } catch (error) {
    console.error("Error saving macro data:", error);
    alert("Failed to save macro data. Please try again.");
  }
}
