import { Component, ViewChild } from "@angular/core";
import { registerElement } from 'nativescript-angular/element-registry';
import { MapView, Marker, Position, Polygon } from 'nativescript-google-maps-sdk';
import { Page } from "ui/page";
import { GeoFenceHelper } from "./helpers/GeoFenceHelper";


import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "ui/enums"; // used to describe at what accuracy the location should be get

// Important - must register MapView plugin in order to use in Angular templates
//registerElement('MapView', () => MapView);

@Component({
  selector: "my-app",
  providers: [GeoFenceHelper],
  template: `
    <DockLayout stretchLastChild="true">
      <StackLayout dock="bottom" style="padding: 15;">
        <Label text="Latitude: {{latitude}}"></Label>
        <Label text="Longitude: {{longitude}}"></Label>
        <Label text="Within Fence: {{isWithinFence}}"></Label>
      </StackLayout>
      <MapView #mapView [latitude]="latitude" [longitude]="longitude"
        [zoom]="zoom" [minZoom]="minZoom" [maxZoom]="maxZoom" [bearing]="bearing"
        [tilt]="tilt" i-padding="50,50,50,50" [padding]="padding" (mapReady)="onMapReady($event)"
        (markerSelect)="onMarkerEvent($event)" (markerBeginDragging)="onMarkerEvent($event)"
        (markerEndDragging)="onMarkerEvent($event)" (markerDrag)="onMarkerEvent($event)"
        (markerInfoWindowTapped)="onMarkerEvent($event)" (coordinateTapped)="onCoordinateTapped($event)"
        (cameraChanged)="onCameraChanged($event)">
      </MapView>
    </DockLayout>
  `
})
export class AppComponent {

  // Map fields
  latitude =  36.130682;
  longitude = -94.146918;
  zoom = 19;
  minZoom = 0;
  maxZoom = 22;
  bearing = 0;
  tilt = 0;
  padding = [40, 40, 40, 40];
  mapView: MapView;
  lastCamera: String;

  // Geofence fields
  geoFence: any;
  isWithinFence: number;

  constructor(private page: Page, private geoFenceHelper: GeoFenceHelper) {
    page.actionBarHidden = true;

    // Get initial geofence
    this.geoFence = geoFenceHelper.getGeoFence();

    // Initially asks for permission
    geolocation.enableLocationRequest()
      .then(() => {
        var watchId = geolocation.watchLocation(
          (result) => {
            this.latitude = result.latitude;
            this.longitude = result.longitude;
            this.isWithinFence = geoFenceHelper.isWithinFence(this.geoFence, this.latitude, this.longitude);
          },
          () => {},
          { 
            iosAllowsBackgroundLocationUpdates: true,
            desiredAccuracy: Accuracy.high,
            maximumAge: 5000, 
            timeout: 20000
          }
        );
      })
  }

  onMapReady(event) {
    this.mapView = event.object;
    this.mapView.myLocationEnabled = true;
    this.mapView.mapAnimationsEnabled = true;

    var marker = new Marker();
    marker.position = Position.positionFromLatLng(36.13066678534348, -94.14689060300589);
    marker.title = "Sharp Hue Office";
    marker.snippet = "Whaddup";
    marker.userData = {index: 1};
    this.mapView.addMarker(marker);
    
    // Draw the geofence on the map
    var polygon = new Polygon();
    var positions = this.geoFence.map(coord => Position.positionFromLatLng(coord.y, coord.x));
    polygon.addPoints(positions);
    this.mapView.addPolygon(polygon);
  }

  onCoordinateTapped(args) {
      //console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
  }

  onMarkerEvent(args) {
      //console.log("Marker Event: '" + args.eventName
          //+ "' triggered on: " + args.marker.title
          //+ ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
  }

  onCameraChanged(args) {
      //console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
      this.lastCamera = JSON.stringify(args.camera);
  }
}

// iOS Google Maps api key
// AIzaSyDXnGSYoNpTVZomRB89suzEJtzyZilKNsg

// Android Google Maps api key
// AIzaSyDvtaGhwBvs5El335qB1DAvXj5ax-WCqLs