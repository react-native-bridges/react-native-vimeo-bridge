---
"react-native-vimeo-bridge": patch
---

fix: register event listeners after Vimeo player is loaded

- Move event listener registration inside 'loaded' callback to ensure proper timing
- Emit 'loaded' event immediately when already triggered
- Register other events only after player is fully initialized
- Prevents race condition where useVimeoEvent subscribes before player is ready

Fixes issue where dynamic event subscriptions were not working due to timing mismatch between player initialization and listener registration.
