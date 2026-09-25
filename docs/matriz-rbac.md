# Matriz de Roles y Permisos (RBAC)

| Rol | crear | consultar | modificar | eliminar | aprobar | ver_auditoria | gestionar_usuarios | asignar_roles |
|---|---|---|---|---|---|---|---|---|
| ADMINISTRADOR | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| GERENTE | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| SUPERVISOR | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| EMPLEADO | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| AUDITOR | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| INVITADO | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |