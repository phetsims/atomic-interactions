//  Copyright 2002-2014, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var AtomicInteractionsScreen = require( 'ATOMIC_INTERACTIONS/AtomicInteractionsScreen' );
  var Sim = require( 'JOIST/Sim' );
  var GlobalOptionsNode = require( 'ATOMIC_INTERACTIONS/view/GlobalOptionsNode' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Property = require( 'AXON/Property' );

  // strings
  var simTitle = require( 'string!ATOMIC_INTERACTIONS/atomic-interactions.name' );

  var colorsProperty = new Property( false );
  var simOptions = {
    credits: {
      //TODO fill in proper credits, all of these fields are optional, see joist.AboutDialog
      leadDesign: '',
      softwareDevelopment: '',
      team: '',
      qualityAssurance: '',
      graphicArts: '',
      thanks: ''
    },
    optionsNode: new GlobalOptionsNode( colorsProperty )
  };

  // Appending '?dev' to the URL will enable developer-only features.
  if ( phet.chipper.getQueryParameter( 'dev' ) ) {
    simOptions = _.extend( {
      // add dev-specific options here
    }, simOptions );
  }

  SimLauncher.launch( function() {
    var sim = new Sim( simTitle, [ new AtomicInteractionsScreen( true, simTitle, colorsProperty ) ], simOptions );
    sim.start();
  } );
} );