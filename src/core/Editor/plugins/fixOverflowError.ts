import { Props, Plugin } from 'tippy.js';

export const fixOverflowErrorPlugin: Plugin<Props> = {
  name: 'fixOverflowError',
  defaultValue: true,

  fn() {

    return {
      onMount(instance) {

        const margin = 48
        const menuHeight = 250
        const wrapperRect = instance.reference.parentElement?.getBoundingClientRect()

        if (instance.popperInstance && wrapperRect) {

          const position = instance.popperInstance.state.rects.reference.y
          const realPosition = position + menuHeight

          if (realPosition > wrapperRect.height) {

            if ((position - menuHeight) < 0) {

              instance.setProps({ placement: 'right' })
              const fixMarginPosition = (wrapperRect.height - realPosition) - margin

              instance.popperInstance.state.styles.popper = {
                ...instance.popperInstance?.state.styles.popper,
                marginTop: `${fixMarginPosition}px`
              }

            } else {
              instance.setProps({ placement: 'right-end' })
            }
          }

          if (realPosition < wrapperRect.height) {
            instance.setProps({ placement: 'right-start' })
          }

          instance.popperInstance?.forceUpdate()
        }

      }
    };
  },
};
