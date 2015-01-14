// $( document ).ready(function() {
document.addEventListener("DOMContentLoaded", function(event) {
  // SETTINGS
  var readingvoice = "Fiona";
  var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );


  if ('speechSynthesis' in window) {
    console.log('Speech synthesis supported!😎');
    document.getElementById("js-websynth").style.display = 'block';
    var debug = document.getElementById('ws-debug');
    debug.innerHTML = debug.innerHTML + 'Speech synthesis supported';



    var u = new SpeechSynthesisUtterance();
    // bedtimestory = document.getElementById("story").innerText; // get main article text





    bedtime = document.getElementsByClassName('story-body__inner')[0].getElementsByTagName("p");
    var bedtimestory = '';
    var nodeArray = [];
    for (var i = 0; i < bedtime.length; ++i) {

      nodeArray[i] = bedtime[i].innerText;

      bedtimestory = bedtimestory + bedtime[i].innerText + ' ';
      console.log(nodeArray[i]);
    }

    console.log(nodeArray);

// bedtimestory = nodeArray;

    // var controls = document.createElement("div");
    // controls.innerHTML('<p>some dynamic html</p>');
    // bedtimestory.appendChild(option);

    // bedtimestory.appendChild(controls);
    // bedtimestory.insertBefore(controls,bedtimestory.firstChild);

    // console.log(bedtimestory);
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
        // console.log(voices.length);

        var selectdiv = document.getElementById("ws-lister");
        // console.log('Selectdiv value:' + selectdiv);
        //Create and append select list
        var selectList = document.createElement("select");
        // console.log(selectList);
        selectList.id = "ws-voicelist";
        selectdiv.appendChild(selectList);
        var option = document.createElement("option");
        selectList.appendChild(option);

        //Create and append the options
        for (var i = 0; i < voices.length; i++) {
          var option = document.createElement("option");
          option.value = voices[i].name;
          option.text = voices[i].name;
          selectList.appendChild(option);


          // voices[i].default;
          // voices[i].localService;
          // voices[i].lang;
          // voices[i].name;
          // voices[i].voiceURI;
        }




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
      // console.log('sdfsdfsd');
      // console.log('Paused:');
      // console.log(window.speechSynthesis.paused);
      // console.log('Playing:');
      // console.log(window.speechSynthesis.speaking);

      // var useVoice = $('select.speakContentVoice option:selected').val();
      var useVoice = getSelectedText('ws-voicelist');
      if (useVoice =='') {
       useVoice = readingvoice;
      }

      // console.log(useVoice);
      if (useVoice) {
        u.voice = speechSynthesis.getVoices().filter(function(voice){
          return voice.name == useVoice;
        })[0];
        document.getElementById('ws-voice').innerText = u.voice.name;
      }

      if (document.getElementById("ws-speed").value > 0) {
        u.rate = document.getElementById("ws-speed").value;
      }

      console.log(u.voice);


      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume(u);
        document.getElementById('ws-status').innerText = 'Playing';
      } else if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause(u);
        document.getElementById('ws-status').innerText = 'Paused';
      } else {
        window.speechSynthesis.speak(u);
        document.getElementById('ws-status').innerText = 'Playing';
      }
    };

    document.getElementById("ws-cancel").onclick = function(){
      window.speechSynthesis.cancel();
      document.getElementById('ws-status').innerText = 'Cancelled';
    }


  } else {
    console.log('Speech synthesis not supported ');
    // alert('Speech synthesis is not supported in this browser.😒');
  }



  var getSelectedText = function (elementId) {
    var elt = document.getElementById(elementId);

    if (elt.selectedIndex == -1)
      return null;

      return elt.options[elt.selectedIndex].text;
  }


});
// });
