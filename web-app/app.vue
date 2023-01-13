<template>
	<div>
		<NuxtLayout>
			<MobileMenu class="visible md:invisible" />
			<NavBar class="invisible md:visible" />
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
<script>
export default {
	name: "App",
};
</script>
<style>
body {
	background-color: #f6f6eb;
}
</style>
