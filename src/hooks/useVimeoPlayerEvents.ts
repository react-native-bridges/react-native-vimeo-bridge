import { useEffect, useRef, useState } from 'react';
import VimeoEventManager from '../module/VimeoEventManager';
import type { VimeoPlayerEventMap } from '../types/iframe';

function useVimeoPlayerEvents(eventTypes: (keyof VimeoPlayerEventMap)[]) {
  const [events, setEvents] = useState<
    Record<keyof VimeoPlayerEventMap, VimeoPlayerEventMap[keyof VimeoPlayerEventMap]>
  >({} as Record<keyof VimeoPlayerEventMap, VimeoPlayerEventMap[keyof VimeoPlayerEventMap]>);
  const eventManager = useRef(VimeoEventManager.getInstance());

  useEffect(() => {
    const unsubscribes = eventTypes.map((eventType) =>
      eventManager.current.subscribe(eventType, (data) => {
        setEvents((prev) => ({
          ...prev,
          [eventType]: data,
        }));
      }),
    );

    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, [eventTypes]);

  return events;
}

export default useVimeoPlayerEvents;
