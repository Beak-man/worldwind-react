import React, { Component } from 'react';
import WorldWind from '@nasaworldwind/worldwind';

class WorldWindComponent extends Component{

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    shouldComponentUpdate(){
        // WorldWind is not a regular React UI component. It should
        // be loaded once and never be updated again
        return false;
    }

    componentDidMount(){
        // Code to execute when the component is called and mounted.
        // Usual WorldWind boilerplate (creating WorldWindow, 
        // adding layers, etc.) applies here.
        
        // Create a World Window for the canvas. Note passing the
        // Canvas element through a React ref.
        this.wwd = new WorldWind.WorldWindow(this.canvasRef.current);
        
        // Add layers to the WorldWindow
        
        // Use OpenStreetMap as the primary layer
        var osmLayer = new WorldWind.OpenStreetMapImageLayer("osm");
        osmLayer.displayName = "OpenStreetMap";
        this.wwd.addLayer(osmLayer);
        
        // Add BMNG with reduced opacity so you can see both
        var bmngLayer = new WorldWind.BMNGOneImageLayer();
        bmngLayer.opacity = 0.5;  // Make it semi-transparent
        bmngLayer.displayName = "Blue Marble";
        this.wwd.addLayer(bmngLayer);
        
        // Add a compass, a coordinates display and some view controls to the World Window.
        this.wwd.addLayer(new WorldWind.CompassLayer());
        this.wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(this.wwd));
        this.wwd.addLayer(new WorldWind.ViewControlsLayer(this.wwd));

    }

    render() {
        const style = {
            flexGrow: 1,
            width: '100vw'
        }
        
        // JSX code to create canvas with WorldWindow
        return(
            <canvas id="canvasOne" ref={this.canvasRef} style={style}>
                Your browser does not support HTML5 Canvas.
            </canvas>
        )
    }
}

export default WorldWindComponent;