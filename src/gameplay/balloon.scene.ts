import { BALLOON_SCREEN_COUNT, BALLOON_TINT_COLORS, BALLOON_BURST_ALLOWED, BASE_URL, PRELOADER_PROGRESS, WINNER_PRIZE, BURST_LEFT, SHOW_RESULTS } from "../settings";
import { Assets, Container, ICanvas, Sprite, Spritesheet, Texture } from "pixi.js";
import { isMobile, isRetina, randBetween } from "./functions";
import { Balloon } from './balloon'
import { sound } from '@pixi/sound'

export interface IScene extends Container {
    preload(): Promise<void>
    adaptive(view: ICanvas): void
    show(view: ICanvas): Promise<void>
    draw(dt: number, view: ICanvas): void
}

export class BalloonsScene extends Container implements IScene {

    protected backdrop: Sprite
    protected balloons: Array <Balloon> = []
    protected started: boolean = false
    protected assets: { backdrop: Texture, balloon: Spritesheet }
    protected winner: number = 0

    async preload(): Promise<void> {

        // retina desktop -> desktop -> retina mobile -> mobile
        const suffix = isRetina() && !isMobile() ? '@2x' : isMobile() && !isRetina() ? '@0.5x' : '@1x'

        Assets.add('balloon', `${BASE_URL}/baloon${suffix}.json`)
        Assets.add('backdrop', `${BASE_URL}/backdrop.jpg`)
        sound.add('balloon1', `${BASE_URL}/balloon1.mp3`)
        sound.add('balloon2', `${BASE_URL}/balloon2.mp3`)
        sound.add('congrat', `${BASE_URL}/congrat.mp3`)

        this.assets = await Assets.load(['balloon', 'backdrop'], progress => {
            PRELOADER_PROGRESS.value = progress * 100
        }) as typeof this.assets

        await Assets.loadBundle('sounds')
    }

    async show(view: ICanvas): Promise<void> {

        BURST_LEFT.value = BALLOON_BURST_ALLOWED

        this.backdrop = new Sprite(await Assets.load('backdrop'))
        this.backdrop.width = view.width
        this.backdrop.height = view.height
        this.addChild(this.backdrop)

        this.winner = Math.floor(Math.random() * BALLOON_TINT_COLORS.length)
        
        this.balloons = Array(BALLOON_SCREEN_COUNT).fill(0).map(b => {
            const balloon = new Balloon(this.assets.balloon.animations['explo'])
            balloon.reset(view.width, randBetween(view.height, view.height * 1.5), this.winner)
            balloon.onComplete = () => {
                balloon.visible = false
                balloon.variant === this.winner && this.payment(balloon)
                balloon.reset(view.width, view.height, this.winner)
                BURST_LEFT.value --
            }
            this.addChild(balloon)
            return balloon
        })
        
        console.log(this.winner, this.balloons)
        this.started = true

    }

    public draw(dt: number, view: ICanvas): void {

        if (!this.started) return

        for (const balloon of this.balloons) {
            balloon.move(dt)
            if (balloon.position.y <= -balloon.height) {
                balloon.reset(view.width, view.height, this.winner)
            } 
        }

        if (BURST_LEFT.value <= 0) {
            this.started = false
            this.balloons.map(b => b.burst = true)
            sound.play('congrat')
            SHOW_RESULTS.value = true
        }

    }


    public adaptive(view: ICanvas): void {}

    protected payment(balloon: Balloon): void {
        WINNER_PRIZE.value += balloon.prize
        console.info('payment:', balloon.prize, 'total:', WINNER_PRIZE.value)
    }

}