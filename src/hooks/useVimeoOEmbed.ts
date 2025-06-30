import { useEffect, useState } from 'react';
import type { VimeoEmbedOptions } from '../types';
import { createVimeoOEmbedUrl } from '../utils';

export type VimeoOEmbed = {
  type: 'video';
  version: string;
  provider_name: 'Vimeo';
  provider_url: 'https://vimeo.com/';
  title: string;
  author_name: string;
  author_url: string;
  account_type: string;
  html: string;
  width: number;
  height: number;
  duration: number;
  description: string;
  thumbnail_url: string;
  thumbnail_width: number;
  thumbnail_height: number;
  thumbnail_url_with_play_button: string;
  upload_date: string;
  video_id: number;
  uri: string;
};

/**
 * Hook to fetch the oEmbed data for a Vimeo video.
 * @param url - The URL of the Vimeo video.
 * @returns The oEmbed data, loading state, and error.
 */
const useVimeoOEmbed = (url?: string | null, params?: VimeoEmbedOptions) => {
  const [oEmbed, setOEmbed] = useState<VimeoOEmbed | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const oEmbedUrl = createVimeoOEmbedUrl(url, params);

  useEffect(() => {
    if (!oEmbedUrl) {
      return;
    }

    const controller = new AbortController();

    setError(null);
    setOEmbed(null);

    const fetchOEmbed = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(oEmbedUrl, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch oEmbed');
        }

        const data = await response.json();
        setOEmbed(data);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }

        if (error instanceof Error) {
          setError(error);
          return;
        }

        setError(new Error('Failed to fetch oEmbed'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchOEmbed();

    return () => {
      controller.abort();
    };
  }, [oEmbedUrl]);

  return {
    oEmbed,
    isLoading,
    error,
  };
};

export default useVimeoOEmbed;
