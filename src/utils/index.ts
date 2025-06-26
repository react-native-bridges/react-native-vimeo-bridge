import { VIMEO_VIDEO_URL_REGEX } from '../constants';
import type { VimeoSource } from '../types';

export const parseVimeoSource = (source: VimeoSource): string | null => {
  if (typeof source === 'string') {
    return VIMEO_VIDEO_URL_REGEX.test(source) ? source : null;
  }

  return VIMEO_VIDEO_URL_REGEX.test(source.url) ? source.url : null;
};
