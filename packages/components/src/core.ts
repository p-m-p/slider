export const SafeBaseElement =
  typeof HTMLElement === 'undefined'
    ? (class {} as CustomElementConstructor)
    : HTMLElement

export const register =
  typeof customElements === 'undefined'
    ? () => {}
    : (name: string, Element: new () => HTMLElement) => {
        if (customElements.get(name) === undefined) {
          customElements.define(name, Element)
        }
      }
