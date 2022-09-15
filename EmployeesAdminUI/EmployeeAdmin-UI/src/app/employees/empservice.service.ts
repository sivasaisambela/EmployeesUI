import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/api-models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmpserviceService {

  private baseAPIUrl='https://localhost:44386';

  constructor(private httpClient: HttpClient)
  {

  }

  getEmployees() : Observable<Employee[]>
  {
    return this.httpClient.get<Employee[]>(this.baseAPIUrl+'/employees')
  }

}
