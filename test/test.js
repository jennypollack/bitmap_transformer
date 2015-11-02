var expect = require('chai').expect;
var Transform = require(__dirname + '/../lib/transform');

var transformer = new Transform();
console.log(transformer);

describe('readfile function', function(){
  before(function(done) {
    transformer.readFile(__dirname + '/../bitmap1.bmp');
    done();
  });
  it('should create a buffer', function() {
    console.log(transformer.bmpBuffer);
    expect(transformer.bmpBuffer instanceof Buffer).to.be.true;
  });
  it('should be non-zero in size', function() {
    expect(transformer.bmpBuffer).not.to.be.null;
  });
});
