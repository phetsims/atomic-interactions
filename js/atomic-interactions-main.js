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
  var GlobalOptionsNode = require( 'STATES_OF_MATTER/common/view/GlobalOptionsNode' );
  var Property = require( 'AXON/Property' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var atomicInteractionsTitleString = require( 'string!ATOMIC_INTERACTIONS/atomic-interactions.title' );

  // property that controls projector mode, initial value can be set via a query parameter
  var projectorModeProperty = new Property( phet.chipper.queryParameters.colorProfile === 'projector' );

  var simOptions = {
    credits: {
      leadDesign: 'Paul Beale, Yuen-ying Carpenter, Sarah McKagan, Emily Moore, Noah Podolefsky, Amy Rouinfar',
      softwareDevelopment: 'John Blanco, Aadish Gupta',
      team: 'Wendy Adams, Jack Barbera, Amy Hanson, Kelly Lancaster, Ariel Paul, Kathy Perkins, Carl Weiman',
      qualityAssurance: 'Steele Dalton, Amanda Davis, Bryce Griebenow, Oliver Orejola, Benjamin Roberts, Bryan Yoelin',
      thanks: 'Thanks to Actual Concepts for working with the PhET development team to convert this simulation to ' +
              'HTML5.'
    },
    optionsNode: new GlobalOptionsNode( projectorModeProperty )
  };

  SimLauncher.launch( function() {
    var sim = new Sim(
      atomicInteractionsTitleString,
      [ new AtomicInteractionsScreen( true, atomicInteractionsTitleString ) ],
      simOptions );
    sim.start();
  } );
} );