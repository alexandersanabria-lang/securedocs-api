# SecureDocs API

Sistema de gestión de documentos con control de acceso **RBAC + ABAC**, desarrollado para el curso de Seguridad en la Nube (caso TechCorp S.A.).

## Stack

- Node.js + Express
- Almacenamiento en memoria (arrays JS, sin base de datos externa)
- Autenticación con JWT

## Instalación

```bash
git clone https://github.com/alexandersanabria-lang/securedocs-api.git
cd securedocs-api
npm install
node server.js
```

El servidor arranca en `http://localhost:3000`.

## Estructura del proyecto

src/
├── data/ # Usuarios, documentos y matriz de roles (en memoria)
├── auth/ # Autenticación JWT (login, logout, middleware)
├── rbac/ # Motor de permisos por rol
├── abac/ # Motor de políticas por atributos (8 políticas)
├── middlewares/ # Autorización combinada RBAC + ABAC
├── audit/ # Registro de auditoría
└── routes/ # Endpoints HTTP


## Endpoints principales

| Método | Ruta | Descripción | Protección |
|---|---|---|---|
| POST | `/auth/login` | Iniciar sesión | Pública |
| POST | `/auth/logout` | Cerrar sesión | JWT |
| GET | `/auth/perfil` | Ver usuario autenticado | JWT |
| POST | `/documentos` | Crear documento | JWT + RBAC |
| GET | `/documentos` | Listar documentos | JWT + RBAC |
| GET | `/documentos/:id` | Consultar documento | JWT + RBAC + ABAC |
| PUT | `/documentos/:id` | Modificar documento | JWT + RBAC + ABAC |
| DELETE | `/documentos/:id` | Eliminar documento | JWT + RBAC + ABAC |
| POST | `/documentos/:id/aprobar` | Aprobar documento | JWT + RBAC + ABAC |
| GET | `/auditoria` | Ver registro de auditoría | JWT + RBAC |

## Headers de prueba (solo para evaluación de políticas ABAC)

| Header | Uso | Valores |
|---|---|---|
| `x-dispositivo` | Simula el tipo de dispositivo (Política 6) | `CORPORATIVO` / cualquier otro valor = personal |
| `x-hora-test` | Simula la hora de acceso (Política 4); sin él usa la hora real del servidor | `0` a `23` |

## Usuarios de prueba

| Correo | Contraseña | Rol | Departamento |
|---|---|---|---|
| admin@techcorp.com | admin123 | ADMINISTRADOR | TI |
| laura.gomez@techcorp.com | gerente123 | GERENTE | FINANZAS |
| carlos.ruiz@techcorp.com | super123 | SUPERVISOR | FINANZAS |
| ana.torres@techcorp.com | emp123 | EMPLEADO | FINANZAS |
| pedro.ramos@techcorp.com | emp123 | EMPLEADO | RRHH |
| jorge.paredes@techcorp.com | emp123 | EMPLEADO | FINANZAS (Chile) |
| sofia.vega@techcorp.com | aud123 | AUDITOR | AUDITORIA |
| marco.diaz@externo.com | inv123 | INVITADO | EXTERNO |
| rosa.medina@techcorp.com | susp123 | EMPLEADO (INACTIVO) | FINANZAS |

## Documentación adicional

- [Matriz RBAC](docs/matriz-rbac.md)
- [Matriz de políticas ABAC](docs/matriz-abac.md)
- [Arquitectura](docs/arquitectura.md)
- [Modelo de datos](docs/modelo-datos.md)