# Helvetia Take-Home Assignment

Umsetzung der Take-Home-Aufgabe für die Stelle als [Frontend Developer](https://jobs.helvetia.com/offene-stellen/frontend-developer-w-m-d/b51005bf-6e4c-49fe-8948-aa9bb049b0d5).

## How to Run

### Voraussetzungen

- [Docker](https://www.docker.com/products/docker-desktop/)

### Starten des Servers

Um die Anwendung lokal auf `localhost:8080` auszuführen:

```bash
docker compose up
```

## Structure

```
AppComponent
├── HeaderComponent
├── ServeroverviewComponent (Page)
│   └── ServerListComponent (Component B)
│       ├── ServerCardComponent (Component A)
│       ├── ServerCardComponent (Component A)
│       └── ServerCardComponent (Component A)
│       └── ...
└── FooterComponent
```

## Assumptions

- > __"Soll alle Server auflisten und die Validierung für deren Labels steuern."__ Die `ServerCardComponent (Komponente A)` ist lediglich für die Visualisierung zuständig. Jegliche Validierungslogik befindet sich ausschließlich in der `ServerListComponent (Komponente B)`.
- > Die JSON-Struktur wird als repräsentativ für eine geschachtelte interne Struktur von Servern betrachtet.


