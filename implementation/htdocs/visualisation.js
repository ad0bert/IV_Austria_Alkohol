function onLoadFunction(){

	var map = AmCharts.makeChart( "chartdiv", {
		"type": "map",
		"theme": "none",
		"colorSteps": 10,
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
		  "maxValue": "high growth"
		},
		
		"zoomControl": {
		  "minZoomLevel": 0.9
		},
		
		"titles": [ {
      "text": "Alcohol consumtion growth in Austria"
    } ],
    
		"listeners": [ {
		  "event": "init",
		  "method": updateHeatmap
		},
    { "event": "rollOverMapObject",
      "method": updateInfo} ]
	} );

}

function updateInfo(event){
  d3.select("#info").selectAll("*").remove();

  document.getElementById( "info" ).innerHTML = '<p>' + event.mapObject.title + '</p>';
  
  var margin = {top: 20, right: 20, bottom: 70, left: 40},
      width = 600 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  // Parse the date / time
  var	parseDate = d3.time.format("%Y-%m").parse;

  var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

  var y = d3.scale.linear().range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickFormat(d3.time.format("%Y-%m"));

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(10);

  var svg = d3.select("#info").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("bar-data.csv", function(error, data) {
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.value = +d.value;
    });
	
    x.domain(data.map(function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" );

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Value ($)");

    svg.selectAll("bar")
        .data(data)
        .enter().append("rect")
        .style("fill", "steelblue")
        .attr("x", function(d) { return x(d.date); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); });

  });

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
