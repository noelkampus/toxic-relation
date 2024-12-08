// // Load data from external JSON file
// d3.json("data.json").then(data => {
//     // Extract total investments for each investor
//     const investors = data.map(d => ({
//         name: d.name,
//         total: +d.total.replace(",", "") // Parse totals as integers
//     }));

//     // Chart dimensions and margins
//     const margin = { top: 0, right: 0, bottom: 0, left: 0 };
//     // const width = 220 - margin.left - margin.right;
//     // const height = investors.length * 40; // Dynamic height based on number of bars
//     const width = document.getElementById("bar-chart").getBoundingClientRect().width;
//     const height = document.getElementById("bar-chart").getBoundingClientRect().height;

//     // Create SVG container
//     const svg = d3.select("#bar-chart")
//         .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", `translate(${margin.left},${margin.top})`);

//     // Create scales
//     const x = d3.scaleLinear()
//         .domain([0, d3.max(investors, d => d.total)]) // Scale based on max value
//         .range([0, width]);

//     const y = d3.scaleBand()
//         .domain(investors.map(d => d.name)) // Map investor names to Y positions
//         .range([0, height])
//         .padding(0.05); // Add padding between bars

//     // Add bars (right-aligned)
//     svg.selectAll(".bar")
//         .data(investors)
//         .join("rect")
//         .attr("class", "bar")
//         .attr("x", d => width - x(d.total)) // Right-align bars
//         .attr("y", d => y(d.name))
//         .attr("width", d => x(d.total)) // Bar width based on value
//         .attr("height", y.bandwidth());

//     // Add labels to bars
//     svg.selectAll(".label")
//         .data(investors)
//         .join("text")
//         .attr("class", "label")
//         .attr("x", width - 5) // Align labels to the right edge
//         .attr("y", d => y(d.name) + y.bandwidth() / 2)
//         .attr("dy", "0.35em") // Center text vertically
//         .text(d => d.name); // Display investor names
// }).catch(error => {
//     console.error("Error loading the JSON file:", error);
// });

// File: barChart.js

// Export an event dispatcher to communicate with the Sankey chart
const barChartDispatcher = d3.dispatch("highlightInvestor", "resetHighlight");

// Load data and render bar chart
d3.json("data.json").then(data => {
    const investors = data.map(d => ({
        name: d.name,
        total: +d.total.replace(",", ""), // Parse totals as integers
        id: d.name // Unique identifier for each investor
    }));

    // Chart dimensions
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const width = document.getElementById("bar-chart").getBoundingClientRect().width;
    const height = document.getElementById("bar-chart").getBoundingClientRect().height;

    // Create SVG container
    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales
    const x = d3.scaleLinear()
        .domain([0, d3.max(investors, d => d.total)])
        .range([0, width]);

    const y = d3.scaleBand()
        .domain(investors.map(d => d.name))
        .range([0, height])
        .padding(0.05);

    // Render bars
    svg.selectAll(".bar")
        .data(investors)
        .join("rect")
        .attr("class", "bar")
        .attr("x", d => width - x(d.total))
        .attr("y", d => y(d.name))
        .attr("width", d => x(d.total))
        .attr("height", y.bandwidth())
        .on("mouseover", (event, d) => {
            barChartDispatcher.call("highlightInvestor", null, d.id); // Trigger highlight event
        })
        .on("mouseout", () => {
            barChartDispatcher.call("resetHighlight"); // Trigger reset event
        });

    //     // Calculate and log the width of each bar
    //     investors.forEach(investor => {
    //         const barWidth = x(investor.total);
    //         console.log(`Width of ${investor.name} bar: ${barWidth}px`);
    //         document.documentElement.style.setProperty(`--${investor.name.toLowerCase()}-bar-width`, `${barWidth}px`);
    //     });

    //     // Example of setting CSS variables for bar widths
    //     const ubsBarWidth = x(investors.find(d => d.name === "UBS").total);
    //     const snbBarWidth = x(investors.find(d => d.name === "SNB").total);
    //     const pictetBarWidth = x(investors.find(d => d.name === "Pictet").total);
    //     const zkbBarWidth = x(investors.find(d => d.name === "ZKB").total);
    //     const vontobelBarWidth = x(investors.find(d => d.name === "Vontobel").total);

    //     document.documentElement.style.setProperty("--ubs-bar-width", `${ubsBarWidth}px`);
    //     document.documentElement.style.setProperty("--snb-bar-width", `${snbBarWidth}px`);
    //     document.documentElement.style.setProperty("--pictet-bar-width", `${pictetBarWidth}px`);
    //     document.documentElement.style.setProperty("--zkb-bar-width", `${zkbBarWidth}px`);
    //     document.documentElement.style.setProperty("--vontobel-bar-width", `${vontobelBarWidth}px`);

    //     console.log(`CSS variable set: --ubs-bar-width = ${ubsBarWidth}px`);
    //     console.log(`CSS variable set: --snb-bar-width = ${snbBarWidth}px`);
    //     console.log(`CSS variable set: --pictet-bar-width = ${pictetBarWidth}px`);
    //     console.log(`CSS variable set: --zkb-bar-width = ${zkbBarWidth}px`);
    //     console.log(`CSS variable set: --vontobel-bar-width = ${vontobelBarWidth}px`);
    // }).catch(error => {
    //     console.error("Error loading the JSON file:", error);
    // });

    // Add labels
    svg.selectAll(".label")
        .data(investors)
        .join("text")
        .attr("class", "label")
        .attr("x", width - 5)
        .attr("y", d => y(d.name) + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .text(d => d.name);
    }).catch(error => {
        console.error("Error loading bar chart data:", error);
    });

export { barChartDispatcher };