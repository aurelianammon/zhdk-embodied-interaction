<template>
    <div>
        <button @click="refresh" >Update</button>
        <div class="wrapper">
            <div class="tile" v-for="element in content" :key="element.id" :style="{ background: element.color }">
                <h1>{{ element.text }}</h1>
                <img :src="element.image" alt="image">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            listOfAPIs: [
                "http://10.128.130.172:3000"
            ],
            content: []
        }
    },
    async fetch() {
        this.content = []
        for (const api of this.listOfAPIs) {
            const text = await this.$http.$get(api + "/text")
            const color = await this.$http.$get(api + "/color")
            const image = await this.$http.$get(api + "/image")
            var tile = {
                text: text.text,
                color: color.color,
                image: image.image
            }
            this.content.push(tile)
        }
    },
    methods: {
        refresh: function (event) {
            for (const api of this.listOfAPIs) {
                this.$http.$get(api + "/update")
            }
            this.$fetch()
        }
    }
}
</script>

<style>
body {
    width: 100%;
    margin: 0;
}
button {
    margin: 1vw;
    margin-bottom: 0;
}
.tile {
    width: 20.6%;
    height: 23vw;
    float: left;
    overflow: hidden;
    margin: 1vw;
    padding: 10px;
}
.tile h1 {
    font-size: 20px;
    margin: 0;
    padding: 0;
    position: absolute;
    width: 20.6vw;
}
.tile img {
    width: 100%;
    object-fit: cover;
    height: inherit;
}
</style>
