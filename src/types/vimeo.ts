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

// NOTE - https://developer.vimeo.com/player/sdk/embed
export interface EmbedOptions {
  /**
   * @description The ID or the URL of the video on Vimeo. You must supply one of these values to identify the video. When the video's [privacy setting](https://help.vimeo.com/hc/en-us/articles/12426199699985-Overview-of-video-privacy-settings) is Unlisted, you must use the URL, and the URL must include the h parameter. For more information, see our [introductory guide](https://developer.vimeo.com/player/sdk/basics#connecting-to-a-vimeo-player).
   */
  id?: number;
  /**
   * @description The ID or the URL of the video on Vimeo. You must supply one of these values to identify the video. When the video's [privacy setting](https://help.vimeo.com/hc/en-us/articles/12426199699985-Overview-of-video-privacy-settings) is Unlisted, you must use the URL, and the URL must include the h parameter. For more information, see our [introductory guide](https://developer.vimeo.com/player/sdk/basics#connecting-to-a-vimeo-player).
   */
  url?: string;
  /**
   * @description Whether AirPlay is enabled in the embeddable player.
   * @default true
   */
  airplay?: boolean;
  /**
   * @description Whether multiple audio tracks can appear in the embeddable player. This option has no effect if your video doesn't have additional audio tracks uploaded to it.
   * @default true
   */
  audio_tracks?: boolean;
  /**
   * @description The initial audio track to play with the video. The value of this option can be the language code alone (fr), the language code and region (fr-ca), or the language code and kind (fr,descriptions) of the desired audio. Set this value to main to select the original audio for the video. If there is no matching track, the player ignores this value.
   */
  audiotrack?: string;
  /**
   * @description Whether to pause the current video when another Vimeo video on the same page starts to play. Set this value to `false` to permit simultaneous playback of all the videos on the page. This option has no effect if you've disabled cookies in your browser, either through browser settings or with an extension or plugin.
   * @default true
   */
  autopause?: boolean;
  /**
   * @description Whether to start playback of the video automatically. This feature might not work on all devices.
   * @default false
   */
  autoplay?: boolean | undefined;
  /**
   * @description Whether the player is in background mode, which hides the playback controls, enables autoplay, and loops the video.
   * @default false
   */
  background?: boolean | undefined;
  /**
   * @description Whether to display the video owner's name.
   * @default true
   */
  byline?: boolean | undefined;
  /**
   * @description Whether closed captions are enabled in the embeddable player. This option has no effect if your video doesn't have captions or subtitles.
   * @default true
   */
  cc?: boolean;
  /**
   * @description The chapter by ID to start playback at.
   */
  chapter_id?: string;
  /**
   * @description Whether chapters are enabled in the embeddable player. This option has no effect if your video doesn't have chapters set.
   * @default true
   */
  chapters?: boolean;
  /**
   * @description Whether the Chromecast button appears in the embeddable player.
   * @default true
   */
  chromecast?: boolean;
  /**
   * @description The hexadecimal accent color value of the playback controls, which is normally 00ADEF. The embed settings of the video might override this value. For more information about player colors, refer to the colors option.
   */
  color?: string;
  /**
   * @description The hexadecimal color values of the player. The embed settings of the video might override these values. The order of the player colors is [Primary, Accent, Text/Icon, Background], with corresponding default values of ["000000", "00ADEF", "FFFFFF", "000000"].
   */
  colors?: [string, string, string, string];
  /**
   * @description Whether to display the player's interactive elements, including the play bar and sharing buttons. Set this option to false for a chromeless experience. To control playback when the play/pause button is hidden, set autoplay to true, use keyboard controls (which remain active), or implement our player SDK.
   * @default true
   */
  controls?: boolean;
  /**
   * @description Whether to prevent the player from tracking session data, including cookies. Keep in mind that setting this argument to true also blocks [video stats](https://vimeo.com/stats).
   * @default false
   */
  dnt?: boolean;
  /**
   * @description In Segmented Playback mode, the time in seconds where playback ends for the video. Setting this field enables Segmented Playback mode, where the video is presented as a segment of the original as defined by this field and the start_time field, with a duration in seconds equal to end_time minus start_time. If start_time is omitted, the start time defaults to 0.
   */
  end_time?: number;
  /**
   * @description Whether to show the fullscreen button in the embeddable player.
   * @default true
   */
  fullscreen?: boolean;
  /**
   * @description The playback quality of the first seconds of video loaded. After that, normal adaptive bitrate logic applies. Setting a lower quality can help to make playback start more quickly, while setting a higher quality helps to ensure that viewers receive high-resolution video as soon as the video begins playing. This field can take any value from the quality menu in the player for the video. Common values are 360p, 720p, 1080p, 2k, and 4k.
   */
  initial_quality?: VimeoVideoQuality;
  /**
   * @description Whether to display markers representing the timestamp where hotspots appear on an interactive video.
   * @default true
   */
  interactive_markers?: boolean;
  /**
   * @description Key-value pairs representing dynamic parameters that are utilized on interactive videos with dynamic elements, such as title=my-video,subtitle=interactive.
   */
  interactive_params?: string;
  /**
   * @description Whether to enable keyboard input to trigger player events. This setting doesn't affect tab control.
   * @default true
   */
  keyboard?: boolean;
  /**
   * @description Whether to restart the video automatically after reaching the end.
   * @default false
   */
  loop?: boolean;
  /**
   * @description The highest possible quality that the player automatically switches to during video playback. The player determines the best quality to play at without exceeding this maximum value. Setting this parameter can help to reduce bandwidth usage. This field can take any value from the quality menu in the player for the video. Common values are 360p, 720p, 1080p, 2k, or 4k.
   */
  max_quality?: VimeoVideoQuality;
  /**
   * @description Whether the video is muted upon loading. The true value is required for the autoplay behavior in some browsers.
   * @default false
   */
  muted?: boolean;
  /**
   * @description Whether to include the picture-in-picture button among the player controls and enable the Picture-in-Picture API, where supported.
   * @default true
   */
  pip?: boolean;
  /**
   * @description The position of the play button within the embeddable player.
   * @default 'auto'
   */
  play_button_position?: 'bottom' | 'center' | 'auto';
  /**
   * @description Whether the video plays inline on supported mobile devices. To force the device to play the video in fullscreen mode instead, set this value to false.
   * @default true
   */
  playsinline?: boolean;
  /**
   * @description Whether to display the video owner's portrait.
   * @default true
   */
  portrait?: boolean;
  /**
   * @description The loading behavior for the player before playback is initiated. This follows the basic principles of the native [preload property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/preload) of the HTMLMediaElement interface, with a few additional values:
   * - Specify `metadata` to load metadata immediately.
   * - Specify `metadata_on_hover` to load metadata for the video only when the user hovers over the player.
   * - Specify `auto` to load metadata and the first few seconds of video immediately.
   * - Specify `auto_on_hover` to load metadata and the first few seconds of video only when the user hovers over the player.
   * - Specify `none` if you're not loading any data until playback begins.
   *
   * Preloading more data makes playback start more quickly, so using the auto and auto_on_hover values results in quicker startup than the other options, but may use more bandwidth since video segments are loaded regardless of a user playing the video. To learn more about Vimeo’s bandwidth limits, visit our [Help Center](https://help.vimeo.com/hc/en-us/articles/12426275404305-Bandwidth-on-Vimeo).
   * @default 'metadata_on_hover'
   */
  preload?: 'metadata' | 'metadata_on_hover' | 'auto' | 'auto_on_hover' | 'none';
  /**
   * @description Whether to show the progress bar in the embeddable player.
   * @default true
   */
  progress_bar?: boolean;
  /**
   * @description The playback quality of the video. Use auto for the best possible quality given available bandwidth and other factors. Otherwise this field can take any value from the quality menu in the player for the video. Common values are 360p, 720p, 1080p, 2k, and 4k.
   * @default 'auto'
   */
  quality?: VimeoVideoQuality;
  /**
   * @description Whether to show the quality selector in the embeddable player.
   * @default true
   */
  quality_selector?: boolean;
  /**
   * @description Whether users can skip forward in the embeddable player.
   * @default true
   */
  skipping_forward?: boolean;
  /**
   * @description Whether to include playback speed among the player preferences.
   * @default false
   */
  speed?: boolean;
  /**
   * @description In Segmented Playback mode, the time in seconds where playback starts for the video; see the end_time field for more information.
   * @default 0
   */
  start_time?: number;
  /**
   * @description The text track to display with the video.
   * - Specify the text track by its language code (en), the language code and locale (en-US), or the language code and kind (en.captions).
   * - For this argument to work, the video must already have a text track of the given type; see our [Help Center](https://help.vimeo.com/hc/en-us/articles/12426156795409-Can-I-add-captions-subtitles-to-my-videos) or [Working with Text Track Uploads](https://developer.vimeo.com/api/upload/texttracks).
   * - To enable automatically generated closed captions instead, provide the value en-x-autogen. Please note that, at the present time, automatic captions are always in English.
   */
  texttrack?: string;
  /**
   * @description The ID of the thumbnail to load from the video's available thumbnail set.
   */
  thumbnail_id?: string;
  /**
   * @description Whether to display the video’s title.
   * @default true
   */
  title?: boolean;
  /**
   * @description Whether transcript controls can appear in the embeddable player.
   * @default true
   */
  transcript?: boolean;
  /**
   * @description Whether the responsive player and transparent background are enabled.
   * @default true
   */
  transparent?: boolean;
  /**
   * @description Whether to display the unmute button.
   * @default true
   */
  unmute_button?: boolean;
  /**
   * @description Whether to show the Vimeo logo in the embeddable player.
   * @default true
   */
  vimeo_logo?: boolean;
  /**
   * @description Whether to show the volume selector in the embeddable player.
   * @default true
   */
  volume?: boolean;
  /**
   * @description Whether to show the Watch Full Video button when Segmented Playback mode is enabled; see start_time and end_time above for more information.
   * @default true
   */
  watch_full_video?: boolean;

  // NOTE - https://github.com/vimeo/player.js/issues/38#issuecomment-242462979
  /**
   * @description The width of the video in pixels.
   */
  width?: number;
  /**
   * @description The height of the video in pixels.
   */
  height?: number;
  /**
   * @description Whether to return a responsive embed code, or one that provides intelligent adjustments based on viewing conditions. We recommend this option for mobile-optimized sites.
   * @default false
   */
  responsive?: boolean;
  /**
   * @description The height of the video in pixels, where the video won't exceed its native height, no matter the value of this field.
   */
  maxheight?: number;
  /**
   * @description The width of the video in pixels, where the video won't exceed its native width, no matter the value of this field.
   */
  maxwidth?: number;
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
  constructor(element: HTMLIFrameElement | HTMLElement | string, options?: EmbedOptions);

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
  loadVideo(options: EmbedOptions): Promise<{ [prop: string]: any }>;
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
