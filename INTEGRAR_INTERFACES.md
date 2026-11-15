# Integrar 4 interfaces en Agenda Familiar

Pega esto en Claude Code, abierto en `H:\ia\bionic\agenda\familia-agenda-app`.
Maqueta interactiva de referencia: https://claude.ai/artifact/3ToRQtxEM1fKEiZ8bUC8K1
(pestañas Nexo Mando, Casa, Rueda, Carriles; el código está en el propio HTML).

## Objetivo
Sustituir el interruptor «Interfaz nueva (Nexo)» por un selector de interfaz con 5 opciones:
Clásica (por defecto, intacta), Nexo Mando, Casa, Rueda y Carriles.
Todas deben dar acceso a todas las funciones y reutilizar las pantallas actuales como contenido.

## Reglas
- Todo lo que lee el usuario, en español.
- Conservar los saltos de línea de cada archivo (CRLF/LF mezclados). Nunca ejecutar `dart format lib`.
- Usar la herramienta Write para archivos largos, no heredocs.
- Skills a usar: `frontend-design`, `ui-ux-pro-max`; después `design:design-critique` y `a11y-enforcer` (contraste y zonas táctiles).
- Al terminar: `flutter analyze` limpio y `flutter test --dart-define=DEMO=true` en verde. Probar en la demo web (ver abajo).
- No publicar con `./compilar.sh --subir` sin que yo lo confirme.

## Pasos
1. **Preferencia:** en `lib/theme/tema_controller.dart` reemplazar `aj_nexo` (bool) por `aj_interfaz` (String: `clasica|nexo|casa|rueda|carriles`). Migrar: si `aj_nexo` era true, valor `nexo`. Mantener el getter `interfazNueva` mientras se migra.
2. **Ajustes:** en `lib/screens/settings_screen.dart` cambiar el `SwitchListTile` por un selector de 5 opciones al inicio de Apariencia.
3. **Punto de entrada:** en `lib/screens/home_screen.dart`, `_scaffold` devuelve la interfaz elegida con el mismo `PopScope` y los mismos parámetros que hoy recibe `NexoScreen` (`familiaId`, `persona`, `personas`, `nombreFamilia`, `abrirAjustes`, `hablar`, `modulos`). Añadir un `InterfazHost` que elija el widget.
4. **Nuevos archivos** en `lib/screens/interfaces/`, reutilizando de Nexo `_C`, `_Cristal`, `_Titulo`, `_BotonRedondo`, `_Fondo` y `_MarcoModulo` (sacarlos a un archivo común si hace falta):
   - `casa_screen.dart`
   - `rueda_screen.dart`
   - `carriles_screen.dart`
5. **Nexo Mando:** ya existe. Solo comprobar que las losetas llegan a todas las secciones (Agenda con eventos/tareas/turnos/ranking/paga, Compras con lista/tiendas/habituales, Menú, Mapa, Chat, Familia, Ajustes) y al dictado.

## Casa
Plano de la casa como menú (cuadrícula con paredes). Habitaciones:
- Cocina: Compras (lista, tiendas, habituales) y Menú.
- Salón: Agenda (eventos, turnos) y Chat.
- Cuartos: Agenda (tareas, ranking, paga).
- Despacho: Familia y Ajustes.
- Entrada: Mapa.
Cada habitación muestra un resumen vivo («4 por comprar») y los avatares de quien está allí. Al tocarla se abre con pestañas para sus funciones; el contenido es la pantalla actual sin su cabecera. Debajo del plano, una fila «Fuera de casa» que abre el mapa.

## Rueda
Rueda en la parte baja (semicírculo grande con centro bajo el borde de la pantalla), al alcance del pulgar. 14 posiciones: Hoy, Eventos, Tareas, Turnos, Ranking, Paga, Lista, Tiendas, Habituales, Menú, Mapa, Chat, Familia, Ajustes. Se gira arrastrando (0,3 grados por píxel, paso de 21 grados, con imán a la posición más cercana) o tocando un icono. Los iconos se mantienen derechos al girar. Arriba, título, contador «n / 14» y el contenido de la sección. Micrófono en el centro de la rueda. «Hoy» es un resumen: siguiente cita y contadores.

## Carriles
Matriz: una fila por persona más una fila «Casa»; siete columnas (hoy y los 6 días siguientes). Primera columna fija al desplazar en horizontal. Capas activables: Citas, Tareas, Turnos. Cada celda muestra puntos con el número de citas y tareas y la letra del turno (M, T, N, L). Tocar una celda abre una hoja inferior con el día de esa persona y un formulario para añadirle cita o tarea. Tocar un nombre abre su ficha: ubicación y batería, puesto en el ranking, tareas pendientes, paga, y accesos a Mapa y Chat. La fila «Casa» muestra la comida de cada día y, al tocar, la cena, con accesos a Menú y Compras. Debajo, atajos a Compras, Menú, Mapa, Chat, Familia y Ajustes.

## Orden de voz y barra de órdenes
La barra de órdenes de Nexo ya entiende «añade leche y pan» y «cita …». Ampliar para abrir cualquier sección por nombre («turnos», «paga», «tiendas», «menú», «mapa»…) y que cada interfaz navegue a su equivalente (habitación, posición de la rueda o pantalla completa).

## Probar en la demo web
```bash
flutter build web --release --dart-define=DEMO=true --output <carpeta>
python -m http.server 8766 --directory <carpeta>
```
En la consola del navegador, antes de recargar:
```js
localStorage.setItem('flutter.aj_interfaz','"rueda"');  // clasica | nexo | casa | rueda | carriles
```
La demo guarda los datos en memoria: hay que crear una familia en cada recarga.

## Pendiente de probar en móvil real
Botón atrás de Android, micrófono, arrastre de la Rueda con el pulgar, hoja inferior de Carriles.
