import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  savingVisi: boolean = false;
  saveVisi: boolean = false;
  cancelVisi: boolean = false;
  popupVisi: boolean = false;
  constructor(private db: DbService) { }

  profileCheck() {
    this.db.table("profile").offset(0).toArray()
    .then(data => {
      if(data.length > 0) {
        if(data[0].email.length <= 0) this.popupVisi = true;
      } else this.popupVisi = true;
    })
    .catch(err => console.log(err.message));
  }

  update() {
    let nameVal: string = ((document.getElementById("pop-name") as HTMLInputElement).value).trim();
    let emailVal: string = (document.getElementById("pop-email") as HTMLInputElement).value.trim();
    
    if(nameVal.length > 0 && emailVal.length > 0) 
      this.db.table("profile").put({email: emailVal, name: nameVal})
      .then(data => {
        this.savingVisi = true;
        setTimeout(() => {
          this.savingVisi = false;
          this.saveVisi = true;
          setTimeout(() => this.saveVisi = false, 1000);
          this.cancelVisi = true;
        }, 1000);
      })
      .catch(err => console.log(err.message));
  }
  ngOnInit(): void {
    this.profileCheck();
  }

}
