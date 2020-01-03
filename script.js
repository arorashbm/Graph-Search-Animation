var default_nodes = [
    { data: { id: 'a' } },
    { data: { id: 'b' } },
    { data: { id: 'c' } },
    { data: { id: 'd' } },
    { data: { id: 'e' } },
    { data: { id: 'f' } }
];

var default_edges = [
    { data: { id: 'ae', weight: 1, source: 'a', target: 'e' } },
    { data: { id: 'ab', weight: 3, source: 'a', target: 'b' } },
    { data: { id: 'bd', weight: 4, source: 'b', target: 'd' } },
    { data: { id: 'bf', weight: 5, source: 'b', target: 'f' } },
    { data: { id: 'cf', weight: 6, source: 'c', target: 'f' } },
    { data: { id: 'cb', weight: 2, source: 'c', target: 'b' } },
    { data: { id: 'de', weight: 7, source: 'd', target: 'e' } },
    { data: { id: 'de', weight: 7, source: 'd', target: 'e' } }
];

var graph_obj = {
    container: document.getElementById('draw-area'),
    boxSelectionEnabled: false,
    autounselectify: true,
    zoomingEnabled: false,
    style: cytoscape.stylesheet()
        .selector('node')
        .style({
            'content': 'data(id)',
            'background-color': '#666600'
        })
        .selector('edge')
        .style({
            'content': 'data(weight)',
            'curve-style': 'bezier',
            'width': 4,
            'line-color': '#e6e600',
            'target-arrow-color': '#e6e600'
        })
        .selector('.visited')
        .style({
            'background-color': '#df596e',
            'line-color': '#df596e',
            'target-arrow-color': '#df596e',
            'transition-property': 'background-color, line-color, target-arrow-color',
            'transition-duration': '1s'
        })
        .selector('.backtrack')
        .style({
            'background-color': 'blue',
            'line-color': 'blue',
            'target-arrow-color': 'blue',
            'transition-property': 'background-color, line-color, target-arrow-color',
            'transition-duration': '1s'
        }),
    elements: {
        nodes: default_nodes,
        edges: default_edges
    },
    layout: {
        name: "circle"
    }
}

var graph = cytoscape(graph_obj);
var current_nodes = 0;

function cleanDFS() {
    dfsSeq = [];
    visited_1 = [];
    dfs();
}

function cleanBFS() {
    bfsSeq = [];
    bfs();
}

function cleanMST() {
    mstSeq = [];
    id = [];
    sortedWeights = [];
    nodeMap = [];
    initialize();
    kruskal();
}

function cleanUp() {
    cleanDFS();
    cleanBFS();
    cleanMST();
}

var input_start_node = document.getElementById("input-node");
input_start_node.addEventListener("keyup", () => {
    cleanUp();
});

document.getElementById("run-dfs").addEventListener("click", () => {
    removeColor();
    visited_1 = [];
    l = 0;
    dfsRun();
});
document.getElementById("run-bfs").addEventListener("click", () => {
    removeColor();
    j = 0;
    bfsRun();
});
document.getElementById("run-mst").addEventListener("click", () => {
    removeColor();
    cleanMST();
    i = 0;
    mstRun();
});

function removeColor() {
    graph.nodes().forEach(node => {
        node.removeClass("visited");
    });
    graph.edges().forEach(edge => {
        edge.removeClass("visited");
    });
    graph.nodes().forEach(node => {
        node.removeClass("backtrack");
    });
    graph.edges().forEach(edge => {
        edge.removeClass("backtrack");
    });
    }

function cleanArea() {
    graph.elements().remove();
    current_nodes = 0;
}

function addNode(e) {
    var x_cor = e.clientX - window.innerWidth / 4 - 5.25;
    var y_cor = e.clientY - 20;
    graph.add({
        group: 'nodes',
        data: {
            id: current_nodes
        },
        position: {
            x: x_cor,
            y: y_cor
        }
    });
    current_nodes++;
}

function customGraph(e) {
    document.getElementById('draw-area').addEventListener("click", addNode);
}

var count = 1;

function addEdge() {
    document.getElementById('draw-area').removeEventListener("click", addNode);
    var not_active_elem = document.getElementsByClassName('not-active');
    var x = not_active_elem.length;
    for (var y = 0; y < x; y++) {
        not_active_elem[0].classList.remove("not-active");
    }
    var from = document.getElementById('start-node').value;
    var to = document.getElementById('target-node').value
    var weight = document.getElementById('weight').value;
    var from_bool = false;
    var to_bool = false;
    var edge_bool = false;
    if (from != '' && to != '' && weight != '') {
        graph.nodes().forEach(node => {
            if (from == node.id())
                from_bool = true;
            if (to == node.id())
                to_bool = true;
        });
        graph.edges().forEach(edge => {
            if (edge.id() == from + to || edge.id() == to + from) {
                edge_bool = true;
            }
        });
        if (from_bool && to_bool && !edge_bool) {
            graph.add({
                group: 'edges',
                data: { id: from + to, source: from, target: to, weight: weight }
            });
        }
        else
            alert("Wrong Input");
    }

    else {
        if (count > 1)
            alert("Input not filled correctly");
        count++;
    }
    cleanUp();
}

