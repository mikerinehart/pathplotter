// JavaScript Document
document.body.onload = makeBoard;
//initialized Vars
var _coordinateName = "";
var _rowNum = 0;
var _colNum = 0;



var _gridWidth = 30;
var _gridHeight = 30;
var _theY = 0;
var _theX = 0;
var _rows = 80;
var _columns = 63;
var _offsetH = _gridWidth/2;
var offsetV = _gridHeight/2;
var _boardTop = 10;
var _boardLeft = 10;

var gameBoard = {
	//defaultValues
	_boardWidth: 34,
	_boardHeight: 21,
	_gameMap: 'sopac_map.jpg',
	_gridWidth: 34, 
	_gridHeight: 34,
	_gridY: 0,
	_gridX: 0,
	_gridName: 'Column/Row', 
	_theY: 0,
	_theX: 0,
	_rows: 40,
	_columns: 40,
	_offsetH: _gridWidth/2,
	_offsetV: _gridHeight/2,
	_gridArray: [],
	//METHODS
	setWidth: function(_w){
		this._boardWidth = _w;
		return this._boardWidth;
		},
	setHeight: function(_h){
		this._boardWidth = _h;
		return this._boardHeight;
		},
	setName: function(_n){
		this._gridName = _n;
		return this._gridName;
		},
	getName: function(){
		for(var i =0; i < _gridArray.length; i++){
			$(document).on('click', this._gridArray[i] , function() {
     		alert(this._gridName);
			});
			}
		}
	
	};


function makeBoard(){
var boardWidth = (_columns * _gridWidth)+_offsetH;
var boardHeight = (_rows * _gridWidth)+_offsetH;

var boardSpace = document.getElementById('mapBoard');
boardSpace.innerHTML = '<img src='+gameBoard._gameMap+' />';

var gridSpace = document.getElementById('grid');
gridSpace.style.top = 5+'px';
gridSpace.style.left = -8+'px';
gridSpace.innerHTML = '<canvas id="gridCanvas" width="'+1000+'" height="'+644+'" style="positon:absolute; border:1px solid #d3d3d3;">Your browser does not support the HTML5 canvas tag.</canvas>'
//document.write('<canvas id="gridCanvas" width="'+boardWidth+'" height="'+boardHeight+'" style="positon:absolute; border:1px solid #d3d3d3; top:'+_boardTop+'px; left:'+_boardLeft+'px;">Your browser does not support the HTML5 canvas tag.</canvas>');
	for(var _r  = 0; _r < gameBoard._boardHeight; _r++){
		if(_r % 2 == 0){
            _theX = _offsetH;			
			}else{
			_theX = 0;
		}
		_theY = _gridWidth*_r;
		//alert(_coordinateName);
		//_rowNum = doLetterNum(_r);
		_rowNum = _r;
		makeColumns(_theY,_r,_theX);
	}
}

//make xPos yPos width height assign name

function makeColumns(_y,_r,_x){
	var c=document.getElementById("gridCanvas");
	var ctx=c.getContext("2d");
	ctx.lineWidth = 1;
	for(var i = 0; i < gameBoard._boardWidth; i++){
	ctx.strokeRect(i*_gridWidth+_x,_y,_gridWidth,_gridWidth);
	
	var font = "bold " + 10 +"px san serif";
	 
	  ctx.font = font;
	  ctx.textBaseline = "middle";
	  //_coordinateName = _rowNum + (i+1);//doLetterNum(i-1)+(i+1);
	  //_coordinateName = doLetterNum(i)+(_rowNum+1);
	  
	  _coordinateName = doLetterNum(_rowNum)+(i+1);
	  
	  gameBoard._gridArray.push(gameBoard.setName(_coordinateName));
	  
	  var _coordinateNameWidth = ctx.measureText(_coordinateName).width;
	  var _coordinateNameHeight = ctx.measureText(_coordinateName).height;
	  //alert(_coordinateNameWidth);
	  
	  ctx.fillText(_coordinateName, (i*_gridWidth)+(20-_coordinateNameWidth/2)+_theX, _y+20);
	  //ctx.fillText(_coordinateName, (i*_x), _y+20);
	  
	}
	
}


function doLetterNum(input) {
    input = (+input).toString(26);
    var ret = [];
    while (input.length) {
        var a = input.charCodeAt(input.length-1);
        if (input.length > 1)
            input = (parseInt(input.substr(0, input.length - 1), 26) - 1).toString(26);
        else
            input = "";

        if (a >= 48/*'0'*/ && a <= 57 /*'9'*/)
            ret.unshift(String.fromCharCode(a + 49)); //raise to += 'a'
        else
            ret.unshift(String.fromCharCode(a + 10)); //raise + 10 (make room for 0-9)
    }
    return ret.join('').toUpperCase();
}