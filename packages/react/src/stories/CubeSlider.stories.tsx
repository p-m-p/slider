import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BxlCubeSlider } from '../components';

import './slides.css';

export default {
  title: 'BoxSlider/CubeSlider',
  component: BxlCubeSlider,
  argTypes: {},
} as ComponentMeta<typeof BxlCubeSlider>;

const Template: ComponentStory<typeof BxlCubeSlider> = (args) =>
  <BxlCubeSlider {...args} viewportClassName={'viewport'}>
    <div className='slide slide-1'>Slide one</div>
    <div className='slide slide-2'>Slide two</div>
    <div className='slide slide-3'>Slide three</div>
    <div className='slide slide-4'>Slide four</div>
    <div className='slide slide-5'>Slide five</div>
  </BxlCubeSlider>;

export const AutoScroll = Template.bind({});
AutoScroll.args = {
  sliderOptions: { autoScroll: true },
};
