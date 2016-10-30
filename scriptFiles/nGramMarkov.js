var order = 3;
var num = 100;
var ngrams = {};
var beginnings = [];
var button;
var names;
var colors = ["color1", "color2", "color3"];

function preload() {
  names = loadStrings("sourceFiles/Dracula.txt");
  console.log(names);
}

function setup() {
  noCanvas();

  for (var j = 0; j < names.length; ++j) {
    var txt = names[j];
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

  console.log(ngrams);
  button = createButton("Generate " + order.toString() + "-Gram Markov chain");
  button.mousePressed(generateMarkov);

}

function generateMarkov() {
  var currentGram = random(beginnings);
  var result = currentGram;

  for (var i = 0; i < num; ++i) {
    var possibilities = ngrams[currentGram];
    if(!possibilities) {
      break;
    }
    var next = random(possibilities);
    result += next;
    var len = result.length;
    currentGram = result.substring(len - order, len);
  }
  var rand = random(colors);
  createP(result).addClass(rand);
}
