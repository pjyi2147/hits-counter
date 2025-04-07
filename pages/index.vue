<script setup lang="ts">
import IconPicker from "~/components/icon-picker.vue";
import ColorPicker from "~/components/color-picker.vue";

const badgeData = reactive({
	url: "",
	label: "",
	icon: "",
	color: ""
})

const preview = ref(false)
const query = ref("")
const generate = async () => {
	query.value = new URLSearchParams(badgeData).toString()
	preview.value = true;
}

import dayjs from 'dayjs';
import { v4 } from "uuid";

const { $socket } = useNuxtApp()
const hits: Object[] = ref([])


if ($socket){
	if ($socket.disconnected){
		$socket.connect()
	}
	$socket.on("hit", (url: string) => {
		hits.value.unshift({
			uuid: v4().toString(),
			time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
			url: url
		})
	});
}

onBeforeRouteLeave(() => {
	$socket.disconnect();
})
</script>

<template>
	<div class="flex-grow-1 d-flex mb-5">
		<div class="w-100 d-flex flex-column gap-5">
			<div class="bg-body-secondary">
				<div class="container py-5 ">
					<div class="mb-5 animate__animated animate__fadeIn">
						<h1 class="display-1 fw-bold">
							Hits Counter<span class="h-100 bg-white d-inline-block ms-3"
							                   style="width: 40px; height: 1rem !important;"> </span>
						</h1>
						<p class="fw-lighter h5">
							Create a badge to track visits on your websites / GitHub Profile / GitHub Repo / anything that can host a image, no JavaScript requirement (i.e. Google Analytics).
						</p>
						<p class="fw-lighter h5 my-3 d-flex align-items-center gap-2">
							A Badge like this <img src="https://hitscounter.dev/api/hit?url=https%3A%2F%2Fhitscounter.dev&label=Visitors&icon=heart-fill&color=%23ff7575" alt="Badge">
						</p>
					</div>
					<p class="text-muted animate__animated animate__fadeIn">
						Due to the recent close down of
						<a href="https://github.com/gjbae1212/hit-counter">hits.seeyoufarm.com</a>, I've decided to recreate one based on it. <br>Thanks <a href="https://github.com/gjbae1212">@gjbae1212</a> for the hardworking.
					</p>
				</div>
			</div>

			<div class="d-flex flex-column gap-3 align-items-center container" id="createBadgeForm">
				<h4 class="mb-4 text-center">Create Your Badge</h4>
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
				<div>
					<button class="btn bg-secondary w-100 rounded-3 btn-lg border fw-bold"
					        @click="generate()"
					        :disabled="!badgeData.url">
						Generate
					</button>
				</div>
				<Transition name="page">
					<Preview v-if="preview" :params="query"></Preview>
				</Transition>
			</div>
			<div class="container">
				<hr class="mb-5">
				<h4 class="mb-4 text-center">
					Live Hits of all URLs
				</h4>
				<div class="card rounded-3 text-start overflow-scroll" style="height: 400px">
					<div class="card-body">
						<div v-if="hits.length === 0" class="text-muted">
							Waiting...
						</div>
						<div v-for="hit in hits" :key="hit.uuid">
							{{ hit.time }}: <strong>{{ hit.url }}</strong>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

</style>