import { AfterContentInit, AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { DOCUMENT } from '@angular/common';
import { InfoService } from '../_services/info.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: true, autoClose: true },
    },
  ],
})
export class NavComponent implements OnInit, AfterViewInit, AfterContentInit {
  model: any = {};
  themePath = 'assets/themes';

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(DOCUMENT) private document: Document,
    private inforService: InfoService
  ) {}
  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
  }


  ngOnInit(): void {
  }

  ngAfterContentInit(): void{
    // var body = this.document.querySelector("#mainApp") as HTMLElement;
    // body.style.display='block'
  }
  
  public get showTheme(){
    return this.inforService.theme;
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/members');
      }
      // },
      // error: (error) => {
      //   console.log(error);
      //   this.toastr.error(error.error);
      // },
    });
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
  loadTheme(theme: string) {
    /**
     * <head>
     *  <link id = "client-theme" rel="stylesheet" type="text/css" href="clent-a.css"> </link>
     * </head>
     */
    
    const existingLinkEl = this.document.getElementById('client-theme') as HTMLLinkElement;
    if (existingLinkEl) {
      existingLinkEl.href = `${this.themePath}/${theme}.css`;
    } 
    else {
      this.switchTheme(theme);
    }

    this.saveInLocalStorage(theme);
  }
  
  switchTheme(theme: string) {
    const headEl = this.document.getElementsByTagName('head')[0];

    const newLinkEl = this.document.createElement('link');
      newLinkEl.rel = 'stylesheet';
      newLinkEl.id = 'client-theme';
      newLinkEl.href = `${this.themePath}/${theme}.css`;
      headEl.appendChild(newLinkEl);
  }
  saveInLocalStorage(theme: string){
    localStorage.setItem('my-theme', theme); 
  }
}
