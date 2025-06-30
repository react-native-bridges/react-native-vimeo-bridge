import { useEffect, useMemo, useRef } from 'react';
import VimeoPlayer from '../module/VimeoPlayer';
import type { VimeoEmbedOptions, VimeoSource } from '../types';
import { parseVimeoSource } from '../utils';

/**
 * @param source - The source of the Vimeo video. It can be a string or an object with a `url` property.
 * @param options - The options for the Vimeo player.
 * @returns The Vimeo player instance.
 */
const useVimeoPlayer = (source: VimeoSource, options?: VimeoEmbedOptions): VimeoPlayer => {
  const playerRef = useRef<VimeoPlayer | null>(null);
  const previousSource = useRef<string | null | undefined>(undefined);
  const isFastRefresh = useRef(false);

  const parsedSource = parseVimeoSource(source);

  if (playerRef.current == null) {
    playerRef.current = new VimeoPlayer(parsedSource, options);
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: only once
  const player = useMemo(() => {
    let newPlayer = playerRef.current;

    if (!newPlayer || previousSource.current !== parsedSource) {
      playerRef.current?.dispose();
      newPlayer = new VimeoPlayer(parsedSource, options);
      playerRef.current = newPlayer;
      previousSource.current = parsedSource;
    } else {
      isFastRefresh.current = true;
    }

    return newPlayer;
  }, [parsedSource]);

  useEffect(() => {
    isFastRefresh.current = false;

    return () => {
      if (playerRef.current && !isFastRefresh.current) {
        playerRef.current?.dispose();
      }
    };
  }, []);

  return player;
};

export default useVimeoPlayer;
