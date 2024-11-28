from collections import defaultdict
import json
import re


def build_tree(edges: list) -> list:

    graph = defaultdict(list)
    for edge in edges:
        source = edge["source"]
        target = edge["target"]
        graph[source].append(target)

    root_nodes = set()
    for edge in edges:
        if edge["sourceHandle"].startswith("inputBlock"):
            root_nodes.add(edge["source"])

    def traverse_graph(graph, node, visited=None):
        if visited is None:
            visited = set()
        visited.add(node)
        neighbors = graph.get(node, [])
        result = {node: []}
        for neighbor in neighbors:
            if neighbor not in visited:
                subtree = traverse_graph(graph, neighbor, visited)
                result[node].append(subtree)
        return result

    graph_trees = []
    for root in root_nodes:
        tree = traverse_graph(graph, root)
        graph_trees.append(tree)

    # print(json.dumps(graph_trees, indent=2))

    return graph_trees


def extract_node_info(node_name):
    match = re.match(r"([a-zA-Z]+)(\d+)", node_name)
    if match:
        node_type_name = match.group(1)
        node_id = match.group(2)
        node_type_map = {
            "inputBlock": "input_block",
            "dataBlock": "data_block",
            "textSplitter": "text_splitter",
            "llmBlock": "llm_block",
            "widgetBlock": "widget_block",
            "vectorStore": "vector_store",
        }
        node_type = node_type_map.get(node_type_name)
        return node_type, node_id
    else:
        return None, None


def map_nodes(tree, nodes):

    def traverse(node):
        if isinstance(node, list):
            return [traverse(child) for child in node]
        elif isinstance(node, dict):
            for key, value in node.items():
                node_type, node_id = extract_node_info(key)
                if node_type and node_id:
                    node_data = nodes.get(node_type, {}).get(node_id, {})
                    return {
                        "type": node_type,
                        "id": node_id,
                        "data": node_data,
                        "children": traverse(value),
                    }
                else:
                    return {key: traverse(value)}
        else:
            return node

    return traverse(tree)


if __name__ == "__main__":
    edges = [
        {
            "id": "inputBlock7-dataBlock5",
            "source": "inputBlock7",
            "target": "dataBlock5",
            "animated": False,
            "sourceHandle": "inputBlock|7|source",
            "targetHandle": "dataBlock|5|target",
        },
        {
            "id": "inputBlock7-llmBlock5",
            "source": "inputBlock7",
            "target": "llmBlock5",
            "animated": False,
            "sourceHandle": "inputBlock|7|source",
            "targetHandle": "llm|5|target",
        },
        {
            "id": "llmBlock5-widgetBlock2",
            "source": "llmBlock5",
            "target": "widgetBlock2",
            "animated": False,
            "sourceHandle": "llm|5|source",
            "targetHandle": "widget|2|target",
        },
        {
            "id": "dataBlock5-textSplitter2",
            "source": "dataBlock5",
            "target": "textSplitter2",
            "animated": False,
            "sourceHandle": "dataBlock|5|source",
            "targetHandle": "textSplitter|2|target",
        },
    ]

    build_tree(edges)
