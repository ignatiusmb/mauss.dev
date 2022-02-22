<script>
	import ErrorPage from './__error.svelte';
</script>

<ErrorPage status={404} error={{ name: '404', message: 'Page not found' }} />
