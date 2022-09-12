import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BxlCarouselSlider } from '../src'

import './slides.css'

export default {
  title: 'BoxSlider/CarouselSlider',
  component: BxlCarouselSlider,
  argTypes: {},
} as ComponentMeta<typeof BxlCarouselSlider>

const Template: ComponentStory<typeof BxlCarouselSlider> = (args) => (
  <BxlCarouselSlider {...args} viewportClassName={'viewport'}>
    <div className="slide slide-1">Slide one</div>
    <div className="slide slide-2">Slide two</div>
    <div className="slide slide-3">Slide three</div>
    <div className="slide slide-4">Slide four</div>
    <div className="slide slide-5">Slide five</div>
  </BxlCarouselSlider>
)

export const AutoScroll = Template.bind({})
AutoScroll.args = {
  sliderOptions: { autoScroll: true },
}
