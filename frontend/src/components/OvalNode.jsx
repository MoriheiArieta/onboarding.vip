import React, { useState, useEffect, useRef } from "react";
import { Handle, Position } from "@xyflow/react";

const OvalNode = ({ data }) => {
  const [dimensions, setDimensions] = useState({ width: 100, height: 40 });
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const textWidth = textRef.current.scrollWidth;
      const textHeight = textRef.current.scrollHeight;
      setDimensions({
        width: Math.max(100, textWidth + 20), // 10px padding on each side
        height: Math.max(40, textHeight + 10), // 5px padding top and bottom
      });
    }
  }, [data.label]);

  const nodeStyle = {
    width: dimensions.width,
    height: dimensions.height,
    position: "relative",
    transform: `translate(-${dimensions.width / 2}px, -${
      dimensions.height / 2
    }px)`,
  };

  const ovalStyle = {
    width: "100%",
    height: "100%",
    background: "#5b67af",
    borderRadius: dimensions.height / 2,
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
    padding: "5px 10px",
    textAlign: "center",
    wordWrap: "break-word",
    overflowWrap: "break-word",
  };

  const handleStyle = {
    zIndex: 1,
    visibility: "hidden",
  };

  return (
    <div style={nodeStyle}>
      <Handle
        id="top"
        type="target"
        style={handleStyle}
        position={Position.Top}
      />
      <div style={ovalStyle} />
      <div style={labelStyle}>
        <span ref={textRef}>{data.label}</span>
      </div>
      <Handle
        id="left"
        style={handleStyle}
        type="source"
        position={Position.Left}
      />
      <Handle
        id="right"
        style={handleStyle}
        type="source"
        position={Position.Right}
      />
      <Handle
        id="bottom"
        style={handleStyle}
        type="source"
        position={Position.Bottom}
      />
    </div>
  );
};

export default OvalNode;
