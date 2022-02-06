import { Component, OnInit } from '@angular/core';
import { DbService, IPeper } from '../db.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  pepers: Array<IPeper> = [];
  constructor(private db: DbService) { }

  unarchive(index: number) {
    this.pepers[index].archive = false;
    this.db.table("pepers").update(this.pepers[index].milli, {archive: false})
    .then(data => this.pepers.splice(index, 1))
    .catch(err => console.log(err.message));
  }
  delete(index: number) {
    this.db.table("pepers").delete(this.pepers[index].milli)
    .then(data => this.pepers.splice(index, 1))
    .catch(err => console.log(err.message));
  }

  getPepers() {
    //.where('archive').equalsIgnoreCase("true")
    this.db.table("pepers").filter(pep => {
      return pep.archive;
    }).toArray()
    .then(data => this.pepers = data)
    .catch(err => console.log(err.message));
  }
  ngOnInit(): void {
    this.db.openMyDB();
    this.getPepers();
  }

}
