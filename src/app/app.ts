import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header,Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'frontend';
}
