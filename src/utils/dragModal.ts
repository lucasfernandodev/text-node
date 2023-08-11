const dragModal = (modal: HTMLElement | null) => {

  let initialX = 0, initialY = 0
  let isMove = false

  const headerNavigation = modal?.querySelector('aside header') as HTMLElement
  const headerEditor = modal?.querySelector('main header') as HTMLElement

  modal && headerNavigation.addEventListener("mousedown", startDrag, true);
  modal && headerEditor.addEventListener("mousedown", startDrag, true);

  function drag(e: MouseEvent) {
    if (modal && isMove === true) {
      e.preventDefault();
      e.stopPropagation();

      const newLeft = e.clientX - initialX;
      const newTop = e.clientY - initialY;

      const { width: modalWidth, height: modalHeight } = modal.getBoundingClientRect();
      const maxX = window.innerWidth - modalWidth;
      const maxY = window.innerHeight - modalHeight;
      const left = Math.min(Math.max(0, newLeft), maxX);
      const top = Math.min(Math.max(0, newTop), maxY);

      modal.style.left = `${left}px`;
      modal.style.top = `${top}px`;
    }
  }

  function stopDrag(e: MouseEvent) {
    isMove = false
    const el = e.target as HTMLDivElement
    el.classList.remove('isMoving')

    document.removeEventListener("mousemove", drag, true);
    document.removeEventListener("mousemove", drag, true);
  }

  function startDrag(e: MouseEvent) {
    const el = e.target as HTMLDivElement
    if (!el.closest('.surface-ignore')) {

      el.classList.add('isMoving')

      isMove = true

      document.addEventListener("mousemove", drag, true);
      document.addEventListener("mouseup", stopDrag, true);

      const react = modal?.getBoundingClientRect() as DOMRect

      initialX = e.clientX - react.left;
      initialY = e.clientY - react.top;
    }
  }


  // Add focus to the modal when it open
  modal && modal.focus()
}

export { dragModal }
