<template>
    <div>
        <h1 class="title is-3">Overview</h1>
        <table class="table is-bordered">
            <thead>
                <tr>
                    <th>Node</th>
                    <th>Linked to</th>
                </tr>
            </thead>
            <tbody ref="tableBody">
                <template v-for="(relationships, nodeId) in graph.relationships">
                    <tr>
                        <th :rowspan="relationships.length">
                            {{nodeId}}
                        </th>
                        <td>
                            <i class="fa fa-minus" style="color: #41b883;"></i>&nbsp;
                            <span class="pull-right">{{ relationships[0].node.id }}</span>
                        </td>
                    </tr>
                    <tr v-for="(relationship, index) in relationships" v-show="index > 0">
                        <td>
                            <template v-if="relationship.node.id != 'AddEdgeNode'">
                                <i class="fa fa-minus" style="color: #41b883;"></i>&nbsp;
                                <span class="pull-right">{{ relationship.node.id }}</span>
                            </template>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <div v-show="graphIsEmpty" class="has-text-centered title is-5">No nodes</div>
    </div>
</template>
<script>
    export default {
        props: ['graph'],
        computed: {
            graphIsEmpty() {
                return !this.graph.relationships ? true : Object.keys(this.graph.relationships).length == 0;
            }
        },
        methods: {
            
        }
    }
</script>
<style scoped>
    .fab {
        padding: 0 12px;
        display: inline-block;
        color: #fff;
        position: absolute;
        bottom: 10px;
        right: 512px;
        overflow: hidden;
        z-index: 1;
        height: 50px;
        line-height: 54px;
        background-color: #41b883;
        border-radius: 5%;
        transition: .3s;
        cursor: pointer;
        vertical-align: middle;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
    }
    
    .fab:hover {
        box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -1px rgba(0, 0, 0, 0.2);
    }
    
    .fab>i {
        width: inherit;
        display: inline-block;
        text-align: center;
        color: #fff;
        font-size: 1.6rem;
        line-height: 54px;
    }
</style>