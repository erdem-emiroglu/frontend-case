import {Meta, type StoryObj} from '@storybook/react';
import Loader from './index';

const meta = {
    title: 'Components/Loader',
    component: Loader,
    args: {
        text: 'Example Loader',
    },
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        text: 'With Spinner',
    }
};

export const WithoutSpinner: Story = {
    args: {
        withSpinner: false,
        text: 'Loading...',
    }
};
