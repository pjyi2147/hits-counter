<script setup lang="ts">


</script>

<template>
	<div class="container flex-grow-1">
		<h2 class="fw-light mt-5">
			Live Hits
		</h2>

		<div class="card rounded-3 text-start h-100">
			<div class="card-body">
				<div v-for="hit in hits">
					{{ hit.time }}: <strong>{{ hit.url }}</strong>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

</style>