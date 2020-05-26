import Home from '../../src/routes/index.svelte';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/svelte';

it('show home page', () => {
  expect(() => render(Home)).not.toThrow();
});

it('has username as title', () => {
  const { getByText } = render(Home);
  expect(getByText('ignatiusmb')).toBeInTheDocument();
});
