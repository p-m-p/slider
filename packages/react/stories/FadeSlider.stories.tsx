import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BxlFadeSlider } from '../src'

import './slides.css'

export default {
  title: 'BoxSlider/FadeSlider',
  component: BxlFadeSlider,
  argTypes: {},
} as ComponentMeta<typeof BxlFadeSlider>

const Template: ComponentStory<typeof BxlFadeSlider> = (args) => (
  <BxlFadeSlider {...args} viewportClassName={'viewport'}>
    <div className="slide slide-1">Slide one</div>
    <div className="slide slide-2">Slide two</div>
    <div className="slide slide-3">Slide three</div>
    <div className="slide slide-4">Slide four</div>
    <div className="slide slide-5">Slide five</div>
  </BxlFadeSlider>
)

export const AutoScroll = Template.bind({})
AutoScroll.args = {
  sliderOptions: { autoScroll: true },
  onBefore: (ev) => console.log('before', ev),
  onAfter: (ev) => console.log('after', ev),
}
