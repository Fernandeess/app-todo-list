import { Component } from '@angular/core';
import { TaskList } from '../../model/task-list';
import { first, last } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

public iconTrash ='../../../../../assets/icons/icon-trash.svg'
public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]');

constructor() { }
ngOnInit(): void {

}

public validationInput(event:string,index:number):void{
if(!event.length){
 const confirm = window.confirm('Task esta vazia, deseja realmente deletar?');
 if(confirm){
  this.deleteTask(index);
 }
}

}
ngDoCheck(): void {
this.taskList.sort((first,last) => Number(first.checked) - Number(last.checked));
this.setLocalStorage()
}

public setEmitTaskList(event:string):void{

  this.taskList.push({task:event, checked:false});

}

public setLocalStorage() {
  if (this.taskList) {
    this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked));
    localStorage.setItem('list', JSON.stringify(this.taskList));
  }
}

public deleteTask(event:number):void{

  this.taskList.splice(event,1);
}

public deleteAllTasks():void{
  const confirmDelete = window.confirm('Deseja realmente excluir todas as tarefas?');
    if(confirmDelete){
      this.taskList = [];
    }
}

}
