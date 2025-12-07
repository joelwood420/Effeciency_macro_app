

// Make function globally available
window.addDataToTable = function() {
  const tableBody = document.getElementById('tableBody');
  const tableData = JSON.parse(localStorage.getItem('macroData')) || [];

  if (!tableData || tableData.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='8'>No data found</td></tr>";
    return;
  }

  tableBody.innerHTML = '';

  tableData.forEach(entry => {
    const row = document.createElement('tr');

    const dateCell = document.createElement('td');
    dateCell.textContent = entry.date || 'N/A';
    row.appendChild(dateCell);

    const proteinCell = document.createElement('td');
    proteinCell.textContent = entry.protein ? `${entry.protein}g` : 'N/A';
    row.appendChild(proteinCell);

    const carbsCell = document.createElement('td');
    carbsCell.textContent = entry.carbs ? `${entry.carbs}g` : 'N/A';
    row.appendChild(carbsCell);

    const fatCell = document.createElement('td');
    fatCell.textContent = entry.fat ? `${entry.fat}g` : 'N/A';
    row.appendChild(fatCell);

    const totalCaloriesCell = document.createElement('td');
    totalCaloriesCell.textContent = entry.totalCalories ? `${entry.totalCalories} kcal` : 'N/A';
    row.appendChild(totalCaloriesCell);

    const macroCategoryCell = document.createElement('td');
    macroCategoryCell.textContent = entry.macroCategory || 'N/A';
    row.appendChild(macroCategoryCell);

    const fatCategoryCell = document.createElement('td');
    fatCategoryCell.textContent = entry.fatCategory || 'N/A';
    row.appendChild(fatCategoryCell);

 

     const maxWeightCell = document.createElement('td');
    maxWeightCell.textContent = entry.maxWeight ? `${entry.maxWeight}kg` : 'N/A';
    row.appendChild(maxWeightCell);

    tableBody.appendChild(row);
  });
  
  console.log(`Table populated with ${tableData.length} entries`);
};

// Call the function when page loads
document.addEventListener('DOMContentLoaded', function() {
  window.addDataToTable();
});
