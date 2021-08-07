var music = ["添加想要的歌曲"];
var musicConter = 0;
var audio = new Audio();
audio.src = music[0];
audio.loop = false;

var sendButton = document.getElementById('sendButton');
var submitButton = document.getElementById('submitButton');
var socket = new WebSocket('localhost或云服务器');

var userID = "";

var webLogo = document.getElementById("webLogo");
var userid = document.getElementById("userID");
var title1 = document.getElementById("title1");
var title2 = document.getElementById("title2");
var playMusic = document.getElementById("playMusic");
var pauseMusic = document.getElementById("pauseMusic");
var title3 = document.getElementById("title3");
var chatBox = document.getElementById("chatBox");
var inputBox = document.getElementById("inputBox");

function playmusic() {
    playMusic.style.display = "none";
    pauseMusic.style.display = "block";
    if (audio != null) {
        audio.play();
    }
}

function pausemusic() {
    pauseMusic.style.display = "none";
    playMusic.style.display = "block";
    audio.pause();
}

function loc() {
    var obj = document.getElementById("chatBox");
    obj.scrollTop = obj.scrollHeight;
}

function getNowTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    var time = '(' + year + addZero(month) + addZero(day) + ' ' + addZero(hour) + ':' + addZero(minute) + ':' + addZero(second) + ')';
    return time;
}

function addZero(s) {
    return s < 10 ? ('0' + s) : s;
}

audio.addEventListener('ended', nextMusic, false)
function nextMusic() {
    console.log("播放下一首");
    musicConter++;
    if (musicConter == music.length) {
        musicConter = 0;
    }
    audio.src = music[musicConter];
    audio.play();
}

submitButton.addEventListener('click', function () {
    userID = document.getElementById("userID").value;
    if (userID == '') {
        alert('用户名禁止为空')
    }
    else {
        userID = userID + "已连接\n";
        webLogo.style.display = "none";
        userid.style.display = "none";
        submitButton.style.display = "none";
        title1.style.display = "block";
        title2.style.display = "block";
        playMusic.style.display = "block";
        title3.style.display = "block";
        chatBox.style.display = "block";
        inputBox.style.display = "block";
        sendButton.style.display = "block";//建议修改
        socket.send(userID);
    }
})

document.onkeydown = function (e) {
    if (e.keyCode == 13) {
        e.returnValue = false;
        sendButton.click();
    }
    else {
        return;
    }
}

socket.addEventListener('error', function () {
    document.getElementById("chatBox").value = "很抱歉，服务器尚未开启！\n";
})

socket.addEventListener('open', function () {
    document.getElementById("chatBox").value = "连接服务成功！\n";
})

sendButton.addEventListener('click', function () {
    var mes = document.getElementById("inputBox").value;
    if (mes == "") {
        return;
    }
    else {
        socket.send(userID + getNowTime() + "\n" + mes + "\n");
        document.getElementById("inputBox").value = "";
        document.getElementById("inputBox").focus();
    }
})

socket.addEventListener('message', function (e) {
    document.getElementById("chatBox").value += e.data;
    loc();
})