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
    console.log(id)
    this.newTaskList.forEach((obj: ToDoList) => {
      if(obj.id == id[0]) {
        this.task = obj.task;
        this.priority = obj.priority;
      }
    });

    let post = {id: id[0], task: this.task, priority: +this.priority, done: id[1]};

    this.data.updatePost(post, id[0]).subscribe( (res: ToDoList) => { 
      
      this.newTaskList.forEach((obj: ToDoList) => {
        if(obj.id == id[0]) {
          obj.task = res.task;
          obj.priority = res.priority;
          obj.done = res.done;
        }
      });

    });
    this.task = undefined;
    this.priority = undefined;
  }


}
