<script setup lang="ts" async>
import icons from 'bootstrap-icons/font/bootstrap-icons.json'
import {computed} from "vue";
const searchString = ref("")
const selectedIcon = ref("github")
const loadCount = ref(100)

const computedIcons = computed(() => {
	return searchString.value ? Object.keys(icons).filter(x => x.includes(searchString.value)).slice(0, loadCount.value)
		: Object.keys(icons).slice(0, loadCount.value)
})

onMounted(() => {
	const observer = new IntersectionObserver(() => {
		if (computedIcons.value.length >= 100){
			loadCount.value += 100
		}
	}, {
		rootMargin: "0px",
		threshold: 1.0,
	})
	const e = document.querySelector('.icon-loadMore');
	observer.observe(e)
})

const emits = defineEmits(['icon'])

watch(selectedIcon, () => {
	emits('icon', selectedIcon)
}, {
	immediate: true
})

</script>

<template>
	<div class="btn-group">
		<button type="button" class="btn bg-dark w-100 rounded-3 text-start border d-flex align-items-center"
		        style="height: 58px"
		        data-bs-toggle="dropdown"
		        data-bs-auto-close="outside"
		        aria-expanded="false">
			Icon
			<span class="badge ms-auto">
				<i class="bi  h5 mb-0" :class="'bi-' + selectedIcon"></i>
			</span>
		</button>
		<ul class="dropdown-menu w-100 shadow icon-dropdown" style="max-height: 300px">
			<li>
				<div class="px-3 py-2 d-flex align-items-center gap-3">
					<label>
						<i class="bi bi-search"></i>
					</label>
					<input class="form-control form-control-sm rounded-3" type="search" v-model="searchString">
				</div>
			</li>
			<li><hr class="dropdown-divider"></li>
			<li v-for="key in computedIcons">
				<a class="dropdown-item d-flex align-items-center gap-3"
				   @click="selectedIcon = key;"
				   role="button">
					<h5 class="mb-0">
						<i class="bi" :class="'bi-' + key"></i>
					</h5>
					<small>{{ key }}</small>
				</a>
			</li>
			<li class="icon-loadMore"></li>
		</ul>
	</div>

</template>

<style scoped>
.dropdown-menu{
	overflow: scroll;
}
</style>