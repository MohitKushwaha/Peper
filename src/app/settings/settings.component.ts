import { Component, OnInit } from '@angular/core';
import { DbService, IProfile } from '../db.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  pepersCount: number = 0;
  activeCount: number = 0;
  archivedCount: number = 0;

  savingVisi: boolean = false;
  saveVisi: boolean = false;

  profile: IProfile = {email: 'Your Email', name: 'Your Name'};
  constructor(private db: DbService) { }

  update() {
    let eleRef: HTMLDivElement = document.getElementById("name") as HTMLDivElement;
    if((eleRef.textContent as string).trim().length > 0) {
      if(eleRef.textContent !== "Your Name")
        this.db.table("profile").update(this.profile.email, {name: eleRef.textContent})
        .then(data => {
          this.savingVisi = true;
          setTimeout(() => {
            this.savingVisi = false;
            this.saveVisi = true;
            setTimeout(() => this.saveVisi = false, 500);
          }, 500);
        })
        .catch(err => console.log(err.message));
    } else {
      if(this.profile.name.length > 0) eleRef.textContent = this.profile.name;
      else eleRef.textContent = "Your Name";
    }
  }
  getProfile() {
    this.db.table("profile").offset(0).toArray()
    .then(data => {
      if(data.length > 0) this.profile = data[0];
    })
    .catch(err => console.log(err.message));
  }
  getPepers() {
    this.db.table("pepers").orderBy('milli').reverse().toArray()
    .then(data => {
      this.pepersCount = data.length;
      data.forEach(p => {
        if(p.archive) this.archivedCount++;
        else this.activeCount++;
      })
    })
    .catch(err => console.log(err.message));
  }
  ngOnInit(): void {
    this.db.openMyDB();
    this.getProfile();
    this.getPepers();
  }

}
