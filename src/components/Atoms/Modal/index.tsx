import { ComponentProps, ReactNode, Ref, forwardRef } from "react"

interface Props extends ComponentProps<'section'> {
  children: ReactNode
}


const Modal = forwardRef(({ ...props }: Props, ref: Ref<HTMLElement>) => {
  const newStyle = `
      @font-face{
        font-family: 'Merriweather';
        src: url("${chrome.runtime.getURL('/fonts/MerriweatherSans-Regular.ttf')}");
        font-weight: 400;
        font-style: normal
      }

      @font-face{
        font-family: 'Merriweather';
        src: url("${chrome.runtime.getURL('/fonts/MerriweatherSans-Italic.ttf')}");
        font-weight: 400;
        font-style: italic
      }

      @font-face{
        font-family: 'Merriweather';
         src: url("${chrome.runtime.getURL('/fonts/MerriweatherSans-Bold.ttf')}");
        font-weight: 800;
        font-style: normal
      }

      @font-face{
        font-family: 'Merriweather';
        src: url("${chrome.runtime.getURL('/fonts/MerriweatherSans-BoldItalic.ttf')}");
        font-weight: 800;
        font-style: italic
      }

      @font-face{
        font-family: 'Merriweather';
        src: url("${chrome.runtime.getURL('/fonts/MerriweatherSans-Medium.ttf')}");
         font-weight: 500;
        font-style: normal
      }
    `

  return (
    <section ref={ref} aria-modal="true" role="dialog" tabIndex={-1} {...props}>
      <style dangerouslySetInnerHTML={{ __html: newStyle }}></style>
      {props.children}
    </section>
  )
})

export { Modal }
