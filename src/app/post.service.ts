import { Injectable } from '@angular/core';
import { ToDoList } from './type';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


const apiUrl = 'https://todoserv.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }


  getPost() {
    return this.http.get(`${apiUrl}/posts`);
  }

  createPost(post) {
    return this.http.post(`${apiUrl}/posts`, post)
    .pipe(
      catchError(this.handleError)
    )
  }

  updatePost(post, id) {
    return this.http.put(`${apiUrl}/posts/${id}`, post)
    .pipe(
      catchError(this.handleError)
    )
  }

  deletePost(id: number) {
    return this.http.delete(`${apiUrl}/posts/${id}`)
    .pipe(
      catchError(this.handleError)
    )
  }

  private handleError(err) {
    console.log('caught mapping error and rethrowing', err);
    return throwError(err);
  }
  

  /*addItem(task: string, priority: number): void {
    this.taskList.push({id: this.taskList.length+1, task: task, priority: Number(priority)})
  }*/

}
