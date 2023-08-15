
let questions = [
    {
        'quest': 'Wie heiß ist die Sonnenoberfläche?',
        'answer1': 'etwa 2000 °C',
        'answer2': 'etwa 6000 °C',
        'answer3': 'etwa 15000 °C',
        'answer4': 'etwa 300 °C',
        'category': 1,
        'correct': 2
    },
    {
        'quest': 'Wie weit ist der Mond in etwa von der Erde entfernt?',
        'answer1': 'etwa 350 000 km',
        'answer2': 'etwa 1 Million km',
        'answer3': 'etwa 80 000 km',
        'answer4': 'etwa 800 000 km',
        'category': 1,
        'correct': 1
    },
    {
        'quest': 'Wie weit ist ein Lichtjahr?',
        'answer1': 'etwa 2,5 Billionen km',
        'answer2': 'etwa 9,5 Billionen km',
        'answer3': 'etwa 3 Millarden km',
        'answer4': 'etwa 6 Billarden km',
        'category': 1,
        'correct': 2
    },
    {
        'quest': 'Was gibt die Kuh?',
        'answer1': 'Saft',
        'answer2': 'Milch',
        'answer3': 'Bier',
        'answer4': 'Sahne',
        'category': 2,
        'correct': 2
    },
    {
        'quest': 'Was essen Koalas am liebsten?',
        'answer1': 'Bärlauch',
        'answer2': 'Basilikum',
        'answer3': 'Eukalyptus',
        'answer4': 'Zirtonengras',
        'category': 2,
        'correct': 3
    },
    {
        'quest': 'Welchen Wirkungsgrad hat ein Ottomotor?',
        'answer1': 'etwa 50%',
        'answer2': 'etwa 70%',
        'answer3': 'etwa 90%',
        'answer4': 'etwa 30%',
        'category': 3,
        'correct': 4
    },
    {
        'quest': 'Wann wurde das Internet erstmals verwendet?',
        'answer1': '1969',
        'answer2': '1982',
        'answer3': '1995',
        'answer4': '1955',
        'category': 3,
        'correct': 1
    },
    {
        'quest': 'Wie schnell kann ein Golfball werden?',
        'answer1': 'bis zu 500 kmh',
        'answer2': 'bis zu 320 kmh',
        'answer3': 'bis zu 280 kmh',
        'answer4': 'bis zu 630 kmh',
        'category': 4,
        'correct': 2
    },
    {
        'quest': 'Welchen Durchmesser hat ein Tischtennisball',
        'answer1': '40 mm',
        'answer2': '38 mm',
        'answer3': '43 mm',
        'answer4': '46 mm',
        'category': 4,
        'correct': 1
    },
    {
        'quest': 'Wie schnell läuft ein 100m-Läufer',
        'answer1': 'bis zu 30 kmh',
        'answer2': 'bis zu 35 kmh',
        'answer3': 'bis zu 40 kmh',
        'answer4': 'bis zu 45 kmh',
        'category': 4,
        'correct': 4
    }
];

let actC = 1;
let actQ = 0;
let actLength = 0;
let activeQ = [];
let rightC = 0;
let soundEnd = new Audio('./sounds/end.mp3');
let soundSuccess = new Audio('./sounds/success.mp3');
let soundFail = new Audio('./sounds/fail.mp3');

function start() {
    actQ = 0;
    rightC = 0;
    progressBar();
    document.getElementById('end').innerHTML += ``;
    removeShadows();
    document.getElementById('start').style = 'display: none;';
    document.getElementById('end').style = 'display: none;';
    document.getElementById('question').style = '';
    activeQ = getQuestions();
    actLength = activeQ.length;
    fillForm(activeQ[actQ]);
}

function getQuestions() {
    return questions.filter(question => question.category == actC)
}

function fillForm(quest) {
    removeShadows();
    document.getElementById("questionHead").innerHTML = `<h2>${quest.quest}</h2>`;
    document.getElementById("answer1").innerHTML = quest.answer1;
    document.getElementById("answer2").innerHTML = quest.answer2;
    document.getElementById("answer3").innerHTML = quest.answer3;
    document.getElementById("answer4").innerHTML = quest.answer4;

    document.getElementById("qcount").innerHTML = actQ + 1;
    document.getElementById("qsum").innerHTML = actLength;
}

function testRight(i) {
    if (i == activeQ[actQ]['correct']) {
        document.getElementById('answer' + i).parentNode.classList.add('bgRight');
        rightC++;
        soundSuccess.play();
    } else {
        document.getElementById('answer' + i).parentNode.classList.add('bgWrong');
        document.getElementById('answer' + activeQ[actQ]['correct']).parentNode.classList.add('bgRight');
        soundFail.play();
    }
    document.getElementById('overlay').style = '';
    document.getElementById('btn2').disabled = false;
}

function nextQ() {
    actQ++;
    progressBar();
    if (actQ < actLength) {
        fillForm(activeQ[actQ]);
    } else {
        document.getElementById('question').style = 'display: none;';
        document.getElementById('end').style = '';
        document.getElementById('score').innerHTML = `${rightC}/${actLength}`;
        i = document.getElementById(`cat` + actC).innerHTML;
        document.getElementById('sort').innerHTML = i;
        soundEnd.play();
    }
}

function progressBar() {
    let progress = 0;
    if (actLength != 0) {
        progress = Math.round(actQ / actLength * 100);
    };

    document.getElementById('progress').innerHTML = `${progress}%`;
    document.getElementById('progress').style = `width: ${progress}%`;
}

function removeShadows() {
    for (i = 1; i < 5; i++) {
        document.getElementById('answer' + i).parentNode.classList.remove('bgRight');
        document.getElementById('answer' + i).parentNode.classList.remove('bgWrong');
    }
    document.getElementById('btn2').disabled = true;
    document.getElementById('overlay').style = 'display: none;';
}

function changeCat(i) {
    actC = i;
    start();
    for (j = 1; j < 5; j++) {
        document.getElementById('cat' + j).style = '';
    };
    document.getElementById('cat' + i).style = 'font-weight: bold;';

}
