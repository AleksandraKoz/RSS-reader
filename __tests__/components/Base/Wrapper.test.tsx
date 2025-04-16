import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

import Wrapper from '../../../src/components/Base/Wrapper';

describe('Wrapper component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Wrapper>
        <Text>Test Content</Text>
      </Wrapper>
    );
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('applies default styles', () => {
    const { getByTestId } = render(
      <Wrapper>
        <Text>Test Content</Text>
      </Wrapper>
    );

    const view = getByTestId('wrapper').parent;

    expect(view?.props.style).toContainEqual({
      backgroundColor: 'rgba(241, 239, 236,1)',
      borderRadius: 20,
      marginHorizontal: 15,
      marginVertical: 5,
      paddingHorizontal: 15,
      paddingVertical: 15,
    });
  });

  it('applies additional custom styles', () => {
    const customStyle = { marginTop: 50 };
    const { getByTestId } = render(
      <Wrapper style={customStyle}>
        <Text>Test Content</Text>
      </Wrapper>
    );

    const view = getByTestId('wrapper');
    expect(view?.props.style).toContainEqual({
      marginTop: 50,
    });
  });
});
