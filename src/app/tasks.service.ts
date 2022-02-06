import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private newPeper$: BehaviorSubject<boolean> = new BehaviorSubject(false as boolean);

  constructor() { }

  setNewPeper(status: boolean) {
    this.newPeper$.next(status);
  }
  getNewPeper(): Observable<boolean> {
    return this.newPeper$;
  }
}
