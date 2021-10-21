<script>

  import { level } from './sound';

  export let sound;
  let player;

  const startDrag = (event) => {
    event.dataTransfer.setData('text/plain', JSON.stringify({ uri: sound, Name: sound.split('/')[sound.split('/').length - 1].split('.')[0].replaceAll('_', ' ') }));
  };

  function playAudio() {
    player.play();
    moveJamesLips(player);
    //document.getElementById('volumeContainer').style.visibility = "visible"
  }  

let audioContext
const ledColor = [
    "#064dac",
    "#064dac",
    "#064dac",
    "#06ac5b",
    "#15ac06",
    "#4bac06",
    "#80ac06",
    "#acaa06",
    "#ac8b06",
    "#ac5506",
]
let isFirtsClick = true
let listening = false

function leds(vol) {
    console.log(vol);
    $level = vol * 100;
    let leds = [...document.getElementsByClassName('led')]
    let range = leds.slice(0, Math.round(vol))

    for (var i = 0; i < leds.length; i++) {
        leds[i].style.boxShadow = "-2px -2px 4px 0px #a7a7a73d inset, 2px 2px 4px 0px #0a0a0e5e inset";
    }

    for (var i = 0; i < range.length; i++) {
        range[i].style.boxShadow = `5px 2px 5px 0px #0a0a0e5e inset, -2px -2px 1px 0px #a7a7a73d inset, -2px -2px 30px 0px ${ledColor[i]} inset`;
    }
}

async function moveJamesLips(audio) {
    if (isFirtsClick) {
        audioContext = new AudioContext()
        isFirtsClick = false
    }
    //var url = '/static-sounds/freak_the_freak_out.mp3';
    var audioCopy = audio.cloneNode();
    //audio.play();

    await audioContext.audioWorklet.addModule('/audioprocessor.js') //move this out of public
    //let microphone = audioContext.createMediaStreamSource(stream)
    let source = audioContext.createMediaElementSource(audioCopy)

    const node = new AudioWorkletNode(audioContext, 'vumeter')
    node.port.onmessage = event => {
        let _volume = 0
        let _sensibility = 1
        if (event.data.volume)
            _volume = event.data.volume;
        leds((_volume * 100) / _sensibility)
    }
    setTimeout(function(){
      node.port.onmessage = null;
      $level = 0;
      //document.getElementById('volumeContainer').style.visibility = "hidden";
    }, audio.duration * 1000); //todo: unhackify
    
    source.connect(node).connect(audioContext.destination)
    
    audioCopy.play();
    node.close();
    node.disconnect();
    
       

    let audioButton = document.getElementsByClassName('audio-control')[0]
    if (listening) {
        audioContext.suspend()
        audioButton.style.boxShadow = "-2px -2px 4px 0px #a7a7a73d, 2px 2px 4px 0px #0a0a0e5e"
        audioButton.style.fontSize = "25px"
    } else {
        audioContext.resume()
        audioButton.style.boxShadow = "5px 2px 5px 0px #0a0a0e5e inset, -2px -2px 1px 0px #a7a7a73d inset"
        audioButton.style.fontSize = "24px"
    }

    listening = !listening
}

/*function onMicrophoneDenied() {
    console.log('denied')
}*/
/*
function activeSound (audio) {
    try {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        
        navigator.getUserMedia(
            { audio: true, video: false },
            onMicrophoneGranted(audio),
            onMicrophoneDenied
        );

        //var url = '/static-sounds/freak_the_freak_out.mp3';
        //var audio = new Audio(url);
        //audio.play();
    } catch(e) {
        alert(e)
    }
}
*/

//document.getElementById('audio').addEventListener('click', () => {
//    activeSound()
//})

/*
setTimeout(function(){
  document.getElementById('audio').addEventListener('click', () => {
      activeSound()
  })
}, 1000);
*/


//End test
  
</script>

<custom-button draggable="true" id={sound} on:dragstart={startDrag} on:click={() => playAudio()}>
  <slot />
  <audio
    bind:this={player}
    on:volumechange={(e) => {
      console.log(e);
    }}
    src={sound}
  />
</custom-button>

<div id="volumeContainer" class="container" style="visibility:hidden;">
  <span>Microphone</span>
  <div class="volumen-wrapper">
      <div class="led"></div>
      <div class="led"></div>
      <div class="led"></div>
      <div class="led"></div>
      <div class="led"></div>
              
      <div class="led"></div>
      <div class="led"></div>
      <div class="led"></div>
      <div class="led"></div>
      <div class="led"></div>
  </div>

  <div class="control-audio-wrapper">
      <div id="audio" class="audio-control">&#127908;</div>
  </div>
</div>

<style>
  custom-button {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 4px 10px;
    margin: 5px;
    height: 55px;
    box-sizing: border-box;
    border-radius: 10px;
    border: 2px solid black;
    font-size: 25px;
    text-transform: capitalize;
    cursor: pointer;
    transition: 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    color: black;
  }
  custom-button:hover {
    box-shadow: inset 0 0 20px 4px rgba(128, 128, 128, 0.25);
    border-radius: 5px;
  }



  /*Temp:*/
  body {
    margin: 0; 
    padding: 0;

    background-color: #20222e;
    font-family: "Verdana";
  }
  .container {
    background-color: #292a38;
    border-radius: 8px;
    padding: 20px;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    height: 150px;
  }
  span {
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
  }
  .volumen-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .led {
    width: 40px;
    height: 25px;
    background-color: #292a38;
    border-radius: 4px;

    box-shadow: -2px -2px 4px 0px #a7a7a73d inset, 2px 2px 4px 0px #0a0a0e5e inset;
    margin: 0 5px;
  }
  .audio-control {
    cursor: pointer;
    color: #fff;

    box-shadow: -2px -2px 4px 0px #a7a7a73d, 2px 2px 4px 0px #0a0a0e5e;
    padding: 8px;

    font-size: 25px;
    border-radius: 50%;
  }
</style>
