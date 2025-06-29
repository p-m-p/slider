---
'@boxslider/slider': minor
'@boxslider/components': minor
'@boxslider/react': minor
---

Add onReset event handler and remove onInit event across all packages

- Add onReset event to core slider event system
- Remove onInit event from core slider (breaking change)
- Update React components to support onReset event handler
- Remove onInit support from React components
- Update type definitions for current event coverage
- Ensure API consistency across all slider implementations
