import { Meta, Story } from '@storybook/react';
import Main, { ContextProvider, Props, useContext } from '../src';

const meta: Meta = {
  title: 'Welcome',
  component: Main,
  argTypes: {
    children: {
      control: {
        type: 'text'
      }
    }
  },
  parameters: {
    controls: {expanded: true}
  }
};

const TEST_DATA = [
  {
    heading: 'Rhan is good',
    title: 'I am eeatomg food'
  },
  {
    heading: 'AI is th futur',
    title: 'I lov ai and machin'
  }
];

export default meta;

const Template = args => {
  const [state] = useContext();

  return (
    <Main
      data={TEST_DATA}
      keysToSearch={['heading']}
      placeholder="search docs"
    />
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default: Story<Props> = args => {
  return (
    <ContextProvider>
      <Template />
    </ContextProvider>
  );
};

Default.args = {};
