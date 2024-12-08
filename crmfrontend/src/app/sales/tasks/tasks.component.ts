import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  displayedColumns: string[] = ['subject', 'dueDate', 'status', 'priority', 'actions'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private tasksService: TasksService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.tasksService.getAllTasks().subscribe(
      (tasks) => {
        this.dataSource.data = tasks;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => console.error('Error fetching tasks:', error)
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openTaskDialog(task?: any): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '1000px', 
      data: task || {}, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (task) {
          // Updating the task
          this.tasksService.updateTask(task.id, result).subscribe(() => this.fetchTasks());
        } else {
          // create a new task
          this.tasksService.createTask(result).subscribe(() => this.fetchTasks());
        }
      }
    });
  }

  deleteTask(id: number): void {
    this.tasksService.deleteTask(id).subscribe(() => {
      this.fetchTasks(); //imp to refresh
    });
  }
}
