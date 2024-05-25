import type { Position, TetrominoeType } from '$lib/types/Tetrominoe';
import { tetrominoes } from '$lib/types/Tetrominoe';

export const getRandomTetrominoeType = () => {
	const types: TetrominoeType[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
	return types[Math.floor(Math.random() * types.length)];
};

export const getRandomPosition = (tetrominoeType: TetrominoeType) => {
	const tetrominoe = tetrominoes[tetrominoeType];
	// We need to return a random position that is within the bounds of the game board (for every cube in the tetrominoe).

	// Find the max X and Z values of the tetrominoe shape.
	const maxX = Math.max(...tetrominoe.shape.map((cube) => cube[0]));
	const maxZ = Math.max(...tetrominoe.shape.map((cube) => cube[2]));

	// Find the min X and Z values of the tetrominoe shape.
	const minX = Math.min(...tetrominoe.shape.map((cube) => cube[0]));
	const minZ = Math.min(...tetrominoe.shape.map((cube) => cube[2]));

	const sizeX = maxX - minX + 1;
	const sizeZ = maxZ - minZ + 1;

	// Generate a random position that is within the bounds of the game board (6 x 6).
	const x = Math.floor(Math.random() * (6 - sizeX));
	const z = Math.floor(Math.random() * (6 - sizeZ));

	return [x, 12, z] as Position;
};
