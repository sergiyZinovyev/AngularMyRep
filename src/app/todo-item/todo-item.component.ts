import { Component, OnInit, Input } from '@angular/core';
//import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
//import { collectExternalReferences } from '@angular/compiler';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  
  @Input() todo: { task: string, priority: number };

  myclass: string;

  taskDone: string = 'doneNot';

  numToColor (num: number): string{
    let col: string;
    switch(num){
      case 1: col = "red"; break;
      case 2: col = "blue"; break;
      case 3: col = "green"; break;
      default: col = "grey"; break;
    }
    return col;
  }

  taskDoneMeth(): void {
    if (this.taskDone !='done'){
      this.taskDone = 'done';
      this.myclass = "grey"
    }
    else{
      this.taskDone = 'doneNot';
      this.myclass = this.numToColor(this.todo.priority);
    }
  }

  constructor() { }

  ngOnInit() {

    this.myclass = this.numToColor(this.todo.priority);
  
    console.log(this.todo);
    
  
  }
 
}
