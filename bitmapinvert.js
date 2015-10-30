var fs = require('fs');
var bitmap = fs.readFileSync('bitmap1.bmp');
var bitmapObject = {};

bitmapObject.headerField = bitmap.toString('utf-8',0 , 2);
bitmapObject.size = bitmap.readUInt32LE(2);
bitmapObject.pixelDataStart = bitmap.readUInt32LE(10);
bitmapObject.dibHeaderSize = bitmap.readUInt32LE(14);
bitmapObject.width = bitmap.readUInt32LE(18);
bitmapObject.height = bitmap.readUInt32LE(22);
bitmapObject.bitDepth = bitmap.readUInt16LE(28);
bitmapObject.compressionMethod = bitmap.readUInt32LE(30);
bitmapObject.numberColors = bitmap.readUInt32LE(46);
bitmapObject.pixelData = bitmap.slice(1078, bitmap.length);
bitmapObject.colorTable = bitmap.slice(54, 1078);

// console.log(bitmapObject);

Array.prototype.forEach.call(bitmapObject.colorTable, function(byte, index) {
  bitmapObject.colorTable.writeUInt8(255 - byte, index);
});

console.log(bitmapObject);

bitmap.writeUIntLE(bitmapObject.colorTable, 54);

fs.writeFileSync('transformedbitmap.bmp', bitmap);
