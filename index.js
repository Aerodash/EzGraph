// Import EzGraph from bundle
System.config({
    packages: {
        '*': {
            defaultExtension: 'js'
        }
    }
});
System.import('Core/EzGraph')
    .then(function (ezGraph) {
        window.EzGraph = ezGraph.default;
        window.Graph = EzGraph.Graph;
        window.Node = EzGraph.Node;
        window.GraphColorator = EzGraph.GraphColorator
    });

// Work here
$(function () {

    graph = EzGraph.sampleGraph();
    json = new GraphColorator(graph).color();

    var nodes = [],
        edges = [],
        styles = [{
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

    for (var i = 0; i < json["nodes"].length; i++) {
        let nodeId = json["nodes"][i]["id"];
        nodes.push({
            data: {
                id: nodeId,
                name: nodeId
            }
        });
        if (json["nodes"][i].color) {
            styles.push({
                selector: '#' + nodeId,
                style: {
                    'background-color': json["nodes"][i].color,
                }
            })
        }
    }

    for (var i = 0; i < json["edges"].length; i++) {
        let edge = json["edges"][i];
        edges.push({
            data: {
                id: i,
                source: edge.fromNode.id,
                target: edge.toNode.id
            }
        });
    }
    var cy = window.cy = cytoscape({
        container: document.getElementById('cy'),

        boxSelectionEnabled: false,
        autounselectify: true,

        layout: {
            name: 'circle'
        },

        style: styles,

        elements: nodes.concat(edges)
    });
    cy.$('#A').data('name', 'A')
});