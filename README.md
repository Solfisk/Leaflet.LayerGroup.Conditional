# Leaflet.LayerGroup.Conditional

An extension of Leaflet.LayerGroup that allows you to add layers with conditions on when they should be shown.

A typical use is to render different layers depending on e.g. zoom level


## Using Leaflet.LayerGroup.Conditional

You can use Leaflet.LayerGroup.Conditional just as you would use Leaflet.LayerGroup.

However, you can also add conditional layers that are only shown when a specified condition is met. The condition is given as a function that must return boolean.

  `myConditionalLayerGroup.addConditionalLayer(myConditionFunction, myLayer);`
  
In order to update conditional layers, you must call `updateConditionalLayers()`. Optionally, you can pass an object that is given as an argument to the condition functions.

## Usage example
```
    var zoomBiggerThan3 = function(zoomLevel) {
       return zoomLevel > 3
    };

    var layerGroup = L.layerGroupConditional()
                      .addConditionalLayer(zoomBiggerThan3, polyline)
                      .addTo(map);
    
    var zoomHandler = function(event) {
       var zoomLevel = map.getZoom();
       layerGroup.updateConditionalLayers(zoomLevel);
    }
    
    map.on('zoomEnd', zoomHandler);
```

## Methods

Methods are the same as those of [LayerGroup](http://leafletjs.com/reference.html#layergroup), plus

* `addConditionalLayer(<function object=>bool> function, <ILayer> layer)`
  Adds a conditional layer. The `function` is evaluated whenever `updateConditionalLayers()` are called.
  Optionally, `updateConditionalLayers()` can be called with a single argument which is then passed on to the `function` of each conditional layer.
  `layer` is any `ILayer`.
* `removeConditionalLayer(<ILayer> layer)`
  Removed the conditional layer altogether.
* `updateConditionalLayers(<object> o)`
  When called, the condition function for all conditional layers is evaluated in order to determine whether each layer should be shown on the map.
  

