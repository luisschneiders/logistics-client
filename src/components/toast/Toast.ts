import { StatusColor } from '../../enum/StatusColor';

export const toast = (
    message: string,
    color: string = StatusColor.DEFAULT,
    duration: number = 2000,
    position: string = 'top') => {
  const toast: any = document.createElement('ion-toast');
  toast.message = message;
  toast.duration = duration;
  toast.color = color;
  toast.position = position;

  document.body.appendChild(toast);
  return toast.present();
}
