# react-search-highlight

<img src="https://raw.githubusercontent.com/abusayid693/react-search-highlight/main/resources/logo.svg" width="50px" height="50px">

react-search-highlight is a light weight react package to highlight static/dynamic search for auto completion

 <div>
  <img src="https://img.shields.io/npm/v/react-search-highlight">
  <img src="https://img.shields.io/npm/l/react-search-highlight">
  <img src="https://img.shields.io/github/languages/top/abusayid693/react-search-highlight">
</div>

## Installation

install it using npm or yarn to include it in your own React project

You will also need to import css modules in root your project before using it. `dist/react-search-highlight.cjs.development.css`

```bash
npm install react-search-highlight
```

or:

```bash
yarn add react-search-highlight
```

## Usage

You can either use the hook:

```tsx static
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
} from 'react-search-highlight';
import 'react-search-highlight/dist/react-search-highlight.cjs.development.css';

import TEST_DATA from '../data.json';

const Template = () => {
  const {suggestions, isResultsEmpty} = useReactSearchHighlight();
  return (
    <Wrapper>
      <SearchBar
        data={TEST_DATA} // need to provide data here
        keysToSearch={['heading', 'title']} // keys to search from data object
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

export const Custom = () => {
  return (
    <ReactSearchHighlightProvider>
      <Template />
    </ReactSearchHighlightProvider>
  );
};
```

Or with the wrapper component

```tsx
import {
  PopOverList,
  PopOverOption,
  PopOverOptionText,
  Props,
  SearchBar,
  Wrapper
} from 'react-search-highlight';
import 'react-search-highlight/dist/react-search-highlight.cjs.development.css';

import TEST_DATA from '../data.json';

export const Default = args => {
  return (
    <Wrapper>
      {({suggestions}) => {
        return (
          <>
            <SearchBar
              data={TEST_DATA} // need to provide data here
              keysToSearch={['heading', 'title']} // keys to search from data object
              placeholder="search docs"
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
            </PopOverList>
          </>
        );
      }}
    </Wrapper>
  );
};
```

If you want to use it with modal

```tsx static
import {Modal} from 'react-search-highlight';

export const WithModal = () => {
  return (
    <div>
      <h1>Modal is open</h1>
      <Modal>
        <Default />
      </Modal>
    </div>
  );
};
```

#### Data must be provided as array of object format in `<SearchBar/>` component `data` prop, additionally `keysToSearch` prop must be a array of keys to search form data object.

```tsx
const data = [
  {
    title:....,
    name:.....,
    age:......,
  },
  ....
]
// It is not necessary to pass all the keys from the object, only keys that are passed
// will be searched
const keysToSearch = ['title','name']


<SearchBar
  data={data} 
  keysToSearch={keysToSearch}
 />

```

## 🔨 API
`useReactSearchHighlight` can be used with `ReactSearchHighlightProvider` and it can be used throughout the component to access the context values. Note that whenever you are using it you must wrap the entire component using `ReactSearchHighlightProvider`.

```tsx static
const {
  suggestions,
  isLoading,
  input,
  startLoading,
  endLoading,
  isResultsEmpty,
  resetState
} = useReactSearchHighlight();
```

You can also access these values using wrapper component

```tsx static
    <Wrapper>
      {({suggestions, isLoading, input, startLoading, endLoading, isResultsEmpty, resetState}) => {
        return (
          .....
        );
      }}
    </Wrapper>
```

### `<SearchBar/>` Props:

```tsx 
  // Data to perform search operation
  data: any[];

  // Determines which keys to search from the data object
  keysToSearch?: string[];

  // Determines input box behaviour it accepts three values DEBOUNCE, THROTTLE or DEFAULT
  inputAlgorithm?: typeof DEBOUNCE | typeof THROTTLE | typeof DEFAULT;

  // Optional: Determines the input algorithm timeout for debounce and throttle
  inputAlgorithmTimeout?: number;

  // Determines matching algorithm to search over data, it accepts two values CHARACTER_MATCHING or STRING_MATCHING
  // CHARACTER_MATCHING matches each character from the data to highlight it
  // STRING_MATCHING matches each word from the data to highlight it
  matchingAlgorithm?: typeof CHARACTER_MATCHING | typeof STRING_MATCHING;

  // Optional: input value, it is recommended not to pass any in general case
  value?: string;

  // Optional: input value onChange event handler
  onChange?: (e:React.ChangeEvent<HTMLInputElement>) => void

  // Optional: Determines initial input value
  initialValue?: string

  // Optional: It can be used to change search bar icon
  PrefixIcon?: React.FC
```

### `<PopOverOption/>` Props:

```ts
  // React element node
  children: ReactNode;
  
  // Determines the navigation index used for internal list navigation
  optionIndex: number;

```

### `<PopOverOptionText/>` Props:

```ts
  // Determines text value to render with highlight
  value: string;

  // Determine type of html element ex: p, h1, h2
  as: string;
```


### 🐛 Bug Reporting
`The Library is in developing stage`
- Feel free to Open an [issue on GitHub](https://github.com/Abusayid693/react-search-highlight/issues) to request any additional features you might need for your use case.
- Connect with me on [LinkedIn](https://www.linkedin.com/in/rehan-choudhury-66842a164/). I'd love ❤️️ to hear where you are using this library.


### 📜 License

This software is open source, licensed under the [MIT License](./LICENSE).
