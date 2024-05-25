export type TetrominoeType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z'

export type Position = [x: number, y: number, z: number]

export type Tetrominoe = {
	type: TetrominoeType
	shape: Array<[x: number, y: number, z: number]>
	color: string
}

/**
 * Each tetrominoe is represented by 2x2 matrix where each array represents
 * a single cube in the tetrominoe and its local position.
 */
export const tetrominoes: Record<TetrominoeType, Tetrominoe> = {
	I: {
		type: 'I',
		shape: [
			[0, 0, 0],
			[1, 0, 0],
			[2, 0, 0],
			[3, 0, 0]
		],
		color: 'cyan'
	},
	J: {
		type: 'J',
		shape: [
			[0, 0, 0],
			[1, 0, 0],
			[2, 0, 0],
			[2, 1, 0]
		],
		color: 'blue'
	},
	L: {
		type: 'L',
		shape: [
			[0, 0, 0],
			[1, 0, 0],
			[2, 0, 0],
			[0, 1, 0]
		],
		color: 'orange'
	},
	O: {
		type: 'O',
		shape: [
			[0, 0, 0],
			[1, 0, 0],
			[0, 1, 0],
			[1, 1, 0]
		],
		color: 'yellow'
	},
	S: {
		type: 'S',
		shape: [
			[0, 0, 0],
			[1, 0, 0],
			[1, 1, 0],
			[2, 1, 0]
		],
		color: 'green'
	},
	T: {
		type: 'T',
		shape: [
			[0, 0, 0],
			[1, 0, 0],
			[2, 0, 0],
			[1, 1, 0]
		],
		color: 'purple'
	},
	Z: {
		type: 'Z',
		shape: [
			[0, 0, 0],
			[1, 0, 0],
			[1, 1, 0],
			[2, 1, 0]
		],
		color: 'red'
	}
}
