import Node from './Node';
import Edge from './Edge';
import NodeLinker from './NodeLinker';

export default class Graph {
    nodes: Node[] = [];
    edges: Edge[] = [];

    link(node: Node) {
        return new NodeLinker(node, this);
    }

    addEdge(edge: Edge) {
        this.edges.push(edge);
        if (!this.nodeExists(edge.fromNode)) this.nodes.push(edge.fromNode);
        if (!this.nodeExists(edge.toNode)) this.nodes.push(edge.toNode);
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

    areNodesAdjacent(nodeA: Node, nodeB: Node) {
        for (let e of this.edges) {
            if ((e.fromNode.equals(nodeA) && e.toNode.equals(nodeB)) || (e.fromNode.equals(nodeB) && e.toNode.equals(nodeA))) {
                return true;
            }
        }
        return false;
    }

}