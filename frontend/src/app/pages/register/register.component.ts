import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  constructor(private _route: ActivatedRoute) {}
  ngOnInit(): void {
    console.log(this._route.snapshot.queryParamMap.get('role'))
  }
  //crear reactive form
}