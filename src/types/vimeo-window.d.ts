import type Vimeo from './vimeo';

declare global {
  interface Window {
    Vimeo: typeof Vimeo;
    _vimeoApiPromise?: Promise<void>;
  }
}
