---
'@boxslider/slider': patch
---

Improve code quality by adopting modern number checking methods

- Replace `isNaN` with `Number.isNaN` for more reliable number validation
- Replace `parseInt` with `Number.parseInt` for consistent parsing
- Improve transition queue logic readability with positive conditions
- No breaking changes to public APIs
