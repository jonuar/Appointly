import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface Notification {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private notificationSubject = new Subject<Notification | null>();
    public notification$: Observable<Notification | null> = this.notificationSubject.asObservable();

    show(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', duration: number = 5000): void {
        this.notificationSubject.next({ message, type, duration });

        if (duration > 0) {
            setTimeout(() => {
                this.clear();
            }, duration);
        }
    }

    success(message: string): void {
        this.show(message, 'success');
    }

    error(message: string): void {
        this.show(message, 'error');
    }

    warn(message: string): void {
        this.show(message, 'warning');
    }

    info(message: string): void {
        this.show(message, 'info');
    }

    clear(): void {
        this.notificationSubject.next(null);
    }
}
