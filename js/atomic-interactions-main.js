// Copyright 2014-2020, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author John Blanco
 */

import Sim from '../../joist/js/Sim.js';
import SimLauncher from '../../joist/js/SimLauncher.js';
import AtomicInteractionsScreen from '../../states-of-matter/js/atomic-interactions/AtomicInteractionsScreen.js';
import GlobalOptionsNode from '../../states-of-matter/js/common/view/GlobalOptionsNode.js';
import Tandem from '../../tandem/js/Tandem.js';
import atomicInteractionsStrings from './atomic-interactions-strings.js';

const atomicInteractionsTitleString = atomicInteractionsStrings[ 'atomic-interactions' ].title;

// Eagerly create GlobalOptionsNode so it works smoothly with PhET-iO
const globalOptionsNode = new GlobalOptionsNode( Tandem.ROOT.createTandem( 'global' ).createTandem( 'view' ).createTandem( 'globalOptionsNode' ) );

const simOptions = {
  credits: {
    leadDesign: 'Paul Beale, Yuen-ying Carpenter, Sarah McKagan, Emily B. Moore, Noah Podolefsky,<br>Amy Rouinfar',
    softwareDevelopment: 'John Blanco, Aaron Davis, Aadish Gupta',
    team: 'Wendy Adams, Jack Barbera, Amy Hanson, Kelly Lancaster, Ariel Paul, Kathy Perkins,<br>Carl Wieman',
    qualityAssurance: 'Steele Dalton, Amanda Davis, Bryce Griebenow, Ethan Johnson, Liam Mulhall,<br>' +
                      'Oliver Orejola, Laura Rea, Benjamin Roberts, Jacob Romero, Kathryn Woessner, Bryan Yoelin',
    thanks: 'Thanks to Actual Concepts for working with the PhET development team to convert this simulation to HTML5.'
  },

  // create content for the Options dialog
  createOptionsDialogContent: () => globalOptionsNode
};

SimLauncher.launch( function() {
  const sim = new Sim(
    atomicInteractionsTitleString,
    [ new AtomicInteractionsScreen( true, atomicInteractionsTitleString, Tandem.ROOT.createTandem( 'atomicInteractionsScreen' ) ) ],
    simOptions );
  sim.start();
} );