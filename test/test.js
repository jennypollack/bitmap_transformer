var expect = require('chai').expect;
var Transform = require(__dirname + '/../lib/transform');

var transformer = new Transform();
// console.log(transformer);
myBuff = null;

before(function(done) {
  transformer.readFile(__dirname + '/../bitmap1.bmp', function(err, data) {
    myBuff = data;
    done();
  });
});

describe('readfile function', function(){

  it('should create a buffer', function() {
    expect(myBuff instanceof Buffer).to.be.true;
  });
  it('should not be null', function() {
    expect(myBuff).not.to.be.null;
  });
});
