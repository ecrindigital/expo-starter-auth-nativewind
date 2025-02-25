import { render, fireEvent } from '@testing-library/react-native';
import React, { ReactNode } from 'react';
import { ViewStyle, TextStyle } from 'react-native';

import Index from '../index';

jest.mock('react-native', () => ({
  Alert: { alert: jest.fn() },
  View: ({
    children,
    testID,
    style,
    className,
  }: {
    children: ReactNode;
    testID?: string;
    style?: ViewStyle;
    className?: string;
  }) => React.createElement('div', { 'data-testid': testID, style, className }, children),
  Text: ({
    children,
    style,
    className,
  }: {
    children: ReactNode;
    style?: TextStyle;
    className?: string;
  }) => React.createElement('span', { style, className }, children),
}));

jest.mock('@/components/Button', () => {
  return function MockButton({ label, onPress }: { label: string; onPress: () => void }) {
    return React.createElement('div', { 'data-testid': 'mock-button', onClick: onPress }, label);
  };
});

describe('Index Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders welcome messages correctly', () => {
    const { queryByText, getByTestId } = render(<Index />);

    expect(queryByText(/Welcome to NativeWind!/i)).toBeTruthy();
    expect(queryByText(/Style your app with/i)).toBeTruthy();
    expect(queryByText(/Tailwind CSS!/i)).toBeTruthy();
    expect(getByTestId('mock-button')).toBeTruthy();
  });

  test('shows alert when button is pressed', () => {
    const { getByTestId } = render(<Index />);
    const button = getByTestId('mock-button');

    fireEvent.press(button);

    expect(jest.requireMock('react-native').Alert.alert).toHaveBeenCalledWith(
      'NativeWind',
      "You're all set up!"
    );
  });

  test('button has correct label', () => {
    const { queryByText } = render(<Index />);
    expect(queryByText(/Sounds good!/i)).toBeTruthy();
  });

  test('renders with correct styles', () => {
    const { UNSAFE_root: root } = render(<Index />);
    const firstChild = root.children[0];

    expect(firstChild.props.className).toContain('flex-1');
    expect(firstChild.props.className).toContain('items-center');
    expect(firstChild.props.className).toContain('justify-center');
  });
});
