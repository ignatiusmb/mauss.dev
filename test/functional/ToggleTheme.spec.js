import ToggleTheme from '../../src/components/independent/ToggleTheme.svelte';
import { render, fireEvent } from '@testing-library/svelte';

it('change html class to dark', async () => {
  const { queryByTitle } = render(ToggleTheme);
});
