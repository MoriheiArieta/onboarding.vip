import React, { useState, useEffect, useRef } from "react";
import { Handle, Position } from "@xyflow/react";

const DiamondNode = ({ data }) => {
  const [size, setSize] = useState(40);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const textWidth = textRef.current.scrollWidth;
      const textHeight = textRef.current.scrollHeight;
      const maxDimension = Math.max(textWidth, textHeight, 40);
      setSize(maxDimension * 1.2);
    }
  }, [data.label]);

  const nodeStyle = {
    width: size,
    height: size,
    position: "relative",
    transform: `translate(-${size / 2}px, -${size / 2}px)`,
  };

  const diamondStyle = {
    width: "100%",
    height: "100%",
    transform: "rotate(45deg)",
    background: "#24a095",
    position: "absolute",
    top: 0,
    left: 0,
  };

  const labelStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 12,
    color: "white",
    padding: "5px",
    textAlign: "center",
    wordWrap: "break-word",
    overflowWrap: "break-word",
  };

  const handleStyle = {
    visibility: "hidden",
    position: "absolute",
    zIndex: 1,
  };

  const offset = size / 2;

  return (
    <div style={nodeStyle}>
      <Handle
        id="top"
        type="target"
        position={Position.Top}
        style={{
          ...handleStyle,
          top: -10,
          left: offset,
          transform: "translate(-50%, -50%)",
        }}
      />
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        style={{
          ...handleStyle,
          top: offset,
          right: -10,
          transform: "translate(50%, -50%)",
        }}
      />
      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        style={{
          ...handleStyle,
          bottom: -10,
          left: offset,
          transform: "translate(-50%, 50%)",
        }}
      />
      <Handle
        id="left"
        type="source"
        position={Position.Left}
        style={{
          ...handleStyle,
          top: offset,
          left: -10,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div style={diamondStyle} />
      <div style={labelStyle}>
        <span ref={textRef}>{data.label}</span>
      </div>
    </div>
  );
};

export default DiamondNode;
