---
'@boxslider/react': minor
---

Add missing onInit and onReset event handlers to React components

- Add onInit event handler to BoxSliderProps interface
- Add onReset event handler to BoxSliderProps interface
- Update sliderRefCallback to register onInit and onReset event listeners
- Ensures complete API parity with core slider events
