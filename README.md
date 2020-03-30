# context-media-match
A small library for matching media queries using React context.  Bootstrap breakpoints by default.

## Install

```
yarn add context-media-match
```

```
npm install context-media-match
```

## Usage

#### Use MediaProvider as a context provider

```jsx
import React from 'react';
import { MediaProvider } from 'context-media-match';

const App = (props) => (
  <MediaProvider>
    <SomeComponent />
  </MediaProvider>
)
```

#### Implement consumer using useMediaContext hook

```jsx
// with HOC
import React from 'react';
import { useMediaContext } from 'context-media-match';

const SomeOtherComponent = () => {
  const { xs } = useMediaContext();

  return <div>{ xs ? 'is XS' : 'is not XS' }</div>;
}

export default withMediaContext(SomeOtherComponent);
```

#### Implement consumer using withMediaContext HOC

```jsx
// with HOC
import React from 'react';
import { withMediaContext } from 'context-media-match';

class SomeOtherComponent extends Component {
  render() {
    const { xs } = this.props;

    return <div>{ xs ? 'is XS' : 'is not XS' }</div>
  }
}

export default withMediaContext(SomeOtherComponent);
```

#### Implement consumer using without HOC using MediaContext

```jsx
// without HOC
import React from 'react';
import { MediaContext } from 'context-media-match';
import SomeOtherComponent from './wherever';

<MediaContext.Consumer>
  {context => <SomeOtherComponent {...context}>{routes}</SomeOtherComponent>}
</MediaContext.Consumer>
```

#### Use the default config
`MediaProvider` comes with a default config based on Bootstrap's break points"
```jsx
static defaultProps = {
  config: {
    xs: '(max-width: 575.98px)',
    sm: '(min-width: 576px) and (max-width: 767.98px)',
    md: '(min-width: 768px) and (max-width: 991.98px)',
    lg: '(min-width: 992px) and (max-width: 1199.98px)',
    xl: '(min-width: 1200px)'
  }
};
```

#### Use custom config
You can provide `MediaProvider` a custom config object with values that are valid media query string.

```jsx
import React from 'react';
import { MediaProvider } from 'context-media-match';

const customConfig = {
  isMobile: '(max-width: 575.98px)',
  isTablet: '(min-width: 576px)',
  isDesktop: '(min-width: 767.98px)',
};

const App = (props) => (
  <MediaProvider config={customConfig}>
    <SomeComponent />
  </MediaProvider>
)
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
