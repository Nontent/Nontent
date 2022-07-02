<template>
	<div>
		<v-carousel v-model="model">
			<v-carousel-item
				v-for="(item, index) in connectionItems" :key="index"
			>
				<v-form>
					
				</v-form>	
			</v-carousel-item>
		<v-carousel>		
	</div>
</template>
<script>
export default {
	name: 'connection',
	data() {
		return {
			model: 0,
			connectionItems: [
				{ nameBtn: 'Connection', title: 'Welcome back!' },
				{ namebtn: 'Register', title: 'Register now!' },
			],
		}
	},
}
</script>
<style>
</style>