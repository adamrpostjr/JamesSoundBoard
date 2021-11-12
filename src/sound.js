import { writable } from 'svelte/store';

/**
 * this will be the level used to determine the image that should be displayed.
 */
export const level = writable(0);
export const player = writable();

const jamesImages = [
  'Open-75.png',
  'Open-75-Tilt(R)-50.png',
  'Open-75-Tilt(R)-100.png',
  'Open-75-Tilt(L)-50.png',
  'Open-75-Tilt(L)-100.png',
  'Open-50.png',
  'Open-50-Tilt(R)-50.png',
  'Open-50-Tilt(R)-100.png',
  'Open-50-Tilt(L)-50.png',
  'Open-50-Tilt(L)-100.png',
  'Open-25.png',
  'Open-25-Tilt(R)-50.png',
  'Open-25-Tilt(R)-100.png',
  'Open-25-Tilt(L)-50.png',
  'Open-25-Tilt(L)-100.png',
  'Open-100.png',
  'Open-0.png',
  'Open-0-Tilt(R)-50.png',
  'Open-0-Tilt(R)-100.png',
  'Open-0-Tilt(L)-50.png',
  'Open-0-Tilt(L)-100.png',
];

export const imagePreload = () => {
  jamesImages.forEach((IMG) => {
    fetch(`/assets/${IMG}`);
  });
};

var audioContext;
var node;
var audioCopy;
export const moveJamesLips = async (audio) => {
  audioCopy = await audio.cloneNode();
  var source = await audioContext.createMediaElementSource(audioCopy);
  audioCopy.addEventListener('ended', resetJamesLips, false);
  await audioContext.resume();
  source.connect(node).connect(audioContext.destination);
  audio.play() // play to browser
  audioCopy.play() // play to processor
};

const resetJamesLips = () => {
  audioContext.suspend();
  node.disconnect();
  level.set(0);
  audioCopy.removeEventListener('ended', resetJamesLips);
};

window.onload = async () => {
  audioContext = new AudioContext();
  await audioContext.audioWorklet.addModule('/audioprocessor.js');
  node = new AudioWorkletNode(audioContext, 'vumeter');

  node.port.onmessage = (event) => {
    let _volume = 0;
    let _sensibility = 1;
    if (event.data.volume) _volume = event.data.volume;
    level.set(((_volume * 100) / _sensibility) * 100);
  };
};
