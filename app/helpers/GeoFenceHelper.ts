import {Injectable} from "@angular/core";
import {GeoFenceCoordinate} from "../classes/GeoFenceCoordinate";

@Injectable()
export class GeoFenceHelper {

  getGeoFence() {
    // Latitude is y in this equation
    var geofence = [
      { y: 36.130903, x: -94.147311 },
      { y: 36.130552, x: -94.147298 },
      { y: 36.130603, x: -94.146577 },
      { y: 36.130940, x: -94.146644 }
    ];
  
    return geofence;
  }
  
  // Given an array of bounds and a lat/lng point, determines whether or not that point is within those bounds
  // Returns 1 or 0
  isWithinFence(bounds, lat, lng) {
    //https://rosettacode.org/wiki/Ray-casting_algorithm
    var count = 0;
    for (var b = 0; b < bounds.length; b++) {
      var vertex1 = bounds[b];
      var vertex2 = bounds[(b + 1) % bounds.length];
      if (west(vertex1, vertex2, lng, lat))
        ++count;
    }
    return count % 2;
  
    /**
     * @return {boolean} true if (x,y) is west of the line segment connecting A and B
     */
    function west(A, B, x, y) {
      if (A.y <= B.y) {
        if (y <= A.y || y > B.y ||
          x >= A.x && x >= B.x) {
          return false;
        } else if (x < A.x && x < B.x) {
          return true;
        } else {
          return (y - A.y) / (x - A.x) > (B.y - A.y) / (B.x - A.x);
        }
      } else {
        return west(B, A, x, y);
      }
    }
  }

  isWithinFence2(bounds, lat, lng) {
    //https://rosettacode.org/wiki/Ray-casting_algorithm
    var count = 0;
    for (var b = 0; b < bounds.length; b++) {
      var vertex1 = bounds[b];
      var vertex2 = bounds[(b + 1) % bounds.length];
      if (west(vertex1, vertex2, lng, lat))
        ++count;
    }
    return count % 2;
  
    /**
     * @return {boolean} true if (x,y) is west of the line segment connecting A and B
     */
    function west(A, B, longitude, latitude) {
      if (A.latitude <= B.latitude) {
        if (latitude <= A.latitude || latitude > B.latitude ||
          longitude >= A.longitude && longitude >= B.longitude) {
          return false;
        } else if (longitude < A.longitude && longitude < B.longitude) {
          return true;
        } else {
          return (latitude - A.latitude) / (longitude - A.longitude) > (B.latitude - A.latitude) / (B.longitude - A.longitude);
        }
      } else {
        return west(B, A, longitude, latitude);
      }
    }
  }

}
