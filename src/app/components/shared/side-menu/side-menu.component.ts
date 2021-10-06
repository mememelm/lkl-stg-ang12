import { User } from './../../../constants/models/user';
import { ControllerService } from './../../../services/controller.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  user!: User

  @Output() emitSelection = new EventEmitter<string>()

  listMenu = [
    { title: 'Dashboard', icon: 'dashboard', page: 'dashboard', read: ['ADMIN', 'AGENCY', 'COMPANY'] },
    { title: 'Agences', icon: 'house', page: 'agency', read: ['ADMIN'] },
    { title: 'Compagnies', icon: 'maps_home_work', page: 'company', read: ['ADMIN', 'AGENCY'] },
    { title: 'Véhicules', icon: 'local_shipping', page: 'vehicle', read: ['ADMIN', 'AGENCY', 'COMPANY'] },
    { title: 'Majoration tarif', icon: 'paid', page: 'paid', read: ['ADMIN', 'AGENCY', 'COMPANY'] },
    { title: 'Itinéraires', icon: 'edit_road', page: 'itinerary', read: ['ADMIN', 'AGENCY', 'COMPANY'] },
    { title: 'Villes', icon: 'location_on', page: 'city', read: ['ADMIN', 'AGENCY', 'COMPANY'] },
    { title: 'Réservation', icon: 'event_seat', page: 'reservation', read: 'COMPANY' }
  ]
  constructor(public ctrl: ControllerService) { }

  ngOnInit(): void {
    this.user = this.ctrl.storage.user()
  }

  select(page: string) {
    this.emitSelection.emit(page)
  }

}
