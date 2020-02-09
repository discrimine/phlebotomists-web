import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { MatDialogRef } from '@angular/material/dialog';

import { google } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-search-facility-dialog',
  templateUrl: './search-facility-dialog.component.html',
  styleUrls: ['./search-facility-dialog.component.scss']
})
export class SearchFacilityDialogComponent implements OnInit {

  @ViewChild('search')
  public searchElementRef: ElementRef;

  public latitude: number;
  public longitude: number;
  public zoom: number;
  public address: string;
  private geoCoder;

  constructor(
    private dialogRef: MatDialogRef<SearchFacilityDialogComponent>,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
      this.setCurrentLocation();
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address'],
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.address = place.formatted_address;
          this.zoom = 12;
        });
      });
    });
  }

  public submitLocation(): void {
    this.dialogRef.close({
      address: this.address,
      location: {
        latitude: this.latitude,
        longitude: this.longitude,
      }
    });
  }

  public markerDragEnd($event: MouseEvent | any) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  private setCurrentLocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  private getAddress(latitude, longitude) {
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

}
