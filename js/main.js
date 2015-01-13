$( document ).ready(function() {

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

  var readingvoice = "Fiona";

  var voices = speechSynthesis.getVoices();


  var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

  var u = new SpeechSynthesisUtterance();

  u.text = document.getElementById("story").innerText; // get main article text
  u.lang = 'en-GB'; // get from BBC domain
  u.rate = 0.9;
  u.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == readingvoice; })[0];

  if (iOS == true) {
    u.rate = 0.3;
  }

  // window.speechSynthesis.speak(u);

  u.onend = function(event) { console.log('Speech complete'); }
  // console.log(u);


  speechSynthesis.getVoices().forEach(function(voice) {
    console.log(voice.name, voice.default ? '(default)' :'');

    var node = document.getElementById('voices');
    var newNode = document.createElement('li');
    newNode.appendChild(document.createTextNode(voice.name, voice.default ? '(default)' :''));
    node.appendChild(newNode);


  });


  $( "#voices li" ).click(function() {
    console.log(this.innerHTML);
    readingvoice = this.innerHTML;
    u.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == readingvoice; })[0];;

  });


  document.getElementById("play").onclick = function(){
    console.log('Paused:');
    console.log(window.speechSynthesis.paused);
    console.log('Playing:');
    console.log(window.speechSynthesis.speaking);


    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume(u);
    } else if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
    } else {
      window.speechSynthesis.speak(u);
    }
  };




} else {
  console.log('Speech synthesis not supported ');
  alert('Speech synthesis is not supported in this browser.😒');
}



});
