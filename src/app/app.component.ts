import { Component } from '@angular/core';
import { ToDoList } from './type';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  newTaskList: ToDoList[]
  levelsPriority: number[] = [1,2,3];
  task:string = '';
  priority:number = undefined;
  done: Number = 0;
  

  constructor(                        
    private data: PostService
  ) {}

 ngOnInit() { 
    this.data.getPost().subscribe( (posts: ToDoList[]) => {
      this.newTaskList = posts;
    })    
  }
 

  addNewTask(): void {
    if (this.task == '' || this.priority == undefined){return}
    let post = {/*id: Math.max(...this.newTaskList.map(i => i.id))+1, */task: this.task, priority: +this.priority, done: 0};
    this.data.createPost(post).subscribe( (res: ToDoList) => {
      this.newTaskList.push(res);
      this.task = '';
      this.priority = undefined;
    })
  }

  deleteTask(id){
    this.data.deletePost(id).subscribe( _ => {
      this.newTaskList = this.newTaskList.filter((t) => t.id !== id);
    })
  }

  editDone(id){
    
    this.newTaskList.forEach((obj: ToDoList) => {
      if(obj.id == id) {
        this.task = obj.task;
        this.priority = obj.priority;
        if(obj.done == 0){
          this.done = 1;
        }
      }
    });
    let post = {/*id: id, */task: this.task, priority: +this.priority, done: this.done};

    this.data.updatePost(post, id).subscribe( (res: ToDoList) => { 
      this.newTaskList.forEach((obj: ToDoList) => {
        if(obj.id == id) {
          //obj = Object.assign({}, obj);
          obj.task = res.task;
          obj.priority = res.priority;
          obj.done = res.done;
        }
      });

    });
    this.task = undefined;
    this.priority = undefined;
    this.done = 0;

    /*this.data.getPost().subscribe( (posts: ToDoList[]) => {
      this.newTaskList = posts;
    })
    console.log(this.newTaskList)*/
  }


}
