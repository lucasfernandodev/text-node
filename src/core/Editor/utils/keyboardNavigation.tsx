import { Props, Plugin } from 'tippy.js';



export const keyboardNavigation: Plugin<Props> = {
  name: 'keyboardNavigationPlugin',
  defaultValue: true,
  fn({ hide, popper }) {
    let position = 0;

    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement
      const childrens = target.parentNode ? Array.from(target.parentNode.children) as HTMLElement[] : []
      const qtd = childrens.length

      if (e.key === 'Escape') {
        hide();
      }

      if (e.key === 'ArrowUp' && position > 0) {
        position = position - 1
      }

      if (e.key === 'ArrowDown' && position < (qtd - 1)) {
        position = position + 1
      }

      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        childrens.length !== 0 && childrens[position].focus()
      }

    }

    return {
      onCreate(instance) {
        instance.popper.addEventListener('focusout', (event) => {
          if (
            event.relatedTarget &&
            !instance.popper.contains(event.relatedTarget as Node)
          ) {
            instance.hide();
          }
        });
      },
      onShown() {
        const element = popper.querySelector('.slashMenu') as HTMLElement
        element && (element.children[0] as HTMLElement).focus()
        element && element.addEventListener('keydown', onKeyDown);
      },
      onHide() {
        position = 0
        const element = popper.querySelector('.slashMenu') as HTMLElement
        element && element.removeEventListener('keydown', onKeyDown);
      },
    };
  },
};
