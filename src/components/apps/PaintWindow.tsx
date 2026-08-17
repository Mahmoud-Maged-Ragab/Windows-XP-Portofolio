"use client";

import { useEffect, useRef, useState } from "react";

const COLORS = [
  "#000000",
  "#ffffff",
  "#c0392b",
  "#e67e22",
  "#f1c40f",
  "#27ae60",
  "#2980b9",
  "#8e44ad",
];

type Point = { x: number; y: number };

export default function PaintWindow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<Point | null>(null);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(4);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  function getPos(e: React.MouseEvent | React.TouchEvent): Point | null {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const point = "touches" in e ? e.touches[0] : e;
    if (!point) return null;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (point.clientX - rect.left) * scaleX,
      y: (point.clientY - rect.top) * scaleY,
    };
  }

  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    drawing.current = true;
    last.current = getPos(e);
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    if (!drawing.current) return;
    e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    const pos = getPos(e);
    if (!ctx || !pos || !last.current) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    last.current = pos;
  }

  function endDraw() {
    drawing.current = false;
    last.current = null;
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function saveImage() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "painting.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="h-full flex flex-col bg-[#ECE9D8]">
      <div className="xp-menu-bar px-2 py-0.5 flex gap-4 text-xs border-b border-gray-400 shrink-0">
        {["File", "Edit", "View", "Image", "Colors", "Help"].map((item) => (
          <button
            key={item}
            className="hover:bg-blue-600 hover:text-white px-1 py-0.5 rounded"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 px-2 py-1.5 border-b border-gray-400 shrink-0">
        <div className="flex gap-1" role="group" aria-label="Colors">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              aria-label={`Color ${c}`}
              aria-pressed={color === c}
              style={{ background: c }}
              className={`w-5 h-5 rounded-sm border ${
                color === c ? "border-blue-600 ring-2 ring-blue-400" : "border-gray-400"
              }`}
            />
          ))}
        </div>
        <label className="flex items-center gap-1.5 text-xs text-gray-700">
          Brush
          <input
            type="range"
            min={1}
            max={20}
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            aria-label="Brush size"
            className="w-20"
          />
        </label>
        <button
          onClick={clearCanvas}
          className="xp-btn text-xs px-2 py-1 inline-flex items-center gap-1.5"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/EraserIcon.svg" className="w-4 h-4 object-contain" alt="" />
          Clear
        </button>
        <button
          onClick={saveImage}
          className="xp-btn text-xs px-2 py-1 inline-flex items-center gap-1.5"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/SaveIcon.svg" className="w-4 h-4 object-contain" alt="" />
          Save as PNG
        </button>
      </div>

      <div className="flex-1 overflow-auto p-2 bg-gray-200">
        <canvas
          ref={canvasRef}
          width={640}
          height={400}
          className="bg-white border border-gray-400 shadow-sm touch-none max-w-full"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
          role="img"
          aria-label="Drawing canvas"
        />
      </div>
    </div>
  );
}
