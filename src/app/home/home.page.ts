import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { StorageItem } from '../shared/storage-item';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  list: StorageItem[];
  subscription: any;
  constructor(private storage: Storage, private router: Router,
    private platform: Platform) { }
  ngOnInit(): void {
    this.router.events.subscribe(async (e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.list = await this.storage.get('notes') as StorageItem[];
        console.log(this.list);
      }
    });
  }

  ionViewDidEnter(){
    this.subscription = this.platform.backButton.subscribe(()=>{
        navigator['app'].exitApp();
    });
}

ionViewWillLeave(){
    this.subscription.unsubscribe();
}

  isEmpty() {
    return this.list === undefined || this.list === null;
  }

  trackElement(item) {
    return item.key;
  }

  async updateItem(item) {
    let it = this.list.find((element) => {
      return element === item;
    });
    this.router.navigate(['/edit-note'], {state: {obj: item}});
    
  }

}
