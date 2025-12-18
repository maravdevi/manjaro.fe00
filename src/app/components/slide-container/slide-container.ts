import { Component } from '@angular/core';

import { Cover } from '../cover/cover';
import { Slide } from '../slide/slide';

@Component({
  selector: 'app-slide-container',
  standalone: true,
  imports: [Slide, Cover],
  templateUrl: './slide-container.html',
  styleUrl: './slide-container.css'
})
export class SlideContainer {}
