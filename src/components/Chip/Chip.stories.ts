import {Meta, type StoryObj} from '@storybook/react';
import Chip from './index';
import {fn} from "@storybook/test";

const meta = {
    title: 'Components/Chip',
    component: Chip,
    args: {
        label: 'Example Chip',
        onDelete: () => alert('Delete clicked!'),
    },
    argTypes: {
        label: {control: 'text'},
        onDelete: {action: 'deleted'},
    },
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Default Chip',
        onDelete: fn(),
    }
};

export const WithDelete: Story = {
    args: {
        label: 'Chip with delete',
        onDelete: () => alert('Delete clicked!'),
    }
};
