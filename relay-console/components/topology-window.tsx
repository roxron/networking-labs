'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Maximize2, Network, X } from 'lucide-react';

export type TopologyNode = {
  id: string;
  name: string;
  left: number;
  top: number;
  status: number;
};

export type TopologyLink = {
  source: string;
  target: string;
  sourceInterface?: string;
  targetInterface?: string;
};

export type TopologyData = { nodes: TopologyNode[]; links: TopologyLink[] };

type Props = {
  data: TopologyData | null;
  selectedNodeId?: string;
  loading: boolean;
  error: string;
  onClose: () => void;
  onSelectNode: (id: string) => void;
};

export function TopologyWindow({
  data,
  selectedNodeId,
  loading,
  error,
  onClose,
  onSelectNode,
}: Props) {
  const [view, setView] = useState<'focused' | 'full'>('focused');
  const [size, setSize] = useState({ width: 520, height: 360 });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [focusState, setFocusState] = useState({
    selectedNodeId,
    focusedNodeId: selectedNodeId,
  });
  if (focusState.selectedNodeId !== selectedNodeId) {
    setFocusState({ selectedNodeId, focusedNodeId: selectedNodeId });
  }
  const focusedNodeId = focusState.focusedNodeId;
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const panState = useRef<{
    pointerX: number;
    pointerY: number;
    panX: number;
    panY: number;
  } | null>(null);
  const panMoved = useRef(false);
  const resizeState = useRef<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  useEffect(
    () => () => {
      if (clickTimer.current) clearTimeout(clickTimer.current);
    },
    [],
  );

  const graph = useMemo(() => {
    const nodes = data?.nodes ?? [];
    const links = data?.links ?? [];
    if (view === 'full' || !focusedNodeId) return { nodes, links };
    const included = new Set([focusedNodeId]);
    for (const link of links) {
      if (link.source === focusedNodeId) included.add(link.target);
      if (link.target === focusedNodeId) included.add(link.source);
    }
    return {
      nodes: nodes.filter((node) => included.has(node.id)),
      links: links.filter(
        (link) => included.has(link.source) && included.has(link.target),
      ),
    };
  }, [data, focusedNodeId, view]);

  const layout = useMemo(() => {
    if (!graph.nodes.length) return new Map<string, { x: number; y: number }>();
    if (view === 'focused' && focusedNodeId) {
      const center = graph.nodes.find((node) => node.id === focusedNodeId);
      const neighbors = graph.nodes.filter((node) => node.id !== focusedNodeId);
      const result = new Map<string, { x: number; y: number }>();
      if (center) result.set(center.id, { x: 400, y: 225 });
      neighbors.forEach((node, index) => {
        const angle = (Math.PI * 2 * index) / Math.max(neighbors.length, 1) - Math.PI / 2;
        result.set(node.id, {
          x: 400 + Math.cos(angle) * 185,
          y: 225 + Math.sin(angle) * 185,
        });
      });
      return result;
    }
    const xs = graph.nodes.map((node) => node.left);
    const ys = graph.nodes.map((node) => node.top);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const points = new Map(
      graph.nodes.map((node, index) => [
        node.id,
        {
          x: 90 + ((node.left - minX) / Math.max(maxX - minX, 1)) * 620 + (index % 3) * 0.01,
          y: 65 + ((node.top - minY) / Math.max(maxY - minY, 1)) * 320 + (index % 5) * 0.01,
        },
      ]),
    );
    const targetLength = 155;
    for (let iteration = 0; iteration < 180; iteration += 1) {
      const strength = 0.085 * (1 - iteration / 240);
      for (const link of graph.links) {
        const a = points.get(link.source), b = points.get(link.target);
        if (!a || !b) continue;
        const dx = b.x - a.x, dy = b.y - a.y;
        const distance = Math.max(Math.hypot(dx, dy), 0.01);
        const correction = ((distance - targetLength) / distance) * strength;
        const moveX = dx * correction * 0.5, moveY = dy * correction * 0.5;
        a.x += moveX; a.y += moveY;
        b.x -= moveX; b.y -= moveY;
      }
      const entries = [...points.values()];
      for (let first = 0; first < entries.length; first += 1) {
        for (let second = first + 1; second < entries.length; second += 1) {
          const a = entries[first], b = entries[second];
          let dx = b.x - a.x, dy = b.y - a.y;
          let distance = Math.hypot(dx, dy);
          if (distance < 0.01) { dx = 0.01; dy = 0; distance = 0.01; }
          if (distance >= 92) continue;
          const push = ((92 - distance) / distance) * 0.075;
          a.x -= dx * push; a.y -= dy * push;
          b.x += dx * push; b.y += dy * push;
        }
      }
    }
    const finalPoints = [...points.values()];
    const centerX = finalPoints.reduce((sum, point) => sum + point.x, 0) / finalPoints.length;
    const centerY = finalPoints.reduce((sum, point) => sum + point.y, 0) / finalPoints.length;
    for (const point of finalPoints) {
      point.x += 400 - centerX;
      point.y += 225 - centerY;
    }
    return points;
  }, [focusedNodeId, graph.links, graph.nodes, view]);

  const startPan = (event: React.PointerEvent<SVGSVGElement>) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    panState.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      panX: pan.x,
      panY: pan.y,
    };
    panMoved.current = false;
  };
  const movePan = (event: React.PointerEvent<SVGSVGElement>) => {
    const initial = panState.current;
    const svg = svgRef.current;
    if (!initial || !svg) return;
    const bounds = svg.getBoundingClientRect();
    const next = {
      x: initial.panX + ((event.clientX - initial.pointerX) * 800) / Math.max(bounds.width, 1),
      y: initial.panY + ((event.clientY - initial.pointerY) * 450) / Math.max(bounds.height, 1),
    };
    if (Math.hypot(next.x - initial.panX, next.y - initial.panY) > 2) panMoved.current = true;
    setPan(next);
  };
  const endPan = () => { panState.current = null; };

  const startResize = (event: React.PointerEvent) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    resizeState.current = { x: event.clientX, y: event.clientY, ...size };
  };
  const resize = (event: React.PointerEvent) => {
    const initial = resizeState.current;
    if (!initial) return;
    setSize({
      width: Math.max(340, Math.min(900, initial.width + initial.x - event.clientX)),
      height: Math.max(240, Math.min(700, initial.height + event.clientY - initial.y)),
    });
  };

  return (
    <div
      className="absolute right-4 top-4 z-30 flex max-h-[calc(100%-2rem)] max-w-[calc(100%-2rem)] flex-col overflow-hidden rounded-lg border border-white/15 bg-[#0b1118]/95 shadow-2xl shadow-black/60 backdrop-blur"
      style={{ width: size.width, height: size.height }}
    >
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-white/10 px-3">
        <Network className="size-4 text-[#55d68b]" />
        <b className="text-[11px] text-[#dce4ed]">Topology</b>
        <div className="ml-auto flex rounded-md border border-white/10 bg-black/20 p-0.5">
          {(['focused', 'full'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setView(mode)}
              className={`rounded px-2 py-1 text-[9px] font-semibold capitalize ${view === mode ? 'bg-[#55d68b] text-[#07120c]' : 'text-[#8392a5] hover:text-white'}`}
            >
              {mode}
            </button>
          ))}
        </div>
        <button onClick={onClose} className="ml-1 text-[#718095] hover:text-white" aria-label="Close topology">
          <X className="size-4" />
        </button>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#070b10]">
        <div className="absolute right-2 top-2 z-10 flex w-9 flex-col gap-1 rounded-md border border-white/10 bg-[#0b1118]/75 p-1 opacity-0 shadow-lg backdrop-blur transition-opacity duration-150 hover:opacity-100 focus-within:opacity-100">
          <button
            type="button"
            aria-label="Enlarge topology"
            title="Enlarge topology"
            disabled={zoom >= 2}
            onClick={() => setZoom((value) => Math.min(2, Number((value + 0.2).toFixed(1))))}
            className="grid size-7 place-items-center rounded text-[#b9c5d2] hover:bg-white/10 hover:text-[#55d68b] disabled:opacity-25"
          >
            <ChevronUp className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Reduce topology"
            title="Reduce topology"
            disabled={zoom <= 0.6}
            onClick={() => setZoom((value) => Math.max(0.6, Number((value - 0.2).toFixed(1))))}
            className="grid size-7 place-items-center rounded text-[#b9c5d2] hover:bg-white/10 hover:text-[#55d68b] disabled:opacity-25"
          >
            <ChevronDown className="size-5" />
          </button>
        </div>
        {loading && <div className="grid h-full place-items-center text-xs text-[#718095]">Loading topology…</div>}
        {!loading && error && <div className="grid h-full place-items-center px-8 text-center text-xs text-[#ff8b87]">{error}</div>}
        {!loading && !error && !graph.nodes.length && <div className="grid h-full place-items-center text-xs text-[#718095]">No topology data available.</div>}
        {!loading && !error && graph.nodes.length > 0 && (
          <svg
            ref={svgRef}
            viewBox="0 0 800 450"
            className="h-full w-full cursor-grab touch-none active:cursor-grabbing"
            aria-label={`${view} topology`}
            onPointerDown={startPan}
            onPointerMove={movePan}
            onPointerUp={endPan}
            onPointerCancel={endPan}
          >
            <defs>
              <filter id="nodeGlow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <g transform={`translate(${pan.x} ${pan.y}) translate(400 225) scale(${zoom}) translate(-400 -225)`}>
            {graph.links.map((link, index) => {
              const a = layout.get(link.source), b = layout.get(link.target);
              if (!a || !b) return null;
              const dx = b.x - a.x, dy = b.y - a.y;
              const length = Math.max(Math.hypot(dx, dy), 1);
              const ux = dx / length, uy = dy / length;
              return (
                <g key={`${link.source}-${link.target}-${index}`}>
                  <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#526174" strokeWidth="2" />
                  {link.sourceInterface && <text x={a.x + ux * 48} y={a.y + uy * 48 - 7} fill="#a8b5c4" fontSize="11" textAnchor="middle">{link.sourceInterface}</text>}
                  {link.targetInterface && <text x={b.x - ux * 48} y={b.y - uy * 48 - 7} fill="#a8b5c4" fontSize="11" textAnchor="middle">{link.targetInterface}</text>}
                </g>
              );
            })}
            {graph.nodes.map((node) => {
              const point = layout.get(node.id);
              if (!point) return null;
              const selected = node.id === focusedNodeId;
              return (
                <g
                  key={node.id}
                  transform={`translate(${point.x} ${point.y})`}
                  onPointerDown={(event) => {
                    panMoved.current = false;
                    event.stopPropagation();
                  }}
                  onClick={() => {
                    if (panMoved.current) return;
                    if (clickTimer.current) clearTimeout(clickTimer.current);
                    clickTimer.current = setTimeout(() => {
                      setFocusState((current) => ({ ...current, focusedNodeId: node.id }));
                      clickTimer.current = null;
                    }, 240);
                  }}
                  onDoubleClick={() => {
                    if (panMoved.current) return;
                    if (clickTimer.current) clearTimeout(clickTimer.current);
                    clickTimer.current = null;
                    setFocusState((current) => ({ ...current, focusedNodeId: node.id }));
                    onSelectNode(node.id);
                  }}
                  className="cursor-pointer"
                  aria-label={`Open ${node.name} terminal`}
                >
                  <circle r={selected ? 28 : 23} fill={selected ? '#173b2a' : '#141e28'} stroke={selected ? '#55d68b' : node.status === 2 ? '#52d273' : '#657184'} strokeWidth={selected ? 3 : 2} filter={selected ? 'url(#nodeGlow)' : undefined} />
                  <Maximize2 x={-8} y={-8} width={16} height={16} color={selected ? '#76eba5' : '#a7b4c4'} />
                  <text y={selected ? 45 : 39} fill={selected ? '#e7fff0' : '#c8d2dd'} fontSize="12" fontWeight={selected ? 700 : 600} textAnchor="middle">{node.name}</text>
                </g>
              );
            })}
            </g>
          </svg>
        )}
      </div>
      <div
        className="absolute bottom-0 left-0 size-5 cursor-nesw-resize border-b-2 border-l-2 border-[#55d68b]/70"
        title="Drag to resize"
        onPointerDown={startResize}
        onPointerMove={resize}
        onPointerUp={() => { resizeState.current = null; }}
        onPointerCancel={() => { resizeState.current = null; }}
      />
    </div>
  );
}
