import Edge from './Edge'
import Graph from './Graph'
import Node from './Node'
import NodeLinker from './NodeLinker'
import GraphColorator from '../Algorithms/ColorationAlgorithm/GraphColorator'
export default {
    Edge, Graph, Node, NodeLinker, GraphColorator,
    sampleGraph() {
        let graph = new Graph();

        let A = new Node("A");
        let B = new Node("B");
        let C = new Node("C");
        let D = new Node("D");
        let E = new Node("E");
        let F = new Node("F");
        let G = new Node("G");
        let H = new Node("H");
        let Y = new Node("Y");
        let Z = new Node("Z");

        graph.link(A).to(Z).to(Y).to(B).to(C);
        graph.link(B).to(D).to(E).to(F);
        graph.link(C).to(Y).to(D).to(G);
        graph.link(D).to(E).to(G);
        graph.link(E).to(F).to(H);
        graph.link(G).to(Y).to(H);
        return graph;
    }
}