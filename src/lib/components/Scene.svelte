<script lang="ts">
	import { T } from '@threlte/core'
	import { ContactShadows, OrbitControls } from '@threlte/extras'
	import Grid from './Grid.svelte'
	import Tetrominoe from './Tetrominoe.svelte'
	import { onMount } from 'svelte'
	import { tetrominoes, type Position, type TetrominoeType } from '$lib/types/Tetrominoe'
	import FrozenTetrominoes from './FrozenTetrominoes.svelte'
	import { getRandomPosition, getRandomTetrominoeType } from '$lib/utils'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher<{
		points: number
		gameOver: void
	}>()

	let gameSpeed = 1000

	let rowsCleared = 0
	let tetrominoeType: TetrominoeType = getRandomTetrominoeType()
	let position: Position = getRandomPosition(tetrominoeType)
	let tetrominoe: { shape: Array<Position>; color: string } = {
		shape: [],
		color: ''
	}
	let controls: any
	let rotate: (direction: 'x' | 'y' | 'z') => void
	let simulateRotation: (direction: 'x' | 'y' | 'z') => Position[]

	export let gameStarted: boolean
	export let gamePaused: boolean
	export let resetGame: boolean

	// 6 x 12 x 6 grid
	let grid: Array<Array<Array<string | null>>> = Array.from({ length: 6 }, () =>
		Array.from({ length: 12 }, () => Array.from({ length: 6 }, () => null))
	)

	let gameIntervalId: number | null = null

	$: {
		if (gameStarted && !gamePaused) {
			if (gameIntervalId) {
				clearInterval(gameIntervalId)
			}
			gameIntervalId = setInterval(() => {
				const newPosition: Position = [position[0], position[1] - 1, position[2]]
				if (isFloorCollision(position)) {
					frozeTetrominoe()
					return
				}

				position = newPosition
			}, gameSpeed)
		} else {
			if (gameIntervalId) {
				clearInterval(gameIntervalId)
			}
		}
	}

	$: if (resetGame) {
		grid = Array.from({ length: 6 }, () =>
			Array.from({ length: 12 }, () => Array.from({ length: 6 }, () => null))
		)
		position = getRandomPosition(tetrominoeType)
		tetrominoeType = getRandomTetrominoeType()
		resetGame = false
	}

	function hardDrop() {
		let newPosition: Position = position
		while (!isFloorCollision(newPosition)) {
			newPosition[1] = newPosition[1] - 1
		}
		frozeTetrominoe()
	}

	function frozeTetrominoe() {
		// check if the tetrominoe has hit the floor
		// if it has, we need to update the grid
		const cubes = tetrominoe.shape
		for (const cube of cubes) {
			const [x, y, z] = cube
			const [newX, newY, newZ] = [x + position[0], y + position[1], z + position[2]]

			// if the cube is ends up above the grid, the game is over
			if (newY >= 12) {
				rowsCleared = 0
				dispatch('gameOver')
				grid = Array.from({ length: 6 }, () =>
					Array.from({ length: 12 }, () => Array.from({ length: 6 }, () => null))
				)
				tetrominoeType = getRandomTetrominoeType()
				position = getRandomPosition(tetrominoeType)
				return
			}

			grid[newX][newY][newZ] = tetrominoes[tetrominoeType].color
		}
		// reset the position of the tetrominoe
		const newTetrominoeType = getRandomTetrominoeType()
		const randomPosition = getRandomPosition(newTetrominoeType)
		position = randomPosition
		tetrominoeType = newTetrominoeType

		for (let y = 0; y < 12; y++) {
			if (isRowFull(y)) {
				clearRow(y)
			}
		}

		return
	}

	function isFloorCollision(position: Position) {
		const cubes = tetrominoe.shape
		for (const cube of cubes) {
			const [x, y, z] = cube
			const [realX, realY, realZ] = [x + position[0], y + position[1], z + position[2]]
			if (realY >= 12) {
				continue
			}
			if (realY === 0 || grid[realX][realY - 1][realZ]) {
				return true
			}
		}
		return false
	}

	function clearRow(y: number) {
		// move all the rows above the cleared row down
		for (let i = y; i < 11; i++) {
			for (let x = 0; x < 6; x++) {
				for (let z = 0; z < 6; z++) {
					grid[x][i][z] = grid[x][i + 1][z]
				}
			}
		}

		// clear the top row
		for (let x = 0; x < 6; x++) {
			for (let z = 0; z < 6; z++) {
				grid[x][11][z] = null
			}
		}

		rowsCleared++
		dispatch('points', 100)
		if (gameSpeed <= 100) {
			return
		}
		gameSpeed -= 50
	}

	function isRowFull(y: number): boolean {
		for (let x = 0; x < 6; x++) {
			for (let z = 0; z < 6; z++) {
				if (!grid[x][y][z]) {
					return false
				}
			}
		}
		return true
	}

	function handleKeyDown(event: KeyboardEvent) {
		const azimuthAngle = (controls.ref.getAzimuthalAngle() * 180) / Math.PI
		if (!gameStarted || gamePaused) {
			return
		}
		if (event.key === 'ArrowLeft') {
			console.log(azimuthAngle)
			const newPosition: Position =
				azimuthAngle > 45
					? [position[0], position[1], position[2] + 1]
					: [position[0] - 1, position[1], position[2]]
			if (checkValidPosition(newPosition)) {
				position = newPosition
			}
		} else if (event.key === 'ArrowRight') {
			const newPosition: Position =
				azimuthAngle > 45
					? [position[0], position[1], position[2] - 1]
					: [position[0] + 1, position[1], position[2]]
			if (checkValidPosition(newPosition)) {
				position = newPosition
			}
		} else if (event.key === 'ArrowDown') {
			const newPosition: Position =
				azimuthAngle > 45
					? [position[0] + 1, position[1], position[2]]
					: [position[0], position[1], position[2] + 1]
			if (checkValidPosition(newPosition)) {
				position = newPosition
			}
		} else if (event.key === 'ArrowUp') {
			const newPosition: Position =
				azimuthAngle > 45
					? [position[0] - 1, position[1], position[2]]
					: [position[0], position[1], position[2] - 1]
			if (checkValidPosition(newPosition)) {
				position = newPosition
			}
		} else if (event.key === ' ') {
			hardDrop()
		} else if (event.key === 'e' || event.key === 'E') {
			const newCubes = simulateRotation('x')

			if (checkValidPosition(position, newCubes)) {
				rotate('x')
			}
		} else if (event.key === 'r' || event.key === 'R') {
			const newCubes = simulateRotation('y')

			if (checkValidPosition(position, newCubes)) {
				rotate('y')
			}
		} else if (event.key === 'q' || event.key === 'Q') {
			const newCubes = simulateRotation('z')

			if (checkValidPosition(position, newCubes)) {
				rotate('z')
			}
		}
	}

	function checkValidPosition(
		newPosition: [x: number, y: number, z: number],
		shape: Position[] = tetrominoe.shape
	) {
		// take into account all the cubes in the tetrominoe
		const cubes = shape
		for (const cube of cubes) {
			const [x, y, z] = cube
			const [newX, newY, newZ] = [x + newPosition[0], y + newPosition[1], z + newPosition[2]]

			if (newX < 0 || newX >= 6 || newY < 0 || newZ < 0 || newZ >= 6) {
				return false
			}

			if (newY >= 12) {
				continue
			}

			// check if there is a cube in the grid
			if (grid[newX][newY][newZ]) {
				return false
			}
		}
		return true
	}

	onMount(() => {
		if (gameStarted) {
			gameIntervalId = setInterval(() => {
				position = [position[0], position[1] - 1, position[2]]
			}, gameSpeed)
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			if (gameIntervalId) {
				clearInterval(gameIntervalId)
			}
			window.removeEventListener('keydown', handleKeyDown)
		}
	})
</script>

<T.PerspectiveCamera makeDefault position={[10, 15, 10]} fov={80}>
	<OrbitControls
		enableZoom={false}
		enableDamping
		target={[3, 7, 3]}
		minAzimuthAngle={0}
		maxAzimuthAngle={Math.PI / 2}
		maxPolarAngle={Math.PI / 2}
		enablePan={false}
		bind:this={controls}
	/>
</T.PerspectiveCamera>

<T.AmbientLight intensity={2} />
<Grid />
<Tetrominoe {position} {tetrominoeType} bind:rotate bind:simulateRotation bind:tetrominoe />
<FrozenTetrominoes {grid} />
<ContactShadows />
