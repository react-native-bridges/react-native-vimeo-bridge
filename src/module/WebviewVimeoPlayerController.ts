import type WebView from 'react-native-webview';

class WebviewVimeoPlayerController {
  private webViewRef: React.RefObject<WebView | null>;
  private commandId: number = 0;
  private pendingCommands: Map<string, (result: unknown) => void> = new Map();
  private static instance: WebviewVimeoPlayerController | null = null;

  constructor(webViewRef: React.RefObject<WebView | null>) {
    this.webViewRef = webViewRef;
  }

  static getInstance(webViewRef: React.RefObject<WebView | null>): WebviewVimeoPlayerController {
    if (!WebviewVimeoPlayerController.instance) {
      WebviewVimeoPlayerController.instance = new WebviewVimeoPlayerController(webViewRef);
    } else {
      WebviewVimeoPlayerController.instance.webViewRef = webViewRef;
    }

    return WebviewVimeoPlayerController.instance;
  }

  getPendingCommands(): Map<string, (result: unknown) => void> {
    return this.pendingCommands;
  }

  async play(): Promise<void> {
    await this.executeCommand('play');
  }

  async pause(): Promise<void> {
    await this.executeCommand('pause');
  }

  async unload(): Promise<void> {
    await this.executeCommand('unload');
  }

  async setCurrentTime(seconds: number): Promise<number> {
    return this.executeCommand('setCurrentTime', [seconds]);
  }

  async getCurrentTime(): Promise<number> {
    return this.executeCommand('getCurrentTime', [], true);
  }

  async setVolume(volume: number): Promise<number> {
    return this.executeCommand('setVolume', [volume]);
  }

  async getVolume(): Promise<number> {
    return this.executeCommand('getVolume', [], true);
  }

  async setMuted(muted: boolean): Promise<boolean> {
    return this.executeCommand('setMuted', [muted]);
  }

  async getMuted(): Promise<boolean> {
    return this.executeCommand('getMuted', [], true);
  }

  async getDuration(): Promise<number> {
    return this.executeCommand('getDuration', [], true);
  }

  async getPlaybackRate(): Promise<number> {
    return this.executeCommand('getPlaybackRate', [], true);
  }

  async setPlaybackRate(rate: number): Promise<number> {
    return this.executeCommand('setPlaybackRate', [rate]);
  }

  async getVideoId(): Promise<number> {
    return this.executeCommand('getVideoId', [], true);
  }

  async getVideoTitle(): Promise<string> {
    return this.executeCommand('getVideoTitle', [], true);
  }

  async getVideoWidth(): Promise<number> {
    return this.executeCommand('getVideoWidth', [], true);
  }

  async getVideoHeight(): Promise<number> {
    return this.executeCommand('getVideoHeight', [], true);
  }

  async getVideoUrl(): Promise<string> {
    return this.executeCommand('getVideoUrl', [], true);
  }

  private executeCommand(
    command: string,
    args: (string | number | boolean | undefined)[] = [],
    needsResult = false,
  ): Promise<any> {
    return new Promise((resolve) => {
      if (!this.webViewRef.current) {
        resolve(null);
        return;
      }

      const messageId = needsResult ? (++this.commandId).toString() : undefined;

      if (needsResult && messageId) {
        const timeout = setTimeout(() => {
          this.pendingCommands.delete(messageId);
          console.warn('Command timeout:', command, messageId);
          resolve(null);
        }, 5000);

        this.pendingCommands.set(messageId, (result) => {
          clearTimeout(timeout);
          resolve(result);
        });
      }

      const commandData = {
        command,
        args,
        ...(messageId && { id: messageId }),
      };

      const injectScript = /* js */ `
        window.__execCommand && window.__execCommand(${JSON.stringify(commandData)}); true;
      `;

      this.webViewRef.current.injectJavaScript(injectScript);

      if (!needsResult) {
        resolve(null);
      }
    });
  }

  dispose(): void {
    this.pendingCommands.clear();
  }
}

export default WebviewVimeoPlayerController;
