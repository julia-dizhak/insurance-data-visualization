(function () {

    const dataset = [
        [150, 150, 4000],
        [75, 150, 2000],
        [250, 150, 2000],
        [150, 250, 2000],
        [150, 50, 2000],
        [100, 215, 2000],
        [300, 300, 1],
        [100, 75, 2000],
    ];

    const margin = { top: 20, right: 30, bottom: 20, left: 40 },
        padding = 20;

    const width = 700 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    const svg = d3.select('#scatterPlot')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, datum => datum[0])])
        .range([0, width - padding]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, datum => datum[1])])
        .range([height - padding, padding]);

    const rScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, datum => datum[1])])
        .range([2, 5]);

    svg.selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        //.attr('fill', '#ccc')
        .attr('fill', function(datum, index) {
            if (index === 0) {
                return "#ccc";
            }
            if (index === 1) {
                return "red";
            }
            if (index === 2) {
                return "green";
            }
            if (index === 3) {
                return "blue";
            }
            if (index === 4) {
                return "orange";
            }
            if (index === 5) {
                return "yellow";
            }
            if (index === 6) {
                return "#fff";
            }
            if (index === 7) {
                return "lightblue";
            }
        })

        .attr('cx', function(datum) {
            return xScale(datum[0]);
        })
        .attr('cy', function(datum) {
            return yScale(datum[1]);
        })
        //.transition()
        //.delay((datum) => datum * 2)
        //.duration(800)
        .attr('r', function (datum) {
            return rScale(datum[2]);
        });

    svg.selectAll('text')
        .data(dataset)
        .enter()
        .append('text')
        .text(function(datum, index) {
            //return datum[0] + ',' + datum[1]
            //console.log(datum);
            console.log(index);
            //console.log(datum[0])
            if (index === 0) {
                return "person"
            }
            if (index === 1) {
                return "car insurance"
            }
            if (index === 2) {
                return "pet insurance"
            }
            if (index === 3) {
                return "life insurance"
            }
            if (index === 4) {
                return "house insurance"
            }
            if (index === 5) {
                return "general liability"
            }
            if (index === 7) {
                return "boat insurance"
            }
        })
        .attr('x', function (datum) {
            return xScale(datum[0]);
        })
        .attr('y', function (datum) {
            return yScale(datum[1]);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "#ccccc")

    const xAxis = d3.axisBottom(xScale)
        .ticks(8);

    const yAxis = d3.axisLeft(yScale)
        .ticks(7);

    svg.append("g")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .attr('class', 'axis')
        .call(xAxis);

    svg.append("g")
        .attr("transform", "translate(" + 0 + ", 0)")
        .attr('class', 'axis')
        .call(yAxis)

})();
