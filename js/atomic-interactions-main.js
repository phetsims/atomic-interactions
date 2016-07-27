// Copyright 2014-2015, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var AtomicInteractionsScreen = require( 'STATES_OF_MATTER/atomic-interactions/AtomicInteractionsScreen' );
  var Sim = require( 'JOIST/Sim' );
  var GlobalOptionsNode = require( 'STATES_OF_MATTER/common/view/GlobalOptionsNode' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Property = require( 'AXON/Property' );

  // strings
  var atomicInteractionsTitleString = require( 'string!ATOMIC_INTERACTIONS/atomic-interactions.title' );

  var projectorModeProperty = new Property( false );
  var simOptions = {
    credits: {
      leadDesign: 'Paul Beale, Yuen-ying Carpenter, Sarah McKagan, Emily Moore,\nNoah Podolefsky, Amy Rouinfar',
      softwareDevelopment: 'John Blanco, Aadish Gupta',
      team: 'Wendy Adams, Jack Barbera, Kelly Lancaster, Ariel Paul, Kathy Perkins',
      qualityAssurance: 'Steele Dalton, Amanda Davis, Oliver Orejola, Benjamin Roberts,\nBryan Yoelin',
      thanks: 'Thanks to Actual Concepts for working with the PhET development team\nto convert this simulation to HTML5.'
    },
    optionsNode: new GlobalOptionsNode( projectorModeProperty )
  };

  // Appending '?dev' to the URL will enable developer-only features.
  if ( phet.chipper.getQueryParameter( 'dev' ) ) {
    simOptions = _.extend( {
      // add dev-specific options here
    }, simOptions );
  }

  SimLauncher.launch( function() {
    var sim = new Sim(
      atomicInteractionsTitleString,
      [ new AtomicInteractionsScreen( true, atomicInteractionsTitleString ) ],
      simOptions );
    sim.start();
  } );
} );