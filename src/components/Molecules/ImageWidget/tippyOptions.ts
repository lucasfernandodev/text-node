import {Instance} from 'tippy.js'

export const ImageWidgetTippyOptions = {
  onCreate(instance: Instance) {
    if (instance) {
      instance.setProps({
        placement: 'top',
      })
      instance.setProps({maxWidth: ''})
    }
  }
}