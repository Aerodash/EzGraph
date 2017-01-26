import Node from './Node';

export default class Edge {
    fromNode: Node;
    toNode: Node;
    weight: number;
    isDirected: boolean = false;

    constructor(fromNode: Node, toNode: Node, isDirected?: boolean) {
        this.fromNode = fromNode;
        this.toNode = toNode;
        this.isDirected = isDirected;
    }

    equals(other: Edge) {
        return this.fromNode.equals(other.fromNode)
            && this.toNode.equals(other.toNode)
    }
}