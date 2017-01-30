/// <reference types="../../cytoscape" />

import cytoscape from 'cytoscape';
import Graph from '../Graph';
import Node from '../Node';

export default class CytoscapeWrapper {
    static idCounter: number = 1;
    constructor(private cy?: Cy.Instance) {

    }

    getCy(): Cy.Instance {
        return this.cy;
    }

    addNode(node: Node, position?: Cy.Position): void {
        let elt: Cy.ElementDefinition = {
            data: {
                id: node.id,
                name: node.id,
                position
            }
        };
        this.cy.add(elt);
    }

    addEdge(fromNode: Node | string, toNode: Node | string): void {
        let elt: Cy.EdgeDefinition = {
            data: {
                id: `${CytoscapeWrapper.idCounter++}`,
                source: this.nodeToString(fromNode),
                target: this.nodeToString(toNode)
            }
        }
        this.cy.add(elt);
    }

    nodeToString(node: Node | string): string {
        return node instanceof Node ? node.id : node;
    }

    center() {
        this.cy.center();
    }

    static create(opts: Cy.CytoscapeOptions): CytoscapeWrapper {
        return new CytoscapeWrapper(cytoscape(opts));
    }

    static createFromGraph(graph: Graph, container: HTMLElement, opts?: Cy.CytoscapeOptions): CytoscapeWrapper {
        if (!opts)
            opts = {
                boxSelectionEnabled: false,
                autounselectify: true,
                layout: {
                    name: 'circle'
                }
            };
        if (!opts.elements) opts.elements = CytoscapeWrapper.getCytoscapeElements(graph);
        if (!opts.style) opts.style = CytoscapeWrapper.getCytoscapeStyles(graph);
        opts.container = container;
        return new CytoscapeWrapper(cytoscape(opts));
    }

    static getCytoscapeElements(graph: Graph): any[] {
        let nodes = this.getCytoscapeNodes(graph),
            edges = this.getCytoscapeEdges(graph);

        return nodes.concat(edges);
    }

    static getCytoscapeNodes(graph: Graph): any[] {
        let nodes = [];
        for (let node of graph.nodes) {
            nodes.push({
                data: {
                    id: node.id,
                    name: node.id
                }
            });
        }
        return nodes;
    }

    static getCytoscapeEdges(graph: Graph): any[] {
        let edges = [];
        for (let edge of graph.edges) {
            edges.push({
                data: {
                    id: CytoscapeWrapper.idCounter++,
                    source: edge.fromNode.id,
                    target: edge.toNode.id
                }
            });
        }
        return edges;
    }

    static getCytoscapeStyles(graph: Graph): any[] {
        let styles: any[] = [this.defaultNodesStyle(), this.defaultEdgesStyle()];
        for (let node of graph.nodes) {
            if (node.color) {
                styles.push({
                    selector: '#' + node.id,
                    style: {
                        'background-color': node.color,
                    }
                });
            } else break;
        }
        return styles;
    }

    static defaultNodesStyle() {
        return {
            selector: 'node',
            style: {
                'background-color': 'grey',
                labelValign: 'middle',
                'content': 'data(name)'
            }
        };
    }

    static defaultEdgesStyle() {
        return {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': 'lightgrey'
            }
        };
    }

}