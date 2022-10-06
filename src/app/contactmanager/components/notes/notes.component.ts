import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Note } from "../../models/note";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Observable } from "rxjs";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";

@Component({
     selector: 'app-notes',
     templateUrl: './notes.component.html',
     styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, AfterViewInit {
     user!: Observable<User | null>
     displayedColumns: string[] = ['id', 'title', 'date'];
     dataSource!: MatTableDataSource<Note>

     @ViewChild(MatPaginator) paginator!: MatPaginator
     @ViewChild(MatSort) sort!: MatSort;

     constructor (private userService: UserService) {
          this.user = this.userService.user$
          this.user.subscribe(user => {
               if (user) this.dataSource = new MatTableDataSource<Note>(user.notes)
          })
     }

     ngOnInit (): void {

     }

     ngAfterViewInit (): void {
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
     }

     applyFilter(event: Event) {
          const filterValue = (event.target as HTMLInputElement).value;
          this.dataSource.filter = filterValue.trim().toLowerCase();
     }


}
