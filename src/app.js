/**
 * @overview Application entry point.
 */

// Global application styles
import 'bootstrap/dist/css/bootstrap.min.css'
import 'src/app.scss';

// Global application jasvascripts
import 'jquery/dist/jquery.min.js'
import 'popper.js/dist/popper.min.js'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

// Angular 2
import 'src/shim';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from 'src/app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
