# Matriz de Políticas ABAC

| # | Política | Regla | Aplica a |
|---|---|---|---|
| 1 | Departamento | usuario.departamento == documento.departamento | consultar, modificar, eliminar, aprobar |
| 2 | Nivel de seguridad | usuario.nivel_seguridad >= documento.nivel_confidencialidad | consultar, modificar, eliminar, aprobar |
| 3 | Propiedad | usuario.id == documento.propietario (excepto GERENTE/ADMIN) | modificar |
| 4 | Horario | Si nivel_confidencialidad >= 4: solo 08:00-18:00 | consultar, modificar, eliminar, aprobar |
| 5 | País | Si documento.pais == PERU: usuario.pais == PERU | consultar, modificar, eliminar, aprobar |
| 6 | Dispositivo | Si nivel_confidencialidad >= 4: dispositivo == CORPORATIVO | consultar, modificar, eliminar, aprobar |
| 7 | Estado del usuario | usuario.estado == ACTIVO | todas |
| 8 | Invitados | tipo_contrato==EXTERNO AND nivel_confidencialidad<=1 AND estado==PUBLICADO | consultar |