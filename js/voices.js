// $( document ).ready(function() {

  // SETTINGS
  var readingvoice = "Fiona";
  var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );


  if ('speechSynthesis' in window) {
    console.log('Speech synthesis supported!😎');




    var u = new SpeechSynthesisUtterance();
    // bedtimestory = document.getElementById("story").innerText; // get main article text
    bedtimestory = $getElementsByClassName('.story-body__inner').innerText;
    // bedtimestory = "I'm a little teapot, short and stout. Here's my handle, here's my spout."
    u.text = bedtimestory;

    u.rate = 0.9;
    if (iOS == true) {
      u.rate = 0.3;
    }
    u.lang = 'en-GB'; // get from BBC domain
    var createdVoiceList = false;

    var addVoices = function() {
      var select = '';
      var voices = window.speechSynthesis.getVoices();
      if (voices.length && !createdVoiceList) {
        var select = $('<select/>', {'class':'speakContentVoice'});
        voices.forEach(function(v) {
          select.append($('<option/>').val(v.name).text(v.name).prop('selected', v.default));
        });
        $('#ws-speechUI').append(select);
        createdVoiceList = true;
      }
    };

    if ('onvoiceschanged' in window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = function(e) {
        addVoices();
      };
    } else {
      addVoices();
    }

    u.onerror = function(event) {
      console.log('An error occured with TTS.');
    };

    u.onstart = function(event) {
      console.log('Speech started');
    };

    u.onend = function(event) {
      console.log(event);
      console.log('Finished in ' + event.elapsedTime + ' milliseconds.');
    };


    document.getElementById("ws-play").onclick = function(){
      // console.log('Paused:');
      // console.log(window.speechSynthesis.paused);
      // console.log('Playing:');
      // console.log(window.speechSynthesis.speaking);

      var useVoice = $('select.speakContentVoice option:selected').val();
      console.log(useVoice);
      if (useVoice) {
        u.voice = speechSynthesis.getVoices().filter(function(voice){
          return voice.name == useVoice;
        })[0];
        document.getElementById('#ws-voice').innerHTML(u.voice.name);
      }

      console.log(u.voice);


      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume(u);
        document.getElementById('#ws-status').innerHTML('Playing');
      } else if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause(u);
        document.getElementById('#ws-status').innerHTML('Paused');
      } else {
        window.speechSynthesis.speak(u);
        document.getElementById('#ws-status').innerHTML('Playing');
      }
    };

    document.getElementById("ws-cancel").onclick = function(){
      window.speechSynthesis.cancel();
      document.getElementById('#ws-status').innerHTML('Cancelled');
    }


  } else {
    console.log('Speech synthesis not supported ');
    alert('Speech synthesis is not supported in this browser.😒');
  }



// });
