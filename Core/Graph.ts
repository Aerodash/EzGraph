import Node from './Node';
import Edge from './Edge';
import NodeLinker from './NodeLinker';
import Algorithm from '../Algorithms/Algorithm';

export default class Graph {
    nodes: Node[] = [];
    edges: Edge[] = [];
    //relationships: RelationshipsMap[] = [];
    relationships: RelationshipsMap = {};
    title: string = '';

    link(node: Node): NodeLinker {
        return new NodeLinker(node, this);
    }

    addNode(node: Node): void {
        this.nodes.push(node);
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

class RelationshipsMap {
    [key: string]: Relationship[];
    keyName?: any;
}

class Relationship {
    node: Node;
    isDirected: boolean;
}
/*
FAIL UNNECESSARY HARD CODE

Template:

<!--
<div v-for="relationshipsMap in graph.relationships">
    <tr>
        <th :rowspan="relationshipsMap[relationshipsMap.keyName].length">{{relationshipsMap.keyName}}</th>
        <td>
            <i class="fa fa-minus" style="color: #41b883;"></i>&nbsp;
            <span class="pull-right">{{ relationshipsMap[relationshipsMap.keyName][0].node.id }}</span>
        </td>
    </tr>
    <tr v-for="(relationship, index) in relationshipsMap[relationshipsMap.keyName]" v-show="index > 0">
        <td>
            <i class="fa fa-minus" style="color: #41b883;"></i>&nbsp;
            <span class="pull-right">{{ relationship.node.id }}</span>
        </td>
    </tr>
</div>-->

addRelationship(fromNode: Node, relationship: Relationship): void {
    let foundRelationShips: RelationshipsMap[] = this.relationships.filter(map => map.hasOwnProperty(fromNode.id));
        if (foundRelationShips.length == 0) {
            let newRel: RelationshipsMap = {};
            newRel[fromNode.id] = [relationship];
            newRel.keyName = fromNode.id;
            this.relationships.push(newRel);
        } else {
            for (let rel of this.relationships) {
                if (rel.hasOwnProperty(fromNode.id)) {
                    rel[fromNode.id].push(relationship);
                    break;
                }
            }
    }
}
*/