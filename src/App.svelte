<script>
  import Button from './button.svelte';
  import Sentence from './sen.svelte';
  import James from './james.svelte';
  import { onMount } from 'svelte';
  
  var allSounds = [];


  const checker = () =>{
    fetch('/sounds')
      .then((response) => response.json())
      .then((data) => (allSounds = data));
      setInterval(() => {
        checker()
      }, 10000);
    }



  onMount(() => {
    checker()
  });
</script>

<main>

  <row class="sen-container">
    <Sentence />
  </row>
  <block>
    <row style="flex-wrap: nowrap; height: 100%">
      <buttons>
        {#each allSounds as sound}
          <Button sound="/sounds/{sound}">{sound.split('.')[0].replaceAll('_', ' ')}</Button>
        {/each}
      </buttons>
      <james>
        <James />
      </james>
    </row>
  </block>
</main>

<style>
  main {
    display: flex;
    flex-flow: column;
    overflow: hidden;
    box-sizing: border-box;
  }

  block {
    display: block;
    height: 100%;
    overflow: hidden;
  }
  buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    height: 100%;
    width: 100%;
    overflow: scroll;
  }
  row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  @media only screen and (max-width: 800px) {
    james {
      display: none;
    }
    buttons {
      flex-direction: column;
    }
  }
  @media only screen and (max-width: 1000px) {
    buttons {
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: unset;
    }
  }
</style>
