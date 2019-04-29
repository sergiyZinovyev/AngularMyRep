import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular';
  hi = 'Hello';
  newTaskList = [
    {
      task: "first task",
      priority: 1
    },
    {
      task: "second task",
      priority: 2
    },
    {
      task: "next task #1",
      priority: 3
    },
    {
      task: "next task #2",
      priority: 3
    },
    {
      task: "next task #3",
      priority: 3
    },
    {
      task: "next task #4",
      priority: 1
    }

  ]
}
