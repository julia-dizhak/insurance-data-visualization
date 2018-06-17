(function () {

    const dataset = [
        // 0 - user
        [
            300, 
            300, 
            '', 
            'static/svg/user.svg', 
            'static/svg/user.svg', 
            'user story'
        ], 
        // 1 - car
        [
            100, 
            300, 
            1000, 
            'static/svg/car.svg', 
            'static/svg/car-active.svg',
            'car insurance'
        ], 
        // 2 - pet
        [
            500, 
            300, 
            800, 
            'static/svg/pet.svg',
            'static/svg/pet-active.svg',
            'pet insurance'
        ], 
        // 3 - house
        [
            300, 
            525, 
            2000, 
            'static/svg/house.svg',
            'static/svg/house-active.svg',
            'house insurance'
        ], 
       // [150, 50, 2000],
       // [100, 215, 2000],
        //[100, 75, 2000],
        //[600, 600, 1],
        [0, 0, 1],
    ];

      // if (index === 1) {
           
            // if (index === 4) {
            //     return "life insurance"
            // }
            // if (index === 5) {
            //     return "general liability"
            // }
            // if (index === 6) {
            //     return "boat insurance"
            // }
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


    let images = svg.selectAll(".node")
        .data(dataset)
        .enter()
        .append("g")
        .attr("class", "node")
        .append("image")
        .attr("xlink:href", function(datum, index) {
            return datum[3];
        })
        .attr('x', function(datum) {
            return xScale(datum[0]) - 40;
        })
        .attr('y', function(datum) {
            return yScale(datum[1]) - 40;
        })
        .attr('data', function(datum) {
            return datum[2];
        })
        .attr("width", 80)
        .attr("height", 80);

    images.on("click", function(element, index) {
        const active = d3.select(this);
        const $price = $('#total-price');

        //debugger;
        let priceArrays = [];

        // priceArrays.forEach(element => {
        //     console.log(element);
        // });
        

        //priceArrays.push(element[2]);

        //let price = element[2];

        //console.log(priceArrays);


        $price.text(element[2]);
        let total = element[2];

        // savings
        const $saveCostElement = $('#save-price');
        const discount = 0.15;
        let saveCost = total*discount;
        total = total - saveCost;
        $saveCostElement.text(total);

        active.transition()
            .duration(1000)
            .attr("xlink:href", function(datum, index) {
                return datum[4];
            })
            active.attr("class", "active")
    });     

   const types = svg.selectAll('text')
        .data(dataset)
        .enter()
        .append('text')
        .text(function(datum, index) {
            const type = datum[5];
            return type;
        })
        .attr('dx', function (datum) {
            return xScale(datum[0]) - 40;
        })
        .attr('dy', function (datum) {
            return yScale(datum[1]) + 55;
        })
        // .attr('dx', 10)
        .attr("font-family", "sans-serif")
        .attr("font-size", "13px")
        .attr("fill", "#505143")

    // price
    const prices = svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('text')
        .text(function(datum, index) {
            if (index === 0) {
                return '';
            }
            return datum[2] + ' CHF';
        })
        .attr('x', function (datum) {
            return xScale(datum[0]) - 20;
        })
        .attr('y', function (datum) {
            return yScale(datum[1]) + 75;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "16px")
        .attr("fill", "#4066B3")
    

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

    // function xChange(data) {
    //     let value = this.value;
    //     console.log(value);
        
    //     // const xScale = d3.scaleLinear()
    //     //    .domain([0, d3.max(data, datum => datum[0])]);
    //     //xAxis.scale(xScale) 
    //     d3.selectAll('circle') 
    //       //.transition()
    //       //.duration(1000)
    //       //.delay(function (d,i) { return i*100})
    //       .attr('cx',function(datum) { return xScale(datum[0]) })
    //       .attr('y', function(datum) {
    //         return yScale(datum[1]);
    //       })
    //       .attr('r', function(datum) {
    //         return rScale(datum[2]);
    //     });
    // }


    d3.select("#queryInsurances").on("change", function() {
        let query = d3.select(this).property('value');
       
        // if (query == 2) {
        //     //let d = d3.select(this).property('data');
        //     console.log(query);
           
        //     images.attr('x', function(datum, index) {
        //         if ( Number(query) === index ) {
        //             debugger;
        //             d3.select(this).attr('x', function(datum, index) {
        //                 if (index === 2) {
        //                     debugger;
        //                     return datum[3];
        //                 }
        //             });
        //         }
        //     })
            
        // }    

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
    
    // const insuranceData = [
    //     "car insurance", 
    //     "pet insurance", 
    //     'life insurance',
    //     'house insurance',
    //     'general liability',
    //     'boat insurance'
    // ];

    // const select = d3.select('#queryInsurances')
    //     .append('select')
    //     .attr('class','select')
    //     .on('change',onchange)

    // const options = select
    //     .selectAll('option')
    //     .data(insuranceData)
    //     .enter()
    //     .append('option')
    //     .text(function (d) { 
    //         return d; 
    //     });

    // function onchange() {
    //     selectValue = d3.select('select').property('value')
    //     d3.select('body')
    //         .append('p')
    //         .text(selectValue + ' is the last selected option.')
    // };


    
})();
