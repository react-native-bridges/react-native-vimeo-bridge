import type { VimeoSource } from '../types';
import type { EventCallback, VimeoPlayerEventMap, VimeoPlayerOptions } from '../types/vimeo';
import { parseVimeoSource } from '../utils';

class VimeoPlayerInstance {
  private listeners: Map<keyof VimeoPlayerEventMap, Set<EventCallback>> = new Map();
  private source: string | null;
  private options?: VimeoPlayerOptions;

  constructor(source: VimeoSource, _: React.RefObject<any>, options?: VimeoPlayerOptions) {
    this.source = parseVimeoSource(source);
    this.options = options;
  }

  getSource(): string | null {
    return this.source;
  }

  getOptions(): VimeoPlayerOptions | undefined {
    return this.options;
  }

  getListeners(): [keyof VimeoPlayerEventMap, Set<EventCallback>][] {
    return Array.from(this.listeners.entries());
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

  // play(): void {
  //   this.controller.play();
  // }

  // pause(): void {
  //   this.controller.pause();
  // }

  // private unsubscribe(eventType: keyof VimeoPlayerEventMap, callback: EventCallback): void {
  //   this.listeners.get(eventType)?.delete(callback);
  // }

  dispose(): void {
    this.listeners.clear();
  }
}

export default VimeoPlayerInstance;
