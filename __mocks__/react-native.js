const ReactNative = {
  Alert: {
    alert: jest.fn(),
  },
  View: 'View',
  Text: 'Text',
  Pressable: 'Pressable',
  StyleSheet: {
    create: styles => styles,
  },
  Platform: {
    OS: 'web',
    select: jest.fn(config => config.web),
  },
  Animated: {
    View: 'Animated.View',
    createAnimatedComponent: jest.fn(component => component),
    timing: jest.fn(),
    spring: jest.fn(),
    Value: jest.fn(),
  },
  Dimensions: {
    get: jest.fn().mockReturnValue({
      width: 390,
      height: 844,
    }),
  },
};

module.exports = ReactNative;
