
window.renderVisualization = function() {
  d3.select("#bubble-chart").remove();
  
  const macroData = JSON.parse(localStorage.getItem("macroData") || "[]");
  
  if (macroData.length === 0) {
    console.log("No data available to visualize");
    return;
  }

  const margin = { top: 20, right: 30, bottom: 40, left: 50 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;


  const svg = d3.select('.visualization-container').append("svg")
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


const xGrid = g.append("g")
  .attr("class", "grid")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScale)
    .tickSize(-height)
    .tickFormat("")
  )
  .style("stroke", "#e8eef3")
  .style("stroke-opacity", 0.2)
  .style("stroke-width", 1);

xGrid.select(".domain").remove();
xGrid.selectAll(".tick line")
  .filter((d, i, nodes) => d === d3.max(xScale.domain()))
  .remove();


const yGrid = g.append("g")
  .attr("class", "grid")
  .call(d3.axisLeft(yScale)
    .tickSize(-width)
    .tickFormat("")
  )
  .style("stroke", "#e8eef3")
  .style("stroke-opacity", 0.2)
  .style("stroke-width", 1);

yGrid.select(".domain").remove();
yGrid.selectAll(".tick line")
  .filter((d, i, nodes) => d === d3.max(yScale.domain()))
  .remove();


g.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScale))
  .append("text")
  .attr("x", width / 2)
  .attr("y", 35)
  .attr("fill", "black")
  .style("text-anchor", "middle")
  .text("Protein (g)");


g.append("g")
  .call(d3.axisLeft(yScale))
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", -35)
  .attr("x", -height / 2)
  .attr("fill", "black")
  .style("text-anchor", "middle")
  .text("Carbs (g)");


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


const legend = svg.append("g")
  .attr("class", "legend")
  .attr("transform", `translate(${width - 20}, 10)`);


legend.append("rect")
  .attr("x", -20)
  .attr("y", -20)
  .attr("width", 100)
  .attr("height", 55)
  .attr("fill", "white")
  .attr("stroke", "#e8eef3")
  .attr("stroke-width", 1)
  .attr("rx", 0)
  .attr("ry", 0);

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

  console.log(`Bubble chart rendered with ${macroData.length} data points`);
};


document.addEventListener('DOMContentLoaded', function() {
  window.renderVisualization();
});  










