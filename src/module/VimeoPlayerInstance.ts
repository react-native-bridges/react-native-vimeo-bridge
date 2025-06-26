import type { VimeoSource } from '../types';
import type { EventCallback, VimeoPlayerEventMap, VimeoPlayerOptions } from '../types/iframe';
import { parseVimeoSource } from '../utils';

class VimeoPlayerInstance {
  private id: string;
  private listeners: Map<string, Set<EventCallback>> = new Map();
  private _source: string | null;
  private _options?: VimeoPlayerOptions;

  constructor(source: VimeoSource, options?: VimeoPlayerOptions) {
    this.id = `vimeo-player-${Math.random().toString(36).substr(2, 9)}`;
    this._source = parseVimeoSource(source);
    this._options = options;
  }

  getId(): string {
    return this.id;
  }

  getSource(): string | null {
    return this._source;
  }

  getOptions(): VimeoPlayerOptions | undefined {
    return this._options;
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

  // async play(): Promise<void> {
  //   return this.executeMethod('play');
  // }

  // async pause(): Promise<void> {
  //   return this.executeMethod('pause');
  // }

  // async setCurrentTime(seconds: number): Promise<void> {
  //   return this.executeMethod('setCurrentTime', seconds);
  // }

  // async setVolume(volume: number): Promise<void> {
  //   return this.executeMethod('setVolume', volume);
  // }

  // async getCurrentTime(): Promise<number> {
  //   return this.executeMethod('getCurrentTime');
  // }

  // async getDuration(): Promise<number> {
  //   return this.executeMethod('getDuration');
  // }

  // private executeMethod(method: string, ...args: any[]): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const commandId = Math.random().toString(36).substr(2, 9);
  //     const command = {
  //       type: 'command',
  //       method,
  //       args,
  //       commandId,
  //     };

  //     const handleResponse = (data: any) => {
  //       if (data.commandId === commandId) {
  //         this.unsubscribe('commandResponse', handleResponse);
  //         if (data.error) {
  //           reject(new Error(data.error));
  //         } else {
  //           resolve(data.result);
  //         }
  //       }
  //     };

  //     this.subscribe('commandResponse' as any, handleResponse);

  //     this.webViewRef.current?.postMessage(JSON.stringify(command));
  //   });
  // }

  // private unsubscribe(eventType: string, callback: any): void {
  //   this.listeners.get(eventType)?.delete(callback);
  // }

  dispose(): void {
    this.listeners.clear();
  }
}

export default VimeoPlayerInstance;
