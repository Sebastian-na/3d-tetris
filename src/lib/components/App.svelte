<script lang="ts">
	import { Canvas, T } from '@threlte/core'
	import Scene from './Scene.svelte'
	import { HTML } from '@threlte/extras'
	import Button from './Button.svelte'

	let gameStarted = false
	let gamePaused = false
	let resetGame = false
	let score = 0

	function handleClickOnStart() {
		if (gameStarted) {
			resetGame = true
			score = 0
		}
		gameStarted = !gameStarted
		gamePaused = false
	}

	$: if (resetGame) {
		score = 0
		setTimeout(() => {
			resetGame = false
			gameStarted = false
			gamePaused = true
		}, 1000)
	}
</script>

<div class="header">
	<h1>Threlte Tetris</h1>
	<div class="header__controls">
		<Button on:click={handleClickOnStart} label={gameStarted ? 'Reset' : 'Start'} />
		{#if gameStarted}
			<Button on:click={() => (gamePaused = !gamePaused)} label={gamePaused ? 'Resume' : 'Pause'} />
		{/if}
	</div>
</div>

<div class="game">
	<div class="game__left">
		<Canvas>
			<Scene
				{gameStarted}
				{gamePaused}
				{resetGame}
				on:points={(event) => (score += event.detail)}
				on:gameOver={() => (resetGame = true)}
			/>
		</Canvas>
	</div>

	<div class="game__right">
		<Canvas>
			<HTML position={[-2, 2, 0]}>
				<div>
					<h2>Controls</h2>
					<ul class="control-list">
						<li>Rotate X: E</li>
						<li>Rotate Y: R</li>
						<li>Rotate Z: Q</li>
						<li>Hard drop: Space</li>
					</ul>
				</div>
				<div>
					<h2>Score</h2>
					<p>{score}</p>
				</div>
			</HTML>
			<!-- <T.AxesHelper scale={10} /> -->
		</Canvas>
	</div>
</div>

<style>
	.header {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		padding: 1rem;
		height: 100px;
		position: absolute;
		width: 100%;
		top: 30px;
		z-index: 100;
	}

	.header h1 {
		font-family: 'Press Start 2P', cursive;
		font-size: 2rem;
		color: white;
	}

	.header__controls {
		display: flex;
		gap: 1rem;
	}

	.game {
		width: 100vw;
		display: flex;
		height: 750px;
		margin-top: calc(2rem + 30px);
	}

	.game__left {
		width: 60%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.game__right {
		width: 40%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.control-list {
		list-style: none;
		padding: 0;
		text-wrap: nowrap;
	}
</style>
