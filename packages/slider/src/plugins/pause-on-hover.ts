import type { Plugin, PluginContext } from '../types'

export interface PauseOnHoverPluginOptions {
  resumeOnLeave?: boolean
}

export class PauseOnHoverPlugin implements Plugin {
  readonly name = 'pause-on-hover'
  private readonly resumeOnLeave: boolean
  private wasPlaying = false

  constructor(options?: PauseOnHoverPluginOptions) {
    this.resumeOnLeave = options?.resumeOnLeave !== false
  }

  initialize(context: PluginContext): void {
    context.addListener(context.el, 'pointerenter', () => {
      if (context.options.autoScroll) {
        this.wasPlaying = true
        context.slider.pause()
      }
    })

    context.addListener(context.el, 'pointerleave', () => {
      if (this.resumeOnLeave && this.wasPlaying) {
        this.wasPlaying = false
        context.slider.play()
      }
    })
  }

  destroy(): void {
    this.wasPlaying = false
  }
}

export default PauseOnHoverPlugin
