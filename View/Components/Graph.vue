<template>
    <div style="position: relative">
        <div ref="graph" id="cy">
        </div>
        <div class="bar">
            <ul>
                <li :class="['bar-button', {'active' : isShowing(0)}]" @click="toggle(0)" title="Add a node">
                    <i class="fa fa-fw fa-circle"></i>
                </li>
                <li :class="['bar-button', {'active' : isShowing(1)}]" @click="toggle(1)" title="Add an edge">
                    <i class="fa fa-fw fa-minus"></i>
                </li>
            </ul>
        </div>
        <transition name="right-to-left-transition" enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
            <div class="little-window" v-if="isShowing(0)">
                <i class="fa fa-close" @click="close()"></i>
                <label class="label">Add a node</label>
                <p class="control">
                    <input class="input" type="text" placeholder="Node identifier" v-model="nodeToAddId" ref="addNodeInput">
                </p>
                <a class="button is-primary is-outlined pull-right" @click="addNode">Add</a>
            </div>
        </transition>
        <transition name="right-to-left-transition" enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
            <div class="little-window" v-if="isShowing(1)">
                <i class="fa fa-close" @click="close()"></i>
                <label class="label">Add an edge</label>
                <div class="control is-grouped">
                    <div class="control-label">
                        <label class="label">From</label>
                    </div>
                    <p class="control is-expanded">
                        <span class="select">
                            <select :disabled="graph.nodes.length == 0" v-model="fromNode">
                                <option v-show="graph.nodes.length != 0" v-for="node in graph.nodes">{{ node.id }}</option>
                            </select>
                        </span>
                    </p>
                    <div class="control-label">
                        <label class="label">To</label>
                    </div>
                    <p class="control is-expanded">
                        <span class="select">
                            <select :disabled="toNodeDisabled" v-model="toNode">
                                <option v-for="node in toNodeValues">{{ node.id }}</option>
                            </select>
                        </span>
                    </p>
                </div>
                <a class="button is-primary is-outlined pull-right" @click="addEdge">Add</a>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        props: ['graph', 'creationMode'],
        data() {
            return {
                graphData: null,
                cy: null,
                activeWindow: null,
                nodeToAddId: null,
                toNodeDisabled: true,
                toNodeValues: [],
                fromNode: null,
                toNode: null
            }
        },
        methods: {
            toggle(windowIndex) {
                this.activeWindow = windowIndex;
            },
            isShowing(windowIndex) {
                return this.activeWindow === windowIndex;
            },
            close() {
                this.activeWindow = null;
            },
            addNode() { // TODO Add in the middle of the graph and not on another graph (also highlight it)
                if (this.nodeToAddId == null || this.nodeToAddId == '') { 
                    Toastr.error('Node identifier is required !')
                    return;
                }
                if (this.graph.nodeExists(new Node(this.nodeToAddId))) {
                    Toastr.error('Node already exists !');
                    return;
                }
                let node = new Node(this.nodeToAddId);
                this.graph.addNode(node);
                this.cy.addNode(node); // Add to canvas
                this.nodeToAddId = null;
                this.$refs.addNodeInput.focus();
            },
            addEdge() {
                if (this.fromNode == null || this.fromNode == '') { 
                    Toastr.error('Source node is required !')
                    return;
                }
                if (this.toNode == null || this.toNode == '') { 
                    Toastr.error('Target node is required !')
                    return;
                }
                if (this.graph.edgeExistsBetween(this.fromNode, this.toNode)) {
                    Toastr.error('Edge already exists between ' + this.fromNode + ' and ' + this.toNode);
                    return;
                }
                this.graph.link(this.fromNode).to(this.toNode);
                this.cy.addEdge(this.fromNode, this.toNode); // Add to canvas
                this.fromNode = this.toNode = null;
            }
        },
        mounted() {
            console.log('Graph Component mounted.')
        },
        watch: {
            graph(newValue) {
                if (!this.graphData) { // First time
                    window.cy = this.cy = Cytoscape.createFromGraph(newValue, this.$refs.graph);
                    this.cy.center();
                }
            },
            fromNode(newValue) {
                this.toNodeDisabled = !(!!newValue);
                this.toNodeValues = this.graph.nodes.filter((n) => n.id != newValue);
            }
        }
    }
</script>
<style scoped>
    #cy {
        width: 100%;
        height: 100%;
    }
    
    .bar {
        position: absolute;
        top: 0px;
        right: 0px;
        border-left: 1px solid #ccc;
        background-color: #fff;
        width: 50px;
        height: 100%;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        z-index: 1;
    }
    
    .bar-button {
        height: 50px;
        border-bottom: 1px solid #ccc;
        padding: 15px 12px;
        cursor: pointer;
    }

    .bar-button.active {
        border-left: 3px solid #41b883;
        background-color: rgba(211, 211, 211, 0.4)
    }
    
    .bar-button>i {
        color: #41b883;
    }
    
    .bar-button:hover {
        background-color: rgba(211, 211, 211, 0.4)
    }
    
    .little-window {
        position: absolute;
        top: 5px;
        right: 55px;
        border: 1px solid #ccc;
        background-color: #fff;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        padding: 15px;
        animation-duration: 0.5s;
    }

    .little-window > i {
        position: absolute;
        top: 5px;
        right: 5px;
        font-size: 16px;
        color: #ccc;
        cursor: pointer;
    }
</style>