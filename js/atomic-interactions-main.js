// Copyright 2014-2015, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var AtomicInteractionsQueryParameters = require( 'ATOMIC_INTERACTIONS/AtomicInteractionsQueryParameters' );
  var AtomicInteractionsScreen = require( 'STATES_OF_MATTER/atomic-interactions/AtomicInteractionsScreen' );
  var GlobalOptionsNode = require( 'STATES_OF_MATTER/common/view/GlobalOptionsNode' );
  var Property = require( 'AXON/Property' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var atomicInteractionsTitleString = require( 'string!ATOMIC_INTERACTIONS/atomic-interactions.title' );

  // property that controls projector mode, initial value can be set via a query parameter
  var projectorModeProperty = new Property( AtomicInteractionsQueryParameters.projectorMode );

  var simOptions = {
    credits: {
      leadDesign: 'Paul Beale, Yuen-ying Carpenter, Sarah McKagan, Emily Moore,\nNoah Podolefsky, Amy Rouinfar',
      softwareDevelopment: 'John Blanco, Aadish Gupta',
      team: 'Wendy Adams, Jack Barbera, Amy Hanson, Kelly Lancaster, Ariel Paul,\nKathy Perkins, Carl Weiman',
      qualityAssurance: 'Steele Dalton, Amanda Davis, Bryce Griebenow, Oliver Orejola,\nBenjamin Roberts, Bryan Yoelin',
      thanks: 'Thanks to Actual Concepts for working with the PhET development team to convert\nthis simulation to HTML5.'
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