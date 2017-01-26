import Node from './Node';
import Edge from './Edge';
import NodeLinker from './NodeLinker';
import Algorithm from '../Algorithms/Algorithm';

export default class Graph {
    nodes: Node[] = [];
    edges: Edge[] = [];
    relationships: RelationshipsMap = {};
    title: string = 'New graph';

    link(node: Node): NodeLinker {
        return new NodeLinker(node, this);
    }

    addEdge(edge: Edge): void {
        this.edges.push(edge);
        if (!this.nodeExists(edge.fromNode)) this.nodes.push(edge.fromNode);
        if (!this.nodeExists(edge.toNode)) this.nodes.push(edge.toNode);
    }

    addRelationship(fromNode: Node, relationship: Relationship): void {
        if (!this.relationships[fromNode.id]) this.relationships[fromNode.id] = [];
        this.relationships[fromNode.id].push(relationship);
    }

    edgeExists(edge: Edge): Edge {
        for (let e of this.edges) {
            if (e.equals(edge))
                return e;
        }
        return null;
    }

    nodeExists(node: Node): Node {
        for (let n of this.nodes) {
            if (n.equals(node))
                return n;
        }
        return null;
    }

    areNodesAdjacent(nodeA: Node, nodeB: Node): boolean {
        for (let e of this.edges) {
            if ((e.fromNode.equals(nodeA) && e.toNode.equals(nodeB)) || (e.fromNode.equals(nodeB) && e.toNode.equals(nodeA))) {
                return true;
            }
        }
        return false;
    }

    apply(algorithm: Algorithm): Graph {
        algorithm.graph = this;
        return algorithm.apply();
    }

}

interface RelationshipsMap {
    [key: string]: Relationship[];
}

class Relationship {
    node: Node;
    isDirected: boolean;
}