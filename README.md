# Leaflet.LayerGroup.Conditional

An extension of [Leaflet.LayerGroup](http://leafletjs.com/reference.html#layergroup) that allows you to add layers with conditions on when they should be shown.

A typical use is to render different layers depending on zoom level - e.g. showing a heatmap on low zoom levels and marker on higher zoom levels.

## Requirements
Should work with Leaflet ^1.0.0.

Has only been tested with Leaflet ^1.7.1

## Demos
* [Different layers depending on zoom level](https://solfisk.github.io/Leaflet.LayerGroup.Conditional/examples/zoom.html)


## Usage

### Quick guide

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


## API Reference

### Creation

| Factory                                                                           | Description                                                                                              |
| :-------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| **L.layerGroup.conditional**(<Layer[]> layers?, <Object> options?)                | Create a conditional layer group, optionally given an initial set of fixed layers and an options object. |

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

GPL.
