//  Copyright 2002-2014, University of Colorado Boulder

/**
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var DualAtomModel = require( 'ATOMIC_INTERACTIONS/atomic-interactions/model/DualAtomModel' );
  var AtomicInteractionsScreenView = require( 'ATOMIC_INTERACTIONS/atomic-interactions/view/AtomicInteractionsScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var AtomicInteractionColors = require( 'ATOMIC_INTERACTIONS/atomic-interactions/view/AtomicInteractionColors' );
  var Image = require( 'SCENERY/nodes/Image' );

  // images
  var atomicInteractionScreenIcon = require( 'image!STATES_OF_MATTER/som-atomic-interaction-screen.png' );

  function AtomicInteractionsScreen( enableHeterogeneousMolecules, simTitle, colorsProperty ) {

    //If this is a single-screen sim, then no icon is necessary.
    //If there are multiple screens, then the icon must be provided here.
    var screen = this;
    Screen.call( this, simTitle, new Image( atomicInteractionScreenIcon ),
      function() { return new DualAtomModel(); },
      function( model ) { return new AtomicInteractionsScreenView( model, enableHeterogeneousMolecules ); },
      { backgroundColor: AtomicInteractionColors.background.toCSS() }
    );

    colorsProperty.link( function( color ) {
      if ( color ) {
        AtomicInteractionColors.applyProfile( 'projector' );
      }
      else {
        AtomicInteractionColors.applyProfile( 'default' );
      }
    } );
    AtomicInteractionColors.linkAttribute( 'background', screen, 'backgroundColor' );
  }

  return inherit( Screen, AtomicInteractionsScreen );
} );
