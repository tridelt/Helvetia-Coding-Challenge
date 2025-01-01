import {Component, OnInit, Signal} from '@angular/core';
import {ServerService} from '../../services/server';
import {ServerListComponent} from '../../components/server-list/server-list.component';
import {Server} from '../../shared/models/server';
import {MatDialog} from '@angular/material/dialog';
import {AddServerModalComponent} from '../../shared/components/add-server-modal/add-server-modal.component';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-server-overview',
  imports: [
    ServerListComponent,
    MatButton,
    FormsModule,
  ],
  templateUrl: './server-overview.component.html',
  standalone: true,
  styleUrl: './server-overview.component.scss'
})
export class ServerOverviewComponent implements OnInit {

  servers!: Signal<Server[]>;

  constructor(private serverService: ServerService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.servers = this.serverService.servers;
  }

  openServerModal() {
    const dialogRef = this.dialog.open(AddServerModalComponent);

    dialogRef.afterClosed().subscribe((resultPartial: Omit<Server, 'id'>) => {
      if (resultPartial) {
        this.serverService.addServer(resultPartial);
      }
    });
  }

}
