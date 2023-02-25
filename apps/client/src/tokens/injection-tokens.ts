/* eslint-disable @typescript-eslint/naming-convention */
import { InjectionToken } from '@angular/core';

export const LOCAL_STORAGE = new InjectionToken<Storage>('LOCAL_STORAGE');
export const SESSION_STORAGE = new InjectionToken<Storage>('SESSION_STORAGE');
export const WINDOW = new InjectionToken<Window>('WINDOW');
