import { useEffect, useMemo, useRef } from 'react';
import VimeoPlayerInstance from '../module/VimeoPlayerInstance';
import type { VimeoSource } from '../types';
import type { VimeoPlayerOptions } from '../types/vimeo';

/**
 * @param source - The source of the Vimeo video. It can be a string or an object with a `url` property.
 * @param options - The options for the Vimeo player.
 * @returns The Vimeo player instance.
 */
const useVimeoPlayer = (source: VimeoSource, options?: VimeoPlayerOptions): VimeoPlayerInstance => {
  const playerRef = useRef<VimeoPlayerInstance | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: only once
  const player = useMemo(() => {
    if (!playerRef.current) {
      playerRef.current = new VimeoPlayerInstance(source, options);
    }

    return playerRef.current;
  }, [source]);

  useEffect(() => {
    return () => {
      player.dispose();
    };
  }, [player]);

  return player;
};

export default useVimeoPlayer;
