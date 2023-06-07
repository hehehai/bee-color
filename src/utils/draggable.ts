/* eslint-disable no-use-before-define */
export interface Coordinate {
  x: number;
  y: number;
}

export type DraggableEvent = MouseEvent;

type DraggableCallback = (
  coordinate: Coordinate,
  event?: DraggableEvent
) => void;

export interface DraggableProps {
  start?: DraggableCallback;
  drag?: DraggableCallback;
  end?: DraggableCallback;
}

interface DraggableHandles {
  start: (event: DraggableEvent) => void;
  drag: (event: DraggableEvent) => void;
  end: (event: DraggableEvent) => void;
}

// 配置项
const defaultsOptions: DraggableProps = {
  start: () => {},
  drag: () => {},
  end: () => {},
};

export class Draggable {
  private dragging = false;

  private $el: HTMLElement;

  private props: DraggableProps;

  private handles: DraggableHandles;

  constructor(el: HTMLElement, options?: DraggableProps) {
    this.$el = el;
    this.props = { ...defaultsOptions, ...options };
    this.handles = {
      start: this.#dragStart.bind(this),
      drag: this.#drag.bind(this),
      end: this.#dragEnd.bind(this),
    };
    this.$el.addEventListener("mousedown", this.handles.start, false);
  }

  #dragStart(event: DraggableEvent) {
    if (this.dragging) {
      return;
    }
    // event.preventDefault();
    window.addEventListener("mousemove", this.handles.drag, false);
    window.addEventListener("mouseup", this.handles.end, false);
    window.addEventListener("contextmenu", this.handles.end, false);
    this.dragging = true;
    this.props.start?.(this.#getCoordinate(event), event);
  }

  #drag(event: DraggableEvent) {
    if (!this.dragging) {
      return;
    }
    this.props.drag?.(this.#getCoordinate(event), event);
  }

  #dragEnd(event: DraggableEvent) {
    setTimeout(() => {
      this.dragging = false;
      this.props.end?.(this.#getCoordinate(event), event);
    }, 0);
    window.removeEventListener("mousemove", this.handles.drag, false);
    window.removeEventListener("mouseup", this.handles.end, false);
    window.removeEventListener("contextmenu", this.handles.end, false);
  }

  #getCoordinate(event: DraggableEvent) {
    const rect = this.$el.getBoundingClientRect();
    const mouseEvent = event;
    const left = mouseEvent.clientX - rect.left;
    const top = mouseEvent.clientY - rect.top;
    return {
      y: Math.min(Math.max(0, top), rect.height),
      x: Math.min(Math.max(0, left), rect.width),
    };
  }

  destroy() {
    this.$el.removeEventListener("mousedown", this.handles.start, false);
    window.removeEventListener("mousemove", this.handles.drag, false);
    window.removeEventListener("mouseup", this.handles.end, false);
    window.removeEventListener("contextmenu", this.handles.end, false);
  }
}
