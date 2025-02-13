import { PlayerStats } from "../../../../../src/game/simulation/objects/PlayerStats.js";
import { Button } from "../gui/Button.js";

const font: string = "november";

export class EndScene extends Phaser.Scene {
    gameOverText: Phaser.GameObjects.BitmapText;
    enemiesKilledText: Phaser.GameObjects.BitmapText;
    timeInGameText: Phaser.GameObjects.BitmapText;
    mainMenuButton: Button;

    private recs: Phaser.GameObjects.Rectangle[];
    private speed: number[];
    private colors: number[];

    private bac: Phaser.GameObjects.Rectangle;


    constructor() {
        super({ key: "EndScene" });
        this.recs = [];
        this.speed = [];
        this.colors = [0xff0000, 0x00ff00, 0x0000ff];
    }

    init(stats: PlayerStats): void {
        let height = this.cameras.main.height;
        let width = this.cameras.main.width;

        this.recs = [];
        this.speed = [];
        for (let i = 0; i < 40; i++) {
            this.recs.push(new Phaser.GameObjects.Rectangle(this, ranRan(width), ranRan(height), ranRan(200) + 20, ranRan(50) + 10, this.colors[ranRan(3)], Math.random()));
            this.recs[i].setOrigin(0, 0);
            this.speed.push(ranRan(2) + 5);
            this.add.existing(this.recs[i]);
        }

        this.bac = new Phaser.GameObjects.Rectangle(this, width / 2 - 200, height / 2 - 300, 400, 400, 0x000000);
        this.bac.setOrigin(0, 0);
        this.bac.setStrokeStyle(2, 0xffffff);
        this.add.existing(this.bac);

        const winner: string = "You win!";
        const loser: string = "You lose!";
        const winLoseText: string = stats.finishPlace === 1 ? winner : loser;
        this.gameOverText = this.add.bitmapText(0, 100, font, winLoseText, 70);
        this.gameOverText.setX((this.sys.canvas.width / 2) - (this.gameOverText.getTextBounds().local.width / 2));

        this.enemiesKilledText = this.add.bitmapText(0, 200, font, "Enemies killed: " + stats.enemiesKilled, 20);
        this.enemiesKilledText.setX((this.sys.canvas.width / 2) - (this.enemiesKilledText.getTextBounds().local.width / 2));

        const min: number = Math.floor(stats.secondsInGame / 60);
        const sec: number = Math.round(stats.secondsInGame - (min * 60));
        this.timeInGameText = this.add.bitmapText(0, 240, font, "Time in game: " + min + " minutes " + sec + " seconds", 20);
        this.timeInGameText.setX((this.sys.canvas.width / 2) - (this.timeInGameText.getTextBounds().local.width / 2));

        this.mainMenuButton = new Button(
            this,
            (this.sys.canvas.width / 2) - 100,
            350,
            200,
            55,
            font,
            "Main Menu",
            30
        );

        this.mainMenuButton.addOnClickListener(() => {
            this.scene.start("MainMenuScene");
        });
    }

    public update(): void {
        let height = this.cameras.main.height;
        let width = this.cameras.main.width;

        for (let i = 0; i < 40; i++) {
            this.recs[i].x += this.speed[i];
            if (this.recs[i].x > width + this.recs[i].width) {
                this.recs[i].x = 0 - this.recs[i].width;
                this.recs[i].y = ranRan(height);
            }
        }
    }
}


function ranRan(range: number): number {
    return Math.floor(Math.random() * range);
}