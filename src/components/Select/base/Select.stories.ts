import {Meta, type StoryObj} from '@storybook/react';
import Select from './index';
import {action} from "@storybook/addon-actions";

const options = [
    {id: 1, name: "Option 1"},
    {id: 2, name: "Option 2"},
    {id: 3, name: "Option 3"},
    {id: 4, name: "Option 4"},
    {id: 5, name: "Option 5"},
    {id: 6, name: "Option 6"},
    {id: 7, name: "Option 7"},
    {id: 8, name: "Option 8"},
    {id: 9, name: "Option 9"},
    {id: 10, name: "Option 10"},
];

const meta = {
    title: 'Components/Select',
    component: Select,
    args: {
        options,
        accessor: "name",
        multiple: true,
        value: [],
        onChange: action('on-change'),
        onScrollBottom: action('on-scroll-bottom'),
        onSearch: action('on-search'),
        loading: false,
    },
    argTypes:{
        accessor: {
            table: {
                type: { summary: 'keyof T' },
            },
        }
    },
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = args => {
    const [value, setValue] = useState(args.value ?? '');
    return (
        <>
            <Input
                {...args}
    onChange={(...params) => {
        args.onChange(...params);
        setValue(...params);
    }}
    value={value}
    />
    <pre style={{ marginTop: 10 }}>
    {JSON.stringify({ value }, null, 2)}
    </pre>
    </>
);
};

export const Default: Story = {
    args: {
        options,
        accessor: 'name',
        multiple: true,
        value: [],
        onChange: (value: any) => console.log(value),
        onScrollBottom: () => console.log('Scrolled to bottom'),
        onSearch: (value) => console.log('Searching for:', value),
        loading: false,
    }
};
