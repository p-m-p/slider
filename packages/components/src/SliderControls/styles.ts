export default `
:host {
  --button-bar-gap: var(--bs-button-bar-gap, 0.5rem);
  --index-btn-color: var(
    --bs-index-btn-color,
    light-dark(rgb(0 0 0 / 40%), rgb(255 255 255 / 20%))
  );
  --index-btn-active-color: var(
    --bs-index-btn-active-color,
    light-dark(rgb(0 0 0 / 100%), rgb(255 255 255 / 80%))
  );
  --index-btn-size: var(--bs-index-btn-size, 1rem);
  --btn-background-color: var(
    --bs-btn-background-color,
    light-dark(rgb(0 0 0 / 40%), rgb(255 255 255 / 20%))
  );
  --btn-border-radius: var(--bs-btn-border-radius, 9999px);
  --btn-size: var(--bs-btn-size, 2rem);
  --next-icon: var(
    --bs-next-icon,
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-chevron-right" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg>')
  );
  --prev-icon: var(
    --bs-prev-icon,
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-chevron-left" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/></svg>')
  );
  --play-icon: var(
    --bs-play-icon,
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" class="bi bi-play" viewBox="0 0 16 16"> <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z"/></svg>')
  );
  --pause-icon: var(
    --bs-pause-icon,
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" class="bi bi-pause" viewBox="0 0 16 16"> <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5m4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5"/></svg>')
  );

  display: block;
}

#container {
  display: grid;
  gap: var(--button-bar-gap);
  grid-template:
    'slider slider slider' auto
    'play index nav' 1fr / auto;
}

#slider-container {
  grid-area: slider;
}

#controls-container {
  grid-area: nav;
  justify-self: right;
}

#play-btn-container {
  grid-area: play;
  justify-self: left;
}

.btn {
  background-color: var(--btn-background-color);
  border: none;
  border-radius: var(--btn-border-radius);
  cursor: pointer;
  height: var(--btn-size);
  overflow: hidden;
  position: relative;
  transition: background-color 200ms;
  width: var(--btn-size);
}

.btn::before {
  background: no-repeat center;
  box-sizing: inherit;
  content: '';
  inset: 0;
  position: absolute;
}

#prev-btn::before {
  background-image: var(--prev-icon);
}

#next-btn::before {
  background-image: var(--next-icon);
}

#play-btn::before {
  background-image: var(--play-icon);
}

#play-btn[part~='pause']::before {
  background-image: var(--pause-icon);
}

#index-container {
  align-items: center;
  display: flex;
  gap: 0.5rem;
  grid-area: index;
  justify-self: center;
}

.index-btn {
  background-color: var(--index-btn-color);
  border: none;
  border-radius: 999px;
  cursor: pointer;
  height: var(--index-btn-size);
  transition: background-color 400ms;
  width: var(--index-btn-size);

  &[part~='active'], &[part~='active']:hover {
    background-color: var(--index-btn-active-color);
  }
}

@media (hover: hover) {
  :host {
    --index-btn-hover-color: var(
      --bs-index-btn-hover-color,
      light-dark(rgb(0 0 0 / 60%), rgb(255 255 255 / 40%))
    );
    --btn-hover-background-color: var(
      --bs-btn-hover-background-color,
      light-dark(rgb(0 0 0 / 60%), rgb(255 255 255 / 40%))
    );
  }

  .index-btn:hover {
    background-color: var(--index-btn-hover-color);
  }

  .btn:hover {
    background-color: var(--btn-hover-background-color);
  }
}
`
