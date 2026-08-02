import { useRef, useCallback } from 'react';

interface UseDraggableOptions {
  onMove: (position: { x: number; y: number }) => void;
  initialPosition: { x: number; y: number };
  disabled?: boolean;
}

const MIN_VISIBLE = 60;
const TASKBAR_HEIGHT = 40;

function clamp(x: number, y: number) {
  const maxX = Math.max(0, window.innerWidth - MIN_VISIBLE);
  const maxY = Math.max(0, window.innerHeight - TASKBAR_HEIGHT - MIN_VISIBLE);
  return {
    x: Math.min(Math.max(0, x), maxX),
    y: Math.min(Math.max(0, y), maxY),
  };
}

export function useDraggable({ onMove, initialPosition, disabled }: UseDraggableOptions) {
  const isDragging = useRef(false);
  const startPoint = useRef({ x: 0, y: 0 });
  const startPos = useRef(initialPosition);

  const beginDrag = useCallback(
    (clientX: number, clientY: number) => {
      isDragging.current = true;
      startPoint.current = { x: clientX, y: clientY };
      startPos.current = initialPosition;
    },
    [initialPosition]
  );

  const updateDrag = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDragging.current) return;
      const dx = clientX - startPoint.current.x;
      const dy = clientY - startPoint.current.y;
      const { x, y } = clamp(startPos.current.x + dx, startPos.current.y + dy);
      onMove({ x, y });
    },
    [onMove]
  );

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      if ((e.target as HTMLElement).closest('button')) return;

      beginDrag(e.clientX, e.clientY);

      const onMouseMove = (ev: MouseEvent) => updateDrag(ev.clientX, ev.clientY);
      const onMouseUp = () => {
        isDragging.current = false;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
    [disabled, beginDrag, updateDrag]
  );

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (disabled) return;
      if ((e.target as HTMLElement).closest('button')) return;

      const touch = e.touches[0];
      beginDrag(touch.clientX, touch.clientY);

      const onTouchMove = (ev: TouchEvent) => {
        if (!isDragging.current) return;
        // Prevent the page/desktop from scrolling while a window is being dragged.
        ev.preventDefault();
        const t = ev.touches[0];
        updateDrag(t.clientX, t.clientY);
      };
      const onTouchEnd = () => {
        isDragging.current = false;
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
        window.removeEventListener('touchcancel', onTouchEnd);
      };

      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onTouchEnd);
      window.addEventListener('touchcancel', onTouchEnd);
    },
    [disabled, beginDrag, updateDrag]
  );

  return { onMouseDown, onTouchStart };
}
