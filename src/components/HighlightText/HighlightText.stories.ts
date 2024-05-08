import { Meta, type StoryObj } from '@storybook/react';

import HighlightText from './index';

const meta = {
  title: 'Components/HighlightText',
  component: HighlightText,
  args: {
    text: 'Example HighlightText',
    highlight: 'Highlight',
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HighlightText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Default HighlightText',
    highlight: 'Highlight',
  },
};

export const WithoutHighlight: Story = {
  args: {
    text: 'HighlightText without highlight',
    highlight: '',
  },
};
