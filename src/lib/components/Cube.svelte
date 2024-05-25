<script lang="ts">
	/**
	 * A single cube
	 */
	import { T } from '@threlte/core'
	import { BoxGeometry } from 'three'

	export let position: [x: number, y: number, z: number] = [0, 0, 0]
	export let color: string = 'orange'

	$: internalPosition = position.map((p) => p + 0.5) as [x: number, y: number, z: number]
</script>

<T.Group position={internalPosition}>
	<T.Mesh>
		<T.BoxGeometry args={[1, 1, 1]} />
		<T.MeshStandardMaterial {color} />
	</T.Mesh>

	<!--Draw lines around the cube-->
	<T.LineSegments>
		<T.EdgesGeometry attach="geometry" args={[new BoxGeometry(1, 1, 1)]} />
		<T.LineBasicMaterial color="black" attach="material" />
	</T.LineSegments>
</T.Group>
