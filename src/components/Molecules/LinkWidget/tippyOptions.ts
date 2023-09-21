import { Instance } from 'tippy.js'

export const LinkWidgetTippyOptions = {
  onCreate(instance: Instance) {
    if (instance) {
      instance.setProps({
        placement: 'bottom',
      })

    }
  }, onMount(instance: Instance) {
    if (instance) {
      const editor = document.querySelector('.tn-editor')
      if (editor && instance.popperInstance) {
        const react = editor.getBoundingClientRect()
        const selfWidth = 290
        const posRight = instance.popper.getBoundingClientRect().right
        const centered = selfWidth / 2

        if (posRight > react.width) {
          instance.popperInstance.state.styles.popper = {
            ...instance.popperInstance?.state.styles.popper,
            marginLeft: `-${centered + (posRight - react.width) + 24}px`
          }
        } else {
          if ((instance.popper.getBoundingClientRect().right - centered) > selfWidth) {
            instance.popperInstance.state.styles.popper = {
              ...instance.popperInstance?.state.styles.popper,
              marginLeft: `-${centered}px`
            }
          }
        }
        instance.popperInstance?.forceUpdate()
      }
    }
  }
}