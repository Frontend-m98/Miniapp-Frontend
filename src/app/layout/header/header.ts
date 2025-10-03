import { Component } from '@angular/core';
import { AboutUsRoutingModule } from '../../modules/about-us/about-us-routing.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AboutUsRoutingModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
