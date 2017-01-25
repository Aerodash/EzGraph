import Graph from '../../Core/Graph';
import Node from '../../Core/Node';
import Algorithm from '../Algorithm';

const BLUE = 'lightblue';
const RED = 'tomato';
const GREEN = 'lightgreen';
const YELLOW = 'yellow';

const COLORS = [BLUE, RED, GREEN, YELLOW];

export default class GraphColoration extends Algorithm {
    
    constructor(graph?: Graph) {
        super(graph);
    }

    // Welsh Powell
    apply(): Graph {

        // Sort the node
        let sortedNodes: Node[] = this.graph.nodes.sort((n1: Node, n2: Node) => {
            return n2.degree - n1.degree;
        })

        let colorCounter = 0,
            coloredNodes: Node[] = [];

        // is node adjacent to a colored node with the current color
        let isNodeAdjacentToColoredNodeWithCurrentColor = (node: Node) => {
            for (let coloredNode of coloredNodes) {
                if (coloredNode.color == COLORS[colorCounter] && this.graph.areNodesAdjacent(node, coloredNode))
                    return true;
            }
            return false;
        };

        while (coloredNodes.length != sortedNodes.length) { // All nodes haven't been colored yet
            for (let i = 0; i < sortedNodes.length; i++) {
                let node = sortedNodes[i];

                if (node.color != null) continue; // If node already colored go on

                if (!isNodeAdjacentToColoredNodeWithCurrentColor(node)) {
                    node.color = COLORS[colorCounter];
                    coloredNodes.push(node);
                }
            }
            colorCounter++; // Change current color
        }

        let coloredGraph = new Graph();
        coloredGraph.nodes = coloredNodes;
        coloredGraph.edges = this.graph.edges;
        return coloredGraph;
    }

}