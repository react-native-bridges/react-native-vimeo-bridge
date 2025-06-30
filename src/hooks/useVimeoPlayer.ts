import { useEffect, useMemo, useRef } from 'react';
import VimeoPlayer from '../module/VimeoPlayer';
import type { VimeoEmbedOptions, VimeoSource } from '../types';

/**
 * @param source - The source of the Vimeo video. It can be a string or an object with a `url` property.
 * @param options - The options for the Vimeo player.
 * @returns The Vimeo player instance.
 */
const useVimeoPlayer = (source: VimeoSource, options?: VimeoEmbedOptions): VimeoPlayer => {
  const playerRef = useRef<VimeoPlayer | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: only once
  const player = useMemo(() => {
    if (!playerRef.current) {
      playerRef.current = new VimeoPlayer(source, options);
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
