import React, { useCallback, useEffect } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  MiniMap,
  Background,
  MarkerType,
} from "@xyflow/react";
import OvalNode from "./OvalNode.jsx";
import SquareNode from "./SquareNode.jsx";
import DiamondNode from "./DiamondNode.jsx";

import "@xyflow/react/dist/style.css";

import flowData from "../../utils/flowData.json";

const FlowChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    // Initialize nodes from the JSON file
    setNodes(
      flowData.nodes.map((node) => ({
        ...node,
        position: {
          x: node.position.x,
          y: node.position.y,
        },
      }))
    );

    // Transform edges to use correct MarkerType
    const transformedEdges = flowData.edges.map((edge) => ({
      ...edge,
      markerEnd: edge.markerEnd
        ? { type: MarkerType[edge.markerEnd.type.replace("MarkerType.", "")] }
        : undefined,
    }));
    setEdges(transformedEdges);
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const nodeTypes = {
    oval: OvalNode,
    square: SquareNode,
    diamond: DiamondNode,
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
    >
      <Controls />
      <MiniMap />
      {/* <Background variant="dots" gap={12} size={1} /> */}
    </ReactFlow>
  );
};

export default FlowChart;
