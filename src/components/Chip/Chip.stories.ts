import {Meta, type StoryObj} from '@storybook/react';
import Chip from './index';
import {fn} from "@storybook/test";

const meta = {
    title: 'Components/Chip',
    component: Chip,
    args: {
        text: 'Example Chip',
        onDelete: () => alert('Delete clicked!'),
    },
    argTypes: {
        text: {control: 'text'},
        onDelete: {action: 'deleted'},
    },
    parameters: {
        layout: 'centered',
    }

} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        text: 'Default Chip',
        onDelete: fn(),
    }
};

export const WithDelete: Story = {
    args: {
        text: 'Chip with delete',
        onDelete: () => alert('Delete clicked!'),
    }
};
