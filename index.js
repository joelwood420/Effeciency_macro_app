const macroForm = document.getElementById("macroForm");
const overlay = document.getElementById("overlay");
const breakfastBtn = document.getElementById("BreakfastMacros");
const closeBtn = document.getElementById("closeForm");

// Overlay for breakfast macros form
function showOverlay(element) {
  element.style.display = "flex";
}

if (breakfastBtn) {
  breakfastBtn.addEventListener("click", function () {
    showOverlay(overlay);
  });
}

function hideOverlay() {
  overlay.style.display = "none";
}

if (closeBtn) {
  closeBtn.addEventListener("click", function () {
    hideOverlay();
  });
}

// // Overlay for Max Weight Lifted form
const maxWeightBtn = document.getElementById("maxWeightBtn");
const maxWeightOverlay = document.getElementById("MaxWeightoverlay");
const closeMaxWeightBtn = document.getElementById("closeMaxWeightForm");

function showMaxWeightOverlay() {
  maxWeightOverlay.style.display = "flex";
}

if (maxWeightBtn) {
  maxWeightBtn.addEventListener("click", function () {
    showMaxWeightOverlay();
  });
}

function hideMaxWeightOverlay() {
  maxWeightOverlay.style.display = "none";
}

if (closeMaxWeightBtn) {
  closeMaxWeightBtn.addEventListener("click", function () {
    hideMaxWeightOverlay();
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


// Handle Macro Form Submission
if (macroForm) {
  macroForm.addEventListener("submit", handleMacroForm);
} else {
  console.error("Missing macroForm element from DOM");
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
    overlay.style.display = "none";
    event.target.reset();
  } catch (error) {
    console.error("Error saving macro data:", error);
    alert("Failed to save macro data. Please try again.");
  }
}

// Handle Max Weight Form Submission
const maxWeightForm = document.getElementById("maxWeightForm");

if (maxWeightForm) {
  maxWeightForm.addEventListener("submit", handleMaxWeightForm);
} else {
  console.error("Missing maxWeightForm element from DOM");
}

function handleMaxWeightForm(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const maxWeight = parseFloat(formData.get("maxWeight")) || 0;

  if (maxWeight <= 0) {
    alert("Please enter a valid positive number for max weight.");
    return;
  }

  const newEntry = {
    maxWeight,
    date: new Date().toISOString().split("T")[0], // Current date
  };

  try {
    const existingData = JSON.parse(
      localStorage.getItem("maxWeightData") || "[]"
    );
    const updatedData = Array.isArray(existingData)
      ? [...existingData, newEntry]
      : [newEntry];

    //push new data into macroData that has the matching date
    const macroData = JSON.parse(localStorage.getItem("macroData") || "[]");
    const matchingEntry = macroData.find(
      (entry) => entry.date === newEntry.date
    );
    if (matchingEntry) {
      matchingEntry.maxWeight = newEntry.maxWeight;
      localStorage.setItem("macroData", JSON.stringify(macroData));
    }

    console.log("Max weight entry saved:", newEntry);
    alert(`Max weight logged successfully: ${newEntry.maxWeight} kgs`);

    // Hide overlay and reset form after successful submission
    maxWeightOverlay.style.display = "none";
    event.target.reset();
  } catch (error) {
    console.error("Error saving max weight data:", error);
    alert("Failed to save max weight data. Please try again.");
  }
}
