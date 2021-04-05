
function makeArray(w, h, val) {
    var arr = [];
    for(let x = 0; x < w; x++) {
        arr[x] = [];
        for(let y = 0; y < h; y++) {
            arr[x][y] = val;
        }
    }
    return arr;
}

function rgbToHex(r, g, b) {
    var rgb = b | (g << 8) | (r << sizeX);
    return '#' + (0x1000000 + rgb).toString(sizeX).slice(1)
}

function show(game_matrix) {
    for (y = 0; y < sizeY; y++) {
        for (x = 0; x < sizeX; x++) {
            var coordinate_ID = x + '-' + y;
            var elem = document.getElementById(coordinate_ID);
            elem.style.backgroundColor = game_matrix[x][y];
        }
    }
}


function createPlaygroundQuarters(sizeX, sizeY) {
    var inner = "";
    var x;
    var y;
    for (y = 0; y < sizeY; y++) {
        inner += '<div id="row_'+x+'" class="quarder_row">';
        for (x = 0; x < sizeX; x++) {
            inner += '<div id="'+x+'-'+y+'" class="quarder"></div>';
        }
        inner += '</div>';
    }
    return inner;
}

let sizeX = 16;
let sizeY = 16;
let game_matrix = makeArray(sizeX,sizeY,0);

var socket = io();

socket.on('connected',  () => {
    document.getElementById("quarderdiv").style.display = "block";
    document.getElementById("connection").style.display = "none";
});
socket.on('disconnect', () => {
    document.getElementById("quarderdiv").style.display = "none";
    document.getElementById("connection").style.display = "block";
});
socket.on('color', function(msg){
    color = rgbToHex(msg.r, msg.g, msg.b);
    var coordinate_ID = msg.x + '-' + msg.y;
    var elem = document.getElementById(coordinate_ID);
    elem.style.backgroundColor = color
    // Not used at the moment
    game_matrix[msg.x][msg.y] = color;
});
socket.on('show', function(){
    show(game_matrix);
});

elem = document.getElementById("quarderdiv");
elem.innerHTML = createPlaygroundQuarters(sizeX, sizeY);