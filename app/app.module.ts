import * as platform from "platform";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppComponent } from "./app.component";
import { MapComponent } from "./components/map/map.component";


declare var GMSServices: any;
if (platform.isIOS) { 
  GMSServices.provideAPIKey("AIzaSyDXnGSYoNpTVZomRB89suzEJtzyZilKNsg");
}

@NgModule({
  declarations: [AppComponent, MapComponent],
  bootstrap: [AppComponent],
  imports: [NativeScriptModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
