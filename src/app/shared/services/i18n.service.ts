import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  
  public readonly supportedLanguages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' }
  ];

  private currentLanguageSubject = new BehaviorSubject<Language>(this.supportedLanguages[0]);
  public currentLanguage$: Observable<Language> = this.currentLanguageSubject.asObservable();

  constructor() {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    const savedLanguage = localStorage.getItem('app-language');
    if (savedLanguage) {
      const language = this.supportedLanguages.find(lang => lang.code === savedLanguage);
      if (language) {
        this.currentLanguageSubject.next(language);
      }
    }
  }

  public getCurrentLanguage(): Language {
    return this.currentLanguageSubject.value;
  }

  public setLanguage(languageCode: string): void {
    const language = this.supportedLanguages.find(lang => lang.code === languageCode);
    if (language) {
      this.currentLanguageSubject.next(language);
      localStorage.setItem('app-language', languageCode);
      
      // In a real implementation, you would reload the app with the new locale
      // For now, we'll just update the current language
      console.log(`Language changed to: ${language.name}`);
    }
  }

  public getLanguageCode(): string {
    return this.getCurrentLanguage().code;
  }

  public isCurrentLanguage(languageCode: string): boolean {
    return this.getCurrentLanguage().code === languageCode;
  }
} 