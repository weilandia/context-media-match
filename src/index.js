import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

const setMediaContext = (breakpoints = {}) => {
  const matches = {};

  Object.keys(breakpoints).forEach(key => {
    const match = window.matchMedia(breakpoints[key]).matches;
    matches[key] = match;
    return match;
  });

  return matches;
};

export const MediaContext = React.createContext(setMediaContext());

export class MediaProvider extends React.PureComponent {
  static propTypes = {
    config: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
  };

  static defaultProps = {
    config: {
      xs: '(max-width: 575.98px)',
      sm: '(min-width: 576px) and (max-width: 767.98px)',
      md: '(min-width: 768px) and (max-width: 991.98px)',
      lg: '(min-width: 992px) and (max-width: 1199.98px)',
      xl: '(min-width: 1200px)'
    }
  };

  constructor(props) {
    super(props);
    const { config } = this.props;

    this.resizeListener = debounce(() => this.setState(setMediaContext(config)), 100);
    this.state = setMediaContext(config);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }

  render() {
    const { children } = this.props;

    return <MediaContext.Provider value={this.state}>{children}</MediaContext.Provider>;
  }
}

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

export const withMediaContext = Component => {
  const WithMediaContext = props => (
    <MediaContext.Consumer>{context => <Component {...props} {...context} />}</MediaContext.Consumer>
  );

  WithMediaContext.displayName = `withMediaContext(${getDisplayName(Component)})`;
  return WithMediaContext;
};
