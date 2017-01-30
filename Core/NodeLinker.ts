import Graph from './Graph';
import Node from './Node';
import Edge from './Edge';

export default class NodeLinker {
    fromNode: Node;
    toNode: Node;
    graph: Graph;

    constructor(fromNode: Node | string, graph: Graph) {
        this.graph = graph;
        this.fromNode = this.nodeify(fromNode);
    }

    to(toNode: Node | string, isDirected?: boolean) {
        this.toNode = this.nodeify(toNode);
        let edge = new Edge(this.fromNode, this.toNode, isDirected);
        if (!this.graph.edgeExists(edge)) {
            edge.fromNode.degree++;
            edge.toNode.degree++;
            this.graph.addEdge(edge);
            this.graph.addRelationship(this.fromNode, { node: this.toNode, isDirected: edge.isDirected })
            if (!isDirected) {
                this.graph.addRelationship(this.toNode, { node: this.fromNode, isDirected: edge.isDirected })
            }
        }
        return this;
    }

    findNodeById(id: string) : Node {
        return this.graph.nodes.filter((n) => n.id == id)[0];
    }

    nodeify(node: Node | string) : Node {
        return !(node instanceof Node) ? this.findNodeById(node as string) : node as Node
    }
}