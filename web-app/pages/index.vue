<template>
	<div>
		<h1>Bienvenue!</h1>
		<v-card>
			<v-card-text>
				Connecte toi à tes différents profils!
				<v-icon>mdi-arrow-right</v-icon>
				<v-btn color="primary" icon>
					<v-icon>mdi-twitter</v-icon>
				</v-btn>
				<v-btn color="primary" icon>
					<v-icon>mdi-reddit</v-icon>
				</v-btn>
				<v-btn color="primary" icon>
					<v-icon>mdi-facebook</v-icon>
				</v-btn>
				<v-btn color="primary" icon>
					<v-icon>mdi-instagram</v-icon>
				</v-btn>
				<v-btn color="primary" icon>
					<v-icon>mdi-linkedin</v-icon>
				</v-btn>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>

export default {
	name: 'IndexPage',
	methods: {},
}
</script>
