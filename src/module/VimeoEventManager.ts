import type { EventCallback, VimeoPlayerEventMap } from '../types/iframe';

class VimeoEventManager {
  private listeners: Map<string, Set<EventCallback>> = new Map();
  private static instance: VimeoEventManager;

  static getInstance() {
    if (!VimeoEventManager.instance) {
      VimeoEventManager.instance = new VimeoEventManager();
    }

    return VimeoEventManager.instance;
  }

  subscribe(
    eventType: keyof VimeoPlayerEventMap,
    callback: EventCallback<VimeoPlayerEventMap[keyof VimeoPlayerEventMap]>,
  ) {
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

  emit(eventType: keyof VimeoPlayerEventMap, data: VimeoPlayerEventMap[keyof VimeoPlayerEventMap]) {
    this.listeners.get(eventType)?.forEach((callback) => callback(data));
  }

  hasListeners(eventType: keyof VimeoPlayerEventMap): boolean {
    const listeners = this.listeners.get(eventType);
    return listeners ? listeners.size > 0 : false;
  }
}

export default VimeoEventManager;
