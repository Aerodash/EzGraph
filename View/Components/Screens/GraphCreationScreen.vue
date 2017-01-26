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
                <div v-for="(relationships, nodeId) in graph.relationships">
                    <tr>
                        <th :rowspan="relationships.length">{{nodeId}}</th>
                        <!--Directed edges TODO <i class="fa fa-arrow-right pull-right" style="color: #41b883;">-->
                        <td>
                            <i class="fa fa-minus" style="color: #41b883;"></i>&nbsp;
                            <span class="pull-right">{{ relationships[0].node.id }}</span>
                        </td>
                    </tr>
                    <tr v-for="(relationship, index) in relationships" v-show="index > 0">
                        <td>
                            <i class="fa fa-minus" style="color: #41b883;"></i>&nbsp;
                            <span class="pull-right">{{ relationship.node.id }}</span>
                        </td>
                    </tr>
                </div>
            </tbody>
        </table>
        <a class="fab" title="Add a node">
            <i class="fa fa-plus">
        </a>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                graph: EzGraph.sampleGraph()
            }
        },
        mounted() {
            // Fix <table>
            let $trs = $(this.$refs.tableBody).find('tr');
            $(this.$refs.tableBody).html('');
            $(this.$refs.tableBody).append($trs);
        }
    }
</script>
<style scoped>
    .fab {
        display: inline-block;
        color: #fff;
        position: absolute;
        bottom: 10px;
        right: 10px;
        overflow: hidden;
        z-index: 1;
        width: 50px;
        height: 50px;
        line-height: 54px;
        padding: 0;
        background-color: #41b883;
        border-radius: 50%;
        transition: .3s;
        cursor: pointer;
        vertical-align: middle;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
    }

    .fab:hover {
        box-shadow: 0 3px 3px 0 rgba(0,0,0,0.14), 0 1px 7px 0 rgba(0,0,0,0.12), 0 3px 1px -1px rgba(0,0,0,0.2);
    }

    .fab > i {
        width: inherit;
        display: inline-block;
        text-align: center;
        color: #fff;
        font-size: 1.6rem;
        line-height: 54px;
    }
</style>