import { Meta, Story } from '@storybook/react';
import React from 'react';
import TEST_DATA from "../data.json";
import {
  Modal,
  PopOverList,
  PopOverOption,
  PopOverOptionText,
  Props,
  SearchBar,
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

export const Default = args => {
  return (
    <Wrapper>
      {({state}) => {
        return (
          <>
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
          </>
        );
      }}
    </Wrapper>
  );
};


export const WithModal: Story<Props> = args => {
  return (
    <div>
      <h1>Modal is open</h1>
      <Modal>
        <Default />
      </Modal>
    </div>
  );
};

Default.args = {};
