import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit{

  public linkTheme = document.querySelector('#theme');
  public links = document.querySelectorAll('.selector');

  ngOnInit(): void {
    this.checkCurrentTheme();
    this.links = document.querySelectorAll('.selector');
  }

  changeTheme(theme:string){
    const url = `./assets/css/colors/${theme}.css`;

    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {

    this.links.forEach(elem => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if( btnThemeUrl === currentTheme) {
        elem.classList.add('working');
      }
    })
  }

}
