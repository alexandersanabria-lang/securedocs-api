# Arquitectura

​```mermaid
graph TD
    A[Cliente / Postman] --> B[REST API - Express]
    B --> C[Authentication - JWT]
    B --> D[RBAC Service]
    B --> E[ABAC Policy Engine]
    B --> F[Document Service]
    B --> G[Audit Service]
    C --> H[(Datos en memoria)]
    D --> H
    E --> H
    F --> H
    G --> H
​```

Flujo de autorización: Autenticación → Validación RBAC → Validación ABAC → Autorizar/Denegar.