var abc, e, fivel, fourl, numOfLetters, onel, r, sixl, threel, twol, word;
e = " " + prompt("Word Scramble: ");
e = e.split("");
word = "";
abc = "abcdefghijklmnopqrstuvwxyz";
abc = abc.split("");
onel = ["w", "x", "y", "z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v"];
twol = ["o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n"];
threel = ["r", "s", "t", "u", "v", "w", "x", "y", "z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q"];
fourl = ["d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "a", "b", "c"];
fivel = ["l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];
sixl = ["e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "a", "b", "c", "d"];

for (var i in e) {

  if (i === 0) {
    continue;
  }

  console.log("hi" + i.toString());

  if (i === 1 || i === 7 || i === 13 || i === 19 || i === 25 || i === 31) {
    console.log(abc[onel.indexOf(e[i])]);
    word = word + abc[onel.indexOf(e[i])];
    continue;
  }

  if (i === 2 || i === 8 || i === 14 || i === 20 || i === 26 || i === 32) {
    console.log(abc[twol.indexOf(e[i])]);
    word = word + abc[twol.indexOf(e[i])];
    continue;
  }

  if (i === 3 || i === 9 || i === 15 || i === 21 || i === 27 || i === 33) {
    console.log(abc[threel.indexOf(e[i])]);
    word = word + abc[threel.indexOf(e[i])];
    continue;
  }

  if (i === 4 || i === 9 || i === 16 || i === 22 || i === 28 || i === 34) {
    console.log(abc[fourl.indexOf(e[i])]);
    word = word + abc[fourl.indexOf(e[i])];
    continue;
  }

  if (i === 5 || i === 9 || i === 17 || i === 23 || i === 29 || i === 35) {
    console.log(abc[fivel.indexOf(e[i])]);
    word = word + abc[fivel.indexOf(e[i])];
    continue;
  }

  if (i === 6 || i === 9 || i === 18 || i === 24 || i === 30 || i === 36) {
    console.log(abc[sixl.indexOf(e[i])]);
    word = word + abc[sixl.indexOf(e[i])];
    continue;
  }
}

console.log(word);
