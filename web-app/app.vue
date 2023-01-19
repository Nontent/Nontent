<template>
	<div>
		<NuxtLayout>
			<MobileMenu class="visible md:hidden" />
			<NavBar class="hidden md:visible" />
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
