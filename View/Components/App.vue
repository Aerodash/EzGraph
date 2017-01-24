<template>
    <div class="columns is-marginless">
        <div class="column is-8 is-paddingless">
            <h1>Main application</h1>
            <ez-graph :graph="currentGraph"></ez-graph>
        </div>
        <div class="column is-4 is-paddingless">
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
            this.currentGraph = EzGraph.sampleGraph();//new GraphColorator().color();
        }
    }
</script>
<style scoped>
    h1 {
        opacity: 0.5;
        font-size: 1em;
        position: absolute;
        left: 10px;
        top: 5px;
        z-index: 999;
    }

    .column.is-4 {
        background: #f5f5f5;
        border-left: 3px solid #41b883;
    }

    .column.is-8 {
        padding-right: 0px;
    }
</style>