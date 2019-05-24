import { Component } from '@angular/core';
import { ToDoList } from './type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  levelsPriority: number[] = [1,2,3];
  task:string = '';
  priority:number = undefined;
 
  newTaskList: ToDoList[] = [
    {
      id: 1,
      task: "first task",
      priority: 1
    },
    {
      id: 2,
      task: "second task",
      priority: 2
    },
    {
      id: 3,
      task: "next task #1",
      priority: 3
    },
    {
      id: 4,
      task: "next task #2",
      priority: 3
    },
    {
      id: 5,
      task: "next task #3",
      priority: 3
    },
    {
      id: 6,
      task: "next task #4",
      priority: 1
    },
    {
      id: 7,
      task: "next task #5",
      priority: 1
    }
  ]


  addProd(): void {
    if (this.task == '' || this.priority == undefined){return}
    this.newTaskList.push({id: this.newTaskList.length+1, task: this.task, priority: Number(this.priority)})
    this.task = '';
    this.priority = undefined;
  }
}
