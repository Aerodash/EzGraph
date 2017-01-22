/// <reference types="../../cytoscape" />

import cytoscape from 'cytoscape';
import Graph from '../Graph';

export default class CytoscapeWrapper {

    static create(opts: Cy.CytoscapeOptions): Cy.Instance {
        return cytoscape(opts);
    }

    static createFromGraph(graph: Graph, container: HTMLElement, opts?: Cy.CytoscapeOptions): Cy.Instance {
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
        return cytoscape(opts);
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
        let edges = [], id = 1;
        for (let edge of graph.edges) {
            edges.push({
                data: {
                    id,
                    source: edge.fromNode.id,
                    target: edge.toNode.id
                }
            });
            id++;
        }
        return edges;
    }

    static getCytoscapeStyles(graph: Graph): any[] {
        let styles: any[] = [{
            selector: 'node',
            style: {
                'background-color': 'grey',
                labelValign: 'middle',
                'content': 'data(name)'
            }
        },
        {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': 'lightgrey'
            }
        }
        ];
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
}