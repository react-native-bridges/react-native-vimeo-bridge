---
"react-native-vimeo-bridge": patch
---

fix: resolve vimeo player memory leak and unnecessary re-subscriptions

- Extract `throttleMs` from `callbackOrThrottle` to optimize `useEffect` dependencies
- Add `controller.off()` cleanup logic when last listener is removed
- Prevent memory leaks on component unmount
