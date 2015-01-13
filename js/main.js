(function(){

  // var msg = new SpeechSynthesisUtterance("Hello World");
  // console.log(msg);
  // window.speechSynthesis.speak(msg);

//   var voices = window.speechSynthesis.getVoices();
// // console.log(voices);
//
//   var length = voices.length;
//
//   for (var i=length; i--;) {
//     console.log(voices[i]);
//   }

// var voices = window.speechSynthesis.getVoices();
//
// console.log(voices);

if ('speechSynthesis' in window) {
  console.log('Speech synthesis supported!😎');


  var voices = speechSynthesis.getVoices();
  for(var i = 0; i < voices.length; i++ ) {
    // console.log("Voice " + i.toString() + ' ' + voices[i].name + ' ' + voices[i].uri);
  }



  var u = new SpeechSynthesisUtterance();

  u.text = "I'm a little teapot, short and stout. Here's my handle, here's my spout."; // get main article text
  u.lang = 'en-GB'; // get from BBC domain
  u.rate = 1.3;

  // window.speechSynthesis.speak(u);

  u.onend = function(event) { console.log('Speech complete'); }
  console.log(u);


  Object.keys(u).forEach(function(key) {
    console.log(key, u[key]);
  });


  document.getElementById("play").onclick  = function(){
    window.speechSynthesis.speak(u);
  };


  document.getElementById("pause").onclick  = function(){
    window.speechSynthesis.pause(u);
    console.log(window.speechSynthesis.paused);
  };

    // document.getElementById("resume").onclick  = function(){
    //
    //   window.speechSynthesis.resume(u);
    //
    // };


} else {
  console.log('Speech synthesis not supported ');
  alert('Speech synthesis is not supported in this browser.😒');
}



})();
