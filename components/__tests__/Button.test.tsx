import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';

import Button from '../Button';

jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native-web');
  rn.Pressable = 'Pressable';
  rn.Text = 'Text';
  return rn;
});

describe('Button Component', () => {
  test('renders correctly with label', () => {
    const { getByText } = render(<Button label="Test Button" />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  test('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button label="Press Me" onPress={onPressMock} />);

    fireEvent.press(getByText('Press Me'));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  test('renders with correct props', () => {
    const { getByText } = render(<Button label="Styled Button" />);

    const buttonText = getByText('Styled Button');
    expect(buttonText.props.children).toBe('Styled Button');
  });
});
