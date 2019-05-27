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
  @Output() changeDone = new EventEmitter<number>();

  myclass: string;
  taskDone: string;

  constructor(private data: PostService) { }

  ngDoCheck(){
    /*this.data.getPost().subscribe( (posts: ToDoList[]) => {
      this.todo = posts[this.todo.id-1];
      console.log(posts[this.todo.id-1]);
    })
    
    this.taskDone = this.getdone();
    this.myclass = this.getMyclass();*/
  }

  ngOnInit() {

    /*this.data.getPost().subscribe( (posts: ToDoList[]) => {
      this.todo = posts[this.todo.id-1];
      console.log(posts[this.todo.id-1]);
    })*/
    
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

  taskDoneMeth(id): void {
    /*if (this.todo.done == 0){
      this.todo.done = 1;
      //this.myclass = "grey"
    }
    if (this.todo.done == 1){
      this.todo.done = 0;
      //this.myclass = this.numToColor(this.todo.priority);
    }

    let post = {id: this.todo.id, task: this.todo.task, priority: +this.todo.priority, done: this.todo.done};
    //let post = {id: id, task: 'test', priority: 3, done: 1};
    this.data.updatePost(post, id).subscribe( (posts: ToDoList[]) => {
      this.todo = posts[id-1];
    });

    /*this.data.getPost().subscribe( (posts: ToDoList[]) => {
      this.todo = posts[this.todo.id-1];
    })*/
    
    /*this.taskDone = this.getdone();
    this.myclass = this.getMyclass();
    
    console.log(this.todo);
    console.log(this.todo.done);
    console.log(this.taskDone);
    console.log(this.myclass);*/

    this.changeDone.emit(id);

    this.data.getPost().subscribe( (posts: ToDoList[]) => {
      this.todo = posts[this.todo.id-1];
      this.taskDone = this.getdone();
      this.myclass = this.getMyclass();
      console.log('posts[this.todo.id-1]=');
      console.log(posts[this.todo.id-1]);
      console.log('this.todo=');
      console.log(this.todo);
      console.log(this.todo.done);
      console.log(this.taskDone);
      console.log(this.myclass);
    })
    
    


  }

  delTask(id) {
    this.deleteItem.emit(id);
  }


}
