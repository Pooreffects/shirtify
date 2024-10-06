import { proxy } from 'valtio';

export interface State {
  intro: boolean;
  color: string;
  isLogoTexture: boolean;
  isFullTexture: boolean;
  logoDecal: string;
  fullDecal: string;
}

const state = proxy<State>({
  intro: true,
  color: '#EFBD48',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './duck.png',
  fullDecal: './duck.png',
});

export default state;
