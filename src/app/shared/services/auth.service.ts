import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  register(user: User): Observable<User> {
    debugger
    return this.http.post<User>('https://stoplight.io/mocks/viktor-stack/test-api-server/11921495/register', user,
      {headers: {'Content-Type': 'application/json', Prefer: 'code=200'}, params: {'API Key': '123'}})
  }
}
