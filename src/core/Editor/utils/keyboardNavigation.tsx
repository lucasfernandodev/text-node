import { Props, Plugin } from 'tippy.js';



export const keyboardNavigation: Plugin<Props> = {
  name: 'keyboardNavigationPlugin',
  defaultValue: true,
  fn({ hide }) {
    let position = -1;
    let childrens = [] as HTMLElement[]

    function onKeyDown(e: KeyboardEvent) {

      if (e.key === 'Escape') {
        hide();
      }

      if (e.key === 'ArrowUp' && position > 0) {
        position = position - 1
      }

      if (e.key === 'ArrowDown' && position < (childrens.length - 1)) {
        position = position + 1
      }

      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        console.log('childrens', childrens[position])
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
        const menu = document.querySelector('.slashMenu') as HTMLElement
        menu && childrens.length === 0 && childrens.push(...Array.from(menu.children) as HTMLElement[])
        menu && menu.addEventListener('keydown', onKeyDown);
        menu && menu.focus()
      },
      onHide() {
        position = -1
        childrens = []
        const menu = document.querySelector('.slashMenu') as HTMLElement
        menu && menu.removeEventListener('keydown', onKeyDown);
      },
    };
  },
};
