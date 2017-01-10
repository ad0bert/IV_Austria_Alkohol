var alcoholConsumption = {
	"Burgenland":    [ 38,  44,  15.79],
	"Carinthia":     [ 35,  23, -34.29],
	"Lower Austria": [ 32,  24, -25,00],
	"Upper Austria": [ 33,  29, -12.12],
	"Salzburg":      [ 22,  33,  50.00],
	"Styria":        [ 34,  28, -17.65],
	"Tyrol":         [ 28,  25, -10.71],
	"Vorarlberg":    [ 31,  14, -54.84],
	"Vienna":        [ 28,  33,  17.86],
	"Overall":       [ 281, 253, -9.96]
	}
	
var unemployment = {
	"Burgenland":    [ 6244,   7213,   15.52],
	"Carinthia":     [ 16741,  16254,  -2.91],
	"Lower Austria": [ 34768,  35174,   1.17],
	"Upper Austria": [ 29086,  21654, -25.55],
	"Salzburg":      [ 8926,   9759,    9.33],
	"Styria":        [ 36312,  30896, -14.92],
	"Tyrol":         [ 14952,  16397,   9.66],
	"Vorarlberg": 	 [ 7784,   8421,    8.18],
	"Vienna":        [ 60129,  66487,  10.57],
	"Overall":       [ 214942, 212255, -1.25]
	}

var inhebitants = {
	"Burgenland":    [ 276300,  282172,  2.13],
	"Carinthia":     [ 559735,  560579,  0.15],
	"Lower Austria": [ 1512388, 1601183, 5.87],
	"Upper Austria": [ 1355548, 1409123, 3.95],
	"Salzburg":      [ 503848,  528276,  4.85],
	"Styria":        [ 1186112, 1206206, 1.69],
	"Tyrol":         [ 645858,  702063,  8.70],
	"Vorarlberg": 	 [ 339521,  366777,  8.03],
	"Vienna":        [ 1549436, 1680170, 8.44],
	"Overall":       [ 7928746, 8336549, 5.14]
	}
  
var graduates = {
	"Burgenland":    [ 7462,   19209,  157.42],
	"Carinthia":     [ 19598,  45591,  132.63],
	"Lower Austria": [ 49818,  126556, 154.04],
	"Upper Austria": [ 45011,  106035, 135.58],
	"Salzburg":      [ 21289,  48977,  130.06],
	"Styria":        [ 45119,  103219, 128.77],
	"Tyrol":         [ 24908,  61115,  145.36],
	"Vorarlberg": 	 [ 10722,  27385,  155.41],
	"Vienna":        [ 107845, 250234, 132.03],
	"Overall":       [ 331772, 788321, 137.61]
	}
  
var foreignWorkers = {
	"Burgenland":    [ 660,    12793, 1838.33],
	"Carinthia":     [ 3905,   17779,  355.29],
	"Lower Austria": [ 14897,  64604,  333.67],
	"Upper Austria": [ 12390,  57368,  363.02],
	"Salzburg":      [ 11421,  35346,  209.48],
	"Styria":        [ 5492,   36165,  558.50],
	"Tyrol":         [ 11195,  45110,  302.95],
	"Vorarlberg": 	 [ 14918,  28483,   90.93],
	"Vienna":        [ 63832,  142413, 123.11],
	"Overall":       [ 138710, 440061, 217.25]
	}

function getAlcoholConsumption(state){
	return alcoholConsumption[state];
}

function getUnemployment(state) {
	return unemployment[state];
}

function getInhebitants(state) {
	return inhebitants[state];
}

function getGraduates(state) {
	return graduates[state];
}

function getForeignWorkers(state) {
	return foreignWorkers[state];
}
