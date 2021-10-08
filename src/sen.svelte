<script>
  import { fly, fade } from 'svelte/transition';
  var items = [];
  var tracker;

  var Sound;

  
  const handleDrop = (event) => {
    if (playing == 0) {
      items = [...items, JSON.parse(event.dataTransfer.getData('text/plain'))];
    }
  };

  let index = 0;
  let playing = 0;
  const playSen = async () => {
    if (playing == 0) {
      tracker.style.left = '99%';
      tracker.style.transition = '';
    }
    if (items.length && index < items.length) {
      playing = 1;
      let audio = new Audio();
      audio.src = items[index].uri;
      Sound = items[index].Name;
      audio.play();
      audio.onended = () => {
        index++;
        playSen();
      };
    } else {
      playing = 0;
      index = 0;
      Sound = null;
      items.length = 0;
      tracker.style.transition = 'unset';
      tracker.style.left = '0%';
    }
  };
  const removeItem = (i) => {
    if (playing == 0) {
      items.splice(i, 1);
      items = items;
    }
  };
</script>

<svelte:head>
  <title>{Sound ? `Playing: ${Sound}` : 'James Sound Board'}</title>
</svelte:head>

<builder class:noscroll={playing == 1} on:drop|stopPropagation={handleDrop} on:dragenter|preventDefault on:dragover|preventDefault>
  {#if playing}
    <overlay transition:fly={{ y: -100 }} />
  {/if}
  <instructions>Drag and Drop buttons here to build a sentence</instructions>
  {#each items as item, i}
    <custom-button
      in:fade
      class:audio={playing == 0}
      on:click={() => {
        removeItem(i);
      }}>{item.Name}</custom-button
    >
  {/each}
  <dashedline />
  <tracker bind:this={tracker} />
</builder>
<row class:disabled={playing}>
  <custom-button class:disabled={playing} on:click={() => (!playing ? (items.length = 0) : '')} style="width: 50%">Clear</custom-button>
  <custom-button class:disabled={playing} on:click={() => (!playing ? playSen() : '')} style="width: 50%">Play</custom-button>
</row>
<hr />

<style>
  instructions{
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translate(-50%);
  }
  overlay {
    z-index: 150;
    background: rgb(0, 0, 0);
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(156, 156, 156, 0.8575805322128851) 49%, rgba(0, 0, 0, 0.5) 100%);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  row {
    width: 100%;
    height: 55px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    overflow: hidden;
    transition: 1s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    background: white;
  }
  row.disabled {
    height: 1px;
  }
  custom-button {
    position: relative;
    display: inline-block;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 4px 10px;
    margin: 5px;
    height: 50px;
    box-sizing: border-box;
    border-radius: 10px;
    border: 2px solid black;
    font-size: 25px;
    text-transform: capitalize;
    cursor: pointer;
    transition: 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    color: black;
    background: white;
  }
  custom-button.disabled {
    background-color: grey;
    cursor: not-allowed;
  }
  custom-button.audio {
    z-index: 50;
  }

  custom-button.audio:hover {
    background-color: #8c0101;
    color: rgb(87, 0, 0);
  }

  custom-button.audio:hover::after {
    content: '🗑';
    position: absolute;
    height: 30px;
    width: 30px;
    top: 42%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: black;
    font-weight: bolder;
    font-size: 30px;
  }

  builder {
    font-family: monospace;
    font-weight: bolder;
    width: 100%;
    height: 80px;
    color: rgba(128, 128, 128, 0.596);
    border-bottom: 2px solid black;
    position: relative;
    display: flex;
    flex-direction: row;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    background: white;
  }
  .noscroll {
    overflow: hidden;
  }
  dashedline {
    display: block;
    border-bottom: 2px dashed rgba(128, 128, 128, 0.596);
    width: 100%;
    position: absolute;
    top: 50%;
  }
  tracker {
    height: 60px;
    display: block;
    width: 1px;
    position: absolute;
    top: 0;
    left: 0%;
    border: 1px solid rgb(28, 0, 155);
    background: rgb(28, 0, 155);
    transition: 20s cubic-bezier(0.4, 0, 1, 1);
  }
</style>
