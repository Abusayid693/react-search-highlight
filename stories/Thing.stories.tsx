import { Meta, Story } from '@storybook/react';
import { ContextProvider, PopOverList, Props, SearchBar, useContext, Wrapper } from '../src';

const meta: Meta = {
  title: 'Welcome',
  component: SearchBar,
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
  const {state} = useContext();
  console.log('Template :',state)

  return (
    <Wrapper>
    <SearchBar
      data={TEST_DATA}
      keysToSearch={['heading']}
      placeholder="search docs"
    />
    <PopOverList/>
    </Wrapper>
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
