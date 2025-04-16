import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { ButtonVariant } from '../../../src/components/Base/ButtonVariants';
import Button from '../../../src/components/Base/Button';

describe('Button component', () => {
  it('renders with default variant', () => {
    const { getByText } = render(<Button title="Press me" onPress={() => {}} />);
    expect(getByText('Press me')).toBeTruthy();
  });

  it('triggers onPress callback when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title="Press me" onPress={onPressMock} />);
    fireEvent.press(getByText('Press me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('renders with different variants', () => {
    const variants = Object.values(ButtonVariant);

    variants.forEach((variant) => {
      const { getByText, unmount } = render(
        <Button title={`Button ${variant}`} onPress={() => {}} variant={variant} />
      );
      expect(getByText(`Button ${variant}`)).toBeTruthy();
      unmount();
    });
  });
});
