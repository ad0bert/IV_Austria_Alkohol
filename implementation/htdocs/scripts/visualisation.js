function onLoadFunction(){

	var map = AmCharts.makeChart( "chartdiv", {
		"type": "map",
		"theme": "none",
		"colorSteps": 5,
		"dataProvider": {
		  "mapURL": "pics/austriaLow.svg",
		  "getAreasFromMap": true,
		  "zoomLevel": 0.9,
		  "areas": []
		},
		
		"areasSettings": {
		  "autoZoom": false,
		  "balloonText": "[[title]]: <strong>[[value]]</strong>"
		},
		
		"valueLegend": {
		  "right": 10,
		  "minValue": "reduction",
		  "maxValue": "growth"
		},
		
		"zoomControl": {
		  "minZoomLevel": 0.9
		},
		
		"titles": [ {
      "text": "Alcohol consumtion change in Austria"
    } ],
    
		"listeners": [ {
		  "event": "init",
		  "method": updateHeatmap
		},
    { "event": "rollOverMapObject",
      "method": updateInfo} ]
	} );

}

function createBars(barToCreate, maxScale, state, title){
    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    },
    
    width = 300 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    var svg = d3.select("#info").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("template/data.csv", type, function(error, data) { // no data in the csv we read just the format
      data[0].global = (barToCreate("Overall")[0] / getInhebitants("Overall")[0]) * 100;
      data[0].local  = (barToCreate(state)[0] / getInhebitants(state)[0]) * 100;
      data[1].global = (barToCreate("Overall")[1] / getInhebitants("Overall")[1]) * 100;
      data[1].local  = (barToCreate(state)[1] / getInhebitants(state)[1]) * 100;
      
      x.domain(data.map(function(d) {
        return d.date;
      }));
      y.domain([0, d3.max(data, function(d) {
        return maxScale;
      })]);

	  svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "14px") 
        .style("text-decoration", "underline")  
        .text(title);
		
	 

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("% Per Inhebitant");

      var g = svg.selectAll(".bars")
        .data(data)
        .enter().append("g")
        
      g.append("rect")
        .attr("class", "bar1")
        .attr("x", function(d) {
          return x(d.date) + 10; // center it
        })
        .attr("width", x.rangeBand() - 20) // make it slimmer
        .attr("y", function(d) {
          return y(d.local);
        })
        .attr("height", function(d) {
          return height - y(d.local);
        });
		      
      g.append("rect")
        .attr("class", "bar2")
        .attr("x", function(d) {
          return x(d.date);
        })
        .attr("width", x.rangeBand())
        .attr("y", function(d) {
          return y(d.global);
        })
        .attr("height", function(d) {
          return height - y(d.global);
        });
		
    });

    function type(d) {
      d.global = +d.global;
      d.local = +d.local;
      return d;
    }
}

function updateInfo(event){
  d3.select("#info").selectAll("*").remove();

  document.getElementById( "info" ).innerHTML = '<p>' + event.mapObject.title + '</p><br>';
  
  createBars(getUnemployment, 4, event.mapObject.title, "Unemployment");
  createBars(getGraduates, 16, event.mapObject.title, "Graduates");
  createBars(getForeignWorkers, 9, event.mapObject.title, "ForeignWorkers");
 
}

function updateHeatmap( event ) {
	var map = event.chart;
	if ( map.dataGenerated )
		return;
	if ( map.dataProvider.areas.length === 0 ) {
		setTimeout( updateHeatmap, 100 );
		return;
	}
	
	for ( var i = 0; i < map.dataProvider.areas.length; i++ ) {
		map.dataProvider.areas[ i ].value = getAlcoholConsumption(map.dataProvider.areas[ i ].title)[2];
	}
	
	map.dataGenerated = true;
	map.validateNow();
}
