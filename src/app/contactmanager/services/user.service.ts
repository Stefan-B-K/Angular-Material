import { Injectable } from '@angular/core';
import { User } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, catchError, map, throwError } from "rxjs";

@Injectable()
export class UserService {
     usersUrl = 'https://json-server.istef.ml/users-ang-mat'
     private _users = new BehaviorSubject<User[]>([])
     users$ = this._users.asObservable()
     private _user = new BehaviorSubject<User | null>(null)
     user$ = this._user.asObservable()

     constructor (private http: HttpClient) { }

     loadAll () {
          this.http.get<User[]>(this.usersUrl)
               .pipe(
                    catchError(err => (throwError(err)))
               )
               .subscribe(users => this._users.next(users))
     }

     getById (id: number) {
          return this.users$
               .pipe(
                    catchError(err => (throwError(err))),
                    map(users => users.find(user => user.id === id))
               )
               .subscribe(user => {
                    if (user) this._user.next(user)
               })
     }

     addUser(user: User): Promise<User> {
          return new Promise((resolve, reject) => {
               this.http.post(this.usersUrl, user).subscribe(user => {
                    this.loadAll()
                    resolve(user as any)
               })
          })
     }
}


