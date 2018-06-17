(function () {

    const dataset = [
        [250, 250, 4000],
        [75, 150, 2000],
        [400, 250, 2000], // pet
        [250, 425, 2000], // house
        [150, 50, 2000],
        [100, 215, 2000],
        [100, 75, 2000],
        [500, 500, 1],
        [0, 0, 1],
    ];

    const dataset1 = [
        [0, 0, 10],
        [0, 0, 1],
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

    // const circle = svg.selectAll('circle')
    //     .data(dataset)
    //     .enter()
    //     .append('circle')
    //     .attr('fill', function(datum, index) {
    //         if (index === 0) {
    //             return "transparent";
    //         }
    //         if (index === 1) {
    //             return "red";
    //         }
    //         if (index === 2) {
    //             return "green";
    //         }
    //         if (index === 3) {
    //             return "blue";
    //         }
    //         if (index === 4) {
    //             return "orange";
    //         }
    //         if (index === 5) {
    //             return "yellow";
    //         }
    //         if (index === 6) {
    //             return "#fff";
    //         }
    //         if (index === 7) {
    //             return "lightblue";
    //         }
    //     })

    //     .attr('cx', function(datum) {
    //         return xScale(datum[0]);
    //     })
    //     .attr('cy', function(datum) {
    //         return yScale(datum[1]);
    //     })
    //     //.transition()
    //     //.delay((datum) => datum * 2)
    //     //.duration(800)
    //     .attr('r', function (datum) {
    //         return rScale(datum[2]);
    //     });


    const images = svg.selectAll(".node")
        .data(dataset)
        .enter()
        .append("g")
        .attr("class", "node")
        .append("image")
        .attr("xlink:href", function(datum, index) {
            if (index === 0) {
                return 'static/svg/user.svg'
            }
            if (index === 2) {
                return 'static/svg/pet.svg'
            }
            if (index === 3) {
                return 'static/svg/house.svg'
            }
            
        })
        .attr('x', function(datum) {
            return xScale(datum[0]) - 40;
        })
        .attr('y', function(datum) {
            return yScale(datum[1]) - 40;
        })
        .attr("width", 80)
        .attr("height", 80);

    svg.selectAll('text')
        .data(dataset)
        .enter()
        .append('text')
        .text(function(datum, index) {
            //return datum[0] + ',' + datum[1]
            //console.log(datum);
            //console.log(index);
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
            if (index === 6) {
                return "boat insurance"
            }
        })
        .attr('x', function (datum) {
            return xScale(datum[0]) - 10;
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
        .call(yAxis);


    function updateData(data) {
        svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', function(datum) {
            return xScale(datum[0]);
        })
        .attr('cy', function(datum) {
            return yScale(datum[1]);
        })
        .attr('r', function (datum) {
            return rScale(datum[2]);
        });
    } 

    function xChange(data) {
        let value = this.value;
        console.log(value);
        
        // const xScale = d3.scaleLinear()
        //    .domain([0, d3.max(data, datum => datum[0])]);
        //xAxis.scale(xScale) 
        d3.selectAll('circle') 
          //.transition()
          //.duration(1000)
          //.delay(function (d,i) { return i*100})
          .attr('cx',function(datum) { return xScale(datum[0]) })
          .attr('y', function(datum) {
            return yScale(datum[1]);
          })
          .attr('r', function(datum) {
            return rScale(datum[2]);
        });
    }


    d3.select("#queryInsurances").on("change", function() {
        let query = d3.select(this).property('value');
       
        if (query == 1) {
            //let d = d3.select(this).property('data');
            console.log(query);
            //updateData(dataset1);
            xChange(data=dataset1);
            debugger;
        }

        // if (v == 30) {
        //   update(dataset3)
        // }
        // if (v == 7) {
        //   update(dataset2)
        // }
        // if (v == 1) {
        //   update(dataset)
        // }
        
    });  
    
    const insuranceData = [
        "car insurance", 
        "pet insurance", 
        'life insurance',
        'house insurance',
        'general liability',
        'boat insurance'
    ];

    const select = d3.select('#queryInsurances')
        .append('select')
        .attr('class','select')
        .on('change',onchange)

    const options = select
        .selectAll('option')
        .data(insuranceData)
        .enter()
        .append('option')
        .text(function (d) { 
            return d; 
        });

    function onchange() {
        selectValue = d3.select('select').property('value')
        d3.select('body')
            .append('p')
            .text(selectValue + ' is the last selected option.')
    };

})();
