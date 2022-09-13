import { Meta, Story } from '@storybook/react';
import React, { useRef } from 'react';
import TEST_DATA from '../data.json';
import {
  PopOverList,
  PopOverOption,
  PopOverOptionText,
  Props,
  ReactSearchHighlightProvider,
  SearchBar,
  STRING_MATCHING,
  useReactSearchHighlight,
  Wrapper
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

export default meta;

const Template = args => {
  const {suggestions, isResultsEmpty} = useReactSearchHighlight();
  const ref = useRef();

  console.log('ref :', ref);

  return (
    <Wrapper>
      <SearchBar
        data={TEST_DATA}
        keysToSearch={['heading', 'title']}
        placeholder="search docs"
        matchingAlgorithm={STRING_MATCHING}
        ref={ref}
      />
      <PopOverList>
        {suggestions?.map((item, index) => (
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
        {isResultsEmpty && <h3>No results found</h3>}
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
