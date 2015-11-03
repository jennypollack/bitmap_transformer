var Transform = require(__dirname + '/lib/transform');

var transformer = new Transform();

transformer.listener();
transformer.readFile('bitmap1.bmp', function(){
  console.log("readfile");
});
