<script>
  import { onMount } from 'svelte';

  var items = [];
  $: items, console.log(items);
  const handleDrop = (event) => {
    console.log(JSON.parse(event.dataTransfer.getData('text/plain')));
    items = [...items, JSON.parse(event.dataTransfer.getData('text/plain'))];
  };
</script>

<builder on:drop|stopPropagation={handleDrop} on:dragenter|preventDefault on:dragover|preventDefault>
  {#each items as item}
    <custom-button>{item.Name}</custom-button>
  {/each}
  <dashedline />
  <tracker />
</builder>
<row>
  <custom-button on:click={() => (items.length = 0)} style="width: 50%">Clear</custom-button>
  <custom-button style="width: 50%">Play</custom-button>
</row>
<hr />

<style>
  row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  custom-button {
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
