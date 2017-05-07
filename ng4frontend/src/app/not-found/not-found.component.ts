import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  private returnUrl: string;

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router) {
    this.returnUrl = this._activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit() {
  }

  backToLastPage(){
    this._router.navigate([this.returnUrl]);
  }

}
