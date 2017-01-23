<template>
    <div class="columns">
        <div class="column is-8">
            <h1>Main application</h1>
            <ez-graph :graph="currentGraph"></ez-graph>
        </div>
        <div class="column is-4">
            <ez-menu></ez-menu>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                currentGraph: null
            }
        },
        mounted() {
            console.log('Application Component mounted.');
            this.currentGraph = new GraphColorator(EzGraph.sampleGraph()).color();
        }
    }
</script>
<style>
    h1 {
        opacity: 0.5;
        font-size: 1em;
        position: absolute;
        left: 10px;
        top: 5px;
        z-index: 999;
    }
</style>