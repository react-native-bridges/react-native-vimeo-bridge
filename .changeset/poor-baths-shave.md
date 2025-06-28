---
"react-native-vimeo-bridge": patch
---

fix(styling): replace CSS file with inline iframe styling

- Remove CSS file dependency causing webpack parse errors
- Apply width/height styles directly via JavaScript after iframe loads
- Improves package compatibility without requiring CSS loaders
- Breaking Changes: The removal of `width`, `height`, `maxwidth`, `maxheight`, and `responsive` from VimeoPlayerOptions (https://github.com/vimeo/player.js/issues/38#issuecomment-242462979)
