import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private route: Router, private tasks: TasksService) { }

  new() {
    this.tasks.setNewPeper(true);
    this.navigate("/");
  }
  navigate(r: string) {
    this.route.navigateByUrl(r);
  }
  ngOnInit(): void { }

}
