import { useRef, useCallback } from 'react';

interface UseDraggableOptions {
  onMove: (position: { x: number; y: number }) => void;
  initialPosition: { x: number; y: number };
  disabled?: boolean;
}

export function useDraggable({ onMove, initialPosition, disabled }: UseDraggableOptions) {
  const isDragging = useRef(false);
  const startMouse = useRef({ x: 0, y: 0 });
  const startPos = useRef(initialPosition);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      if ((e.target as HTMLElement).closest('button')) return;

      isDragging.current = true;
      startMouse.current = { x: e.clientX, y: e.clientY };
      startPos.current = initialPosition;

      const onMouseMove = (ev: MouseEvent) => {
        if (!isDragging.current) return;
        const dx = ev.clientX - startMouse.current.x;
        const dy = ev.clientY - startMouse.current.y;
        const newX = Math.max(0, startPos.current.x + dx);
        const newY = Math.max(0, startPos.current.y + dy);
        onMove({ x: newX, y: newY });
      };

      const onMouseUp = () => {
        isDragging.current = false;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
    [onMove, initialPosition, disabled]
  );

  return { onMouseDown };
}
