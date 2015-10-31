var fs = require('fs');
var EE = require('events').EventEmitter; 



var Transform = module.exports = function(){

	this.readFile = function(file) {
	  fs.readFile(file, function(err, data) {
	    if (err) return console.log(err);
	    fileEvents.emit('donebitmap', data);
	    return data
	  });
	};
	

	this.buildObject = function(buffer) {
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
	  return bitmapObject
	};


	var test = fileEvents.on('donebitmap', function(data) {
	  console.log("creating object");
	  var bitmapObject = buildObject(data);
	  console.log(bitmapObject);
	  Array.prototype.forEach.call(bitmapObject.colorTable, function(byte, index) {
	    bitmapObject.colorTable.writeUInt8(255 - byte, index);
	  });
	  data.writeUIntLE(bitmapObject.colorTable, 54);
	  fs.writeFile('transformedbitmap.bmp', data, function (err) {
	    if (err) throw err;
	    console.log('File Saved');
  });

	}
	
};
