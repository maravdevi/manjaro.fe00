import { AfterViewInit, Component, ElementRef, ViewChild, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  title = signal('manjaro.fe00');

  @ViewChild('bgVideo')
  private bgVideo?: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    queueMicrotask(() => this.tryPlay());
  }

  private tryPlay(): void {
    const video = this.bgVideo?.nativeElement;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.loop = true;

    void video.play();
  }
}
