import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PublicClientApplication } from '@azure/msal-browser';
import App from './App';

const pca = new PublicClientApplication({
  auth: {
    clientId: ''
  }
});

jest.spyOn(pca, 'addEventCallback').mockImplementation((fn) => {
  return '';
})

test('renders welcome page', () => {
  render(<App pca = {pca} />);
  const titleElement = screen.getByRole('heading');
  expect(titleElement).toBeInTheDocument();
  expect(titleElement).toHaveTextContent(/React Graph Tutorial/i);
});
