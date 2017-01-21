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

    to(toNode: Node) {
        this.toNode = toNode;
        let edge = new Edge(this.fromNode, this.toNode);
        if (!this.graph.edgeExists(edge)) {
            edge.fromNode.degree++;
            edge.toNode.degree++;
            this.graph.addEdge(edge);
        }
        return this;
    }
}