<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
	params: {
		type: String,
		default: ""
	}
})

const getHost = () => {
	return window.location.protocol + "//" + window.location.host
}

const getHtml = computed(() => {
	return `<img src="${getHost()}/api/hit?${props.params}">`
})

const jsonOutput = ref(false)
</script>

<template>
	<div class="d-flex gap-3 flex-column text-center" >
		<hr>
		<div >
			<h5 class="mb-3">Result</h5>
			<img :src="'/api/previewBadge?'+params" alt="badge">
		</div>
		<h6>Insert In Your File</h6>
		<div class="d-flex gap-2 flex-column">
			<div class="card">
				<div class="card-header">
					URL
				</div>
				<div class="card-body">
					<samp>
						{{getHost()}}/api/hit?{{params + (jsonOutput ? '&output=json':'')}}
					</samp>
					<div class="d-flex mt-2">
						<div class="form-check form-switch ms-auto">
							<label class="form-check-label" for="jsonOutput">
								<small>Output in JSON</small>
							</label>
							<input
								v-model="jsonOutput"
								class="form-check-input" type="checkbox" role="switch" id="jsonOutput">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="d-flex gap-2 flex-column">
			<div class="card">
				<div class="card-header">
					Markdown
				</div>
				<div class="card-body">
					<samp>
						![Badge]({{getHost()}}/api/hit?{{params}})
					</samp>
				</div>
			</div>
		</div>
		<div class="d-flex gap-2 flex-column">
			<div class="card">
				<div class="card-header">
					HTML
				</div>
				<div class="card-body">
					<samp v-text="getHtml">

					</samp>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

</style>