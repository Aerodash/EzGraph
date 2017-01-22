<template>
    <div>
        <h1>Main application</h1>
        <div id="cy"></div>
    </div>
</template>
<script>
    export default {
        mounted() {
            console.log('Application Component mounted.');
            let graph = new GraphColorator(EzGraph.sampleGraph()).color();
            var cy = window.cy = Cytoscape.createFromGraph(graph, document.getElementById('cy'));
        }
    }
</script>