import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: '#EFBD48',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './pooreffects.png',
  fullDecal: './pooreffects.png',
});

export default state;
