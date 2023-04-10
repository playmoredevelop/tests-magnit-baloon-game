import { Assets, Container, Sprite } from "pixi.js";
import { PRELOADER_PROGRESS } from "../datamapper";
import { isMobile, isRetina } from "./agent";
import { Balloon } from './balloon'
import { GameplaySettings, IScene } from "./declare";

export class BalloonsScene extends Container implements IScene {

    protected backdrop: Sprite
    protected balloons: Array <Balloon> = []

    async preload(defaults: GameplaySettings): Promise<void> {

        // retina desktop -> desktop -> retina mobile -> mobile
        const suffix = isRetina() && !isMobile() ? '@2x' : isMobile() && !isRetina() ? '@0.5x' : '@1x'

        Assets.add('balloon', `${defaults.baseurl}/baloon${suffix}.json`)
        Assets.add('backdrop', `${defaults.baseurl}/backdrop.jpg`)

        await Assets.load(['balloon', 'backdrop'], progress => {
            PRELOADER_PROGRESS.value = progress * 100
        })
    }

    async show(): Promise<void> {

        this.backdrop = new Sprite(await Assets.load('backdrop'))
        this.backdrop.scale.set(1.1)

        this.addChild(this.backdrop)
    }

    draw(dt: number): void {
    }


    adaptive(viewport: HTMLElement): void {
        
    }


}