$( document ).ready(function() {

  // SETTINGS
  var readingvoice = "Fiona";
  var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );


  if ('speechSynthesis' in window) {
    console.log('Speech synthesis supported!😎');

    //
    //
    // speechSynthesis.onvoiceschanged = function() {
    //   var $voicelist = $('#voices');
    //
    //   speechSynthesis.getVoices().forEach(function(voice, index) {
    //     console.log(index, voice.name, voice.default ? '(default)' :'');
    //     var $option = $('<option>')
    //     .val(index)
    //     .html(voice.name + (voice.default ? ' (default)' :''));
    //
    //     $voicelist.append($option);
    //   });
    // }




    var u = new SpeechSynthesisUtterance();
    bedtimestory = document.getElementById("story").innerText; // get main article text
    // bedtimestory = "I'm a little teapot, short and stout. Here's my handle, here's my spout."
    // console.log(bedtimestory);
    u.text = bedtimestory;

    u.rate = 0.9;
    if (iOS == true) {
      u.rate = 0.5;
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
        $('div#speechUI').append(select);
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





    document.getElementById("play").onclick = function(){
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
      }

      
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

    document.getElementById("cancel").onclick = function(){
      window.speechSynthesis.cancel();
      $('#status').text('Cancelled');
    }


  } else {
    console.log('Speech synthesis not supported ');
    alert('Speech synthesis is not supported in this browser.😒');
  }



});
