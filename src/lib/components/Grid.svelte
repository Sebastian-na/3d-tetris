<script lang="ts">
	import { T } from '@threlte/core'

	const size = 6
</script>

<T.Group position={[0, 0, 0]}>
	<!-- Floor -->
	<T.GridHelper args={[size, size]} position={[size / 2, 0, size / 2]} />

	<!-- Back down -->
	<T.GridHelper
		args={[size, size]}
		position={[size / 2, size / 2, 0]}
		rotation={[Math.PI / 2, 0, 0]}
	/>
	<!-- Back top -->
	<T.GridHelper
		args={[size, size]}
		position={[size / 2, size / 2 + size, 0]}
		rotation={[Math.PI / 2, 0, 0]}
	/>

	<!-- Left down-->
	<T.GridHelper
		args={[size, size]}
		position={[0, size / 2, size / 2]}
		rotation={[Math.PI / 2, 0, Math.PI / 2]}
	/>
	<T.GridHelper
		args={[size, size]}
		position={[0, size / 2 + size, size / 2]}
		rotation={[Math.PI / 2, 0, Math.PI / 2]}
	/>
</T.Group>
