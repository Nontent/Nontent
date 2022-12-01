<template>
    <div>
        <h1 class="flex justify-center font-bold mt-11 text-5xl mb-11">nontent.</h1>
    <div class="container mx-auto self-center border-b-4 border-l-4 border-black pl-2 pb-1 outline-none mb-11">
        <form action="get">
                <label for="email">EMAIL: </label><input id="email" type="text" class="border-b-2 border-l-2 border-black pl-2 pb-1 outline-none" placeholder="EMAIL" />
        </form>
    </div>
    <div class="container mx-auto self-center border-b-4 border-l-4 border-black pl-2 pb-1 outline-none">
        <form action="get">
                <label for="email">PSWRD: </label><input id="email" type="text" class="border-b-2 border-l-2 border-black pl-2 pb-1 outline-none" placeholder="PASSWORD" />
        </form>
    </div>
    <div class="flex justify-center group mt-9">
        <button type="button" onclick="test" class="absolute h-10 w-28 border-2 border-black bg-cyan-900 text-white transition delay-100 ease-in-out hover:drop-shadow group-hover:bg-cyan-900">Login</button>
        <div class="relative translate-x-2 translate-y-4 -z-10 h-8 w-28 bg-black transition delay-100 ease-in-out group-hover:translate-y-2 group-hover:translate-x-0"></div>
    </div>
    <div class="flex justify-center group mt-9">
        <button type="button" onclick="test" class="absolute h-10 w-28 border-2 border-black bg-cyan-800 text-white transition delay-100 ease-in-out hover:drop-shadow group-hover:bg-cyan-800">Register</button>
        <div class="relative translate-x-2 translate-y-4 -z-10 h-8 w-28 bg-black transition delay-100 ease-in-out group-hover:translate-y-2 group-hover:translate-x-0"></div>
    </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>