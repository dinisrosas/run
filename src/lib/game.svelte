<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	export let stop;

	let coords = spring(
		{ x: 50, y: 50 },
		{
			stiffness: 0.01,
			damping: 1
		}
	);

	let size = spring(20);

	let mouse = {
		x: 0,
		y: 0
	};

	let score = 0;

	// Check if the circle touches the mouse
	function checkCollision(mx, my) {
		const dx = mx - $coords.x;
		const dy = my - $coords.y;
		const distance = Math.sqrt(dx * dx + dy * dy);

		// Trigger game over if distance is less than or equal to the radius
		if (distance <= $size) {
			stop(score);
		}
	}

	let interval: any = null;

	onMount(() => {
		interval = setInterval(() => {
			size.update((s) => s + 1);
			coords.stiffness += 0.001;
			score += 200;
			checkCollision(mouse.x, mouse.y);
		}, 200);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<svg
	on:mousemove={(e) => {
		coords.set({ x: e.clientX, y: e.clientY });

		checkCollision(e.clientX, e.clientY);

		mouse.x = e.clientX;
		mouse.y = e.clientY;
	}}
	on:mousedown={() => size.set(30)}
	on:mouseup={() => size.set(10)}
	role="presentation"
>
	<circle cx={$coords.x} cy={$coords.y} r={$size} />
</svg>

<div class="timer">
	{score}
</div>

<style>
	.timer {
		position: absolute;
		top: 0;
		right: 0;
		padding: 10px;
		color: black;
	}

	svg {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}

	circle {
		fill: #ff3e00;
	}
</style>
