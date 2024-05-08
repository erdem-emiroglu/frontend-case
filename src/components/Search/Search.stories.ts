import { Meta, type StoryObj } from '@storybook/react';

import Search from '@/components/Search';

const meta = {
  title: 'Components/Search',
  component: Search,
  args: {
    onSearch: (value) => alert('You searched for: ' + value),
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSearch: (value) => alert('You searched for: ' + value),
  },
};
