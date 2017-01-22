// Import EzGraph from bundle
System.config({
    packages: {
        '*': {
            defaultExtension: 'js'
        }
    },
    map: { // For cytoscape npm module import
        //'cytoscape': './node_modules/cytoscape/dist/cytoscape.js'
        'cytoscape': './Vendor/cytoscape.min.js'
    }
});
System.import('Core/EzGraph')
    .then(function (ezGraph) {
        // Handle imports
        window.EzGraph = ezGraph.default;
        window.Graph = EzGraph.Graph;
        window.Node = EzGraph.Node;
        window.GraphColorator = EzGraph.GraphColorator;
        window.Cytoscape = EzGraph.Cytoscape;

    }).then(function () {
        $(window).trigger('LoadVueComponents');
    });