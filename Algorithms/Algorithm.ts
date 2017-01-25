import Graph from '../Core/Graph';

abstract class Algorithm {
    graph: Graph;
    constructor(graph?: Graph) {
        this.graph = graph;
    }

    abstract apply(): Graph;
}

export default Algorithm;