import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div class="sk-cube-grid">
      <div
        class="sk-cube"
        *ngFor="let cube of cubes"
        [ngClass]="'sk-cube' + cube"
        [ngStyle]="{ 'background-color': loaderColor }"
        [title]="cube"
      ></div>
    </div>
  `,
  styles: [
    `
      :host {
        display: grid;
        place-items: center;
        height: 100vh;
        overflow: hidden;
        background-color: rgba(255, 255, 255, 0.05);
      }

      .sk-cube-grid {
        display: grid;
        height: 50px;
        width: 50px;
        grid-template: repeat(3, 1fr) / repeat(3, 1fr);
        grid-gap: 1px;
        z-index: 1;
      }

      .sk-cube-grid .sk-cube {
        height: 100%;
        width: 100%;
        -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
        animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
      }

      .sk-cube-grid .sk-cube1 {
        -webkit-animation-delay: 0.2s;
        animation-delay: 0.2s;
      }

      .sk-cube-grid .sk-cube2 {
        -webkit-animation-delay: 0.3s;
        animation-delay: 0.3s;
      }

      .sk-cube-grid .sk-cube3 {
        -webkit-animation-delay: 0.4s;
        animation-delay: 0.4s;
      }

      .sk-cube-grid .sk-cube4 {
        -webkit-animation-delay: 0.1s;
        animation-delay: 0.1s;
      }

      .sk-cube-grid .sk-cube5 {
        -webkit-animation-delay: 0.2s;
        animation-delay: 0.2s;
      }

      .sk-cube-grid .sk-cube6 {
        -webkit-animation-delay: 0.3s;
        animation-delay: 0.3s;
      }

      .sk-cube-grid .sk-cube7 {
        -webkit-animation-delay: 0s;
        animation-delay: 0s;
      }

      .sk-cube-grid .sk-cube8 {
        -webkit-animation-delay: 0.1s;
        animation-delay: 0.1s;
      }

      .sk-cube-grid .sk-cube9 {
        -webkit-animation-delay: 0.2s;
        animation-delay: 0.2s;
      }

      @-webkit-keyframes sk-cubeGridScaleDelay {
        0%,
        70%,
        100% {
          -webkit-transform: scale3D(1, 1, 1);
          transform: scale3D(1, 1, 1);
        }
        35% {
          -webkit-transform: scale3D(0, 0, 1);
          transform: scale3D(0, 0, 1);
        }
      }

      @keyframes sk-cubeGridScaleDelay {
        0%,
        70%,
        100% {
          -webkit-transform: scale3D(1, 1, 1);
          transform: scale3D(1, 1, 1);
        }
        35% {
          -webkit-transform: scale3D(0, 0, 1);
          transform: scale3D(0, 0, 1);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  @Input() loaderColor = '#fff';

  readonly cubes: string[] = [];

  constructor() {
    for (let i = 1; i < 10; i++) {
      this.cubes.push('' + i);
    }
  }
}
