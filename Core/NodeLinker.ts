import Graph from './Graph';
import Node from './Node';
import Edge from './Edge';

export default class NodeLinker {
    fromNode: Node;
    toNode: Node;
    graph: Graph;

    constructor(fromNode: Node, graph: Graph) {
        this.fromNode = fromNode;
        this.graph = graph;
    }

    to(toNode: Node, isDirected?: boolean) {
        this.toNode = toNode;
        let edge = new Edge(this.fromNode, this.toNode, isDirected);
        if (!this.graph.edgeExists(edge)) {
            edge.fromNode.degree++;
            edge.toNode.degree++;
            this.graph.addEdge(edge);
            this.graph.addRelationship(this.fromNode, { node: toNode, isDirected: edge.isDirected })
            if (!isDirected) {
                this.graph.addRelationship(toNode, { node: this.fromNode, isDirected: edge.isDirected })
            }
        }
        return this;
    }
}