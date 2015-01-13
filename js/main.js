$( document ).ready(function() {



if ('speechSynthesis' in window) {
  console.log('Speech synthesis supported!😎');

  // SETTINGS

  var readingvoice = "Fiona";


  var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );



  var u = new SpeechSynthesisUtterance();

  u.text = document.getElementById("story").innerText; // get main article text
  u.lang = 'en-GB'; // get from BBC domain
  u.rate = 0.9;
  u.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == readingvoice; })[0];

  if (iOS == true) {
    u.rate = 0.5;
  }

  // window.speechSynthesis.speak(u);

  u.onend = function(event) { console.log('Speech complete'); }
  // console.log(u);

  var voices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = function() {

    console.log(voices);
    window.speechSynthesis.forEach(function(voice) {
      console.log(voice.name, voice.default ? '(default)' :'');

      var node = document.getElementById('voices');
      var newNode = document.createElement('li');
      newNode.appendChild(document.createTextNode(voice.name, voice.default ? '(default)' :''));
      node.appendChild(newNode);


    });

};

  $( "#voices li" ).click(function() {
    console.log(this.innerHTML);
    readingvoice = this.innerHTML;
    u.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == readingvoice; })[0];;
    $('#voice').text(this.innerHTML);
  });

  if (window.speechSynthesis.paused) {
    $('#status').text('Paused');
  } else if (window.speechSynthesis.speaking) {
    $('#status').text('Speaking');
  } else {
    $('#status').text('Stopped');
  }






  document.getElementById("play").onclick = function(){
    // console.log('Paused:');
    // console.log(window.speechSynthesis.paused);
    // console.log('Playing:');
    // console.log(window.speechSynthesis.speaking);


    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume(u);
      $('#status').text('Playing');

    } else if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause(u);
      $('#status').text('Paused');
    } else {
      window.speechSynthesis.speak(u);
      $('#status').text('Playing');
    }
  };




} else {
  console.log('Speech synthesis not supported ');
  alert('Speech synthesis is not supported in this browser.😒');
}



});
