import { useMemo } from 'react';
import type { VimeoSource } from '../types';

const useVimeoVideoUrl = (source: VimeoSource) => {
  const sourceUri = useMemo(() => {
    if (typeof source === 'string') {
      return source;
    }

    return source.url;
  }, [source]);

  return sourceUri;
};

export default useVimeoVideoUrl;
