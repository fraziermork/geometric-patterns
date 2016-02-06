function SpiralChunk(iterator, sidelength, direction, borderColor){
  this.spiralChunkNumber = iterator;
  this.sidelength = sidelength;
  this.direction = direction;
  this.borderColor = borderColor;
  this.verticalPositionType = null;
  this.verticalPosition = 0;
  this.absVerticalPosition = 0;
  this.horizontalPositionType = null;
  this.horizontalPosition = 0;
  this.absHorizontalPosition = 0;
}
SpiralChunk.prototype.initializeDivTypeAndIds = function(){
  this['spiral-chunk-wrapper-id'] = 'spiral-chunk-wrapper-' + this.spiralChunkNumber;
  this['spiral-chunk-id'] = 'spiral-chunk-' + this.spiralChunkNumber;
  if (this.direction === 'counterClockWise'){
    this['divType'] = fibonacci.divtypesCCW[this.spiralChunkNumber % 4];
  } else {
    console.log('critical error--direction not recognized');
  }
  this.boxSize = fibonacci.scale * this.sidelength;
  this.percentSize = (100 * this.sidelength / fibonacci.totalWidth).toString() + '%';
  // this.percentSize = '50%';
  console.log('percent width for ' + this['spiral-chunk-wrapper-id'] + ' is ' + this.percentSize);
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

    var topPos = 0, leftPos = 0, bottomPos = 0, rightPos = 0;
    for (var i = 0; i < fibonacci.numberArray.length; i++){
      var currentSpiralChunk = new SpiralChunk( i, fibonacci.numberArray[i], fibonacci.direction, 'black');
      currentSpiralChunk.initializeDivTypeAndIds();
      // console.log('currentSpiralChunk for index ' + i + ' is:');
      // console.log(currentSpiralChunk);

      fibonacci.spiralChunkList.push(currentSpiralChunk);
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
    // console.log(inputChunk);
  },

  drawSpiralChunks: function(){
    var $spiralHolder = $('#spiral-holder');
    var template = Handlebars.compile( $('#spiral-chunk-template').html() );
    fibonacci.spiralChunkList.forEach(fibonacci.setSpiralChunkPosition);
    fibonacci.spiralChunkList.forEach(function(inputChunk, idx){
      console.log(idx);
      console.log(inputChunk);
      var newChunk = template(inputChunk);
      console.log(newChunk);
      $spiralHolder.append(newChunk);
      inputChunk.absVerticalPosition = (100 * inputChunk.verticalPosition / fibonacci.totalHeight).toString() + '%';
      console.log('inputChunk.absVerticalPosition is ' + inputChunk.absVerticalPosition);
      inputChunk.absHorizontalPosition = (100 * inputChunk.horizontalPosition / fibonacci.totalWidth).toString() + '%';
      console.log('inputChunk.absHorizontalPosition is ' + inputChunk.absHorizontalPosition);
      $('#' + inputChunk['spiral-chunk-wrapper-id']).width(inputChunk.percentSize).css('top', inputChunk.absVerticalPosition).css('left', inputChunk.absHorizontalPosition);
      // $('#' + inputChunk['spiral-chunk-wrapper-id']).width(inputChunk.boxSize).css('top', function(){ return inputChunk.verticalPosition * fibonacci.scale}).css('left', function(){ return inputChunk.horizontalPosition * fibonacci.scale});
    })
  }
}


fibonacci.populateNumberArray();
fibonacci.determineSize();
fibonacci.populateSpiralChunkList();
fibonacci.drawSpiralChunks();
