import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slide',
  standalone: true,
  templateUrl: './slide.html',
  styleUrl: './slide.css'
})
export class Slide implements AfterViewInit {
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
