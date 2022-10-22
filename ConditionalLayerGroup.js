import { LayerGroup } from "leaflet";

/*
 * @class ConditionalLayerGroup
 * @inherits Interactive layer
 * 
 * Used to group several layers and handle them as one - with a contidion on each layer to determine whether it should be shown.
 * 
 * A typical use is to render different layers depending on zoom level - e.g. showing a heatmap on low zoom levels and markers
 * on higher zoom levels.
 * 
 * 
 * @example
 * 
 * ```js
 *  // Create a conditional layer group with two layers, each with their own condition
 *  const layerGroup = new ConditionalLayerGroup()
 *                     .addConditionalLayer((level) => level < 12, layer1)
 *                     .addConditionalLayer((level) => level >= 12, layer2)
 *                     .addTo(map);
 *
 *   // Set state of conditional layers
 *   layerGroup.updateConditionalLayers(map.getZoom());
 * ```
 */
export default class ConditionalLayerGroup extends LayerGroup {
	_conditionalLayers = {};

	// @method addConditionalLayer(conditionFunction: (object) => boolean, layer: Layer): this
	// Adds the given layer to the group with a condition.
	addConditionalLayer(conditionFunction, layer) {
		var id = this.getLayerId(layer);

		this._conditionalLayers[id] = {
            "condition": conditionFunction,
            "layer": layer,
            "active": false,
        }

        return this;
	}

	// @method removeConditionalLayer(layer: Layer): this
	// Removes the given conditional layer from the group.
	// @alternative
	// @method removeConditionalLayer(id: Number): this
	// Removes the conditional layer with the given internal ID from the group.
	removeConditionalLayer(layer) {
		var id = layer in this._conditionalLayers ? layer : this.getLayerId(layer);

		if (this._conditionalLayers[id] && this._conditionalLayers[id].active) {
			this.removeLayer(id);
		}

		delete this._conditionalLayers[id];

		return this;
	}

	// @method hasConditionalLayer(layer: Layer): Boolean
	// Returns `true` if the given layer is currently added to the group with a condition, regardless of whether it is active
	// @alternative
	// @method hasConditionalLayer(id: Number): Boolean
	// Returns `true` if the given internal ID is currently added to the group with a condition, regardless of whether it is active.
	hasConditionalLayer(layer) {
		if (!layer) { return false; }
		var layerId = typeof layer === 'number' ? layer : this.getLayerId(layer);
		return layerId in this._conditionalLayers;
	}

	// @method isConditionalLayerActive(layer: Layer): Boolean
	// Returns `true` if the given layer is currently added to the group with a condition, and is currently active
	// @alternative
	// @method hasConditionalLayer(id: Number): Boolean
	// Returns `true` if the given internal ID is currently added to the group with a condition, and is currently active.
	isConditionalLayerActive(layer) {
		if (!layer) { return false; }
		var layerId = typeof layer === 'number' ? layer : this.getLayerId(layer);
		return (layerId in this._conditionalLayers) && this._conditionalLayers[layerId].active;
	}


	// @method clearConditionalLayers(): this
	// Removes all the conditional layers from the group.
	clearConditionalLayers() {
        for (var i in this._conditionalLayers) {
    		this.removeConditionalLayer(i);
        }
		return this;
	}

    // @method getConditionalLayers(): Layer[]
	// Returns an array of all the conditional layers added to the group.
	getConditionalLayers() {
        var layers = [];
        for (var i in this._conditionalLayers) {
    		layers.push(this._conditionalLayers[i].layer);
        }
		return layers;
	}

    // @method updateConditionalLayers(o: object): this
	// Update the status of all conditional layers, passing an optional argument to each layer's condition function. 
    updateConditionalLayers(o) {
        for (var i in this._conditionalLayers) {
            var condLayer = this._conditionalLayers[i];
            var active = condLayer.condition(o);
            if (active && !condLayer.active) {
                this.addLayer(condLayer.layer);
            } else if (condLayer.active && !active) {
                this.removeLayer(condLayer.layer);
            }
            condLayer.active = active;
        }

        return this;
    }
}
