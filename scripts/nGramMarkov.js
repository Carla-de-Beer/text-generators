var order = 3;
var num = 50;
var ngrams = {};
var beginnings = [];
var textString;
var button;
var colors = ["color1", "color2", "color3"];

function preload() {
	textString = loadStrings("sourceFiles/Spaceman on a Spree.txt");
  	//console.log(textString);
}

function setup() {
	noCanvas();
	createGrams();
}

function readFromHTML() {
	order = document.getElementById("nGramRange").value;
	num = document.getElementById("numRange").value;

	document.getElementById("labelNGram").innerHTML = "n-Gram value: " + order;
	document.getElementById("labelNum").innerHTML = "Output length (number of characters): " + num;
}

function createGrams() {

  	for (var j = 0; j < textString.length; ++j) {
		var txt = textString[j];
		for (var i = 0; i <= txt.length - order; ++i) {
		  var gram = txt.substring(i, i + order);

		  if (i === 0) {
			beginnings.push(gram);
		  }

		  if (!ngrams[gram]) {
			ngrams[gram] = [];
		  }
		  ngrams[gram].push(txt.charAt(i + order));
		}
  	}

  	//console.log(ngrams);
}

function generateMarkov() {
  	"use strict";

	readFromHTML();
	createGrams();

  	var currentGram = random(beginnings);
  	var result = currentGram;

  	for (var i = 0; i < num; ++i) {
		var possibilities = ngrams[currentGram];
		if(!possibilities) {
		  break;
		}
		result += random(possibilities);
		var len = result.length;
		currentGram = result.substring(len - order, len);
  	}

	var rand = random(colors);
	createP(result).addClass(rand);

}