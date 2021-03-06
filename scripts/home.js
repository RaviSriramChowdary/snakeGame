
function revealmode() {
    optotr('menu');
    setTimeout(trtoop('mode'),1000);
}
function optotr(string) {
    var elem = document.getElementById(string);
    var opacity = 1;
    elemleft = elem.style.left;
    var id = setInterval(frame1, 5);
    function frame1() {
        if (opacity<=0) {
            clearInterval(id);
            elem.style.display = "none";
        } else {
            opacity -= 0.02;
            elemleft-=5;
            elem.style.left = elemleft;
            elem.style.opacity = opacity;
        }
    } 
}

function trtoop(string) {
    var elem2 = document.getElementById(string);
    elem2.style.display = "block";
    var opacity2 = 0;
    elemleft2 = elem2.style.left + 500;
    var id2 = setInterval(frame2, 5);
    function frame2() {
        if (opacity2 >= 1) {
            clearInterval(id2);
        } else {
            opacity2 += 0.01;
            elemleft2 -= 5;
            elem2.style.left = elemleft2;
            elem2.style.opacity = opacity2;
        }
    }
}

const cvs = document.getElementById('demoCanvas');
const ctx = cvs.getContext("2d");
var box = cvs.width / 28;
var snake = new Array();
var isCampaign = true;
var isClassic = false;
var levelModern;

snake[0] = {
    x: 13 * box,
    y: 15 * box
};

let maze = new Array();
var food = foodGenerator();
var timeSpeed = 70;
var game = setInterval(drawingImg, timeSpeed);

cvs.width = 560;

var reqwidth = document.getElementById('content').offsetWidth;
console.log(reqwidth);

var x = window.matchMedia("(max-width: 564px)")
myFunction() // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes

window.addEventListener('resize', myFunction);

var foodimg = new Image();
const apple = new Image();
const coin = new Image();
var snakeBody = new Image();
var headupimg = new Image();
var headrightimg = new Image();
var headdownimg = new Image();
var headleftimg = new Image();
var grass = new Image();
var cvsbg = new Image();

var eaten = new Audio();
var gameover = new Audio();
var levelup = new Audio();


apple.src = "img/apple.png";
coin.src = "img/coin.png";
headupimg.src = "img/headup.png";
headleftimg.src = "img/head.png";
headdownimg.src = "img/headdown.png";
headrightimg.src = "img/headright.png";
snakeBody.src = "img/body.png";
grass.src = "img/Capture.png";
cvsbg.src = "img/Capture.jpg";

eaten.src = "audio/move.mp3";
gameover.src = "audio/gameover.mp3";
levelup.src = "audio/levelup.mp3";


var score = 0;
var directionCode = "none";

var autonomousState = 1;

function myFunction() {
    if (x.matches) { // If media query matches
        ctx.clearRect(0, 0, 560, 560);
        reqwidth = document.getElementById('content').offsetWidth;
        cvs.width = reqwidth - reqwidth % 28;
        cvs.height = cvs.width;
        console.log(reqwidth + "and" + cvs.width);
    } else {
        ctx.clearRect(0, 0, 560, 560);
        cvs.width = 560;
        cvs.height = cvs.width;
        reqwidth = document.getElementById('content').offsetWidth;
        console.log(reqwidth + "and" + cvs.width);
    }

    for (let i = 0; i < snake.length; i++) {
        snake[i].x = (snake[i].x / box) * (cvs.width / 28);
        snake[i].y = (snake[i].y / box) * (cvs.width / 28);
    }
    for (let i = 0; i < maze.length; i++) {
        maze[i].x = (maze[i].x / box) * (cvs.width / 28);
        maze[i].y = (maze[i].y / box) * (cvs.width / 28);
    }
    food.x = (food.x / box) * (cvs.width / 28);
    food.y = (food.y / box) * (cvs.width / 28);
    box = cvs.width / 28;
}

function isFoodLegal(snake, maze, food) {
    for (var i = 1; i < snake.length; i++) {
        if (food.x == snake[i].x && food.y == snake[i].y) {
            return (false);
        }
    }

    for (var i = 0; i < maze.length; i++) {
        if (food.x == maze[i].x && food.y == maze[i].y) {
            return (false);
        }
    }

    if (autonomousState == 1) {

        for (var i = 2; i < snake.length; i++) {
            if (food.x == snake[i].x + box && food.y == snake[i].y) {
                return (false);
            }
            else if (food.x == snake[i].x - box && food.y == snake[i].y) {
                return (false);
            }
            if (food.x == snake[i].x && food.y == snake[i].y + box) {
                return (false);
            }
            if (food.x == snake[i].x && food.y == snake[i].y - box) {
                return (false);
            }
        }

        for (var i = 0; i < maze.length; i++) {
            if (food.x == maze[i].x + box && food.y == maze[i].y) {
                return (false);
            }
            else if (food.x == maze[i].x - box && food.y == maze[i].y) {
                return (false);
            }
            if (food.x == maze[i].x && food.y == maze[i].y + box) {
                return (false);
            }
            if (food.x == maze[i].x && food.y == maze[i].y - box) {
                return (false);
            }
        }
        if (food.x == 2 * box || food.x == 25 * box || food.y == 4 * box || food.y == 26 * box)
            return (false);
    }
    return true;
}

function gameStatusChange() {
    if (game == -1) {
        game = setInterval(drawingImg, timeSpeed);
    }
    else {
        clearInterval(game);
        game = -1;
    }
}

function collision(array, head) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }

    for (let i = 0; i < maze.length; i++) {
        if (head.x == maze[i].x && head.y == maze[i].y) {
            return true;
        }
    }
    return false;
}

function directionChanger(dir) {
    directionCode = dir;
}
function addEndPart(maze, d, c) {
    if (d == "right") {
        let mazenew = {
            x: maze[c].x + box,
            y: maze[c].y
        }
        maze.push(mazenew);
    }
    if (d == "up") {
        let mazenew = {
            x: maze[c].x,
            y: maze[c].y - box
        }
        maze.push(mazenew);
    }
    if (d == "left") {
        let mazenew = {
            x: maze[c].x - box,
            y: maze[c].y
        }
        maze.push(mazenew);
    }
    if (d == "down") {
        let mazenew = {
            x: maze[c].x,
            y: maze[c].y + box
        }
        maze.push(mazenew);
    }
}
function shiftMaze(maze, a, b) {
    let mazenew = {
        x: a * box,
        y: b * box
    }
    maze.push(mazenew);
}

function setMazePath() {
    if (levelModern == 1) {
        var d = "right";
        var ml = 91;
        maze[0] = {
            x: 2 * box,
            y: 4 * box
        }

        for (var c = 0; c < ml; c++) {
            if (c == 23)
                d = "down";
            if (c == 45)
                d = "left";
            if (c == 68)
                d = "up";

            addEndPart(maze, d, c);
        }
        maze.pop();
        return maze;
    }
    else if (levelModern == 2) {

        var d = "up";
        var ml = 146;
        maze[0] = {
            x: 2 * box, y: 12 * box
        };

        for (var c = 0; c < ml; c++) {

            if (c == 8 || c == 81 || c == 92 || c == 132 || c == 138)
                d = "right";
            if (c == 31 || c == 87 || c == 96 || c == 120 || c == 134)
                d = "down";
            if (c == 48 || c == 94 || c == 105 || c == 114 || c == 130)
                d = "left";
            if (c == 71 || c == 111 || c == 144)
                d = "up";

            if (c == 39)
                shiftMaze(maze, 25, 18);
            else if (c == 79)
                shiftMaze(maze, 5, 9);
            else if (c == 112)
                shiftMaze(maze, 22, 9);

            else
                addEndPart(maze, d, c);
        }
        maze.pop();
        return maze;
    }
    else if (levelModern == 3) {

        var d = "right";
        var ml = 74;
        maze[0] = {
            x: 3 * box, y: 4 * box
        };

        for (var c = 0; c < ml; c++) {

            if (c == 61) {
                d = "right";
            }
            if (c == 6) {
                d = "down";
            }
            if (c == 25) {
                d = "left";
            }
            if (c == 44) {
                d = "up";
            }

            if (c == 18)
                shiftMaze(maze, 25, 5);
            else if (c == 37)
                shiftMaze(maze, 24, 26);
            else if (c == 55)
                shiftMaze(maze, 2, 25);

            else
                addEndPart(maze, d, c);
        }
        maze.pop();
        return maze;
    }
    else if (levelModern == 4) {
        var d = "right";
        var ml = 134;
        maze[0] = {
            x: 6 * box, y: 8 * box
        };

        for (var c = 0; c < ml; c++) {
            if (c == 3 || c == 29 || c == 48 || c == 76 || c == 96 || c == 119 || c == 123)
                d = "down";
            if (c == 16 || c == 37 || c == 110)
                d = "up";
            if (c == 20 || c == 115)
                d = "left";
            if (c == 9 || c == 40 || c == 64 || c == 83 || c == 99 || c == 118 || c == 121)
                d = "right";

            if (c == 21)
                shiftMaze(maze, 9, 4);
            else if (c == 38)
                shiftMaze(maze, 12, 7);
            else if (c == 58)
                shiftMaze(maze, 5, 14);
            else if (c == 75)
                shiftMaze(maze, 2, 19);
            else if (c == 90)
                shiftMaze(maze, 9, 23);
            else if (c == 117)
                shiftMaze(maze, 19, 19);
            else if (c == 120)
                shiftMaze(maze, 23, 4);
            else if (c == 129)
                shiftMaze(maze, 23, 12);

            else
                addEndPart(maze, d, c);

        }
        maze.pop();
        return maze;
    }
}

function reset(time_lapse) {
    gameStatusChange();
    setTimeout(function () {
        snake = Array(0);
        directionCode = "none";
        timeSpeed = 100;
        snake.unshift({
            x: 13 * box,
            y: 15 * box
        });
        score = 0;
        //pathCounter = 0;
        food = {
            x: (Math.floor((Math.random()) * 24 + 2)) * box,
            y: (Math.floor((Math.random()) * 23 + 4)) * box
        }
        gameStatusChange();
    }, time_lapse)
}

function foodGenerator() {
    return ({
        x: (Math.floor((Math.random()) * 24 + 2)) * box,
        y: (Math.floor((Math.random()) * 23 + 4)) * box
    });
}

if (isCampaign)
    levelModern = 1;
if (!isClassic)
    setMazePath();

var pathCounter = 0;

var del;


function drawingImg() {

    bgcolor = "#003050";

    ctx.fillStyle = bgcolor;
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    ctx.fillStyle = "#229999";
    ctx.fillRect(2 * box, 4 * box, 24 * box, 23 * box);
    for (var j = 0; j < maze.length; j++) {

        ctx.fillStyle = "rgb(150, 155, 150)";
        ctx.fillRect(maze[j].x, maze[j].y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(maze[j].x, maze[j].y, box, box);
    }

    if (autonomousState == 1) {
        searchthepath(1, snake[0], food, snake);
        if (typeof path != undefined) {
            if (path.length > 0) {

                for (var i = 0; i < path.length; i++) {
                    del = i;

                    if ((snake[0].x + box == path[del].x || snake[0].x + box == path[del].x + 24 * box) && snake[0].y == path[del].y) {
                        directionCode = "RIGHT";
                    }
                    else if ((snake[0].x - box == path[del].x || snake[0].x - box == path[del].x - 24 * box) && snake[0].y == path[del].y) {
                        directionCode = "LEFT";
                    }
                    if (snake[0].x == path[del].x && (snake[0].y - box == path[del].y || snake[0].y - box == path[del].y - 23 * box)) {
                        directionCode = "UP";
                    }
                    else if (snake[0].x == path[del].x && (snake[0].y + box == path[del].y || snake[0].y + box == snake[0].y + 23 * box)) {
                        directionCode = "DOWN";
                    }
                }
            }
        }
        else {
            location.reload();
        }

    }

    for (let i = snake.length - 1; i >= 0; i--) {

        if (i != 0) {
            ctx.drawImage(snakeBody, snake[i].x, snake[i].y, box, box);

            ctx.strokeStyle = "black";
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }
        else {
            if (directionCode == "RIGHT" || directionCode == "none") {
                ctx.drawImage(headrightimg, snake[0].x - box / 4, snake[0].y - box / 6, box + box / 2, box + box / 2)
            }
            if (directionCode == "LEFT") {
                ctx.drawImage(headleftimg, snake[0].x - box / 6, snake[0].y - box / 7, box + box / 2, box + box / 2)
            }
            if (directionCode == "DOWN") {
                ctx.drawImage(headdownimg, snake[0].x - box / 3, snake[0].y - box / 6, box + box / 2, box + box / 3)
            }
            if (directionCode == "UP") {
                ctx.drawImage(headupimg, snake[0].x - box / 3, snake[0].y - 2, box + box / 2, box + box / 3)
            }
        }
    }


    let SnakeHead = {
        x: snake[0].x,
        y: snake[0].y,
    }

    if (directionCode == "RIGHT")
        SnakeHead.x += box;
    if (directionCode == "UP")
        SnakeHead.y -= box;
    if (directionCode == "LEFT")
        SnakeHead.x -= box;
    if (directionCode == "DOWN")
        SnakeHead.y += box;


    if (snake[0].x == food.x && snake[0].y == food.y) {
        eaten.play();
        score++;
        food = foodGenerator();
    }
    else {
        snake.pop();
    }

    if (SnakeHead.x < 2 * box) {
        SnakeHead.x = 25 * box;
    }
    if (SnakeHead.x > 25 * box) {
        SnakeHead.x = 2 * box;
    }
    if (SnakeHead.y < 4 * box) {
        SnakeHead.y = 26 * box;
    }
    if (SnakeHead.y > 26 * box) {
        SnakeHead.y = 4 * box;
    }


    if (collision(snake, SnakeHead)) {

        if (isCampaign) {
                reset(10);
        }
    }
    else
        snake.unshift(SnakeHead);

    if (isCampaign) {
        if (score == levelModern * 5) {
            levelModern++;
            maze = new Array();
            setMazePath();
            reset(10);
        }
    }

    //Drawing the food only if it's legal

    if (isFoodLegal(snake, maze, food)) {
        ctx.drawImage(apple, food.x - 2, food.y - 2, box + 4, box + 4);
    }
    else {
        while (!isFoodLegal(snake, maze, food)) {

            food = foodGenerator();
            if (isFoodLegal(snake, maze, food)) {
                break;
            }
        }
        ctx.drawImage(apple, food.x - 2, food.y - 2, box + 4, box + 4);
    }
}


function equality(obj1, obj2) {
    if (
        obj1.self.x == obj2.self.x &&
        obj1.self.y == obj2.self.y
    )
        return true;
    else
        return false;
}

function equate(obj1, obj2) {
    obj1.parent.x = obj2.parent.x;
    obj1.parent.y = obj2.parent.y;
    obj1.self.x = obj2.self.x;
    obj1.self.y = obj2.self.y;
    obj1.g = obj2.g;
    obj1.h = obj2.h;
    obj1.f = obj2.f;
}

var openlist, closedlist, current_node;

function searchthepath(cost, origin, goal, snake) {
    var start_node = {
        parent: {
            x: null,
            y: null
        },
        self: {
            x: origin.x,
            y: origin.y
        },
        g: 0,
        h: 0,
        f: 0
    };
    var end_node = {
        parent: {
            x: null,
            y: null
        },
        self: {
            x: goal.x,
            y: goal.y
        },
        g: 0,
        h: 0,
        f: 0
    };

    openlist = new Array();

    closedlist = new Array();

    var move = ["left", "right", "up", "down"];

    openlist.push({
        parent: {
            x: start_node.parent.x,
            y: start_node.parent.y
        },
        self: {
            x: start_node.self.x,
            y: start_node.self.y
        },
        g: start_node.g,
        h: start_node.h,
        f: start_node.f
    });

    var iterCount = 0;
    var maxiterCount = Math.pow(12, 12);

    while (openlist.length > 0) {
        iterCount++
        current_node = {
            parent: {
                x: null,
                y: null
            },
            self: {
                x: 0,
                y: 0
            },
            g: 0,
            h: 0,
            f: 0
        };
        equate(current_node, openlist[0]);
        var current_index = 0;

        for (var i = 0; i < openlist.length; i++) {
            if (openlist[i].f < current_node.f) {
                equate(current_node, openlist[i]);
                current_index = i;
            }
        }

        if (iterCount > maxiterCount) {
            console.log("Giving up on pathfinding. Too many iterations.");
            returnPath({
                parent: {
                    x: current_node.parent.x,
                    y: current_node.parent.y
                },
                self: {
                    x: current_node.self.x,
                    y: current_node.self.y
                },
                g: current_node.g,
                h: current_node.h,
                f: current_node.f
            });
            return;
        }

        openlist.splice(current_index, 1);
        closedlist.push({
            parent: {
                x: current_node.parent.x,
                y: current_node.parent.y
            },
            self: {
                x: current_node.self.x,
                y: current_node.self.y
            },
            g: current_node.g,
            h: current_node.h,
            f: current_node.f
        });

        if (equality(current_node, end_node)) {
            returnPath({
                parent: {
                    x: current_node.parent.x,
                    y: current_node.parent.y
                },
                self: {
                    x: current_node.self.x,
                    y: current_node.self.y
                },
                g: current_node.g,
                h: current_node.h,
                f: current_node.f
            });
            return;

        }

        var children = new Array();

        for (let i = 0; i < move.length; i++) {

            var samplearray;

            var node_position = {
                x: 0,
                y: 0
            };

            if (move[i] == "left") {
                node_position.x = current_node.self.x - box;
                node_position.y = current_node.self.y;
            }
            else if (move[i] == "right") {
                node_position.x = current_node.self.x + box;
                node_position.y = current_node.self.y;
            }
            else if (move[i] == "up") {
                node_position.x = current_node.self.x;
                node_position.y = current_node.self.y - box;
            }
            else if (move[i] == "down") {
                node_position.x = current_node.self.x;
                node_position.y = current_node.self.y + box;
            }

            if (node_position.x > 25 * box) {
                node_position.x = 2 * box;
            }
            if (node_position.x < 2 * box) {
                node_position.x = 25 * box;
            }
            if (node_position.y > 26 * box) {
                node_position.y = 4 * box;
            }
            if (node_position.y < 4 * box) {
                node_position.y = 26 * box;
            }

            samplearray = new Array();

            snake.forEach(
                function (value, index, array) {
                    if (node_position.x == value.x && node_position.y == value.y) {
                        samplearray.push(index);
                    }
                }
            );

            if (samplearray.length > 0)
                continue;

            samplearray = new Array();

            if (maze.length > 0) {
                maze.forEach(
                    function (value, index, array) {
                        if (node_position.x == value.x && node_position.y == value.y) {
                            samplearray.push(index);
                        }
                    }
                );
            }
            if (samplearray.length > 0)
                continue;


            children.push({
                parent: {
                    x: current_node.self.x,
                    y: current_node.self.y
                },
                self: {
                    x: node_position.x,
                    y: node_position.y
                },
                g: 0,
                h: 0,
                f: 0
            });

        }

        var child = {
            parent: {
                x: null,
                y: null
            },
            self: {
                x: 0,
                y: 0
            },
            g: 0,
            h: 0,
            f: 0
        };

        for (let i = 0; i < children.length; i++) {
            equate(child, children[i]);

            samplearray = new Array();
            closedlist.forEach(
                function (value, index, array) {
                    if (equality(value, child))
                        samplearray.push(index);
                }
            );

            if (samplearray.length > 0)
                continue;

            child.g = current_node.g + cost;
            child.h = (Math.abs(child.self.x - end_node.self.x) + Math.abs(child.self.y - end_node.self.y)) / box;
            child.f = child.g + child.h;

            samplearray = new Array();

            openlist.forEach(
                function (value, index, array) {
                    if (equality(value, child)) {
                        samplearray.push(index);
                        if (child.g < value.g) {
                            value.g = child.g;
                        }
                    }
                }
            );

            if (samplearray.length > 0)   //Child is already in the open
                continue;

            openlist.push({
                parent: {
                    x: child.parent.x,
                    y: child.parent.y
                },
                self: {
                    x: child.self.x,
                    y: child.self.y
                },
                g: child.g,
                h: child.h,
                f: child.f
            });

        }

    }

}
var path;

function returnPath(current_node_for_path) {
    path = new Array();
    var current = {
        parent: {
            x: null,
            y: null
        },
        self: {
            x: 0,
            y: 0
        },
        g: 0,
        h: 0,
        f: 0
    };
    var a, b;
    equate(current, current_node_for_path);
    while (current.parent.x != null && current.parent.y != null) {
        path.push({
            x: current.self.x,
            y: current.self.y
        });
        a = current.parent.x;
        b = current.parent.y;
        closedlist.forEach(
            function (value, index, array) {
                if (value.self.x == a && value.self.y == b)
                    equate(current, value);
            }
        );
    }
    /*Here we have to reverse the path */
    path.reverse();
}

function followpath() {
}
