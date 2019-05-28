import { Component, OnInit, Input, Output, EventEmitter, OnChanges, DoCheck} from '@angular/core';
import { PostService } from './../post.service';
import { ToDoList } from './../type';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit, DoCheck{
  
  @Input() todo: ToDoList;
  @Output() deleteItem = new EventEmitter<number>();
  @Output() changeDone = new EventEmitter<[]>();

  myclass: string;
  taskDone: string;

  constructor(private data: PostService) { }

  ngDoCheck(){
  }

  ngOnInit() {
    this.taskDone = this.getdone();
    this.myclass = this.getMyclass();
  }

  

  getdone(){
    if(this.todo.done == 0){return 'doneNot'}
    else{return 'done'}
  }

  getMyclass(){
    if(this.taskDone == 'done'){return "grey";}
    else{return this.numToColor(this.todo.priority);}
  }

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

  taskDoneMeth(id:number): void {
    let idanddone:any = [];
    idanddone[0] = id;

    console.log('this.todo.done='+this.todo.done);

    if (this.todo.done == 0){
      idanddone[1] = 1;
    }
    if (this.todo.done == 1){
      idanddone[1] = 0;
    }
  
    this.changeDone.emit(idanddone);

    if (this.todo.done == 0){
      this.todo.done = 1;
      console.log('0 this.todo=');
      console.log(this.todo);
    }
    else{
      this.todo.done = 0;
      console.log('1 this.todo=');
      console.log(this.todo);
    }

    this.taskDone = this.getdone();
    this.myclass = this.getMyclass();

    console.log('this.todo=');
    console.log(this.todo);
    console.log(this.todo.done);
    console.log(this.taskDone);
    console.log(this.myclass);
  }

  delTask(id) {
    this.deleteItem.emit(id);
  }


}
