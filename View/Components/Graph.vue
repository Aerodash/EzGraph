<template>
    <div>
        <div ref="graph" id="cy">
        </div>
    </div>
</template>
<script>
    export default {
        props: ['graph'],
        data() {
            return {
                graphData: null,
                cy: null
            }
        },
        mounted() {
            console.log('Graph Component mounted.')
        },
        watch: {
            graph(newValue) {
                if (!this.graphData) {// First time
                    this.cy = window.cy = Cytoscape.createFromGraph(newValue, this.$refs.graph);
                }
            }
        }
    }
</script>
<style>
    #cy {
        width: 100%;
        height: 100%;
    }
</style>