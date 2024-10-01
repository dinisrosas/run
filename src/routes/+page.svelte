<script>
	import Game from '$lib/game.svelte';
	let on = false;

	let result = null;

	function start() {
		result = null;
		on = true;
	}

	function stop(score) {
		on = false;
		result = score;
	}
</script>

<svete:head>
	<title>The Run Game</title>
</svete:head>

{#if on}
	<Game {stop} />
{:else}
	<main>
		<div>
			{#if result}
				<div>Last score: {result}</div>
			{/if}
			<button on:click={start}>Start</button>
		</div>
	</main>
{/if}

<style>
	main {
		display: grid;
		place-items: center;
		height: 100vh;
		background-color: #f0f0f0;
	}
</style>
