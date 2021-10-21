<script>
  import { onMount } from 'svelte';

  import { level, imagePreload } from './sound';

  const base = '/assets/Open-';

  $: if ($level < 10) {
    curImage = base + '0.png';
  } else if ($level < 33) {
    curImage = base + '25.png';
  } else if ($level < 66) {
    curImage = base + '50.png';
  } else if ($level < 99) {
    curImage = base + '75.png';
  } else {
    curImage = base + '100.png';
  }

  var curImage;
  /*
  onMount(() => {
    imagePreload();
    setInterval(() => {
      if ($level != 100) {
        $level = $level + 25;
      } else {
        $level = 0;
      }
    }, 2000);
  });
  */
</script>

<img src={curImage} alt="" />

<style>
  img {
    height: 100%;
  }
</style>
