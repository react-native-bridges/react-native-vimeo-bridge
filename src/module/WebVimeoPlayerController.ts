import type { VimeoPlayer, VimeoPlayerOptions } from '../types/vimeo';

class WebVimeoPlayerController {
  private player: VimeoPlayer | null = null;
  private static instance: WebVimeoPlayerController | null = null;

  static getInstance(): WebVimeoPlayerController {
    if (!WebVimeoPlayerController.instance) {
      WebVimeoPlayerController.instance = new WebVimeoPlayerController();
    }
    return WebVimeoPlayerController.instance;
  }

  static initialize(): Promise<void> {
    if (typeof window === 'undefined' || window.Vimeo?.Player) {
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
          if (window.Vimeo?.Player) {
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
      script.onload = () => {
        console.log('Vimeo API loaded');
        resolve();
      };
      document.head.appendChild(script);
    });

    return window._vimeoApiPromise;
  }

  createPlayer(containerId: string, options: VimeoPlayerOptions): VimeoPlayer | null {
    if (typeof window === 'undefined' || !window.Vimeo) {
      return null;
    }

    const container = document.getElementById(containerId);

    if (!container) {
      return null;
    }

    if (this.player) {
      try {
        this.player.destroy();
      } catch (error) {
        console.warn('Error destroying YouTube player:', error);
      }
    }

    this.player = new window.Vimeo.Player(containerId, options);

    return this.player;
  }

  getVimeoPlayer(): VimeoPlayer | null {
    return this.player;
  }

  async play(): Promise<void> {
    this.player?.play();
  }

  async pause(): Promise<void> {
    this.player?.pause();
  }

  async unload(): Promise<void> {
    this.player?.unload();
  }

  async setCurrentTime(seconds: number): Promise<number> {
    return this.player?.setCurrentTime(seconds) ?? 0;
  }

  async getCurrentTime(): Promise<number> {
    return this.player?.getCurrentTime() ?? 0;
  }

  async setVolume(volume: number): Promise<number> {
    return this.player?.setVolume(volume) ?? 0;
  }

  async getVolume(): Promise<number> {
    return this.player?.getVolume() ?? 0;
  }

  async setMuted(muted: boolean): Promise<boolean> {
    return this.player?.setMuted(muted) ?? false;
  }

  async getMuted(): Promise<boolean> {
    return this.player?.getMuted() ?? false;
  }

  async getDuration(): Promise<number> {
    return this.player?.getDuration() ?? 0;
  }

  async getPlaybackRate(): Promise<number> {
    return this.player?.getPlaybackRate() ?? 0;
  }

  async setPlaybackRate(rate: number): Promise<number> {
    return this.player?.setPlaybackRate(rate) ?? 0;
  }

  async getVideoId(): Promise<number> {
    return this.player?.getVideoId() ?? 0;
  }

  async getVideoTitle(): Promise<string> {
    return this.player?.getVideoTitle() ?? '';
  }

  async getVideoWidth(): Promise<number> {
    return this.player?.getVideoWidth() ?? 0;
  }

  async getVideoHeight(): Promise<number> {
    return this.player?.getVideoHeight() ?? 0;
  }

  async getVideoUrl(): Promise<string> {
    return this.player?.getVideoUrl() ?? '';
  }

  dispose(): void {
    if (this.player) {
      try {
        this.player.destroy();
      } catch (error) {
        console.warn('Error destroying Vimeo player:', error);
      }
      this.player = null;
    }
  }
}

export default WebVimeoPlayerController;
