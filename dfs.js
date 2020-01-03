var dfsSeq = [];

function dfs() {
    var input_val = document.getElementById('input-node').value;
    start = graph.getElementById(input_val);
    var visited = [];
    for (var iter = 0; iter < graph.nodes().length; iter++)
        visited[iter] = false;
    dfsUtil(start, visited);
}

function dfsUtil(node, visited) {
    visited[node.id()] = true;
    dfsSeq.push(node);
    var adjacent_to_node = node.neighbourhood('node');
    adjacent_to_node.forEach(neighbour => {
        if (!visited[neighbour.id()]) {
            dfsSeq.push(neighbour.edgesWith(node));
            dfsSeq.push(neighbour);
            dfsUtil(neighbour, visited);
            dfsSeq.push(neighbour.edgesWith(node));
        }
    });
}

var visited_1 = [];
for (l = 0; l < dfsSeq.length; l++)
    visited_1[dfsSeq[l].id()] = false;
var l = 0;
function dfsRun() {
    var input_val = document.getElementById('input-node').value;
    if (input_val == '') {
        alert("Enter starting vertex");
        return;
    }
    if (l < dfsSeq.length) {
        if (visited_1[dfsSeq[l].id()])
            dfsSeq[l].addClass("backtrack");
        else {
            dfsSeq[l].addClass('visited');
            visited_1[dfsSeq[l].id()] = true;
        }
        l++;
        setTimeout(dfsRun, 500);
    }
    dfsSeq[0].addClass("backtrack");
}