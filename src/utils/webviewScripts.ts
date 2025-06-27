const receiveMessage = /* js */ `
  window.__execCommand = function(commandData) {
    try {
      const { command, args = [], id } = commandData;
      
      if (window.playerCommands && typeof window.playerCommands[command] === 'function') {
        const result = window.playerCommands[command](...args);
        
        if (result instanceof Promise) {
          return result
            .then(r =>
              id &&
              window.ReactNativeWebView?.postMessage(
                JSON.stringify({ type: 'commandResult', id, data: r })
              )
            )
            .catch(err =>
              id &&
              window.ReactNativeWebView?.postMessage(
                JSON.stringify({
                  type: 'error',
                  id,
                  error: { code: -5, message: err?.message || String(err) }
                })
              )
            );
        }

        if (id && window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'commandResult',
            id: id,
            data: result
          }));
        }
        
        return result;
      } else {
        if (id && window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'error',
            id: id,
            error: { code: -4, message: 'Command not found: ' + command }
          }));
        }
      }
    } catch (error) {
      if (commandData.id && window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'error',
          id: commandData.id,
          error: { code: -5, message: 'Execution failed: ' + error.message }
        }));
      }
    }
  };
`;

export const webviewScripts = {
  receiveMessage,
};
