import { VIMEO_VIDEO_URL_REGEX } from '../constants';
import type { VimeoEmbedOptions, VimeoSource } from '../types';

export const parseVimeoSource = (source: VimeoSource): string | null | undefined => {
  if (!source) {
    return;
  }

  if (typeof source === 'string') {
    return VIMEO_VIDEO_URL_REGEX.test(source) ? source : null;
  }

  return VIMEO_VIDEO_URL_REGEX.test(source.url) ? source.url : null;
};

export function createVimeoOEmbedUrl(url?: string | null, params?: VimeoEmbedOptions): string {
  if (!url) {
    return '';
  }

  const baseUrl = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`;

  if (!params) {
    return baseUrl;
  }

  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      if (typeof value === 'boolean') {
        searchParams.set(key, value ? 'true' : 'false');
      } else if (key === 'color' && typeof value === 'string') {
        searchParams.set(key, value.replace('#', ''));
      } else {
        searchParams.set(key, String(value));
      }
    }
  }

  return searchParams.toString() ? `${baseUrl}&${searchParams}` : baseUrl;
}
