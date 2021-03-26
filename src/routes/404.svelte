<script>
	import ErrorPage from './$error.svelte';
</script>

<ErrorPage status={404} error={{ message: 'Page not found' }} />
