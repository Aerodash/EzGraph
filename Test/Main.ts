import Graph from '../Core/Graph';
import Node from '../Core/Node';
import GraphColorator from '../Algorithms/ColorationAlgorithm/GraphColorator';

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

console.log(JSON.stringify(graph));

console.log(JSON.stringify(new GraphColorator(graph).color()));