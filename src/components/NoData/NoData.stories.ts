import {Meta, type StoryObj} from '@storybook/react';
import NoData from './index';

const meta = {
    title: 'Components/NoData',
    component: NoData,
    args: {},
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof NoData>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        text: 'No data to display',
    }
};
