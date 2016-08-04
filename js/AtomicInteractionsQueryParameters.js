// Copyright 2016, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var atomicInteractions = require( 'ATOMIC_INTERACTIONS/atomicInteractions' );

  var getQueryParameter = phet.chipper.getQueryParameter;

  var AtomicInteractionsQueryParameters = {

    // fill the shape placement boards on the 'Explore' screen during startup, useful for testing
    PROJECTOR_MODE: !!getQueryParameter( 'projectorMode' )
  };

  atomicInteractions.register( 'AtomicInteractionsQueryParameters', AtomicInteractionsQueryParameters );

  return AtomicInteractionsQueryParameters;
} );
