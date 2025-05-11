import { Component, inject } from '@angular/core';
import { NotificationsService } from './notifications.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-notifications',
  imports: [NgClass],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  selectedTab = 'all';
  notificationService = inject(NotificationsService);
  notifications = this.notificationService.getNotifications();
  filterNotif = this.notifications;

  changeTab(tab: string) {
    this.selectedTab = tab;
    if (tab === 'all') {
      this.filterNotif = this.notifications;
    } else if (tab === 'read') {
      this.filterNotif = this.notifications.filter(notification => notification.read);
    } else if (tab === 'unread') {
      this.filterNotif = this.notifications.filter(notification => !notification.read);
    }
  }
  get unreadNb(): number {
    let nb: number = 0;
    this.notifications.forEach(notification => {
      if (!notification.read) {
        nb++;
      }
    });
    return nb;
  }

  get readNb(): number {
    let nb: number = 0;
    this.notifications.forEach(notification => {
      if (notification.read) {
        nb++;
      }
    });
    return nb;
  }
  markNotificationAsRead(id: number) {

  }
}
