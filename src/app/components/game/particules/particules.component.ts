import { Component, Input } from '@angular/core';
import { tsParticles, OutMode, Engine, Container, Size } from "tsparticles-engine";
import { loadFull } from "tsparticles";

@Component({
  selector: 'app-particules',
  templateUrl: './particules.component.html',
  styleUrls: ['./particules.component.scss']
})
export class ParticulesComponent {

  @Input() startEventWinner = false;

  baseEmitterConfig(direction: any, position: any) {
    return {
      direction,
      rate: {
        quantity: 25,
        delay: 0.8
      },
      size: {
        width: 0,
        height: 0
      },
      spawnColor: {
        value: "#ff0000",
        animation: {
          h: {
            enable: true,
            offset: {
              min: 20,
              max: 60
            },
            speed: 4,
            sync: false
          },
          l: {
            enable: true,
            offset: {
              min: 40,
              max: 60
            },
            speed: 0,
            sync: false
          }
        }
      },
      position
    };
  };

  // Config paticules options
  particlesOptions = {
    particles: {
      angle: {
        value: 0,
        offset: 10
      },
      move: {
        enable: true,
        outModes: {
          top: OutMode.none,
          default: OutMode.destroy,
        },
        gravity: {
          enable: true
        },
        speed: { min: 1, max: 10 },
        decay: 0.01
      },
      number: {
        value: 0,
        limit: 100
      },
      opacity: {
        value: 1
      },
      shape: {
        type: ["circle", "square", "triangle"]
      },
      size: {
        value: { min: 2, max: 18 },
        animation: {
          count: 1,
          enable: true,
          speed: 1,
          sync: true
        }
      },
      rotate: {
        value: {
          min: 0,
          max: 360
        },
        direction: "random",
        animation: {
          enable: true,
          speed: 20
        }
      },
      tilt: {
        direction: "random",
        enable: true,
        value: {
          min: 0,
          max: 360
        },
        animation: {
          enable: true,
          speed: 40
        }
      },
      roll: {
        darken: {
          enable: true,
          value: 25
        },
        enable: true,
        speed: {
          min: 15,
          max: 25
        }
      },
      wobble: {
        distance: 30,
        enable: true,
        speed: {
          min: -15,
          max: 15
        }
      },
    },
    emitters: [
      this.baseEmitterConfig("topRight", { x: 0, y: 2 }),
      this.baseEmitterConfig("topLeft", { x: 100, y: 2 })
    ]
  };

  particlesLoaded(container: Container): void {
    this.particlesInit(tsParticles);
  }

  async particlesInit(engine: Engine): Promise<void> {
    await loadFull(engine);

    let container = await tsParticles.load(this.particlesOptions);

    setTimeout(() => {
      container?.destroy();
    }, 5000);
  }

}