import { Component, OnInit } from '@angular/core';
import { I18nService, Language } from '../../services/i18n.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {

  currentLanguage: Language;
  supportedLanguages: Language[];

  constructor(private i18nService: I18nService) {
    this.supportedLanguages = this.i18nService.supportedLanguages;
    this.currentLanguage = this.i18nService.getCurrentLanguage();
  }

  ngOnInit(): void {
    this.i18nService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }

  selectLanguage(languageCode: string): void {
    this.i18nService.setLanguage(languageCode);
  }
} 