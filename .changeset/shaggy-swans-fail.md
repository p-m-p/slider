---
'@boxslider/components': minor
'@boxslider/slider': minor
---

Core slider no longer throws error if initialized without slides and calling any transition method will not update the state or attempt to transition. Invalid calls to next or prev etc will return an immediately resolved promise.
