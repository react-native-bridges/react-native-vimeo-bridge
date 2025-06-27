import type { VimeoPlayer, VimeoPlayerOptions } from '../types/vimeo';

export class VimeoPlayerController {
  private player: VimeoPlayer | null = null;

  static async loadAPI(): Promise<void> {
    if (typeof window === 'undefined' || window.Vimeo.Player) {
      return Promise.resolve();
    }

    if (window._vimeoApiPromise) {
      return window._vimeoApiPromise;
    }

    window._vimeoApiPromise = new Promise<void>((resolve) => {
      if (document.querySelector('script[src*="vimeo.com/api/player.js"]')) {
        let attempts = 0;
        const maxAttempts = 100;

        const checkAPI = () => {
          if (window.Vimeo) {
            resolve();
            return;
          }
          if (attempts >= maxAttempts) {
            console.error('Vimeo API failed to load after timeout');
            resolve();
            return;
          }
          attempts++;
          setTimeout(checkAPI, 100);
        };
        checkAPI();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.async = true;
      document.head.appendChild(script);
    });

    return window._vimeoApiPromise;
  }

  createPlayer(containerId: string, options: VimeoPlayerOptions): void {
    if (typeof window === 'undefined' || !window.Vimeo) {
      return;
    }

    const container = document.getElementById(containerId);

    if (!container) {
      return;
    }

    if (this.player) {
      try {
        this.player.destroy();
      } catch (error) {
        console.warn('Error destroying YouTube player:', error);
      }
    }

    this.player = new window.Vimeo.Player(containerId, options);
  }

  async play(): Promise<void> {
    this.player?.play();
  }

  async pause(): Promise<void> {
    this.player?.pause();
  }

  async getCurrentTime(): Promise<number> {
    return this.player?.getCurrentTime() ?? 0;
  }
}
