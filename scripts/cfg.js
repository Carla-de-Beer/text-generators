function ContextFree() {

	this.rules = {

		"S": [
			["NP", "VP"],
			["Interj", "NP", "VP"]
		],
		"NP": [
			["Det", "N"],
			["Det", "N", "that", "VP"],
			["Det", "Adj", "N"]
		],
		"VP": [
			["Vtrans", "NP"],
			["Vintr"]
		],
		"Interj": [
			["oh"],
			["my"],
			["wow"],
			["darn"]
		],
		"Det": [
			["this"],
			["that"],
			["the"]
		],
		"N": [
			["noun"]
		],
		"Adj": [
			["adjective"]
		],
		"Vtrans": [
			["Vtrans"]
		],
		"Vintr": [
			["Vintr"]
		]
	};
}

var randomNounURL = 	"http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true" +
						"&includePartOfSpeech=noun&minCorpusCount=1&maxCorpusCount=-1" +
						"&minDictionaryCount=1&maxDictionaryCount=-1&minLength=10" +
						"&maxLength=-1&limit=5&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";

var randomAdjURL = 		"http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true" +
						"&includePartOfSpeech=adjective&minCorpusCount=1&maxCorpusCount=-1" +
						"&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1" +
						"&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";

var randomVtransURL = 	"http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true" +
	                  	"&includePartOfSpeech=verb-transitive&minCorpusCount=1&maxCorpusCount=-1" +
						"&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=10" +
						"&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";

var randomVintrURL = 	"http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true" +
						"&includePartOfSpeech=verb-intransitive&minCorpusCount=1&maxCorpusCount=-1" +
						"&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=10" +
						"&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";


var noun = "";
var adjective = "";
var vTrans = "";
var vIntr = "";

var nounArray = [];
var adjectiveArray = [];
var vTransArray = [];
var vIntrArray = [];


function setup() {

	noCanvas();

	getWord(randomNounURL, nounArray);
	getWord(randomAdjURL, adjectiveArray);
	getWord(randomVtransURL, vTransArray);
	getWord(randomVintrURL, vIntrArray);

	setTimeout(function () {

		nounArray.print();
		adjectiveArray.print();
		vTransArray.print();
		vIntrArray.print();

		function getExpansion() {

			var start = "S";
			var expansion = [];
			var cfg = new ContextFree();
			var result = cfg.expand(start, expansion, noun, adjective, vTrans, vIntr);

			var paragraph = document.createElement("p");
			paragraph.id = "paragraph";
			paragraph.classList.add("cfgPara");
			paragraph.innerHTML = result;
			var content = document.getElementById("result");
			content.appendChild(paragraph);

		}

		clearElement("wait");

		var content = document.getElementById("content");

		var buttonGenerate = document.createElement("button");
		buttonGenerate.id = "buttonGenerate";
		buttonGenerate.classList.add("btn1");
		buttonGenerate.innerHTML = "Generate Grammars";
		buttonGenerate.addEventListener("click", getExpansion, false);
		content.appendChild(buttonGenerate);

		var buttonClear = document.createElement("button");
		buttonClear.id = "buttonClear";
		buttonClear.classList.add("btn2");
		buttonClear.innerHTML = "Clear";
		buttonClear.addEventListener("click", clearDiv, false);
		content.appendChild(buttonClear);

	}, 1500);

}

Array.prototype.print = function() {
	for (var i = 0; i < this.length; i++) {
		console.log(this[i]);
	}
};

function getWord(urlNoun, array) {
	$.getJSON(urlNoun, function(data) {
		for (var i = 0; i < data.length; ++i) {
			array.push(data[i].word);
		}
	});
}

ContextFree.prototype.expand = function (start, expansion, noun, adjective, vTrans, vIntr) {

	if (this.rules.hasOwnProperty(start)) {
		var possibilities = this.rules[start];
		var picked = possibilities.choice();
		console.log(picked);

		if (picked[0] === "noun") {
			picked = [random(nounArray)];
		}

		if (picked[0] === "adjective") {
			picked = [random(adjectiveArray)];
		}

		if (picked[0] === "Vtrans") {
			picked = [random(vTransArray)];
		}

		if (picked[0] === "Vintr") {
			picked = [random(vIntrArray)];
		}

		// call this method again with the current element of the expansion
		for (var i = 0; i < picked.length; ++i) {
			this.expand(picked[i], expansion, noun, adjective, vTrans, vIntr);
		}
	} else {
		expansion.push(start);
	}

	return expansion.join(" ");

};

Array.prototype.choice = function () {
	var i = floor(random(this.length));
	return this[i];
};

function clearElement(id) {
	document.getElementById(id).innerHTML = "";
}

function clearDiv() {
	document.getElementById("result").innerHTML = "";
}
