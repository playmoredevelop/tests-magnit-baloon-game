import { Application, Container } from 'pixi.js'
// import { sound } from '@pixi/sound'
import { PRELOADER_VISIBLE } from '../datamapper'
import { GameplaySettings, IScene } from './declare'

export default class Gameplay extends Application {

    declare stage: Container<IScene>
    declare resizeTo: HTMLElement

    protected resizeTimeout: number = 0

    readonly defaults: GameplaySettings = {
        id: 'gameplay',
        count: 10,
        speed: 100,
        baseurl: '/src/assets'
    }

    constructor(settings: Partial<GameplaySettings> = {}){

        super({
            antialias: false,
            autoStart: false,
            hello: false,
            sharedTicker: false,
            // resolution: window.devicePixelRatio || 1
        })

        Object.assign(this.defaults, settings)

        this.resizeTo = document.getElementById(this.defaults.id)

    }

    public adaptive(): void {

        clearTimeout(this.resizeTimeout)

        setTimeout(() => {
            this.renderer.resize(this.resizeTo.clientWidth, this.resizeTo.clientHeight)
            this.stage.children.map(scene => scene.adaptive(this.resizeTo))
            console.info('gameplay resize adaptive')
        }, 30)
    }

    async run(scene: IScene): Promise <void> {

        PRELOADER_VISIBLE.value = true

        window.onresize = this.adaptive.bind(this)

        await scene.preload(this.defaults)
        this.stage.addChild(scene)
        this.ticker.addOnce(scene.draw)

        this.view.style && (this.view.style.touchAction = 'auto')
        this.resizeTo.append(this.view as unknown as Node)
        
        this.adaptive()
        this.start()

        PRELOADER_VISIBLE.value = false

        await scene.show(this.defaults)
    }
}
