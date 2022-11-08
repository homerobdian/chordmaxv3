var match,
  kuncigitar = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "Bb",
    "B",
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ],
  kuncigitarRegex = /A#|C#|D#|F#|G#|Ab|Bb|Db|Eb|Gb|A|B|C|D|E|F|G/g;
$("#transup").click(function () {
  $(".chordmax-tooltip").each(function () {
    for (
      var t = $(this).html(), i = "", e = t.split(kuncigitarRegex), a = 0;
      (match = kuncigitarRegex.exec(t));

    ) {
      var c = kuncigitar.indexOf(match[0]);
      i += e[a++] + kuncigitar[c + 1];
    }
    (i = (i = (i = (i = (i = (i += e[a]).replace(/Gb/g, "F#")).replace(
      /Ab/g,
      "G#"
    )).replace(/Bb/g, "A#")).replace(/Db/g, "C#")).replace(/Eb/g, "D#")),
      $(this)
        .html(i)
        .removeClass("chordmax-tooltip " + t)
        .addClass("chordmax-tooltip " + i);
  }),
    $(".chordmax-tooltip").each(function () {
      var t = $(this).text().trim(),
        i = $(this).find("span");
      if (t.includes("/")) {
        var e = t.split("/")[0].replace("#", "cis");
        i.attr("class", "custom chordmax-" + e);
      } else i.attr("class", "custom chordmax-" + t.replace("#", "cis"));
    });
}),
  $("#transdown").click(function () {
    $(".chordmax-tooltip").each(function () {
      for (
        var t = $(this).html(), i = "", e = t.split(kuncigitarRegex), a = 0;
        (match = kuncigitarRegex.exec(t));

      ) {
        var c = kuncigitar.indexOf(match[0], 1);
        i += e[a++] + kuncigitar[c - 1];
      }
      (i = (i = (i = (i = (i = (i += e[a]).replace(/Gb/g, "F#")).replace(
        /Ab/g,
        "G#"
      )).replace(/Bb/g, "A#")).replace(/Db/g, "C#")).replace(/Eb/g, "D#")),
        $(this)
          .html(i)
          .removeClass("chordmax-tooltip " + t)
          .addClass("chordmax-tooltip " + i);
    }),
      $(".chordmax-tooltip").each(function () {
        var t = $(this).text().trim(),
          i = $(this).find("span");
        if (t.includes("/")) {
          var e = t.split("/")[0].replace("#", "cis");
          i.attr("class", "custom chordmax-" + e);
        } else i.attr("class", "custom chordmax-" + t.replace("#", "cis"));
      });
  });

var speed = 1;
var disp = 0;
var handle;
var currentspeed = 0;
var status = 1;
var currentpos = 0,
  alt = 1,
  curpos1 = 0,
  curpos2 = -1;
var color = new Array();
color[1] = "#ddd";
color[2] = "#ccc";
color[3] = "#bbb";
color[4] = "#aaa";
color[5] = "#999";
var interval = new Array(400, 300, 200, 100, 30);

function scrollwindow() {
  if (status == 1) {
    if (document.all && !document.getElementById)
      temp = document.body.scrollTop;
    else temp = window.pageYOffset;
    if (alt == 0) alt = 2;
    else alt = 1;
    if (curpos1 != curpos2) {
      if (document.all) currentpos = document.body.scrollTop + speed;
      else currentpos = window.pageYOffset + speed;
      window.scroll(0, currentpos);
    } else {
      currentpos = 0;
      window.scroll(0, currentpos);
    }
  }
}

$("#autoscrolldown").click(function () {
  startit();
});

$("#autoscrollup").click(function () {
  startMin();
});

function startit() {
  switch (currentspeed) {
    case 0:
      currentspeed = 1;
      break;
    case 1:
      currentspeed = 2;
      break;
    case 2:
      currentspeed = 3;
      break;
    case 3:
      currentspeed = 4;
      break;
    case 4:
      currentspeed = 5;
      break;
    case 5:
      currentspeed = 6;
      break;
    case 6:
      currentspeed = 7;
      break;
    case 7:
      currentspeed = 8;
      break;

    case 8:
      currentspeed = 8;
      break;

    default:
      currentspeed = 0;
      break;
  }
  status = 1;
  clearInterval(handle);
  handle = setInterval("scrollwindow()", interval[currentspeed]);
}

function startMin() {
  stopit();
}

function stopit() {
  currentspeed = 0;
  status = 0;
}

function resetBg(n) {
  for (i = 1; i <= 5; i++) {
    document.getElementById("speed" + i).style.backgroundColor = color[i];
  }
  for (i = 1; i <= currentspeed; i++) {
    document.getElementById("speed" + i).style.backgroundColor = "#ff0000";
  }
}

function changeBg(n) {
  for (i = 1; i <= 5; i++) {
    document.getElementById("speed" + i).style.backgroundColor = color[i];
  }
  for (i = 1; i <= n; i++) {
    document.getElementById("speed" + i).style.backgroundColor = "#ff0000";
  }
}

function tooglespeed() {
  if (disp == 0) {
    disp = 1;
    document.getElementById("speednav").style.display = "";
    document.getElementById("speedtoogle").innerHTML =
      '<img src="https://1.bp.blogspot.com/-diU7KestWAY/XT7XZwOVZyI/AAAAAAAAAiM/iCad8UBThTcw8A5TFm1aLgX3YNHACuMEgCLcBGAs/s1600/telascrl%2B%25281%2529.png" style="border-right:1px solid #AAA;"/>';
    document.getElementById("speedtoogle");
  } else {
    disp = 0;
    document.getElementById("speednav").style.display = "none";
    document.getElementById("speedtoogle").innerHTML =
      '<img src="https://1.bp.blogspot.com/-m2ytOUkrXF0/W2F0sgIiaBI/AAAAAAAAA4o/zSJQDYZjrAkkiLqqhjdADN2V_GKuFA6YQCLcBGAs/s1600/telascrl.png" style="border-right:1px solid #AAA;"/>';
    document.getElementById("speedtoogle");
  }
}

function calcHeight() {
  var the_height =
    document.getElementById("chord_frame").contentWindow.document.body
      .scrollHeight;
  document.getElementById("chord_frame").height = the_height;
}
