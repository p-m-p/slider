# `@boxslider/components`

Web components for the [BoxSlider](https://philparsons.co.uk/slider/) library. View the
[web components guide](https://philparsons.co.uk/slider/docs/guides/web-components) for installation
and usage instructions.

<!--
```
<custom-element-demo>
  <template>
    <script type="module" src="https://cdn.jsdelivr.net/npm/@boxslider/components/+esm"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@boxslider/components/src/style/slider-controls.css" />
    <style is="custom-style">
      bs-fade {
        display: block;
        height: 300px;
        width: 100%;
      }

      .slide {
        box-sizing: border-box;
        font-size: 1.4rem;
        font-weight: 500;
        font-family: sans-serif;
        text-transform: uppercase;
        color: #444;
        width: 100%;
        height: 100%;
        padding: 1rem;

        &:nth-child(1) {
          background: lightblue;
        }

        &:nth-child(2) {
          background: lightsalmon;
        }

        &:nth-child(3) {
          background: lightcoral;
        }
      }
    </style>
    <bs-slider-controls>
      <bs-fade>
        <div class="slide">Slide one</div>
        <div class="slide">Slide two</div>
        <div class="slide">Slide three</div>
      </bs-fade>
    </bs-slider-controls>
  </template>
</custom-element-demo>
```
..>
