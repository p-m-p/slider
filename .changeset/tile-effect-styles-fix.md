---
'@boxslider/slider': minor
---

Fix tile effect transitions preserving slide styles. Previously, tile effects were removing all styles from slide elements when cloning them for transitions. Now only the visibility property is removed, preserving any custom styling applied to slides.
