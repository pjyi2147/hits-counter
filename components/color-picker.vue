<script setup lang="ts">
const predefinedColors = {
	"blue-100": "#cfe2ff",
	"blue-200": "#9ec5fe",
	"blue-300": "#6ea8fe",
	"blue-400": "#3d8bfd",
	"blue-500": "#0d6efd",
	"blue-600": "#0a58ca",
	"blue-700": "#084298",
	"blue-800": "#052c65",
	"blue-900": "#031633",
	"indigo-100": "#e0cffc",
	"indigo-200": "#c29ffa",
	"indigo-300": "#a370f7",
	"indigo-400": "#8540f5",
	"indigo-500": "#6610f2",
	"indigo-600": "#520dc2",
	"indigo-700": "#3d0a91",
	"indigo-800": "#290661",
	"indigo-900": "#140330",
	"purple-100": "#e2d9f3",
	"purple-200": "#c5b3e6",
	"purple-300": "#a98eda",
	"purple-400": "#8c68cd",
	"purple-500": "#6f42c1",
	"purple-600": "#59359a",
	"purple-700": "#432874",
	"purple-800": "#2c1a4d",
	"purple-900": "#160d27",
	"pink-100": "#f7d6e6",
	"pink-200": "#efadce",
	"pink-300": "#e685b5",
	"pink-400": "#de5c9d",
	"pink-500": "#d63384",
	"pink-600": "#ab296a",
	"pink-700": "#801f4f",
	"pink-800": "#561435",
	"pink-900": "#2b0a1a",
	"red-100": "#f8d7da",
	"red-200": "#f1aeb5",
	"red-300": "#ea868f",
	"red-400": "#e35d6a",
	"red-500": "#dc3545",
	"red-600": "#b02a37",
	"red-700": "#842029",
	"red-800": "#58151c",
	"red-900": "#2c0b0e",
	"orange-100": "#ffe5d0",
	"orange-200": "#fecba1",
	"orange-300": "#feb272",
	"orange-400": "#fd9843",
	"orange-500": "#fd7e14",
	"orange-600": "#ca6510",
	"orange-700": "#984c0c",
	"orange-800": "#653208",
	"orange-900": "#331904",
	"yellow-100": "#fff3cd",
	"yellow-200": "#ffe69c",
	"yellow-300": "#ffda6a",
	"yellow-400": "#ffcd39",
	"yellow-500": "#ffc107",
	"yellow-600": "#cc9a06",
	"yellow-700": "#997404",
	"yellow-800": "#664d03",
	"yellow-900": "#332701",
	"green-100": "#d1e7dd",
	"green-200": "#a3cfbb",
	"green-300": "#75b798",
	"green-400": "#479f76",
	"green-500": "#198754",
	"green-600": "#146c43",
	"green-700": "#0f5132",
	"green-800": "#0a3622",
	"green-900": "#051b11",
	"teal-100": "#d2f4ea",
	"teal-200": "#a6e9d5",
	"teal-300": "#79dfc1",
	"teal-400": "#4dd4ac",
	"teal-500": "#20c997",
	"teal-600": "#1aa179",
	"teal-700": "#13795b",
	"teal-800": "#0d503c",
	"teal-900": "#06281e",
	"cyan-100": "#cff4fc",
	"cyan-200": "#9eeaf9",
	"cyan-300": "#6edff6",
	"cyan-400": "#3dd5f3",
	"cyan-500": "#0dcaf0",
	"cyan-600": "#0aa2c0",
	"cyan-700": "#087990",
	"cyan-800": "#055160",
	"cyan-900": "#032830",
	"gray-100": "#f8f9fa",
	"gray-200": "#e9ecef",
	"gray-300": "#dee2e6",
	"gray-400": "#ced4da",
	"gray-500": "#adb5bd",
	"gray-600": "#6c757d",
	"gray-700": "#495057",
	"gray-800": "#343a40",
	"gray-900": "#212529",
	"white": "#fff",
	"black": "#000",
}

const selectedColor = ref("#198754")

const emits = defineEmits(['color'])

watch(selectedColor, () => {
	emits('color', selectedColor)
}, {
	immediate: true
})

</script>

<template>
	<div class="btn-group">
		<button type="button" class="btn bg-dark w-100 rounded-3 text-start border d-flex align-items-center gap-2 "
		        style="height: 58px"
		        data-bs-auto-close="outside"
		        data-bs-toggle="dropdown" aria-expanded="false">
			Color

			<span class="ms-auto">{{ selectedColor }}</span>
			<span class=" p-2 border"
			      style="width: 30px; border-radius: 100px"
			      :style="'background-color: '+selectedColor">

					</span>
		</button>
		<ul class="dropdown-menu w-100 shadow" style="max-height: 300px">
			<li>
				<div class="px-3 py-2 d-flex align-items-center gap-3">
					<label style="word-break: keep-all">
						Color
					</label>
					<input class="form-control form-control-sm rounded-3"
					       v-model="selectedColor"
					       type="color">
				</div>
			</li>
			<li><hr class="dropdown-divider"></li>
			<li v-for="color in predefinedColors">
				<a class="dropdown-item d-flex align-items-center"
				   @click="selectedColor = color"
				   role="button">
					<small>
						{{color}}
					</small>
					<span class="p-2 border ms-auto"
					      style="width: 30px; border-radius: 100px"
					      :style="'background-color: '+color">
					</span>
				</a>
			</li>
		</ul>
	</div>
</template>

<style scoped>
.dropdown-menu{
	overflow: scroll;
}
</style>