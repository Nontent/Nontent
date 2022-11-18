<template>
    <div class="grid grid-cols-3 gap-1 box-border h-16 w-128 p-4 border-4 mx-2 my-2 border-black">
        <span class="justify-center font-bold">
            nontent.
        </span>
        <div class="space-x-8 place-self-center">
            <div class="inline" v-for="(link) in links" :key="link.name">
                <nuxt-link :to="link.link">
                    {{ link.name }}
                </nuxt-link>
            </div>
        </div>
        <div class="space-x-8 place-self-end">
            <div class="bg-amber-400 align-top">
                <CogIcon class="h-8 w-8 text-white"/>
            </div>
        </div>

</div>
</template>

<script>
import { CogIcon } from '@heroicons/vue/24/solid'
export default {
    data() {
        return {
            links: [
                {
                    name: 'home',
                    link: '/'
                },
                {
                    name: 'social reports',
                    link: '/social-reports'
                },
                {
                    name: 'profile',
                    link: '/profile'
                }
            ],
            listButtons: [
                {
                    name: 'settings',
                    link: '/settings'
                },
                {
                    name: 'sign out',
                    link: '/sign-out'
                }
            ]
        }
    },
    components: {
        CogIcon
    }
}
</script>

<style>

</style>