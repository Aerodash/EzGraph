<template>
    <div class="columns is-marginless">
        <div class="column is-8 is-paddingless">
            <h1>{{currentGraphTitle}}</h1>
            <ez-graph :graph="currentGraph"></ez-graph>
        </div>
        <div class="column is-4 is-paddingless" v-show="!isCreatingGraph">
            <ez-main-menu :graph="currentGraph"></ez-menu>
        </div>
        <div class="column is-4 is-paddingless" v-show="isCreatingGraph">
            <ez-creation-menu :graph="currentGraph"></ez-creation-menu>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                logoGraph: EzGraph.logoGraph(),
                currentGraph: {
                    title: 'New graph',
                    nodes: [],
                    edges: []
                },
                isCreatingGraph: false
            }
        },
        computed: {
            currentGraphTitle() {
                if (this.isCreatingGraph)
                    return this.currentGraph.title + ' (' + this.currentGraph.nodes.length + ' Nodes, ' + this.currentGraph.edges.length + ' Edges)'
                else 
                    return '';
            }
        },
        mounted() {
            this.currentGraph = this.logoGraph;
            this.currentGraph.title = '';

            Event.listen('ez-createGraph', (graphData) => {
                let graph = new Graph();
                graph.title = graphData.title;
                // graphData.nodesColor & graphData.edgesColor
                this.currentGraph = graph;
                this.isCreatingGraph = true;
            });
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