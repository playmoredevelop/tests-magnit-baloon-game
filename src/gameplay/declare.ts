import { Container } from "pixi.js"

export type GameplaySettings = {
    id: string
    count: number
    speed: number
    baseurl: string
}

export interface IScene extends Container {
    preload(defaults: GameplaySettings): Promise<void>
    adaptive(viewport: HTMLElement): void
    show(defaults: GameplaySettings): Promise<void>
    draw(dt: number): void
}
