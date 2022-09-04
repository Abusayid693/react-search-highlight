import { Meta, Story } from '@storybook/react';
import React from 'react';
import {
    PopOverList,
    PopOverOption,
    PopOverOptionText,
    Props, ReactSearchHighlightProvider, SearchBar,
    useReactSearchHighlight, Wrapper
} from '../src';

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
    title: 'I lov ai and machin',
    name: 'Rehan'
  }
];

export default meta;

const Template = args => {
  const {state} = useReactSearchHighlight();
  return (
    <Wrapper>
      <SearchBar
        data={TEST_DATA}
        keysToSearch={['heading', 'title']}
        placeholder="search docs"
      />
      <PopOverList>
        {state.searchData?.map((item, index) => (
          <PopOverOption
            optionIndex={index}
            key={index}
            onClick={() => alert(index)}
          >
            ⚡️
            <PopOverOptionText as="h3" value={item.heading} />
            <PopOverOptionText as="h5" value={item.title} />
          </PopOverOption>
        ))}
      </PopOverList>
    </Wrapper>
  );
};

export const Custom: Story<Props> = args => {
  return (
    <ReactSearchHighlightProvider>
      <Template />
    </ReactSearchHighlightProvider>
  );
};

Custom.args = {};
