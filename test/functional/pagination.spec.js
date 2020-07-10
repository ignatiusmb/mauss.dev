import Pagination from '../../src/svelte/Pagination.svelte';
import { posts } from '../../src/stores/page';
import { render, fireEvent } from '@testing-library/svelte';
import { tick } from 'svelte';
import { get } from 'svelte/store';

describe('pagination', () => {
	it('show', async () => {
		const { getAllByLabelText } = render(Pagination);
	});
});
