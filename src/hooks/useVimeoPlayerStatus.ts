import { useEffect, useRef, useState } from 'react';
import VimeoEventManager from '../module/VimeoEventManager';
import type { VimeoPlayerEventMap } from '../types/iframe';

function useVimeoPlayerStatus<T extends keyof VimeoPlayerEventMap>(eventType: T): VimeoPlayerEventMap[T] | null {
  const [data, setData] = useState<T | null>(null);
  const eventManager = useRef(VimeoEventManager.getInstance());

  useEffect(() => {
    const unsubscribe = eventManager.current.subscribe(eventType, (eventData) => {
      setData(eventData as unknown as T);
    });

    return unsubscribe;
  }, [eventType]);

  return data as VimeoPlayerEventMap[T] | null;
}

export default useVimeoPlayerStatus;
