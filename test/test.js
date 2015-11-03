var expect = require('chai').expect;
var fs = require('fs');
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

//before(fs.stats()); 
describe('checks for the file we create', function(){
  it('checks to see if a file exists - it should fail', function(){

    //this works - but the existsSync is deprecated... 
    // expect(fs.existsSync('transformedbitmap.bmp')).to.eql(true);
    // expect(fs.access)
    console.log(fs.accessSync('transformedbitmap.bmp'));
    expect(fs.accessSync('transformedbitmap.bmp').to.eql(true));
   
    // fs.readdir('.', function(err, files){
    // //   //console.log(files); // list of all files in current directory
    // //   //files.forEach(function(file){ 
    //     var test = files[files.length-1];
    //     console.log(typeof test);
    //     console.log(test === 'test.bmp'); 
    //     expect(test).to.eql('test.bmp');
    // //   expect(test === 'test.bmp'); 
    // //   //});
    //  });
    
    //   , fs.F_OK, function (err))){
    //   console.log('ugh'); 
    
    // });
  });
});



// var fs = require('fs'),
//   path = '/path/to/my/file',
//   stats;

// try {
//   stats = fs.statSync(path);
//   console.log("File exists.");
// }
// catch (e) {
//   console.log("File does not exist.");
// }

