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
                            <i :class="['fa pull-right', { 'fa-plus-circle': !getNode(nodeId).editMode }, { 'fa-times-circle-o': getNode(nodeId).editMode }]"
                                style="color: #41b883; cursor: pointer" title="Add an edge" @click="toggleAddEdgeMode(nodeId)">
                        </th>
                        <!--Directed edges TODO <i class="fa fa-arrow-right pull-right" style="color: #41b883;">-->
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
                            <p class="control has-addons" v-else> // TODO
                                <span class="select">
                                    <select v-model="relationship.node.edgeToAdd">
                                        <option v-for="node in relationship.node.remainingNodes" :value="node.id">{{ node.id }}</option>
                                    </select>
                                    <!--<input class="input is-expanded" type="text" placeholder="Target Node identifier" v-model="relationship.node.edgeToAdd">-->
                                    <a class="button is-primary" @click="addEdge(nodeId, relationship.node)">
                                        Add
                                    </a>
                                </span>
                            </p>
                        </td>
                    </tr>
                </template>
                <tr v-show="addNodeMode">
                    <th style="padding: 0.75em 0.75em 0px;">
                        <p class="control has-addons">
                            <input class="input is-expanded" type="text" placeholder="Node identifier" v-model="nodeToAddLabel">
                            <a class="button is-primary" @click="addNode">
                                Add
                            </a>
                        </p>
                    </th>
                    <td>
                        <p class="control has-addons">
                            <span class="select">
                                <select v-model="nodeToAddTarget">
                                    <option v-for="node in graph.nodes" :value="node">{{ node.id }}</option>
                                </select>
                            </span>
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-show="graphIsEmpty" class="has-text-centered title is-5">No nodes</div>
        <a class="fab" @click="toggleAddNodeMode">
            <i class="fa fa-plus" v-show="!addNodeMode"></i>
            <i class="fa fa-close" v-show="addNodeMode"></i>
            <span>Add a node</span>
        </a>
    </div>
</template>
<script>
    export default {
        computed: {
            graphIsEmpty() {
                return Object.keys(this.graph.relationships).length == 0;
            }
        },
        data() {
            return {
                graph: EzGraph.sampleGraph(),
                addNodeMode: false,
                nodeToAddLabel: '',
                nodeToAddTarget: null
            }
        },
        methods: {
            getNode(nodeId) {
                return this.graph.nodes.filter(n => n.id == nodeId)[0];
            },
            toggleAddNodeMode() {
                this.addNodeMode = !this.addNodeMode;
                if (!this.addNodeMode) { // Cancel
                    this.nodeToAddLabel = '';
                } else {
                    // Scroll to bottom
                    setTimeout(() => {
                        let parentTabsComponent = this.$parent.$parent.$refs;
                        $(parentTabsComponent.tabsContent).animate({
                            scrollTop: 999999
                        });
                    }, 1);
                }
            },
            addNode() {
                if (this.nodeToAddLabel == '' || this.nodeToAddTarget == null) {
                    Toastr.error('Node identifier or target cannot be empty !');
                    return;
                }
                if (this.graph.nodeExists(new Node(this.nodeToAddLabel))) {
                    Toastr.error('Node already exists !');
                    return;
                }
                this.graph.link(new Node(this.nodeToAddLabel)).to(this.nodeToAddTarget);
                this.nodeToAddLabel = '';
                this.nodeToAddTarget = null;
                this.toggleAddNodeMode();
            },
            toggleAddEdgeMode(nodeId) {
                let node = this.getNode(nodeId);
                node.editMode = !node.editMode;

                if (node.editMode) {
                    // Temporary
                    let AddEdgeNode = new Node('AddEdgeNode');

                    let isInRelationshipsArray = (n) => {
                        for (let i = 0; i < this.graph.relationships[nodeId].length; i++) {
                            let rel = this.graph.relationships[nodeId][i]; 
                            if (rel.node.id == n.id) return true;
                        }
                        return false;
                    }
                    AddEdgeNode.remainingNodes = this.graph.nodes.filter(n => !isInRelationshipsArray(n));
                   
                    this.graph.relationships[nodeId].push({
                        isDirected: false,
                        node: AddEdgeNode
                    })
                } else {
                    for (let i = 0; i < this.graph.relationships[nodeId].length; i++) {
                        let id = this.graph.relationships[nodeId][i].node.id;
                        if (id == 'AddEdgeNode') {
                            this.graph.relationships[nodeId].splice(i, 1);
                            break;
                        }
                    }

                }

            },
            addEdge(fromNodeId, toNode) {
                console.log('From ', fromNodeId, 'To', toNode);
            }
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