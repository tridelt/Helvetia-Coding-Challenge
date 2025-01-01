import {effect, Injectable, signal} from '@angular/core';
import {Server} from '../shared/models/server';

//   read Json File from assets folder
import * as rawServerData from '../../assets/serverdata.json';


@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private localStorageKey = 'helvetia-servers';

  servers = signal<Server[]>(this.loadServers());

  constructor() {
    // ensures that whenever this.servers is updated, these changes are automatically persisted in localStorage
    effect(() => {
      this.persistServersLocally(this.servers());
    });
  }

  // Save servers to localStorage
  private persistServersLocally(servers: Server[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(servers));
  }

  // Add a new server
  addServer(newServerPartial: Omit<Server, 'id'>): void {
    const newServer: Server = {
      ...newServerPartial,
      id: this.generateUniqueId(),
    };
    this.servers.update((current) => [...current, newServer]);
  }


  // Update an existing server
  updateServer(updatedServer: Server): void {
    this.servers.update((currentServers) =>
      currentServers.map((s) =>
        s.id === updatedServer.id ? updatedServer : s
      )
    );
  }


  private loadServers() {
    //   check if was already persisted in localStorage
    const persistedRawServerData = localStorage.getItem(this.localStorageKey)

    if (persistedRawServerData) {
      // if in local storage --> just parse and return
      return JSON.parse(persistedRawServerData);
    } else {
      // if nothing in local storage --> dynamically extract from .json file + add UID
      return this.parseServersFromJson(rawServerData).map(
        (server) => ({
          ...server,
          id: this.generateUniqueId()
        })
      )
    }
  }


  private parseServersFromJson(obj: any, currentPath = ""): Server[] {
    const results: Server[] = [];

    for (const key in obj) {
      if (key === "default") {
        continue;
      }

      const value = obj[key];

      if (key === "server") {
        results.push({
          label: obj[key]['label'],
          active: obj[key]['active'],
          path: currentPath,
          id: this.generateUniqueId(),
        });
      } else if (typeof value === "object" && value !== null) {
        const newPath = currentPath ? `${currentPath}-${key}` : key;
        const nestedResults = Array.isArray(value)
          ? value.flatMap((item, index) => this.parseServersFromJson(item, `${newPath}-${index}`))
          : this.parseServersFromJson(value, newPath);
        results.push(...nestedResults);
      }
    }

    return results;
  }

  private generateUniqueId(): string {
    return `id-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
  }

}
