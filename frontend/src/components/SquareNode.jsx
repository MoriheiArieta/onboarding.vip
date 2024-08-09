import React, { useState, useEffect, useRef } from "react";
import { Handle, Position } from "@xyflow/react";

const SquareNode = ({ data }) => {
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

  const squareStyle = {
    width: "100%",
    height: "100%",
    background: "#659a40",
    borderRadius: 2,
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

  // Default handle configuration
  const defaultHandles = {
    top: { type: "target" },
    left: { type: "target" },
    right: { type: "target" },
    bottom: { type: "source" },
  };

  // Merge provided handle configuration with defaults
  const handleConfig = { ...defaultHandles, ...data.handles };

  return (
    <div style={nodeStyle}>
      {Object.entries(handleConfig).map(([position, config]) => (
        <Handle
          key={position}
          id={position} // Explicitly set the id
          style={handleStyle}
          type={config.type}
          position={
            Position[position.charAt(0).toUpperCase() + position.slice(1)]
          }
        />
      ))}
      <div style={squareStyle} />
      <div style={labelStyle}>
        <span ref={textRef}>{data.label}</span>
      </div>
    </div>
  );
};

export default SquareNode;
