# Hit the Diamond [FCC: Simon Challenge]

A Pen created on CodePen.io. Original URL: [https://codepen.io/StuffieStephie/pen/oZGdWo](https://codepen.io/StuffieStephie/pen/oZGdWo).

Game & Rules
------------------------------
Press play to begin! Until you do so the game functions like a 4 note instrument.

The rules are exactly the same as the classic Simon game. 
But in case you've never played Simon here are the rules:

*  You are presented with a sequence of button presses (The diamonds light up and make a sound). The length of the sequence is the same as the current round you're on.
*  After the sequence is done playing, you press the diamonds ( or use arrow or WASD keys) in the same pattern that just played.
*  If you enter the entire current sequence correctly, the round will increase. The pattern will play again, adding one more button press at the end of the sequence. The game continues like this until round 20.
*  If you enter the sequence incorrectly, a sound will play letting you know you made a mistake. If the mode is set to 'forgiving' (the default) the pattern will play again, and you can try again. If the mode is 'strict' the pattern will reset and you'll have to start all over from round 1.
*  If you beat round 20, you'll win the game! You'll be notified of your victory and the game will start over.

--------------------------------------
Credit & Inspiration
----------------------------
Made for [freeCodeCamp's 'Build a Simon Game' Challenge][2].

The look and feel of this Simon clone was inspired by Rebecca Sugar's Steven Universe.

This pen uses the Web Audio API for its sounds. The Sound class used is based on code from Greg Hovanesyan's [pen][1] .

--------------------------------
Special Thanks!
------------------------
I want to say thank you to the CodePen team for picking this pen! I was floored when I saw my pen on the front page! <3


[1]: http://codepen.io/gregh/pen/RKVNgB  "Greg Hovanesyan's 'Play the Xylophone' pen."
[2]: https://www.freecodecamp.com/challenges/build-a-simon-game/  "freeCodeCamp's 'Build a Simon Game' Challenge."