export const SafeBaseElement =
  typeof HTMLElement !== 'undefined'
    ? HTMLElement
    : (class {} as CustomElementConstructor)

export const register =
  typeof customElements !== 'undefined'
    ? (name: string, Element: new () => HTMLElement) => {
        if (customElements.get(name) === undefined) {
          customElements.define(name, Element)
        }
      }
    : () => {}
