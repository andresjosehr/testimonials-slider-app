import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Testimony } from 'src/app/interfaces/testimony';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService {

  constructor(
    private httClient: HttpClient
  ) { }

  getTestimonials(): Observable<Array<Testimony>>{

    return this.httClient.get<Array<Testimony>>(`${environment.apiUri}/testimonials`);

  }
  
}
