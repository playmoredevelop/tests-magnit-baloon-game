import { Application, Container, ICanvas, IRenderer } from 'pixi.js'
import { PRELOADER_VISIBLE, VIEWPORT_ID } from '../settings'
import { IScene } from './balloon.scene'

declare const window: Window & {
    __PIXI_STAGE__: Container<IScene>
    __PIXI_RENDERER__: IRenderer<ICanvas>
}

export default class Gameplay extends Application {

    declare stage: Container<IScene>
    declare resizeTo: HTMLElement

    protected resizeTimeout: number = 0

    constructor(){

        super({
            antialias: false,
            autoStart: false,
            hello: false,
            sharedTicker: false,
            resizeTo: document.getElementById(VIEWPORT_ID),
            resolution: window.devicePixelRatio || 1
        })

        window.__PIXI_STAGE__ = this.stage
        window.__PIXI_RENDERER__ = this.renderer
    }

    public adaptive(): void {

        clearTimeout(this.resizeTimeout)

        setTimeout(() => {
            this.renderer.resize(this.resizeTo.offsetWidth, this.resizeTo.offsetHeight)
            this.stage.children.map(scene => scene.adaptive(this.resizeTo))
            console.log('adaptive', this.resizeTo.offsetWidth, this.resizeTo.offsetHeight)
        }, 30)
    }

    async run(scene: IScene): Promise <void> {

        PRELOADER_VISIBLE.value = true

        window.onresize = this.adaptive.bind(this)

        await scene.preload()
        this.stage.addChild(scene)
        this.ticker.add(dt => scene.draw(dt, this.resizeTo))

        this.view.style && (this.view.style.touchAction = 'auto')
        this.resizeTo.append(this.view as unknown as Node)
        
        this.adaptive()
        this.start()

        PRELOADER_VISIBLE.value = false

        await scene.show(this.resizeTo)
    }
}
