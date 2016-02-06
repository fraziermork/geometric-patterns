var fibonacci = {
  scale: 10,
  length: 9,
  numberArray: [1],
  positionArray:[],
  divtypes:['bottom', 'right', 'top', 'left'],
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
  populatePositionArray: function(){
    var spiralHolderEl = document.getElementById('spiralHolder');
    var counter = 0;
    var topPos = 0;
    var leftPos = 0;
    for (var i = 0; i < fibonacci.numberArray.length; i++){





      counter = (counter + 1) % 4;
    }
  }
}
fibonacci.populateNumberArray();
fibonacci.populatePositionArray();
