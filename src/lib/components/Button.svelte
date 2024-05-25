<script lang="ts">
	export let label: string;

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('click');
	}
</script>

<button class="pushable" on:click={handleClick} tabindex="-1">
	<span class="front">{label}</span>
</button>

<style>
	.pushable {
		background: hsl(340deg 100% 32%);
		border-radius: 12px;
		border: none;
		padding: 0;
		cursor: pointer;
		outline-offset: 4px;
	}
	.front {
		display: block;
		padding: 12px 42px;
		border-radius: 12px;
		font-size: 1.25rem;
		background: hsl(345deg 100% 47%);
		color: white;
		transform: translateY(-6px);
	}

	.pushable:active .front {
		transform: translateY(-2px);
	}
</style>
