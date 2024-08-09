import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';
import { IsActiveMatchOptions } from '@angular/router';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})

export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  public initalValue: string = '';
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion(region: Region): void {

    this.isLoading = true;
    this.selectedRegion = region;

    this.countriesService.searchRegion(region)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }

  getButtonText(region: Region): string {
    const regionTexts: { [key in Region]: string } = {
      'Africa': 'África',
      'Americas': 'América',
      'Asia': 'Asia',
      'Europe': 'Europa',
      'Oceania': 'Oceanía',
      '': 'Todas las Regiones'
    };
    return regionTexts[region];
  }
}
