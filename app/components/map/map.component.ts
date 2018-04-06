import {Component, ViewChild} from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import { MapView, Marker, Position, Polygon } from 'nativescript-google-maps-sdk';


// Important - must register MapView plugin in order to use in Angular templates
registerElement('MapView', () => MapView);

@Component({
    moduleId: module.id,
    selector: 'map',
    templateUrl: 'map.html',
    styleUrls: ['map.css'],
})
export class MapComponent {

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

    constructor() {
      //console.log('Hit constructor for map component')
    }

    //Map events
    onMapReady(event) {
        //console.log('Map Ready');

        this.mapView = event.object;
        this.mapView.myLocationEnabled = true;
        this.mapView.mapAnimationsEnabled = true;

        //console.log("Setting a marker...");

        var marker = new Marker();
        marker.position = Position.positionFromLatLng(36.13066678534348, -94.14689060300589);
        marker.title = "Sharp Hue Office";
        marker.snippet = "Whaddup";
        marker.userData = {index: 1};
        this.mapView.addMarker(marker);
        
        var polygon = new Polygon();
        polygon.addPoints([
            Position.positionFromLatLng(36.13056063404426, -94.14710082113743),
            Position.positionFromLatLng(36.13058310996908, -94.14668440818787),
            Position.positionFromLatLng(36.130804619341774, -94.14671190083027),
            Position.positionFromLatLng(36.130771853324816, -94.14711456745864)
        ]);
        this.mapView.addPolygon(polygon);
        //console.log(JSON.stringify(polygon));

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