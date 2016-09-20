// Carla de Beer
// September 2016
// Inspired by Daniel Shiffman's Coding Rainbow series:
// http://shiffman.net/a2z/intro/

// Built with P5.js


var srctxt;
var words;

function preload() {
  srctxt = loadStrings('sourceFiles/Spaceman on a Spree.txt');
}

function diastic(seed, words) {

  var phrase = "";
  var currentWord = 0;

  for (var i = 0; i < seed.length; ++i) {
    var c = seed.charAt(i);

    for (var j = currentWord; j < words.length; ++j) {
      if (words[j].charAt(i) == c) {
        phrase += words[j];
        phrase += " ";
        currentWord = j + 1;
        break;
      }
    }
  }
  return phrase;
}

function setup() {

  noCanvas();

  srctxt = join(srctxt, ' ');
  words = splitTokens(srctxt, ' ,!?.\"');

  var seed = select("#seed");
  var submit = select("#submit");

  submit.mousePressed(function() {
    var phrase = diastic(seed.value(), words);
    createP(phrase).addClass('result');
  });

}
