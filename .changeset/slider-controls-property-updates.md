---
'@boxslider/components': minor
---

Enhance SliderControls with dynamic property updates and improved React compatibility

- Add property getters/setters for all label attributes (nextBtnLabel, prevBtnLabel, playBtnLabel, pauseBtnLabel, indexBtnLabel, indexLabel)
- Implement observedAttributes and attributeChangedCallback for dynamic updates
- Fix index button labels not updating when properties change
- Extract shared index button label logic to eliminate code duplication
- Improve React prop mapping with proper camelCase to kebab-case conversion
- Ensure all button labels update immediately when properties are modified
