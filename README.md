# Leaflet.LayerGroup.Conditional / ConditionalLayerGroup

An extension of [Leaflet.LayerGroup](http://leafletjs.com/reference.html#layergroup) that allows you to add layers with conditions on when they should be shown.

A typical use is to render different layers depending on zoom level - e.g. showing a heatmap on low zoom levels and marker on higher zoom levels.

## Requirements
Should work with Leaflet ^1.0.0.'and 2.0

Has been tested with Leaflet 1.7.1, 1.9.2, 1.94 and 2.0.0+-alpha.1

## Demos
<<<<<<< HEAD
* [Different layers depending on zoom level  (Leaflet v.1)](https://solfisk.github.io/Leaflet.LayerGroup.Conditional/examples/zoom.html)
* [Different layers depending on zoom level  (Leaflet v.2)](https://solfisk.github.io/Leaflet.LayerGroup.Conditional/examples/zoom2.html)
=======
* [Different layers depending on zoom level](https://solfisk.github.io/Leaflet.LayerGroup.Conditional/examples/zoom.html)
>>>>>>> 6856e065e74e0278527101124d47d6b32d4bdc1e
* [Heatmap or GeoJSON based on zoom level](https://solfisk.github.io/Leaflet.LayerGroup.Conditional/examples/heatmap.html)

## Usage

### Leaflet v.1

#### HTML
```html
<!-- after Leaflet script -->
<script src="leaflet.layergroup.conditional.js"></script>
```

#### JavaScript
```javascript
    // Create map
    var map = L.map("map");

    // Create a few layers. Could also be LayerGroups. Do not add to map.
    var layer1 = L.circle([55.6867243, 12.5700724], {color: "blue"});
    var layer2 = L.marker([55.6867243, 12.5700724]);

    // Create conditional layergroup.
    // Add layers to it with separate conditions.
    // Add the layer group to the map.
    var layerGroup = L.layerGroup.conditional()
                      .addConditionalLayer((level) => level < 12, layer1)
                      .addConditionalLayer((level) => level >= 12, layer2)
                      .addTo(map);
    
    // Set up a zoom handler to update conditional layers when the user zooms.
    var zoomHandler = function(event) {
       var zoomLevel = map.getZoom();
       layerGroup.updateConditionalLayers(zoomLevel);
    }
    map.on('zoomend', zoomHandler);


    // Set initial state of conditional layers
    layerGroup.updateConditionalLayers(map.getZoom());

```
### Leaflet v.2

```html
<!DOCTYPE html>
<html>
    <head>
        <title>ConditionalLayerGroup</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@2.0.0-alpha.1/dist/leaflet.css"
        crossorigin=""/>
        <script type="importmap">
          {
            "imports": {
              "leaflet": "https://unpkg.com/leaflet@2.0.0-alpha.1/dist/leaflet.js",
              "conditionalLayerGroup": "https://unpkg.com/leaflet-layergroup-conditional@2.0.0/dist/ConditionalLayerGroup.js"

          }
        }
        </script> 
    </head>
    <body>
        <div id="mapid"></div>

        <script type="module" lang="javascript">
            import { LeafletMap, TileLayer, LayerGroup, Circle, Marker, Polygon } from "leaflet";
            import ConditionalLayerGroup from "conditionalLayerGroup";

            // Create map
            const map = new LeafletMap('mapid');

            // Create a few layers. Could also be LayerGroups. Do not add to map.
            const layer1 = new Circle([55.6867243, 12.5700724], {color: "blue"});
            const layer2 = Marker([55.6867243, 12.5700724]);

            // Create conditional layergroup.
            // Add layers to it with separate conditions.
            // Add the layer group to the map.
            const layerGroup = new ConditionalLayerGroup()
                      .addConditionalLayer((level) => level < 12, layer1)
                      .addConditionalLayer((level) => level >= 12, layer2)
                      .addTo(map);
    
            // Set up a zoom handler to update conditional layers when the user zooms.
            const zoomHandler = function(event) {
                var zoomLevel = map.getZoom();
                layerGroup.updateConditionalLayers(zoomLevel);
            }

            map.on('zoomend', zoomHandler);

           // Set initial state of conditional layers
          layerGroup.updateConditionalLayers(map.getZoom());
        </script>
    </body>
</html>
```

### Installing the sub-plugin

#### Local copy

1. Download the [`leaflet.layergroup.conditional.js`](https://solfisk.github.io/Leaflet.LayerGroup.Conditional/leaflet.layergroup.conditional.js) (for Leaflet v.1) or [`ConditionalLayerGroup.js`](https://solfisk.github.io/Leaflet.LayerGroup.Conditional/ConditionalLayerGroup.js) (for Leaflet v.2) file from the latest release.
2. Place the file alongside your page.
3. Add the `script` tag to your page after Leaflet script.

#### npm

1. Add this package to your project:

   ```bash
   npm install leaflet-layergroup-conditional --save
   ```

## API Reference

### Creation

| Factory                                                                           | Description                                                                                              |
| :-------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| **L.layerGroup.conditional**(<Layer[]> layers?, <Object> options?)<br/>**new ConditionalLayerGroup(Layer[] layers?, <Object> options?)**         | Create a conditional layer group, optionally given an initial set of fixed layers and an options object. |

### Methods
Methods are the same as those of [LayerGroup](http://leafletjs.com/reference.html#layergroup), plus

| Method                                                                   | Returns    | Description                                                                                                                      |
| :----------------------------------------------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------- |
| **addConditionalLayer**(`<(Object)=>bool>` function, `<Layer>` layer)    | `this`     | Adds a conditional layer. The `function` is evaluated whenever `updateConditionalLayers()` are called. Optionally, `updateConditionalLayers()` can be called with a single argument which is then passed on to the `function` of each conditional layer. |
| **removeConditionalLayer**(`<Layer>` layer)                              | `this`     | Removes a conditional layer.                                                                                                     |
| **removeConditionalLayer**(`<Number>` id)                                | `this`     | Removes a conditional layer with the specified internal ID.                                                                      |
| **hasConditionalLayer**(`<Layer>` layer)                                 | `bool`     | Returns `true` if the given layer is currently added to the group with a condition, regardless of whether it is currently active |
| **hasConditionalLayer**(`<Number>` id)                                   | `bool`     | Returns `true` if a layer with the given internal ID is currently added to the group with a condition, regardless of whether it is currently active |
| **isConditionalLayerActive**(`<Layer>` layer)                            | `bool`     | Returns `true` if the given layer is currently added to the group with a condition, and is currently active                      |
| **isConditionalLayerActive**(`<Number>` id)                              | `bool`     | Returns `true` if a layer with the given internal ID is currently added to the group with a condition, and is currently active   |
| **clearConditionalLayers**()                                             | `this`     | Removes all conditional layers from the group                                                                                    |
| **getConditionalLayers**()                                               | `Layer[]`  | Returns an array of conditional layers in the group, regardless of whether they are currently active.                            |
| **updateConditionalLayers**(`<Object>` arg?)                             | `this`     | Update the status of all conditional layers, passing an optional argument to each layer's condition function.                    |




## License

[GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0-standalone.html) or later
