import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from './../post.service';
import { ToDoList } from './../type';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  
  @Input() todo: ToDoList;
  @Output() deleteItem = new EventEmitter<number>();
  @Output() changeDone = new EventEmitter<number>();


  //newTaskList: ToDoList[];
  myclass: string;
  taskDone: string;

  constructor(private data: PostService) { }

  ngOnInit() {

    this.data.getPost().subscribe( (posts: ToDoList[]) => {
      /*this.newTaskList = posts;
      this.todo = this.newTaskList[this.todo.id - 1];*/
      this.todo = posts[this.todo.id - 1];
    }) 
    
    this.taskDone = this.getdone();
    this.myclass = this.getMyclass();
    
    console.log(this.todo);
    console.log(this.todo.done);
    console.log(this.taskDone);
    console.log(this.myclass);
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

  taskDoneMeth(id): void {
    if (this.taskDone !='done'){
      //this.taskDone = 'done';
      //this.myclass = "grey"
    }
    else{
      //this.taskDone = 'doneNot';
      //this.myclass = this.numToColor(this.todo.priority);
    }
    this.changeDone.emit(id);
  }

  delTask(id) {
    this.deleteItem.emit(id);
  }


}
