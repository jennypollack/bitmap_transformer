var transform = require(__dirname + '/lib/transform');

var something = new transform();
console.log(something);

something.listener();
something.readFile('bitmap1.bmp');
