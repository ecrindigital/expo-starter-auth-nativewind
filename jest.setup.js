import '@testing-library/jest-native/extend-expect';

global.jest = jest;

jest.mock('nativewind', () => ({
  withExpoSnack: () => component => component,
  styled: component => component,
}));

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Alert: { alert: jest.fn() },
    View: ({ children, testID, style, className }) => (
      <div data-testid={testID} style={style} className={className}>
        {children}
      </div>
    ),
    Text: ({ children, style, className }) => (
      <span style={style} className={className}>
        {children}
      </span>
    ),
  };
});

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  Link: 'Link',
  Stack: jest.fn().mockImplementation(({ children }) => children),
}));

jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      apiUrl: 'http://localhost:3000',
    },
  },
}));

jest.mock('../global.css', () => ({}), { virtual: true });
