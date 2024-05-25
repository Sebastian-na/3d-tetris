<script lang="ts">
	import Cube from './Cube.svelte';

	export let grid: Array<Array<Array<string | null>>>;
</script>

{#each grid as row, x}
	{#each row as column, y}
		{#each column as color, z}
			{#if color}
				<Cube position={[x, y, z]} {color} />
			{/if}
		{/each}
	{/each}
{/each}
