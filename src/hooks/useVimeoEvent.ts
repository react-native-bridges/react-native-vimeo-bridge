import { useEffect, useRef, useState } from 'react';
import type VimeoPlayerInstance from '../module/VimeoPlayerInstance';
import type { VimeoPlayerStatus } from '../types';
import type { EventCallback, VimeoPlayerEventMap } from '../types/vimeo';

/**
 * @param player - The Vimeo player instance.
 * @param eventType - The type of event to subscribe to.
 * @param callback - The callback to call when the event is triggered.
 * @param deps - The dependencies to watch for changes.
 * @returns void
 */
function useVimeoEvent<T extends keyof VimeoPlayerEventMap>(
  player: VimeoPlayerInstance,
  eventType: T,
  callback: EventCallback<VimeoPlayerEventMap[T]>,
  deps?: React.DependencyList,
): void;

/**
 * @param player - The Vimeo player instance.
 * @param eventType - `timeupdate` event only.
 * @param throttleMs - The throttle time in milliseconds.
 * @returns The event data.
 */
function useVimeoEvent(
  player: VimeoPlayerInstance,
  eventType: 'timeupdate',
  throttleMs: number,
): VimeoPlayerStatus['timeupdate'] | null;

/**
 * @param player - The Vimeo player instance.
 * @param eventType - The type of event to subscribe to. `timeupdate` event is not supported.
 * @returns The event data.
 */
function useVimeoEvent<T extends Exclude<keyof VimeoPlayerStatus, 'timeupdate'>>(
  player: VimeoPlayerInstance,
  eventType: T,
): VimeoPlayerStatus[T] | null;

/**
 * @param player - The Vimeo player instance.
 * @param eventType - The type of event to subscribe to.
 * @param callbackOrThrottle - The callback to call when the event is triggered. If it is a number, it will be used as the throttle time in milliseconds for `timeupdate` event.
 * @param deps - The dependencies to watch for changes.
 * @returns The event data. If it is a callback, it will return `undefined`.
 */
function useVimeoEvent<T extends keyof VimeoPlayerEventMap>(
  player: VimeoPlayerInstance,
  eventType: T,
  callbackOrThrottle?: EventCallback<VimeoPlayerEventMap[T]> | number,
  deps?: React.DependencyList,
): VimeoPlayerEventMap[T] | null | undefined {
  const isCallback = typeof callbackOrThrottle === 'function';

  const callbackRef = useRef<EventCallback<VimeoPlayerEventMap[T]> | null>(isCallback ? callbackOrThrottle : null);

  const [data, setData] = useState<VimeoPlayerEventMap[T] | null>(null);
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    if (isCallback) {
      callbackRef.current = callbackOrThrottle;
    }
  }, [callbackOrThrottle, isCallback, ...(deps ?? [])]);

  useEffect(() => {
    const unsubscribe = player.subscribe(eventType, (eventData) => {
      if (isCallback && callbackRef.current) {
        callbackRef.current(eventData);
        return;
      }

      if (!isCallback) {
        if (eventType === 'timeupdate' && typeof callbackOrThrottle === 'number') {
          const throttleMs = callbackOrThrottle;
          const now = Date.now();
          if (now - lastUpdateRef.current < throttleMs) {
            return;
          }
          lastUpdateRef.current = now;
        }

        setData(eventData);
      }
    });

    return unsubscribe;
  }, [player, eventType, isCallback, callbackOrThrottle]);

  return isCallback ? undefined : data;
}

export default useVimeoEvent;
