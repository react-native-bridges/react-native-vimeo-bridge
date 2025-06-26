import type WebView from 'react-native-webview';

class VimeoPlayerController {
  private webViewRef: React.RefObject<WebView>;
  private commandId: number = 0;
  private pendingCommands: Map<string, (result: unknown) => void> = new Map();

  constructor(webViewRef: React.RefObject<WebView>) {
    this.webViewRef = webViewRef;
  }

  getWebViewRef(): React.RefObject<WebView> | null {
    return this.webViewRef;
  }

  async play(): Promise<void> {
    return this.executeCommand('play');
  }

  async pause(): Promise<void> {
    return this.executeCommand('pause');
  }

  async setCurrentTime(seconds: number): Promise<void> {
    return this.executeCommand('setCurrentTime', [seconds]);
  }

  async setVolume(volume: number): Promise<void> {
    return this.executeCommand('setVolume', [volume]);
  }

  async getCurrentTime(): Promise<number> {
    return this.executeCommand('getCurrentTime');
  }

  async getDuration(): Promise<number> {
    return this.executeCommand('getDuration');
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
        window.ReactNativeWebView.postMessage(JSON.stringify(${JSON.stringify(commandData)}));
        true;
      `;

      this.webViewRef.current.injectJavaScript(injectScript);

      if (!needsResult) {
        resolve(null);
      }
    });
  }
}

export default VimeoPlayerController;
