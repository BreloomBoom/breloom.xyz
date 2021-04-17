let board = [['', '', ''], ['', '', ''], ['', '', '']];

let players = ['X', 'O'];

let currentPlayer;
let available = [0,1,2,3,4,5,6,7,8];
let screen;

function setup() {
    screen = createCanvas(450, 450).center('horizontal');
    currentPlayer = players[0];
}

function equals3(a, b, c) {
    return a == b && b == c && a != '';
}

function checkWinner() {
    let winner = null;

    for (let i = 0; i < 3; i++) {
        if (equals3(board[i][0], board[i][1], board[i][2])) {
        winner = board[i][0];
        }
    }

    for (let i = 0; i < 3; i++) {
        if (equals3(board[0][i], board[1][i], board[2][i])) {
        winner = board[0][i];
        }
    }

    if (equals3(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
        winner = board[2][0];
    }

    if (winner == null && available.length == 0) {
        return 'tie';
    } else {
        return winner;
    }
}

function getMousePos() {
    var rect = screen.canvas.getBoundingClientRect();
    return {
      x: window.event.clientX - rect.left,
      y: window.event.clientY - rect.top
    };
}

function removeEle(no) {
    var index = available.indexOf(no);
    available.splice(index, 1);
}

function mousePressed() {
    let {x,y} = getMousePos();
    let col = floor(y/150);
    let row = floor(x/150);
    let na = row*3+col;
    if (available.includes(na)){
        if (currentPlayer == players[0]) {
            board[row][col] = players[0];
            removeEle(na);
            currentPlayer = players[1];
        } else if (currentPlayer == players[1]) {
            board[row][col] = players[1];
            removeEle(na);
            currentPlayer = players[0];
        } 
    }
}

function draw() {
    let w = width / 3;
    let h = height / 3;
    strokeWeight(4);
    stroke(255);

    line(w, 0, w, height);
    line(w * 2, 0, w * 2, height);
    line(0, h, width, h);
    line(0, h * 2, width, h * 2);

    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
        let x = w * i + w / 2;
        let y = h * j + h / 2;
        let spot = board[i][j];
        textSize(32);
        let r = w / 4;
        if (spot == players[1]) {
            noFill();
            ellipse(x, y, r * 2);
        } else if (spot == players[0]) {
            line(x - r, y - r, x + r, y + r);
            line(x + r, y - r, x - r, y + r);
        }
        }
    }

    let result = checkWinner();
    if (result != null) {
        noLoop();
        let resultP = createP('');
        resultP.style('font-size', '32pt');
        if (result == 'tie') {
        resultP.html('Tie!');
        } else {
        resultP.html(`${result} wins!`);
        }
    }
}