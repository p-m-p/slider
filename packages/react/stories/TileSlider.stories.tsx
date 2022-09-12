import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BxlTileSlider } from '../src'

import './slides.css'
import imageOne from './assets/one.jpg'
import imageTwo from './assets/two.jpg'
import imageThree from './assets/three.jpg'
import imageFour from './assets/four.jpg'

export default {
  title: 'BoxSlider/TileSlider',
  component: BxlTileSlider,
  argTypes: {},
} as ComponentMeta<typeof BxlTileSlider>

const Template: ComponentStory<typeof BxlTileSlider> = (args) => (
  <BxlTileSlider {...args} viewportClassName={'viewport'}>
    <div className="slide slide-1">
      <img src={imageOne} />
    </div>
    <div className="slide slide-2">
      <img src={imageTwo} />
    </div>
    <div className="slide slide-3">
      <img src={imageThree} />
    </div>
    <div className="slide slide-4">
      <img src={imageFour} />
    </div>
  </BxlTileSlider>
)

export const AutoScroll = Template.bind({})
AutoScroll.args = {
  sliderOptions: { autoScroll: false },
  slideIndex: 0,
  effectOptions: {
    tileEffect: 'fade',
    rowOffset: 50,
  },
}
