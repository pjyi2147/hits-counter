<template>
	<div data-bs-theme="dark" class="vh-100 d-flex flex-column bg-body-tertiary  text-body">
		<nav class="navbar navbar-expand-lg  sticky-top">
			<div class="container-fluid">
				<a class="navbar-brand" href="#">Hits Counter</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div class="navbar-nav ms-auto">
						<a class="nav-link" aria-disabled="true">
							<i class="bi bi-github me-2"></i>
							Github</a>
					</div>
				</div>
			</div>
		</nav>
		<div class="flex-grow-1 d-flex container">
			<div class="w-100 text-center">
				<h1 class="display-1 fw-bold mt-5">
					Hits Counter
				</h1>
				<h6>
					Due to the recent close down of
					<a href="https://github.com/gjbae1212/hit-counter">hits.seeyoufarm.com</a>, <br>I've decided to recreate one based on it. <br>Thanks <a href="https://github.com/gjbae1212">@gjbae1212</a> for your hardwork.
				</h6>
				<hr class="my-5">
				<h4 class="mb-4">Create Your Badge</h4>
				<div class="d-flex flex-column gap-3 align-items-center" id="createBadgeForm">
					<div class="form-floating">
						<input type="url" class="form-control rounded-3" id="content"
						       v-model="badgeData.url"
						       placeholder="URL you want to track">
						<label for="label">URL you want to track</label>
					</div>
					<div class="form-floating">
						<input type="text" class="form-control rounded-3" id="label"
						       v-model="badgeData.label"
						       placeholder="Visitor">
						<label for="label">Label</label>
					</div>
					<div class="d-flex gap-3 flex-column">
						<suspense>
							<IconPicker @icon="icon => badgeData.icon = icon"></IconPicker>
						</suspense>

						<ColorPicker @color="color => badgeData.color = color"></ColorPicker>
					</div>
					<div v-if="preview">
						<h6>Preview</h6>
						<img :src="preview" alt="badge">
					</div>
					<div>
						<button class="btn bg-secondary w-100 rounded-3 btn-lg border fw-bold"
						        @click="generate()"
						        :disabled="!badgeData.url">
							Generate
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">


import IconPicker from "~/components/icon-picker.vue";
import ColorPicker from "~/components/color-picker.vue";

const badgeData = reactive({
	url: "",
	label: "",
	icon: "",
	color: ""
})

const preview = ref("")

const generate = async () => {
	preview.value = ""
	const query = new URLSearchParams(badgeData)
	preview.value = `/api/previewBadge?${query.toString()}`;
}
</script>