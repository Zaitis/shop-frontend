import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/modules/common/service/jwt.service';

@Component({
  selector: 'app-fullpageadmin',
  templateUrl: './fullpageadmin.component.html',
  styleUrls: ['./fullpageadmin.component.scss']
})
export class FullpageadminComponent implements OnInit {

  constructor(
    private router: Router,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.jwtService.logout();
    this.router.navigate(['/admin/login']);
  }
}