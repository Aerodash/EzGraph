import Node from './Node';

export default class Edge {
    fromNode: Node;
    toNode: Node;
    weight: number;

    constructor(fromNode: Node, toNode: Node) {
        this.fromNode = fromNode;
        this.toNode = toNode;
    }

    equals(other: Edge) {
        return this.fromNode.equals(other.fromNode)
            && this.toNode.equals(other.toNode)
    }
}