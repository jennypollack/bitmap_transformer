var fs = require('fs');
var EE = require('events').EventEmitter;

var fileEvents = new EE();

// THIS DOESN'T WORK BECAUSE bitmap IS UNDEFINED
// WHILE FILE IS BEING READ
// function readFile(file) {
//   var bitmap = fs.readFile(file);
//   console.log(bitmap);
//   console.log("reading: " + file)
//   fileEvents.emit('donebitmap', bitmap);
// }

function readFile(file) {
  fs.readFile(file, function(err, data) {
    if (err) return console.log(err);
    fileEvents.emit('donebitmap', data);
  });
};


function buildObject(buffer) {
  // console.log(buffer);
  var bitmapObject = {};

  bitmapObject.headerField    = buffer.toString('utf-8',0 , 2);
  bitmapObject.size           = buffer.readUInt32LE(2);
  bitmapObject.pixelDataStart = buffer.readUInt32LE(10);
  bitmapObject.dibHeaderSize  = buffer.readUInt32LE(14);
  bitmapObject.width          = buffer.readUInt32LE(18);
  bitmapObject.height         = buffer.readUInt32LE(22);
  bitmapObject.bitDepth       = buffer.readUInt16LE(28);
  bitmapObject.compressMeth   = buffer.readUInt32LE(30);
  bitmapObject.numberColors   = buffer.readUInt32LE(46);
  bitmapObject.pixelData      = buffer.slice(1078, buffer.length);
  bitmapObject.colorTable     = buffer.slice(54, 1078);
  // event emitter to do transform
  return bitmapObject
};

fileEvents.on('donebitmap', function(data) {
  console.log("creating object");
  console.log(buildObject(data));
});

readFile('bitmap1.bmp');

// Array.prototype.forEach.call(bitmapObject.colorTable, function(byte, index) {
//   bitmapObject.colorTable.writeUInt8(255 - byte, index);
// });

// console.log(bitmapObject);

// bitmap.writeUIntLE(bitmapObject.colorTable, 54);

// fs.writeFileSync('transformedbitmap.bmp', bitmap);
