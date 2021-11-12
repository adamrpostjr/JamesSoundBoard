<script>
import { onMount } from 'svelte';

  import { level, player, moveJamesLips } from './sound';
  export let sound;


  let nPlayer

  const startDrag = (event) => {
    event.dataTransfer.setData('text/plain', JSON.stringify({ uri: sound, Name: sound.split('/')[sound.split('/').length - 1].split('.')[0].replaceAll('_', ' ') }));
  };

  function playAudio() {
    $player = nPlayer
    // nPlayer.play()
    moveJamesLips($player);

  }


  onMount(()=>{
    // fetch(sound)
  })



  
</script>

<custom-button draggable="true" id={sound} on:dragstart={startDrag} on:click={() => playAudio()}>
  <slot />
  <audio bind:this={nPlayer} src={sound} />
</custom-button>

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
    font-family: 'Verdana';
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
