var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
System.register("Core/Node", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Node;
    return {
        setters: [],
        execute: function () {
            Node = (function () {
                function Node(id) {
                    this.degree = 0;
                    this.id = id;
                }
                Node.prototype.equals = function (other) {
                    return other.id == this.id;
                };
                return Node;
            }());
            exports_1("default", Node);
        }
    };
});
System.register("Core/Edge", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Edge;
    return {
        setters: [],
        execute: function () {
            Edge = (function () {
                function Edge(fromNode, toNode, isDirected) {
                    this.isDirected = false;
                    this.fromNode = fromNode;
                    this.toNode = toNode;
                    this.isDirected = isDirected;
                }
                Edge.prototype.equals = function (other) {
                    return this.fromNode.equals(other.fromNode)
                        && this.toNode.equals(other.toNode);
                };
                return Edge;
            }());
            exports_2("default", Edge);
        }
    };
});
System.register("Core/NodeLinker", ["Core/Edge"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Edge_1, NodeLinker;
    return {
        setters: [
            function (Edge_1_1) {
                Edge_1 = Edge_1_1;
            }
        ],
        execute: function () {
            NodeLinker = (function () {
                function NodeLinker(fromNode, graph) {
                    this.fromNode = fromNode;
                    this.graph = graph;
                }
                NodeLinker.prototype.to = function (toNode, isDirected) {
                    this.toNode = toNode;
                    var edge = new Edge_1["default"](this.fromNode, this.toNode, isDirected);
                    if (!this.graph.edgeExists(edge)) {
                        edge.fromNode.degree++;
                        edge.toNode.degree++;
                        this.graph.addEdge(edge);
                        this.graph.addRelationship(this.fromNode, { node: toNode, isDirected: edge.isDirected });
                        if (!isDirected) {
                            this.graph.addRelationship(toNode, { node: this.fromNode, isDirected: edge.isDirected });
                        }
                    }
                    return this;
                };
                return NodeLinker;
            }());
            exports_3("default", NodeLinker);
        }
    };
});
System.register("Core/Graph", ["Core/NodeLinker"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var NodeLinker_1, Graph, RelationshipsMap, Relationship;
    return {
        setters: [
            function (NodeLinker_1_1) {
                NodeLinker_1 = NodeLinker_1_1;
            }
        ],
        execute: function () {
            Graph = (function () {
                function Graph() {
                    this.nodes = [];
                    this.edges = [];
                    this.relationships = {};
                    this.title = '';
                }
                Graph.prototype.link = function (node) {
                    return new NodeLinker_1["default"](node, this);
                };
                Graph.prototype.addEdge = function (edge) {
                    this.edges.push(edge);
                    if (!this.nodeExists(edge.fromNode))
                        this.nodes.push(edge.fromNode);
                    if (!this.nodeExists(edge.toNode))
                        this.nodes.push(edge.toNode);
                };
                Graph.prototype.addRelationship = function (fromNode, relationship) {
                    if (!this.relationships[fromNode.id])
                        this.relationships[fromNode.id] = [];
                    this.relationships[fromNode.id].push(relationship);
                };
                Graph.prototype.edgeExists = function (edge) {
                    for (var _i = 0, _a = this.edges; _i < _a.length; _i++) {
                        var e = _a[_i];
                        if (e.equals(edge))
                            return e;
                    }
                    return null;
                };
                Graph.prototype.nodeExists = function (node) {
                    for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
                        var n = _a[_i];
                        if (n.equals(node))
                            return n;
                    }
                    return null;
                };
                Graph.prototype.areNodesAdjacent = function (nodeA, nodeB) {
                    for (var _i = 0, _a = this.edges; _i < _a.length; _i++) {
                        var e = _a[_i];
                        if ((e.fromNode.equals(nodeA) && e.toNode.equals(nodeB)) || (e.fromNode.equals(nodeB) && e.toNode.equals(nodeA))) {
                            return true;
                        }
                    }
                    return false;
                };
                Graph.prototype.apply = function (algorithm) {
                    algorithm.graph = this;
                    return algorithm.apply();
                };
                return Graph;
            }());
            exports_4("default", Graph);
            RelationshipsMap = (function () {
                function RelationshipsMap() {
                }
                return RelationshipsMap;
            }());
            Relationship = (function () {
                function Relationship() {
                }
                return Relationship;
            }());
        }
    };
});
System.register("Algorithms/Algorithm", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var Algorithm;
    return {
        setters: [],
        execute: function () {
            Algorithm = (function () {
                function Algorithm(graph) {
                    this.graph = graph;
                }
                return Algorithm;
            }());
            exports_5("default", Algorithm);
        }
    };
});
System.register("Algorithms/ColorationAlgorithm/GraphColoration", ["Core/Graph", "Algorithms/Algorithm"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var Graph_1, Algorithm_1, BLUE, RED, GREEN, YELLOW, COLORS, GraphColoration;
    return {
        setters: [
            function (Graph_1_1) {
                Graph_1 = Graph_1_1;
            },
            function (Algorithm_1_1) {
                Algorithm_1 = Algorithm_1_1;
            }
        ],
        execute: function () {
            BLUE = 'lightblue';
            RED = 'tomato';
            GREEN = 'lightgreen';
            YELLOW = 'yellow';
            COLORS = [BLUE, RED, GREEN, YELLOW];
            GraphColoration = (function (_super) {
                __extends(GraphColoration, _super);
                function GraphColoration(graph) {
                    return _super.call(this, graph) || this;
                }
                GraphColoration.prototype.apply = function () {
                    var _this = this;
                    var sortedNodes = this.graph.nodes.sort(function (n1, n2) {
                        return n2.degree - n1.degree;
                    });
                    var colorCounter = 0, coloredNodes = [];
                    var isNodeAdjacentToColoredNodeWithCurrentColor = function (node) {
                        for (var _i = 0, coloredNodes_1 = coloredNodes; _i < coloredNodes_1.length; _i++) {
                            var coloredNode = coloredNodes_1[_i];
                            if (coloredNode.color == COLORS[colorCounter] && _this.graph.areNodesAdjacent(node, coloredNode))
                                return true;
                        }
                        return false;
                    };
                    while (coloredNodes.length != sortedNodes.length) {
                        for (var i = 0; i < sortedNodes.length; i++) {
                            var node = sortedNodes[i];
                            if (node.color != null)
                                continue;
                            if (!isNodeAdjacentToColoredNodeWithCurrentColor(node)) {
                                node.color = COLORS[colorCounter];
                                coloredNodes.push(node);
                            }
                        }
                        colorCounter++;
                    }
                    var coloredGraph = new Graph_1["default"]();
                    coloredGraph.nodes = coloredNodes;
                    coloredGraph.edges = this.graph.edges;
                    return coloredGraph;
                };
                return GraphColoration;
            }(Algorithm_1["default"]));
            exports_6("default", GraphColoration);
        }
    };
});
System.register("Core/Graphics/CytoscapeWrapper", ["cytoscape"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var cytoscape_1, CytoscapeWrapper;
    return {
        setters: [
            function (cytoscape_1_1) {
                cytoscape_1 = cytoscape_1_1;
            }
        ],
        execute: function () {
            CytoscapeWrapper = (function () {
                function CytoscapeWrapper() {
                }
                CytoscapeWrapper.create = function (opts) {
                    return cytoscape_1["default"](opts);
                };
                CytoscapeWrapper.createFromGraph = function (graph, container, opts) {
                    if (!opts)
                        opts = {
                            boxSelectionEnabled: false,
                            autounselectify: true,
                            layout: {
                                name: 'circle'
                            }
                        };
                    if (!opts.elements)
                        opts.elements = CytoscapeWrapper.getCytoscapeElements(graph);
                    if (!opts.style)
                        opts.style = CytoscapeWrapper.getCytoscapeStyles(graph);
                    opts.container = container;
                    return cytoscape_1["default"](opts);
                };
                CytoscapeWrapper.getCytoscapeElements = function (graph) {
                    var nodes = this.getCytoscapeNodes(graph), edges = this.getCytoscapeEdges(graph);
                    return nodes.concat(edges);
                };
                CytoscapeWrapper.getCytoscapeNodes = function (graph) {
                    var nodes = [];
                    for (var _i = 0, _a = graph.nodes; _i < _a.length; _i++) {
                        var node = _a[_i];
                        nodes.push({
                            data: {
                                id: node.id,
                                name: node.id
                            }
                        });
                    }
                    return nodes;
                };
                CytoscapeWrapper.getCytoscapeEdges = function (graph) {
                    var edges = [], id = 1;
                    for (var _i = 0, _a = graph.edges; _i < _a.length; _i++) {
                        var edge = _a[_i];
                        edges.push({
                            data: {
                                id: id,
                                source: edge.fromNode.id,
                                target: edge.toNode.id
                            }
                        });
                        id++;
                    }
                    return edges;
                };
                CytoscapeWrapper.getCytoscapeStyles = function (graph) {
                    var styles = [this.defaultNodesStyle(), this.defaultEdgesStyle()];
                    for (var _i = 0, _a = graph.nodes; _i < _a.length; _i++) {
                        var node = _a[_i];
                        if (node.color) {
                            styles.push({
                                selector: '#' + node.id,
                                style: {
                                    'background-color': node.color
                                }
                            });
                        }
                        else
                            break;
                    }
                    return styles;
                };
                CytoscapeWrapper.defaultNodesStyle = function () {
                    return {
                        selector: 'node',
                        style: {
                            'background-color': 'grey',
                            labelValign: 'middle',
                            'content': 'data(name)'
                        }
                    };
                };
                CytoscapeWrapper.defaultEdgesStyle = function () {
                    return {
                        selector: 'edge',
                        style: {
                            'width': 3,
                            'line-color': 'lightgrey'
                        }
                    };
                };
                return CytoscapeWrapper;
            }());
            exports_7("default", CytoscapeWrapper);
        }
    };
});
System.register("Core/EzGraph", ["Core/Edge", "Core/Graph", "Core/Node", "Core/NodeLinker", "Algorithms/ColorationAlgorithm/GraphColoration", "Core/Graphics/CytoscapeWrapper"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    function sampleGraph() {
        var graph = new Graph_2["default"]();
        var A = new Node_1["default"]("A");
        var B = new Node_1["default"]("B");
        var C = new Node_1["default"]("C");
        var D = new Node_1["default"]("D");
        var E = new Node_1["default"]("E");
        var F = new Node_1["default"]("F");
        var G = new Node_1["default"]("G");
        var H = new Node_1["default"]("H");
        var Y = new Node_1["default"]("Y");
        var Z = new Node_1["default"]("Z");
        graph.link(A).to(Z).to(Y).to(B).to(C);
        graph.link(B).to(D).to(E).to(F);
        graph.link(C).to(Y).to(D).to(G);
        graph.link(D).to(E).to(G);
        graph.link(E).to(F).to(H);
        graph.link(G).to(Y).to(H);
        return graph;
    }
    function logoGraph() {
        return sampleGraph();
    }
    var Edge_2, Graph_2, Node_1, NodeLinker_2, GraphColoration_1, CytoscapeWrapper_1;
    return {
        setters: [
            function (Edge_2_1) {
                Edge_2 = Edge_2_1;
            },
            function (Graph_2_1) {
                Graph_2 = Graph_2_1;
            },
            function (Node_1_1) {
                Node_1 = Node_1_1;
            },
            function (NodeLinker_2_1) {
                NodeLinker_2 = NodeLinker_2_1;
            },
            function (GraphColoration_1_1) {
                GraphColoration_1 = GraphColoration_1_1;
            },
            function (CytoscapeWrapper_1_1) {
                CytoscapeWrapper_1 = CytoscapeWrapper_1_1;
            }
        ],
        execute: function () {
            exports_8("default", {
                Edge: Edge_2["default"], Graph: Graph_2["default"], Node: Node_1["default"], NodeLinker: NodeLinker_2["default"], sampleGraph: sampleGraph, logoGraph: logoGraph, Cytoscape: CytoscapeWrapper_1["default"],
                Algorithms: {
                    GraphColoration: GraphColoration_1["default"]
                }
            });
        }
    };
});
System.register("Test/Main", ["Core/Graph", "Core/Node", "Algorithms/ColorationAlgorithm/GraphColoration"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var Graph_3, Node_2, GraphColoration_2, graph, A, B, C, D, E, F, G, H, Y, Z;
    return {
        setters: [
            function (Graph_3_1) {
                Graph_3 = Graph_3_1;
            },
            function (Node_2_1) {
                Node_2 = Node_2_1;
            },
            function (GraphColoration_2_1) {
                GraphColoration_2 = GraphColoration_2_1;
            }
        ],
        execute: function () {
            graph = new Graph_3["default"]();
            A = new Node_2["default"]("A");
            B = new Node_2["default"]("B");
            C = new Node_2["default"]("C");
            D = new Node_2["default"]("D");
            E = new Node_2["default"]("E");
            F = new Node_2["default"]("F");
            G = new Node_2["default"]("G");
            H = new Node_2["default"]("H");
            Y = new Node_2["default"]("Y");
            Z = new Node_2["default"]("Z");
            graph.link(A).to(Z).to(Y).to(B).to(C);
            graph.link(B).to(D).to(E).to(F);
            graph.link(C).to(Y).to(D).to(G);
            graph.link(D).to(E).to(G);
            graph.link(E).to(F).to(H);
            graph.link(G).to(Y).to(H);
            console.log(JSON.stringify(graph));
            console.log(JSON.stringify(new GraphColoration_2["default"](graph).apply()));
        }
    };
});
System.register("Utils/NodeConstants", ["Core/Node"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var Node_3, A, B, C, D, E, F, G, H, Y, Z;
    return {
        setters: [
            function (Node_3_1) {
                Node_3 = Node_3_1;
            }
        ],
        execute: function () {
            A = new Node_3["default"]("A");
            B = new Node_3["default"]("B");
            C = new Node_3["default"]("C");
            D = new Node_3["default"]("D");
            E = new Node_3["default"]("E");
            F = new Node_3["default"]("F");
            G = new Node_3["default"]("G");
            H = new Node_3["default"]("H");
            Y = new Node_3["default"]("Y");
            Z = new Node_3["default"]("Z");
        }
    };
});
