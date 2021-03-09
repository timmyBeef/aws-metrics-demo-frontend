import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ROUTES } from '../../menu';

// 預設側邊選單
const misc: any = {
  sidebar_mini_active: true,
};

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  public adminVersion = false;
  username: string;

  constructor(
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // this.adminVersion = this.configService.envConfig.adminVersion;
    console.log('SidebarComponent get adminVersion:', this.adminVersion);
    // this.adminVersion = environment.adminVersion;

    this.menuItems = ROUTES.filter((menuItem) => menuItem);

    const body = document.getElementsByTagName('body')[0];
    body.classList.add('sidebar-mini');
  }
  sleep(milliseconds) {
    const start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if (new Date().getTime() - start > milliseconds) {
        break;
      }
    }
  }
  myFunc(event) {
    this.isCollapsed = !this.isCollapsed;

    event.preventDefault();
    event.stopPropagation();
    this.sleep(10);
    // if (menuitem.isCollapsing === undefined) {
    //   menuitem.isCollapsing = true;

    //   // menuitem.isCollapsed = !menuitem.isCollapsed;

    //   let element = event.target;
    //   while (
    //     element.getAttribute('data-toggle') != 'collapse' &&
    //     element != document.getElementsByTagName('html')[0]
    //   ) {
    //     element = element.parentNode;
    //   }
    //   element = element.parentNode.children[1];

    //   if (
    //     element.classList.contains('collapse') &&
    //     !element.classList.contains('show')
    //   ) {
    //     element.classList = 'before-collapsing';
    //     let style = element.scrollHeight;

    //     element.classList = 'collapsing';
    //     setTimeout(function () {
    //       element.setAttribute('style', 'height:' + style + 'px');
    //     }, 1);
    //     setTimeout(function () {
    //       element.classList = 'collapse show';
    //       element.removeAttribute('style');
    //       menuitem.isCollapsing = undefined;
    //     }, 350);
    //   } else {
    //     let style = element.scrollHeight;
    //     setTimeout(function () {
    //       element.setAttribute('style', 'height:' + (style + 20) + 'px');
    //     }, 3);
    //     setTimeout(function () {
    //       element.classList = 'collapsing';
    //     }, 3);
    //     setTimeout(function () {
    //       element.removeAttribute('style');
    //     }, 20);
    //     setTimeout(function () {
    //       element.classList = 'collapse';
    //       menuitem.isCollapsing = undefined;
    //     }, 400);
    //   }
    // }
  }
  minimizeSidebar() {
    const body = document.getElementsByTagName('body')[0];
    if (body.classList.contains('sidebar-mini')) {
      misc.sidebar_mini_active = true;
    } else {
      misc.sidebar_mini_active = false;
    }
    if (misc.sidebar_mini_active === true) {
      body.classList.remove('sidebar-mini');
      misc.sidebar_mini_active = false;
      this.showSidebarMessage('隱藏選單...');
    } else {
      body.classList.add('sidebar-mini');
      this.showSidebarMessage('顯示選單...');
      misc.sidebar_mini_active = true;
    }

    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(function () {
      window.dispatchEvent(new Event('resize'));
    }, 180);

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(function () {
      clearInterval(simulateWindowResize);
    }, 1000);
  }

  showSidebarMessage(message) {
    this.toastr.show(
      '<span class="now-ui-icons ui-1_bell-53"></span>',
      message,
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-danger alert-with-icon',
        positionClass: 'toast-top-right',
      }
    );
  }
}
