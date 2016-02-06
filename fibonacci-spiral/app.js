function SpiralChunk(iterator, sidelength, direction, borderColor){
  this.spiralChunkNumber = iterator;
  this.sidelength = sidelength;
  this.direction = direction;
  this.borderColor = borderColor;
  this.verticalPositionType = null;
  this.verticalPosition = 0;
  this.horizontalPositionType = null;
  this.horizontalPosition = 0;
}
SpiralChunk.prototype.initializeDivTypeAndIds = function(){
  this['spiral-chunk-wrapper-id'] = 'spiral-chunk-wrapper-' + this.spiralChunkNumber;
  this['spiral-chunk-id'] = 'spiral-chunk-' + this.spiralChunkNumber;
  if (this.direction === 'counterClockWise'){
    this['divType'] = fibonacci.divtypesCCW[this.spiralChunkNumber % 4];
  } else {
    console.log('critical error--direction not recognized');
  }
}

var fibonacci = {
  scale: 10,
  length: 9,
  numberArray: [1],
  spiralChunkList: [],
  totalHeight: 0,
  totalWidth: 0,
  direction: 'counterClockWise',
  divtypesCCW:['bottom', 'right', 'top', 'left'],
  divtypesCW:['bottom', 'left', 'top', 'right'],

  populateNumberArray: function(length){
    var thisNumber=1;
    var lastNumber=0;
    var newNumber;
    for (var i = 0; i < fibonacci.length - 1; i++){
      newNumber = lastNumber + thisNumber;
      fibonacci.numberArray.push(newNumber);
      lastNumber = thisNumber;
      thisNumber = newNumber;
    }
  },

  determineSize: function(){
    //working
    if (fibonacci.length > 1){
      if (fibonacci.length % 2 === 0){
        fibonacci.totalHeight = fibonacci.numberArray[fibonacci.length - 1];
        fibonacci.totalWidth = fibonacci.numberArray[fibonacci.length - 1] + fibonacci.numberArray[fibonacci.length - 2];
      } else {
        fibonacci.totalHeight = fibonacci.numberArray[fibonacci.length - 1] + fibonacci.numberArray[fibonacci.length - 2];
        fibonacci.totalWidth = fibonacci.numberArray[fibonacci.length - 1];
      }
    } else {
      fibonacci.totalHeight = fibonacci.numberArray[0];
      fibonacci.totalWidth = fibonacci.numberArray[0];
    }
    console.log('fibonacci.totalHeight is ' + fibonacci.totalHeight);
    console.log('fibonacci.totalWidth is ' + fibonacci.totalWidth);
  },

  populateSpiralChunkList: function(){
    // var $spiralHolder = $('#spiral-holder');
    // var template = Handlebars.compile( $('#spiral-chunk-template').html() );
    var topPos = 0, leftPos = 0, bottomPos = 0, rightPos = 0;
    for (var i = 0; i < fibonacci.numberArray.length; i++){
      var currentSpiralChunk = new SpiralChunk( i, fibonacci.numberArray[i], fibonacci.direction, 'black');
      currentSpiralChunk.initializeDivTypeAndIds();
      // console.log('currentSpiralChunk for index ' + i + ' is:');
      // console.log(currentSpiralChunk);

      fibonacci.spiralChunkList.push(currentSpiralChunk);
      // $spiralHolder.append(template(currentSpiralChunk));
      // $currentSpiralChunkWrapper = $('#' + currentSpiralChunk['spiral-chunk-wrapper-id'])
      // $currentSpiralChunkWrapper.css(currentSpiralChunk['horizontalPositionType'], currentSpiralChunk['horizontalPosition']);
      // $currentSpiralChunkWrapper.css(currentSpiralChunk['verticalPositionType'], currentSpiralChunk['verticalPosition']);
    }
  },

  setSpiralChunkPosition: function(inputChunk, idx){
    if (inputChunk.divType === 'bottom' || inputChunk.divType === 'right'){
      inputChunk.verticalPositionType = 'bottom';
      var bottomPos = 0;
      if (inputChunk.divType === 'bottom'){
        var j = inputChunk.spiralChunkNumber + 4;
      } else if (inputChunk.divType === 'right'){
        var j = inputChunk.spiralChunkNumber + 3;
      }
      // console.log('setSpiralChunkPosition j is ');
      // console.log(j);
      for (j; j < fibonacci.numberArray.length ; j+=4){
        bottomPos += fibonacci.numberArray[j];
      }
      // console.log('bottomPos is ' + bottomPos);
      var topPos = fibonacci.totalHeight - inputChunk.sidelength - bottomPos;
      inputChunk.verticalPosition = topPos;
      inputChunk.verticalPositionType = 'top';
    } else if (inputChunk.divType === 'top' || inputChunk.divType === 'left'){
      inputChunk.verticalPositionType = 'top';
      var topPos = 0;
      if (inputChunk.divType === 'top'){
        var j = inputChunk.spiralChunkNumber + 4;
      } else if (inputChunk.divType === 'left'){
        var j = inputChunk.spiralChunkNumber + 3;
      }
      // console.log('setSpiralChunkPosition j is ');
      // console.log(j);
      for (j; j < fibonacci.numberArray.length ; j+=4){
        topPos += fibonacci.numberArray[j];
      }
      // console.log('topPos is ' + topPos);
      inputChunk.verticalPosition = topPos;
    } else {
      console.log('inputChunk.divType is ' + inputChunk.divType + ' and is inconsistent.');
    }



    if (inputChunk.divType === 'left' || inputChunk.divType === 'bottom'){
      inputChunk.horizontalPositionType = 'left';
      var leftPos = 0;
      if (inputChunk.divType === 'left'){
        var j = inputChunk.spiralChunkNumber + 4;
      } else if (inputChunk.divType === 'bottom'){
        var j = inputChunk.spiralChunkNumber + 3;
      }
      // console.log('setSpiralChunkPosition j is ');
      // console.log(j);
      for (j; j < fibonacci.numberArray.length ; j+=4){
        leftPos += fibonacci.numberArray[j];
      }
      // console.log('leftPos is ' + leftPos);
      inputChunk.horizontalPosition = leftPos;
    } else if (inputChunk.divType === 'right' || inputChunk.divType === 'top'){
      inputChunk.horizontalPositionType = 'right';
      var rightPos = 0;
      if (inputChunk.divType === 'right'){
        var j = inputChunk.spiralChunkNumber + 4;
      } else if (inputChunk.divType === 'top'){
        var j = inputChunk.spiralChunkNumber + 3;
      }
      // console.log('setSpiralChunkPosition j is ');
      // console.log(j);
      for (j; j < fibonacci.numberArray.length ; j+=4){
        rightPos += fibonacci.numberArray[j];
      }
      // console.log('rightPos is ' + rightPos);
      var leftPos = fibonacci.totalWidth - inputChunk.sidelength - rightPos;
      inputChunk.horizontalPosition = leftPos;
      inputChunk.horizontalPositionType = 'left';
    } else {
      console.log('inputChunk.divType is ' + inputChunk.divType + ' and is inconsistent.');
    }
    console.log(inputChunk);
  },

  drawSpiralChunks: function(){
    fibonacci.spiralChunkList.forEach(fibonacci.setSpiralChunkPosition);
  }
}


fibonacci.populateNumberArray();
fibonacci.determineSize();
fibonacci.populateSpiralChunkList();
fibonacci.drawSpiralChunks();


























// //set vertical positions

// if (currentSpiralChunk.divType === 'top' || currentSpiralChunk.divType === 'left'){
//   currentSpiralChunk.verticalPositionType = 'top';
//   if (currentSpiralChunk.divType === 'top'){
//     var j = i;
//   } else if (currentSpiralChunk.divType === 'left'){
//     var j = i - 1;
//   }
//   for (j; j < fibonacci.numberArray.length ; j+=4){
//     topPos += fibonacci.numberArray[j]
//   }
// }
//
// //set horizontal positions
// if (currentSpiralChunk.divType === 'left' || currentSpiralChunk.divType === 'bottom'){
//   currentSpiralChunk.horizontalPositionType = 'left';
//   if (currentSpiralChunk.divType === 'left'){
//     var j = i;
//   } else if (currentSpiralChunk.divType === 'bottom'){
//     var j = i - 1;
//   }
//   for (j; j < fibonacci.numberArray.length ; j+=4){
//     leftPos += fibonacci.numberArray[j]
//   }
// }
// if (currentSpiralChunk.divType === 'right' || currentSpiralChunk.divType === 'top'){
//   currentSpiralChunk.horizontalPositionType = 'right';
//   if (currentSpiralChunk.divType === 'top'){
//     var j = i;
//   } else if (currentSpiralChunk.divType === 'right'){
//     var j = i - 1;
//   }
//   for (j; j < fibonacci.numberArray.length ; j+=4){
//     rightPos += fibonacci.numberArray[j]
//   }
// }
// console.log('topPos is ' + topPos);
// console.log('bottomPos is ' + bottomPos);
// console.log('leftPos is ' + leftPos);
// console.log('rightPos is ' + rightPos);
