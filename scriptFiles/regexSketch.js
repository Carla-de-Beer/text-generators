var textfield, output, submit;

function setup() {
  noCanvas();
  textfield = select("#input");
  submit = select("#submit");
  output = select("#output");
  submit.mousePressed(newText);
}

// if you use 'g' flag with match(), you lose the groups
// SO: use a while loop with exec()

function newText() {
  var s = textfield.value();
  var words = s.split(/(\W+)/);
  var pattern = /\W+/;

  for(var i = 0; i < words.length; ++i) {
      if (words[i] === '.' || words[i] === ',' || words[i] === '!' || words[i] === '?') {
          var span = createSpan(words[i] + ' ');
      } else {
          var span = createSpan(words[i]);
      }
      span.parent(output);
      if (!pattern.test(words[i])) {
        //span.style('background-color', color(random(255), 0, random(255), 180));
        span.mouseOver(highlight);
    }
  }
}

function highlight() {
  //console.log(this);
  //console.log(this.html());
  this.html('rainbow');
  var col = color(random(255), random(255), random(255), 180)
  this.style('background-color', col);
}
