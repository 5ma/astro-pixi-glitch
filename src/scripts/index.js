import { DotFilter, GlitchFilter } from 'pixi-filters';
import { Container, Application, Sprite } from 'pixi.js';

class GlitchAnimation {
  constructor({...props}) {
    this.elm = document.querySelector(props.wrapper)
    this.elmRect = this.elm.getBoundingClientRect()
    this.stage = document.getElementById(props.stage)
    this.padding = 50

    this.app = new Application({
      width: this.elmRect.width + this.padding * 2,
      height: this.elmRect.height + this.padding * 2,
      resolution: window.devicePixelRatio || 1,
      view: this.stage,
      backgroundAlpha: 0,
      autoDensity: true
    });

    this.sprite = Sprite.from(props.img)
    this.container = new Container()
    this.container.addChild(this.sprite)
    this.setSize()

    this.setFilter()
    this.app.stage.addChild(this.container)
  }
  setFilter() {
    this.GlitchFilter = new GlitchFilter()
    this.GlitchFilter.slices = 20
    this.GlitchFilter.offset = 3
    this.GlitchFilter.red = [1, 1]
    this.GlitchFilter.blue = [-1, -1]
    this.GlitchFilter.green = [0, 0]
    this.GlitchFilter.enabled = true

    this.DotFIlter = new DotFilter()
    this.DotFIlter.scale = 50
    this.DotFIlter.grayscale = false
    this.DotFIlter.enabled = true

    this.container.filters = [this.GlitchFilter, this.DotFIlter]

    let counter = 0
    this.app.ticker.add(() => {
      counter++
      const r1 = Math.random()
      const r2 = Math.random() * 9

      this.GlitchFilter.red = [5 - r2, -3]
      this.GlitchFilter.blue = [2 - r2, 1]
      this.GlitchFilter.green = [0 - r2, 2]

      if (counter % 4 === 0 && r1 > 0.6 || counter % 50 === 0) {
        this.GlitchFilter.refresh()
      }
    })
  }
  setSize() {
    const width = this.elmRect.width
    const height = this.elmRect.height

    this.sprite.anchor.set(0.5)
    this.sprite.width = width
    this.sprite.height = height

    this.app.renderer.resize(width + this.padding * 2, height + this.padding * 2);

    this.sprite.x = this.app.screen.width / 2
    this.sprite.y = this.app.screen.height / 2
  }
}

const logoGLitch = new GlitchAnimation({
  img: 'logo-unite.png',
  wrapper: '[data-pixi-logo]',
  stage: 'js-pixi-stage'
});

window.addEventListener('resize', () => {
  logoGLitch.setSize()
})