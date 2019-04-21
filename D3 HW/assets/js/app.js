// @TODO: YOUR CODE HERE!

// Define SVG area dimensions
var svgWidth = 660;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 55,
  right: 55,
  bottom: 55,
  left: 55
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from data.csv
d3.csv("assets/data/data.csv").then(function(Data) {
    console.log(Data);
  
    // Cast each Healthcare value and Poverty in Data as a number using the unary + operator
    Data.forEach(function(data) {
      data.healthcare = +data.noHealthInsurance;
      data.poverty = +data.poverty;
      data.abbr = data.abbr;
      console.log("Poverty:", data.poverty);
      console.log("Healthcare:", data.healthcare);
      console.log("abbr", data.abbr);
    });

    // Create a scale for your independent (x) coordinates
    var xScale = d3.scaleLinear()
    .domain([8, d3.max(Data, d => d.poverty)])
    .range([8, chartWidth]);

    // Create a scale for your dependent (y) coordinates
    var yScale = d3.scaleLinear()
    .domain([2, d3.max(Data, d => d.healthcare)])
    .range([chartHeight, 0]);

    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);
    
    var circlesGroup = chartGroup.selectAll("circle")
    .data(Data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.poverty))
    .attr("cy", d => yScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "pink")
    .attr("opacity", ".5");

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - chartMargin.left + 5)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lack Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top - 20})`)
      .attr("class", "axisText")
      .text("In poverty (%)");

      chartGroup.selectAll("text")
      .data(Data)
      .enter()
      .append("text")
      // Add your code below this line
      .text((d) => d.abbr)
      .attr("x", d => xScale(d.poverty)-10)
      .attr("y", d => yScale(d.healthcare)+5)
      
});



  
