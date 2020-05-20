cvs = document.getElementById('demoCanvas');
cvs.width = 560;
cvs.height = cvs.width;


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