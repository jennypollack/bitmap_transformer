var expect = require('chai').expect;
var Transform = require(__dirname + '/../lib/transform');

var transformer = new Transform();
console.log(transformer);

describe('readfile function', function(){
  it('should create a buffer', function(done) {
    console.log("opening: "+ __dirname + '/../bitmap1.bmp');
    transformer.readFile(__dirname + '/../bitmap1.bmp');
    expect(transformer.bmpBuffer instanceof Buffer);
    done();
  });
});
