import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  @Output() emitSelection = new EventEmitter<string>()

  listMenu = [
    { title: 'Dashboard', icon: 'dashboard', page: 'dashboard' },
    { title: 'Ville', icon: 'location_on', page: 'city' },
    { title: 'Agence', icon: 'house', page: 'agency' },
    { title: 'Compagnies', icon: 'maps_home_work', page: 'company' },
    { title: 'Itinéraire', icon: 'edit_road', page: 'itinerary' },
    { title: 'Véhicule', icon: 'local_shipping', page: 'vehicle' },
    { title: 'Affectation', icon: 'receipt_long', page: 'assignment' },
    { title: 'Réservation', icon: 'event_seat', page: 'reservation' }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  select(page: string) {
    this.emitSelection.emit(page)
  }

}
