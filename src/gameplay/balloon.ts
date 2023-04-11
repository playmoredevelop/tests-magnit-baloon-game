import { AnimatedSprite, Texture } from 'pixi.js'
import { BALLOON_SCALE_MAX, BALLOON_SCALE_MIN, BALLOON_SPEED_MAX, BALLOON_SPEED_MIN, BALLOON_TINT_COLORS, PRIZE, WINNER_PRIZE } from '../settings'
import { randBetween } from './functions'
import { sound } from '@pixi/sound'

export class Balloon extends AnimatedSprite {

    public movespeed: number
    public variant: number
    public prize: number = 0
    public sin: number = randBetween(0, 1)
    protected isBurst: boolean = false

    constructor(textures: Texture[]) {

        super(textures)

        this.animationSpeed = 1.7
        this.loop = false

        this.on('pointertap', () => {
            this.burst = true
            sound.play(`balloon${Math.round(randBetween(1,2))}`)
            WINNER_PRIZE.value += this.prize
            console.info(this.tint, 'payment:', this.prize, 'total:', WINNER_PRIZE.value)
        })
    }

    get burst(): boolean {
        return this.isBurst
    }

    set burst(on: boolean) {
        this.isBurst = on
        this.eventMode = on ? 'none' : 'dynamic'
        this.cursor = on ? null : 'pointer'
        on ? this.gotoAndPlay(0) : this.gotoAndStop(0)
    }

    public reset(w: number, h: number, winner: number): void {

        this.variant = Math.floor(Math.random() * BALLOON_TINT_COLORS.length)
        this.prize = (this.variant === winner) ? PRIZE : 0
        this.tint = BALLOON_TINT_COLORS[this.variant]
        this.scale.set(randBetween(BALLOON_SCALE_MIN, BALLOON_SCALE_MAX))
        this.movespeed = randBetween(BALLOON_SPEED_MIN, BALLOON_SPEED_MAX)
        this.position.set(randBetween(0, w - this.width), h)
        this.gotoAndStop(0)
        this.visible = true
        this.burst = false
    }

    public move(dt: number): void {
        if (this.destroyed) return
        if (this.isBurst) return
        this.position.y -= this.movespeed * dt
        this.position.x += Math.sin(this.position.y / 100) / 2
        this.rotation = Math.cos(this.position.x / 10) / 10
    }

}