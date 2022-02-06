import { Component, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { DbService, IPeper } from '../db.service';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  subscribeVal: Subscription = new Subscription;
  pepers: Array<IPeper> = [];
  constructor(private db: DbService, private tasks: TasksService) { }

  newPeper() {
    let date: number = Date.now();
    this.pepers.splice(0, 0, {email: 'mohit@gmail.com', milli: date, heading: '', content: '', archive: false, latest: date});
    this.db.table("pepers").put({email: 'mohit@gmail.com', milli: date, heading: '', content: '', archive: false, latest: date})
    .then(data => console.log("Put Success"))
    .catch(err => console.log(err.message));
  }
  update(event: any, milli: number, field: string) {
    (document.getElementById(milli + "saving") as HTMLDivElement).style.display = "grid";
    this.db.table("pepers").update(milli, {[field]: event.target.outerText})
    .then(data => {
      setTimeout(() => {
        try {
          (document.getElementById(milli + "saving") as HTMLDivElement).style.display = "none";
          (document.getElementById(milli + "saved") as HTMLDivElement).style.display = "grid";
          setTimeout(() => {
            try {
              (document.getElementById(milli + "saved") as HTMLDivElement).style.display = "none";
            } catch(err) {return;}
          }, 500);
        } catch(err) {return;}
      }, 500);
    })
    .catch(err => console.log(err.message));
  }
  archive(index: number) {
    this.pepers[index].archive = true;
    this.db.table("pepers").update(this.pepers[index].milli, {archive: true})
    .then(data => this.pepers.splice(index, 1))
    .catch(err => console.log(err.message));
  }
  delete(index: number) {
    this.db.table("pepers").delete(this.pepers[index].milli)
    .then(data => this.pepers.splice(index, 1))
    .catch(err => console.log(err.message));
  }

  getPepers() {
    this.db.table("pepers").orderBy('milli').filter(pep => {
      return !pep.archive;
    }).reverse().toArray()
    .then(data => this.pepers = this.pepers.concat(data))
    .catch(err => console.log(err.message));
  }
  ngOnInit(): void {
    this.db.openMyDB();
    this.getPepers();
    
    this.subscribeVal = this.tasks.getNewPeper().subscribe(status => {
      if(status) {
        this.newPeper();
        this.tasks.setNewPeper(false);
      }
    })
  }
  ngOnDestroy(): void {
    this.subscribeVal.unsubscribe();
  }

}