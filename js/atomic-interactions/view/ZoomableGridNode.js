// Copyright 2002-2013, University of Colorado Boulder

/**
 * Scenery node that shows the grid lines.
 * Modified from energy-skate-park's GridNode implementation.
 * @author Sam Reid
 * @author Siddhartha Chinthapally
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var ZoomButton = require( 'SCENERY_PHET/buttons/ZoomButton' );
  var rectangularButtonView = require( 'SUN/buttons/RectangularButtonView' );

  var MAX_LINES_HORIZONTAL = 13;
  var MIN_LINES_HORIZONTAL = 5;
  var ZOOM_INCREMENT = 2; // 2 lines per zoom

  /**
   *
   * @param atomsView
   * @param {Number} offsetX
   * @param {Number} offsetY
   * @param {Number} width - width of the graph
   * @param {Number} height - height of the graph
   * @constructor
   */
  function ZoomableGridNode( atomsView, offsetX, offsetY, width, height ) {

    Node.call( this );
    var gridNode = this;
    atomsView.horizontalLineCount = MIN_LINES_HORIZONTAL;
    this.horizontalLinesNode = new Path( null, { stroke: 'white', lineWidth: 0.8, opacity: 0.6 } );
    this.verticalLinesNode = new Path( null, { stroke: 'white', lineWidth: 0.8, opacity: 0.6 } );
    this.zoomInButton = new ZoomButton( {
      listener: function() {
        atomsView.horizontalLineCount -= ZOOM_INCREMENT;
        gridNode.addHorizontalLines( offsetX, offsetY, width, height, atomsView.horizontalLineCount );
        atomsView.verticalScalingFactor *= 3.33;
        atomsView.drawPotentialCurve();
      },
      baseColor: '#FFD333',
      radius: 8,
      xMargin: 3,
      yMargin: 3,
      disabledBaseColor: '#EDEDED',
      buttonAppearanceStrategy: rectangularButtonView.flatAppearanceStrategy
    } );
    this.zoomInButton.setTranslation( -50, 0 );
    this.zoomInButton.enabled = false;

    this.zoomOutButton = new ZoomButton( {
      listener: function() {
        atomsView.horizontalLineCount += 2;
        gridNode.addHorizontalLines( offsetX, offsetY, width, height, atomsView.horizontalLineCount );
        atomsView.verticalScalingFactor /= 3.33;
        atomsView.drawPotentialCurve();
      },
      baseColor: '#FFD333',
      radius: 8,
      xMargin: 3,
      yMargin: 3,
      disabledBaseColor: '#EDEDED',
      buttonAppearanceStrategy: rectangularButtonView.flatAppearanceStrategy,
      in: false,
      top: this.zoomInButton.bottom + 5,
      left: this.zoomInButton.left
    } );
    this.zoomOutButton.enabled = true;
    this.addChild( this.zoomInButton );
    this.addChild( this.zoomOutButton );
    this.addChild( this.horizontalLinesNode );
    this.addChild( this.verticalLinesNode );

    this.verticalLines = [];
    for ( var x = 0; x < 4; x++ ) {
      var viewX = x * (width / 3);
      this.verticalLines.push( {
        x1: viewX + offsetX, y1: offsetY,
        x2: viewX + offsetX, y2: height + offsetY
      } );
    }
    var verticalLineShape = new Shape();
    var line;
    for ( var i = 0; i < this.verticalLines.length; i++ ) {
      line = this.verticalLines[ i ];
      verticalLineShape.moveTo( line.x1, line.y1 );
      verticalLineShape.lineTo( line.x2, line.y2 );
    }
    this.verticalLinesNode.setShape( verticalLineShape );

    this.horizontalLines = [];
    for ( var y = 0; y < atomsView.horizontalLineCount; y++ ) {
      var viewY = y * (height / (atomsView.horizontalLineCount - 1));
      this.horizontalLines.push( {
        x1: offsetX,
        y1: viewY + offsetY,
        x2: width + offsetX,
        y2: viewY + offsetY
      } );
    }
    var horizontalLineShape = new Shape();
    for ( i = 0; i < this.horizontalLines.length; i++ ) {
      line = this.horizontalLines[ i ];
      horizontalLineShape.moveTo( line.x1, line.y1 );
      horizontalLineShape.lineTo( line.x2, line.y2 );
    }
    this.horizontalLinesNode.setShape( horizontalLineShape );
  }

  return inherit( Node, ZoomableGridNode, {

    /**
     * @param {Number} offsetX
     * @param {Number} offsetY
     * @param {Number} width -- width of the grid
     * @param {Number} height -- height of the grid
     * @param {Number} horizontalLineCount -- number of horizontal lines
     */
    addHorizontalLines: function( offsetX, offsetY, width, height, horizontalLineCount ) {

      this.horizontalLines = [];
      for ( var y = 0; y < horizontalLineCount; y++ ) {
        var viewY = y * (height / (horizontalLineCount - 1));
        this.horizontalLines.push( {
          x1: offsetX,
          y1: viewY + offsetY,
          x2: width + offsetX,
          y2: viewY + offsetY
        } );
      }
      var horizontalLineShape = new Shape();
      var line;
      for ( var i = 0; i < this.horizontalLines.length; i++ ) {
        line = this.horizontalLines[ i ];
        horizontalLineShape.moveTo( line.x1, line.y1 );
        horizontalLineShape.lineTo( line.x2, line.y2 );
      }
      this.horizontalLinesNode.setShape( horizontalLineShape );
      this.zoomOutButton.enabled = (horizontalLineCount < MAX_LINES_HORIZONTAL);
      this.zoomInButton.enabled = (horizontalLineCount > MIN_LINES_HORIZONTAL);

    }
  } );
} );