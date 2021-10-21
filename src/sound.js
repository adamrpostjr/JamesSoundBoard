import { writable } from 'svelte/store';

/**
 * this will be the level used to determine the image that should be displayed.
 */
export const level = writable(0);

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
