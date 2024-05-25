<script lang="ts">
	import type { Position, TetrominoeType } from '$lib/types/Tetrominoe'
	import { tetrominoes } from '$lib/types/Tetrominoe'
	import { onMount } from 'svelte'
	import Cube from './Cube.svelte'
	import { T } from '@threlte/core'

	export let position: [x: number, y: number, z: number]
	export let tetrominoeType: TetrominoeType

	export let tetrominoe: { shape: Array<[x: number, y: number, z: number]>; color: string }

	$: if (tetrominoeType) {
		tetrominoe = structuredClone(tetrominoes[tetrominoeType])
	}

	onMount(() => {
		tetrominoe = structuredClone(tetrominoes[tetrominoeType])
	})

	export function simulateRotation(type: 'x' | 'y' | 'z') {
		const newShape = tetrominoe.shape.map((cubePosition) => {
			let [x, y, z] = cubePosition
			switch (type) {
				case 'x':
					return [x, -z, y] as Position
				case 'y':
					return [z, y, -x] as Position
				case 'z':
					return [-y, x, z] as Position
			}
		})

		return newShape
	}

	export function rotate(type: 'x' | 'y' | 'z') {
		tetrominoe.shape = simulateRotation(type)
	}
</script>

<T.Group {position}>
	{#each tetrominoe.shape as cubePosition}
		<Cube position={cubePosition} color={tetrominoe.color} />
	{/each}
</T.Group>
