import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  notifications = [
    {
      id: 1,
      title: 'New message from John',
      content: 'Hey, how are you doing?',
      date: new Date('2023-10-01'),
      type: 'message',
      read: false
    },
    {
      id: 2,
      title: 'New comment on your post',
      content: 'Great post! I really enjoyed it.',
      date: new Date('2023-10-02'),
      type: 'comment',
      read: true
    },
    {
      id: 3,
      title: 'New like on your post',
      content: 'Someone liked your post.',
      date: new Date('2023-10-03'),
      type: 'like',
      read: false
    },
  ]
  constructor() { }

  getNotifications() {
    return this.notifications;
  }
}
