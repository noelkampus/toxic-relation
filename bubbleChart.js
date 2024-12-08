// // Dataset directly included
// const data = [
//     {
//         name: "UBS",
//         investments: [
//             { oil: 1682, gas: 1009, coal: 673 },
//             { oil: 1522, gas: 913, coal: 608 }
//         ]
//     },
//     {
//         name: "SNB",
//         investments: [
//             { oil: 807, gas: 485, coal: 322 },
//             { oil: 486, gas: 291, coal: 194 }
//         ]
//     },
//     {
//         name: "Pictet",
//         investments: [
//             { oil: 435, gas: 261, coal: 174 },
//             { oil: 309, gas: 185, coal: 124 }
//         ]
//     },
//     {
//         name: "ZKB",
//         investments: [
//             { oil: 238, gas: 143, coal: 95 },
//             { oil: 122, gas: 73, coal: 49 }
//         ]
//     },
//     {
//         name: "Vontobel",
//         investments: [
//             { oil: 185, gas: 111, coal: 74 },
//             { oil: 84, gas: 50, coal: 34 }
//         ]
//     }
// ];

// // Calculate total investments by sector
// const sectors = [
//     { name: "Oil", total: d3.sum(data.map(d => d3.sum(d.investments, i => i.oil))) },
//     { name: "Gas", total: d3.sum(data.map(d => d3.sum(d.investments, i => i.gas))) },
//     { name: "Coal", total: d3.sum(data.map(d => d3.sum(d.investments, i => i.coal))) }
// ];

// // Dimensions and SVG container
// const width = document.getElementById("bubble-chart").getBoundingClientRect().width;;
// const height = document.getElementById("bubble-chart").getBoundingClientRect().height;
// const svg = d3.select("#bubble-chart")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height);

// // Scale for bubble sizes
// const sizeScale = d3.scaleSqrt()
//     .domain([0, d3.max(sectors, d => d.total)])
//     .range([0, width/2]); // Adjust bubble sizes

// // Bubble positions (vertically spaced)
// const spacing = 200; // Adjust spacing between bubbles
// const centerX = width / 2;
// const positions = sectors.map((d, i) => ({
//     x: centerX,
//     y: spacing * i + spacing / 2,
//     radius: sizeScale(d.total),
//     ...d
// }));

// // Draw bubbles
// svg.selectAll(".bubble")
//     .data(positions)
//     .join("circle")
//     .attr("class", "bubble")
//     .attr("cx", d => d.x)
//     .attr("cy", d => d.y)
//     .attr("r", d => d.radius);

// // Add labels
// svg.selectAll(".label")
//     .data(positions)
//     .join("text")
//     .attr("class", "label")
//     .attr("x", d => d.x)
//     .attr("y", d => d.y)
//     .text(d => `${d.name}\n${d.total.toLocaleString()}`)
//     .style("font-size", "14px");