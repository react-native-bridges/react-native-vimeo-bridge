declare namespace Vimeo {
  namespace Player {
    export type TrackKind = 'captions' | 'subtitles';

    export interface Error {
      name: string;
      message: string;
      method: string;
    }

    export interface TimeEvent {
      duration: number;
      percent: number;
      seconds: number;
    }

    export interface TextTrackChangeEvent {
      kind: TrackKind | null;
      label: string | null;
      language: string | null;
    }

    export interface VimeoChapter {
      startTime: number;
      title: string;
      index: number;
    }

    export interface Cue {
      html: string;
      text: string;
    }

    export interface CueChangeEvent {
      cues: Cue[];
      kind: TrackKind;
      label: string;
      language: string;
    }

    export interface CuePointEvent {
      time: number;
      data: VimeoCuePointData;
      id: string;
    }

    export interface VolumeChangeEvent {
      volume: number;
    }

    export interface PlaybackRateEvent {
      playbackRate: number;
    }

    export interface LoadedEvent {
      id: number;
    }

    export interface DurationChangeEvent {
      duration: number;
    }

    export interface FullScreenChangeEvent {
      fullscreen: boolean;
    }

    export interface VimeoVideoQualityObject {
      label: string;
      id: string;
      active: boolean;
    }

    export interface QualityChangeEvent {
      quality: VimeoVideoQuality;
    }

    export interface VimeoCameraProps {
      yaw: number;
      pitch: number;
      roll: number;
      fov: number;
    }

    export interface ResizeEvent {
      videoWidth: number;
      videoHeight: number;
    }

    export interface EventMap {
      play: TimeEvent;
      playing: TimeEvent;
      pause: TimeEvent;
      ended: TimeEvent;
      timeupdate: TimeEvent;
      progress: TimeEvent;
      seeking: TimeEvent;
      seeked: TimeEvent;
      texttrackchange: TextTrackChangeEvent;
      chapterchange: VimeoChapter;
      cuechange: CueChangeEvent;
      cuepoint: CuePointEvent;
      volumechange: VolumeChangeEvent;
      playbackratechange: PlaybackRateEvent;
      bufferstart: never;
      bufferend: never;
      error: Error;
      loaded: LoadedEvent;
      durationchange: DurationChangeEvent;
      fullscreenchange: FullScreenChangeEvent;
      qualitychange: QualityChangeEvent;
      camerachange: VimeoCameraProps;
      resize: ResizeEvent;
      enterpictureinpicture: never;
      leavepictureinpicture: never;
    }

    export type EventCallback<Data = any> = (data: Data) => any;
    export type VimeoTimeRange = [number, number];
    export type VimeoVideoQuality = 'auto' | '4K' | '2K' | '1080p' | '720p' | '540p' | '360p' | '240p';

    export interface VimeoCuePoint {
      time: number;
      data: VimeoCuePointData;
      id: string;
    }

    export interface VimeoCuePointData {
      [key: string]: any;
    }

    export interface VimeoTextTrack {
      language: string;
      kind: TrackKind;
      label: string;
      mode?: string | undefined;
    }

    export interface Options {
      id?: number | undefined;
      url?: string | undefined;
      autopause?: boolean | undefined;
      autoplay?: boolean | undefined;
      background?: boolean | undefined;
      byline?: boolean | undefined;
      color?: string | undefined;
      controls?: boolean | undefined;
      dnt?: boolean | undefined;
      height?: number | undefined;
      interactive_params?: string | undefined;
      keyboard?: boolean | undefined;
      loop?: boolean | undefined;
      maxheight?: number | undefined;
      maxwidth?: number | undefined;
      muted?: boolean | undefined;
      pip?: boolean | undefined;
      playsinline?: boolean | undefined;
      portrait?: boolean | undefined;
      responsive?: boolean | undefined;
      speed?: boolean | undefined;
      quality?: VimeoVideoQuality | undefined;
      texttrack?: string | undefined;
      title?: boolean | undefined;
      transparent?: boolean | undefined;
      width?: number | undefined;
    }
  }

  export class Player {
    constructor(element: HTMLIFrameElement | HTMLElement | string, options?: Player.Options);

    on<EventName extends keyof Player.EventMap>(
      event: EventName,
      callback: Player.EventCallback<Player.EventMap[EventName]>,
    ): void;
    on(event: string, callback: Player.EventCallback): void;

    off<EventName extends keyof Player.EventMap>(
      event: EventName,
      callback: Player.EventCallback<Player.EventMap[EventName]>,
    ): void;
    off(event: string, callback?: Player.EventCallback): void;

    loadVideo(id: number): Promise<number>;
    loadVideo(url: string): Promise<string>;
    loadVideo(options: Player.Options): Promise<{ [prop: string]: any }>;
    ready(): Promise<void>;
    enableTextTrack(language: string, kind?: Player.TrackKind): Promise<Player.VimeoTextTrack>;
    disableTextTrack(): Promise<void>;
    pause(): Promise<void>;
    play(): Promise<void>;
    unload(): Promise<void>;
    requestFullscreen(): Promise<void>;
    exitFullscreen(): Promise<void>;
    getFullscreen(): Promise<boolean>;
    requestPictureInPicture(): Promise<void>;
    exitPictureInPicture(): Promise<void>;
    getPictureInPicture(): Promise<boolean>;
    getAutopause(): Promise<boolean>;
    setAutopause(autopause: boolean): Promise<boolean>;
    getColor(): Promise<string>;
    setColor(color: string): Promise<string>;
    getChapters(): Promise<Player.VimeoChapter[]>;
    getCurrentChapter(): Promise<Player.VimeoChapter>;
    addCuePoint(time: number, data: Player.VimeoCuePointData): Promise<string>;
    removeCuePoint(id: string): Promise<string>;
    getCuePoints(): Promise<Player.VimeoCuePoint[]>;
    getBuffered(): Promise<Player.VimeoTimeRange[]>;
    getCurrentTime(): Promise<number>;
    setCurrentTime(seconds: number): Promise<number>;
    getDuration(): Promise<number>;
    getEnded(): Promise<boolean>;
    getLoop(): Promise<boolean>;
    setLoop(loop: boolean): Promise<boolean>;
    getMuted(): Promise<boolean>;
    setMuted(muted: boolean): Promise<boolean>;
    getPaused(): Promise<boolean>;
    getPlayed(): Promise<Player.VimeoTimeRange[]>;
    getSeekable(): Promise<Player.VimeoTimeRange[]>;
    getSeeking(): Promise<boolean>;
    getPlaybackRate(): Promise<number>;
    setPlaybackRate(playbackRate: number): Promise<number>;
    getTextTracks(): Promise<Player.VimeoTextTrack[]>;
    getVideoEmbedCode(): Promise<string>;
    getVideoId(): Promise<number>;
    getVideoTitle(): Promise<string>;
    getVideoWidth(): Promise<number>;
    getVideoHeight(): Promise<number>;
    getVideoUrl(): Promise<string>;
    getVolume(): Promise<number>;
    setVolume(volume: number): Promise<number>;
    getQualities(): Promise<Player.VimeoVideoQualityObject[]>;
    getQuality(): Promise<Player.VimeoVideoQuality>;
    setQuality(quality: Player.VimeoVideoQuality): Promise<Player.VimeoVideoQuality>;
    getCameraProps(): Promise<Player.VimeoCameraProps>;
    setCameraProps(cameraProps: Player.VimeoCameraProps): Promise<Player.VimeoCameraProps>;
    destroy(): Promise<void>;
  }
}

declare global {
  interface Window {
    Vimeo: typeof Vimeo;
    _vimeoApiPromise?: Promise<void>;
  }
}

export as namespace Vimeo;
