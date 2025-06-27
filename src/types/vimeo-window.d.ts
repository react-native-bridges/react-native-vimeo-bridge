import type { VimeoPlayer } from './vimeo';

declare global {
  interface Window {
    Vimeo: {
      Player: typeof VimeoPlayer;
    };
    _vimeoApiPromise?: Promise<void>;
  }
}
