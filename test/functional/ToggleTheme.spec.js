import ToggleTheme from '../../src/svelte/ToggleTheme.svelte';
import { render, fireEvent } from '@testing-library/svelte';

it('change html class to dark', async () => {
	const { queryByTitle } = render(ToggleTheme);
});
