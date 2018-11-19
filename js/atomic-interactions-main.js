// Copyright 2014-2018, University of Colorado Boulder

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
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var atomicInteractionsTitleString = require( 'string!ATOMIC_INTERACTIONS/atomic-interactions.title' );

  var simOptions = {
    credits: {
      leadDesign: 'Paul Beale, Yuen-ying Carpenter, Sarah McKagan, Emily Moore, Noah Podolefsky,<br>Amy Rouinfar',
      softwareDevelopment: 'John Blanco, Aaron Davis, Aadish Gupta',
      team: 'Wendy Adams, Jack Barbera, Amy Hanson, Kelly Lancaster, Ariel Paul, Kathy Perkins,<br>Carl Wieman',
      qualityAssurance: 'Steele Dalton, Amanda Davis, Bryce Griebenow, Ethan Johnson, Liam Mulhall,<br>' +
                        'Oliver Orejola, Laura Rea, Benjamin Roberts, Jacob Romero, Kathryn Woessner, Bryan Yoelin',
      thanks: 'Thanks to Actual Concepts for working with the PhET development team to convert this simulation to HTML5.'
    },
    optionsNode: new GlobalOptionsNode()
  };

  SimLauncher.launch( function() {
    var sim = new Sim(
      atomicInteractionsTitleString,
      [ new AtomicInteractionsScreen( true, atomicInteractionsTitleString ) ],
      simOptions );
    sim.start();
  } );
} );