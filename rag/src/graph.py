from collections import defaultdict
import json
import re


def get_nodes(data):
    result = defaultdict(dict)
    for node in data:
        result[node["block_type"]][node["id"]] = node
    return result


def build_tree(edges):
    graph = defaultdict(list)
    for edge in edges:
        source = edge["source"]
        target = edge["target"]
        graph[source].append(target)

    # Identify root nodes
    targets = {edge["target"] for edge in edges}
    sources = {edge["source"] for edge in edges}
    root_nodes = sources - targets

    def traverse_graph(node, visited=None):
        if visited is None:
            visited = set()
        visited.add(node)
        neighbors = graph.get(node, [])
        result = {node: []}
        for neighbor in neighbors:
            if neighbor not in visited:
                subtree = traverse_graph(neighbor, visited)
                if subtree:
                    result[node].append(subtree)
        return result

    graph_trees = []
    for root in root_nodes:
        tree = traverse_graph(root)
        graph_trees.append(tree)

    return graph_trees


def extract_node_info(node_name):
    match = re.match(r"([a-zA-Z]+)(Block|Splitter|Store)?(\d+)$", node_name)
    if match:
        node_type_name = match.group(1)
        node_suffix = match.group(2) or ""
        node_id = match.group(1) + (match.group(2) or "") + match.group(3)
        full_node_type = node_type_name + (node_suffix if node_suffix else "")
        node_type_map = {
            "inputBlock": "input_block",
            "dataBlock": "data_block",
            "textSplitter": "text_splitter",
            "llmBlock": "llm_block",
            "widgetBlock": "widget_block",
            "vectorStore": "vector_store",
        }
        node_type = node_type_map.get(full_node_type)
        return node_type, node_id
    else:
        return None, None


def map_nodes(tree, nodes):
    try:
        visited = set()

        def traverse(node):
            if isinstance(node, list):
                result = []
                for child in node:
                    mapped_child = traverse(child)
                    if mapped_child:
                        result.append(mapped_child)
                return result
            elif isinstance(node, dict):
                for key, value in node.items():
                    node_type, node_id = extract_node_info(key)
                    if node_type and node_id and node_id not in visited:
                        visited.add(node_id)
                        current_node = nodes[node_type].get(node_id)
                        if current_node:
                            return {
                                "type": node_type,
                                "id": node_id,
                                "data": current_node,
                                "children": traverse(value),
                            }
                    else:
                        # Skip if already visited or not found
                        return None
            else:
                return None

        return traverse(tree)
    except Exception as e:
        print(f"Error in map_nodes: {e}")
        return []


if __name__ == "__main__":
    # Nodes and edges as defined earlier
    nodes_dict = get_nodes(nodes)
    trees = build_tree(edges)
    result = []
    for tree in trees:
        mapped_tree = map_nodes(tree, nodes_dict)
        if mapped_tree:
            result.append(mapped_tree)

    print(json.dumps(result, indent=2, ensure_ascii=False))
