<script>
  export let sound;
  let player;
</script>

<custom-button on:click={() => player.play()}>
  <slot />
  <audio bind:this={player} src={sound} />
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
</style>
