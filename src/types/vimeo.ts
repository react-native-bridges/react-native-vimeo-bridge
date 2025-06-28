export type TrackKind = 'captions' | 'subtitles';
export type VimeoTimeRange = [number, number];
export type VimeoVideoQuality = 'auto' | '4K' | '2K' | '1080p' | '720p' | '540p' | '360p' | '240p';
export type EventCallback<Data = any> = (data: Data) => any;

export interface VimeoError {
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

export interface VimeoCuePointData {
  [key: string]: any;
}

export interface VolumeChangeEvent {
  volume: number;
  muted: boolean;
}

export interface PlaybackRateEvent {
  playbackRate: number;
}

export interface CuePointEvent {
  time: number;
  data: VimeoCuePointData;
  id: string;
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

export interface VimeoCuePoint {
  time: number;
  data: VimeoCuePointData;
  id: string;
}

export interface VimeoTextTrack {
  language: string;
  kind: TrackKind;
  label: string;
  mode?: string | undefined;
}

export interface VimeoPlayerOptions {
  id?: number | undefined;
  url?: string | undefined;
  autopause?: boolean | undefined;
  autoplay?: boolean | undefined;
  background?: boolean | undefined;
  byline?: boolean | undefined;
  color?: string | undefined;
  controls?: boolean | undefined;
  dnt?: boolean | undefined;
  interactive_params?: string | undefined;
  keyboard?: boolean | undefined;
  loop?: boolean | undefined;
  muted?: boolean | undefined;
  pip?: boolean | undefined;
  playsinline?: boolean | undefined;
  portrait?: boolean | undefined;
  speed?: boolean | undefined;
  quality?: VimeoVideoQuality | undefined;
  texttrack?: string | undefined;
  title?: boolean | undefined;
  transparent?: boolean | undefined;

  // NOTE - https://github.com/vimeo/player.js/issues/38#issuecomment-242462979
  // maxheight?: number | undefined;
  // maxwidth?: number | undefined;
  // responsive?: boolean | undefined;
  // width?: number | undefined;
  // height?: number | undefined;
}

export interface VimeoPlayerEventMap {
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
  error: VimeoError;
  loaded: LoadedEvent;
  durationchange: DurationChangeEvent;
  fullscreenchange: FullScreenChangeEvent;
  qualitychange: QualityChangeEvent;
  camerachange: VimeoCameraProps;
  resize: ResizeEvent;
  enterpictureinpicture: never;
  leavepictureinpicture: never;
}

export declare class VimeoPlayer {
  constructor(element: HTMLIFrameElement | HTMLElement | string, options?: VimeoPlayerOptions);

  on<EventName extends keyof VimeoPlayerEventMap>(
    event: EventName,
    callback: EventCallback<VimeoPlayerEventMap[EventName]>,
  ): void;
  on(event: string, callback: EventCallback): void;
  off<EventName extends keyof VimeoPlayerEventMap>(
    event: EventName,
    callback: EventCallback<VimeoPlayerEventMap[EventName]>,
  ): void;
  off(event: string, callback?: EventCallback): void;

  loadVideo(id: number): Promise<number>;
  loadVideo(url: string): Promise<string>;
  loadVideo(options: VimeoPlayerOptions): Promise<{ [prop: string]: any }>;
  ready(): Promise<void>;
  enableTextTrack(language: string, kind?: TrackKind): Promise<VimeoTextTrack>;
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
  getChapters(): Promise<VimeoChapter[]>;
  getCurrentChapter(): Promise<VimeoChapter>;
  addCuePoint(time: number, data: VimeoCuePointData): Promise<string>;
  removeCuePoint(id: string): Promise<string>;
  getCuePoints(): Promise<VimeoCuePoint[]>;
  getBuffered(): Promise<VimeoTimeRange[]>;
  getCurrentTime(): Promise<number>;
  setCurrentTime(seconds: number): Promise<number>;
  getDuration(): Promise<number>;
  getEnded(): Promise<boolean>;
  getLoop(): Promise<boolean>;
  setLoop(loop: boolean): Promise<boolean>;
  getMuted(): Promise<boolean>;
  setMuted(muted: boolean): Promise<boolean>;
  getPaused(): Promise<boolean>;
  getPlayed(): Promise<VimeoTimeRange[]>;
  getSeekable(): Promise<VimeoTimeRange[]>;
  getSeeking(): Promise<boolean>;
  getPlaybackRate(): Promise<number>;
  setPlaybackRate(playbackRate: number): Promise<number>;
  getTextTracks(): Promise<VimeoTextTrack[]>;
  getVideoEmbedCode(): Promise<string>;
  getVideoId(): Promise<number>;
  getVideoTitle(): Promise<string>;
  getVideoWidth(): Promise<number>;
  getVideoHeight(): Promise<number>;
  getVideoUrl(): Promise<string>;
  getVolume(): Promise<number>;
  setVolume(volume: number): Promise<number>;
  getQualities(): Promise<VimeoVideoQualityObject[]>;
  getQuality(): Promise<VimeoVideoQuality>;
  setQuality(quality: VimeoVideoQuality): Promise<VimeoVideoQuality>;
  getCameraProps(): Promise<VimeoCameraProps>;
  setCameraProps(cameraProps: VimeoCameraProps): Promise<VimeoCameraProps>;
  destroy(): Promise<void>;
}
