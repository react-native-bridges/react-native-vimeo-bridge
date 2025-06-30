import { INTERNAL_SET_CONTROLLER_INSTANCE } from '../symbol';
import type { VimeoEmbedOptions } from '../types';
import type { EventCallback, VimeoPlayerEventMap } from '../types/vimeo';
import type WebVimeoPlayerController from './WebVimeoPlayerController';
import type WebviewVimeoPlayerController from './WebviewVimeoPlayerController';

class VimeoPlayer {
  private listeners: Map<keyof VimeoPlayerEventMap, Set<EventCallback>> = new Map();
  private source: string | null | undefined;
  private options?: VimeoEmbedOptions;
  private controller: WebviewVimeoPlayerController | WebVimeoPlayerController | null = null;

  constructor(source: string | null | undefined, options?: VimeoEmbedOptions) {
    this.source = source;
    this.options = options;
  }

  getSource(): string | null | undefined {
    return this.source;
  }

  getOptions(): VimeoEmbedOptions | undefined {
    return this.options;
  }

  getListeners(): Map<keyof VimeoPlayerEventMap, Set<EventCallback>> {
    return this.listeners;
  }

  [INTERNAL_SET_CONTROLLER_INSTANCE](controller: WebviewVimeoPlayerController | WebVimeoPlayerController | null): void {
    this.controller = controller;
  }

  subscribe<T extends keyof VimeoPlayerEventMap>(
    eventType: T,
    callback: EventCallback<VimeoPlayerEventMap[T]>,
  ): () => void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }

    this.listeners.get(eventType)?.add(callback);

    return () => {
      const eventSet = this.listeners.get(eventType);
      eventSet?.delete(callback);

      if (eventSet?.size === 0) {
        this.listeners.delete(eventType);
      }
    };
  }

  emit<T extends keyof VimeoPlayerEventMap>(eventType: T, data: VimeoPlayerEventMap[T]): void {
    this.listeners.get(eventType)?.forEach((callback) => callback(data));
  }

  hasListeners<T extends keyof VimeoPlayerEventMap>(eventType: T): boolean {
    const listeners = this.listeners.get(eventType);
    return listeners ? listeners.size > 0 : false;
  }

  // private unsubscribe(eventType: keyof VimeoPlayerEventMap, callback: EventCallback): void {
  //   this.listeners.get(eventType)?.delete(callback);
  // }

  dispose(): void {
    this.listeners.clear();
    this.controller?.dispose();
  }

  async play(): Promise<void> {
    await this.controller?.play();
  }

  async pause(): Promise<void> {
    await this.controller?.pause();
  }

  async unload(): Promise<void> {
    await this.controller?.unload();
  }

  async setCurrentTime(seconds: number): Promise<number> {
    return this.controller?.setCurrentTime(seconds) ?? 0;
  }

  async setVolume(volume: number): Promise<number> {
    return this.controller?.setVolume(volume) ?? 0;
  }

  async setMuted(muted: boolean): Promise<boolean> {
    return this.controller?.setMuted(muted) ?? false;
  }

  async getCurrentTime(): Promise<number> {
    return this.controller?.getCurrentTime() ?? 0;
  }

  async getDuration(): Promise<number> {
    return this.controller?.getDuration() ?? 0;
  }

  async getPlaybackRate(): Promise<number> {
    return this.controller?.getPlaybackRate() ?? 0;
  }

  async setPlaybackRate(rate: number): Promise<number> {
    return this.controller?.setPlaybackRate(rate) ?? 0;
  }

  async getVideoId(): Promise<number> {
    return this.controller?.getVideoId() ?? 0;
  }

  async getVideoTitle(): Promise<string> {
    return this.controller?.getVideoTitle() ?? '';
  }

  async getVideoWidth(): Promise<number> {
    return this.controller?.getVideoWidth() ?? 0;
  }

  async getVideoHeight(): Promise<number> {
    return this.controller?.getVideoHeight() ?? 0;
  }

  async getVideoUrl(): Promise<string> {
    return this.controller?.getVideoUrl() ?? '';
  }
}

export default VimeoPlayer;
