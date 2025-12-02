// Get data from localStorage
const macroData = JSON.parse(localStorage.getItem("macroData") || "[]");


const margin = { top: 20, right: 30, bottom: 40, left: 50 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3.select('body').append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
  .attr("id", "bubble-chart");

const g = svg.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const xScale = d3.scaleLinear()
  .domain(d3.extent(macroData, d => d.protein))
  .range([0, width]);

const yScale = d3.scaleLinear()
  .domain(d3.extent(macroData, d => d.carbs))
  .range([height, 0]);

const radiusScale = d3.scaleSqrt()
  .domain(d3.extent(macroData, d => d.maxWeight || 70))
  .range([3, 20]);

const colorScale = d3.scaleOrdinal()
  .domain(["Low Fat", "High Fat"])
  .range(["#f90707ff", "#141115ff"]);

// X Axis

g.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScale))
  .append("text")
  .attr("x", width / 2)
  .attr("y", 35)
  .attr("fill", "black")
  .style("text-anchor", "middle")
  .text("Protein (g)");

 // Y Axis
g.append("g")
  .call(d3.axisLeft(yScale))
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", -35)
  .attr("x", -height / 2)
  .attr("fill", "black")
  .style("text-anchor", "middle")
  .text("Carbs (g)");

// bubbles
const bubbles = g.selectAll(".bubble")
  .data(macroData)
  .enter().append("circle")
  .attr("class", "bubble")
  .attr("cx", d => xScale(d.protein))
  .attr("cy", d => yScale(d.carbs))
  .attr("r", d => radiusScale(d.maxWeight || 70))
  .style("fill", d => colorScale(d.fatCategory))
  .style("opacity", 0.5)



bubbles.append("title")
  .text(d => `Date: ${d.date}
Protein: ${d.protein}g
Carbs: ${d.carbs}g
Fat: ${d.fat}g
Max Weight: ${d.maxWeight || 'N/A'}kg
Total Calories: ${d.totalCalories}`);

// Add legend
const legend = svg.append("g")
  .attr("class", "legend")
  .attr("transform", `translate(${width - 20}, 10)`);

const legendData = ["Low Fat", "High Fat"];
const legendItems = legend.selectAll(".legend-item")
  .data(legendData)
  .enter().append("g")
  .attr("class", "legend-item")
  .attr("transform", (d, i) => `translate(0, ${i * 20})`);

legendItems.append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 5)
  .style("fill", d => colorScale(d));

legendItems.append("text")
  .attr("x", 20)
  .attr("y", 5)
  .text(d => d)
  .style("font-size", "12px");

console.log(`Bubble chart created with ${macroData.length} data points`);  










