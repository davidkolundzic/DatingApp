import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterContentInit, AfterViewInit, Component, HostBinding, Inject, OnInit } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { map, of } from 'rxjs';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { InfoService } from './_services/info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit, AfterContentInit{
  themePath = 'assets/themes';
  @HostBinding('class') classRoot = 'theme-secondary';
  title = 'The Dating App';
  users: any;
 

  constructor(
    private accountService: AccountService,
    @Inject(DOCUMENT) private document: Document,
    private infoService: InfoService
    ) {}

  ngOnInit() {
  }
  ngAfterViewInit(): void {
      
  }
  ngAfterContentInit(): void {      
   
      
  }

  setCurrrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }
  switchTheme(theme: string) {
    const headEl = this.document.getElementsByTagName('head')[0];

    const newLinkEl = this.document.createElement('link');
      newLinkEl.rel = 'stylesheet';
      newLinkEl.id = 'client-theme';
      newLinkEl.href = `${this.themePath}/${theme}.css`;
      headEl.appendChild(newLinkEl);
  }
}
