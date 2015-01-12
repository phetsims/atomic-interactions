//  Copyright 2002-2014, University of Colorado Boulder

/**
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Vector2 = require( 'DOT/Vector2' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var InteractiveInteractionPotentialDiagram = require( 'ATOMIC_INTERACTIONS/view/InteractiveInteractionPotentialDiagram' );
  var PlayPauseButton = require( 'SCENERY_PHET/buttons/PlayPauseButton' );
  var StepButton = require( 'SCENERY_PHET/buttons/StepButton' );
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ForcesControlNode = require( 'ATOMIC_INTERACTIONS/view/ForcesControlPanel' );
  var AtomicInteractionsControlPanel = require( 'ATOMIC_INTERACTIONS/view/AtomicInteractionsControlPanel' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );
  var ParticleForceNode = require( 'ATOMIC_INTERACTIONS/view/ParticleForceNode' );
  var GrabbableParticleNode = require( 'ATOMIC_INTERACTIONS/view/GrabbableParticleNode' );
  var PushpinNode = require( 'ATOMIC_INTERACTIONS/view/PushpinNode' );
  var HandNode = require( 'ATOMIC_INTERACTIONS/view/HandNode' );
  var AtomicInteractionColors = require( 'ATOMIC_INTERACTIONS/view/AtomicInteractionColors' );


  // strings
  var normalString = require( 'string!ATOMIC_INTERACTIONS/normal' );
  var slowMotionString = require( 'string!ATOMIC_INTERACTIONS/slowMotion' );
  var inset = 10;


  // Canvas size in pico meters, since this is a reasonable scale at which
  // to display molecules.  Assumes a 4:3 aspect ratio.
  var CANVAS_WIDTH = 2000;
  // Constant used to control size of push pin.
  var PUSH_PIN_WIDTH = CANVAS_WIDTH * 0.01;


  // Constant to turn on/off a set of vertical lines that can be used to
  // check the alignment between the graph and the atoms.
  // var SHOW_ALIGNMENT_LINES = false;

  /**
   *
   * @param{DualAtomModel} dualAtomModel
   * @param {Boolean} enableHeterogeneousMolecules
   * @constructor
   */
  function AtomicInteractionsScreenView( dualAtomModel, enableHeterogeneousMolecules ) {

    ScreenView.call( this, { layoutBounds: new Bounds2( 0, 0, 768, 504 ) } );

    this.dualAtomModel = dualAtomModel;
    this.movableParticle = dualAtomModel.getMovableAtomRef();
    this.fixedParticle = dualAtomModel.getFixedAtomRef();
    this.showAttractiveForces = false;
    this.showRepulsiveForces = false;
    this.showTotalForces = false;
    var atomicInteractionsScreenView = this;

    // model-view transform
    var mvtScale = 0.25;

    this.modelViewTransform = ModelViewTransform2.createSinglePointScaleMapping( new Vector2( 0, 0 ),
      new Vector2( 80, 370 ), mvtScale );

    var tickTextColor = enableHeterogeneousMolecules ? 'black' : 'white';
    var textColor = enableHeterogeneousMolecules ? 'black' : 'white';
    var backgroundColor = enableHeterogeneousMolecules ? '#D1D2FF' : 'black';
    var atomicInteractionsControlPanel = new AtomicInteractionsControlPanel( dualAtomModel,
      enableHeterogeneousMolecules, {
        right: this.layoutBounds.maxX - inset,
        top: this.layoutBounds.minY + inset,
        tickTextColor: tickTextColor,
        textColor: textColor,
        backgroundColor: backgroundColor
      } );

    // add interactive potential diagram
    this.interactiveInteractionPotentialDiagram = new InteractiveInteractionPotentialDiagram(
      dualAtomModel.getSigma(), dualAtomModel.getEpsilon(), true, dualAtomModel, {
        left: this.layoutBounds.minX + inset,
        top: atomicInteractionsControlPanel.top + inset / 2
      } );
    this.addChild( this.interactiveInteractionPotentialDiagram );

    // Add the button for retrieving the atom to the canvas.
    this.retrieveAtomButtonNode = new TextPushButton( 'Return Atom', {
      font: new PhetFont( 12 ),
      baseColor: '#61BEE3',
      listener: function() {
        dualAtomModel.resetMovableAtomPos();
      },
      centerX: this.layoutBounds.minX,
      bottom: this.layoutBounds.bottom - 14
    } );

    //  this.retrieveAtomButtonNode.setVisible( false );
    this.addChild( this.retrieveAtomButtonNode );

    // Create and add the Reset All Button in the bottom right, which resets the model
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        dualAtomModel.reset();
        atomicInteractionsScreenView.handNode.setVisible( true );
      },
      right: this.layoutBounds.maxX - inset,
      bottom: this.layoutBounds.maxY - inset
    } );
    this.addChild( resetAllButton );

    // add play pause button and step button
    var stepButton = new StepButton(
      function() {
        dualAtomModel.stepInternal( 0.04 );
      },
      dualAtomModel.isPlayingProperty,
      {
        radius: 12,
        stroke: 'black',
        fill: '#005566',
        centerX: this.layoutBounds.centerX + 110,
        bottom: this.layoutBounds.bottom - 14
      } );
    this.addChild( stepButton );


    // add force control
    var forceControlNode = new ForcesControlNode( dualAtomModel.forcesProperty, {
      tickTextColor: tickTextColor,
      textColor: textColor,
      backgroundColor: backgroundColor
    } );
    var atomicInteractionsControlPanelRightOffset = 60;
    if ( enableHeterogeneousMolecules ) {
      resetAllButton.right = this.layoutBounds.maxX - inset;
      atomicInteractionsControlPanel.right = this.layoutBounds.maxX - atomicInteractionsControlPanelRightOffset;
      forceControlNode.right = atomicInteractionsControlPanel.right;
    }

    // add play pause
    var playPauseButton = new PlayPauseButton( dualAtomModel.isPlayingProperty, {
      radius: 18,
      stroke: 'black',
      fill: '#005566',
      y: stepButton.centerY,
      right: stepButton.left - inset
    } );
    this.addChild( playPauseButton );

    var pauseSizeIncreaseFactor = 1.25;
    dualAtomModel.isPlayingProperty.lazyLink( function( isPlaying ) {
      playPauseButton.scale( isPlaying ? ( 1 / pauseSizeIncreaseFactor ) : pauseSizeIncreaseFactor );
    } );
    // add sim speed controls
    var slowText = new Text( slowMotionString, { fill: 'white', font: new PhetFont( 14 ) } );
    var slowMotionRadioBox = new AquaRadioButton( dualAtomModel.speedProperty, 'slow',
      slowText, { radius: 10 } );
    var normalText = new Text( normalString, { fill: 'white', font: new PhetFont( 14 ) } );
    var normalMotionRadioBox = new AquaRadioButton( dualAtomModel.speedProperty, 'normal',
      normalText, { radius: 10 } );
    AtomicInteractionColors.linkAttribute( 'controlPanelText', slowText, 'fill' );
    AtomicInteractionColors.linkAttribute( 'controlPanelText', normalText, 'fill' );

    var speedControlMaxWidth = ( slowMotionRadioBox.width > normalMotionRadioBox.width ) ? slowMotionRadioBox.width :
                               normalMotionRadioBox.width;

    var radioButtonSpacing = 5;
    var touchAreaHeightExpansion = radioButtonSpacing / 2;
    slowMotionRadioBox.touchArea = new Bounds2(
      slowMotionRadioBox.localBounds.minX,
        slowMotionRadioBox.localBounds.minY - touchAreaHeightExpansion,
        slowMotionRadioBox.localBounds.minX + speedControlMaxWidth,
        slowMotionRadioBox.localBounds.maxY + touchAreaHeightExpansion
    );

    normalMotionRadioBox.touchArea = new Bounds2(
      normalMotionRadioBox.localBounds.minX,
        normalMotionRadioBox.localBounds.minY - touchAreaHeightExpansion,
      ( normalMotionRadioBox.localBounds.minX + speedControlMaxWidth ),
        normalMotionRadioBox.localBounds.maxY + touchAreaHeightExpansion
    );

    var speedControl = new VBox( {
      align: 'left',
      spacing: radioButtonSpacing,
      children: [ slowMotionRadioBox, normalMotionRadioBox ]
    } );
    this.addChild( speedControl.mutate( { right: playPauseButton.left - 8, bottom: playPauseButton.bottom } ) );

    // Create the push pin node that will be used to convey the idea that
    // the fixed atom is pinned to the canvas.  It will be added to the
    // canvas when the particles appear.
    this.pushPinNode = new PushpinNode();
    this.pushPinNode.scale( PUSH_PIN_WIDTH / this.pushPinNode.width );

    // Create the nodes that will act as layers for the fixed and movable
    // particles.  This is done so that the fixed particle can always
    // appear to be on top.
    this.fixedParticleLayer = new Node();
    this.addChild( this.fixedParticleLayer );
    this.movableParticleLayer = new Node();
    this.addChild( this.movableParticleLayer );

    this.addChild( atomicInteractionsControlPanel );
    this.addChild( forceControlNode );

    // default molecule is neon
    this.handleFixedParticleAdded( dualAtomModel.fixedAtom );
    this.handleMovableParticleAdded( dualAtomModel.movableAtom );
    dualAtomModel.moleculeTypeProperty.link( function() {
      forceControlNode.top = atomicInteractionsControlPanel.bottom + inset / 2;
      forceControlNode.right = atomicInteractionsControlPanel.right;
      atomicInteractionsScreenView.handleFixedParticleRemoved( dualAtomModel.fixedAtom );
      atomicInteractionsScreenView.handleFixedParticleAdded( dualAtomModel.fixedAtom );
      atomicInteractionsScreenView.handleMovableParticleRemoved( dualAtomModel.movableAtom );
      atomicInteractionsScreenView.handleMovableParticleAdded( dualAtomModel.movableAtom );
      dualAtomModel.interactionStrength = 300;
      dualAtomModel.atomDiameter = 300;
      atomicInteractionsScreenView.handNode.setVisible( false );
    } );
    dualAtomModel.forcesProperty.link( function( forces ) {
      switch( forces ) {
        case 'hideForces':
          atomicInteractionsScreenView.setShowAttractiveForces( false );
          atomicInteractionsScreenView.setShowRepulsiveForces( false );
          atomicInteractionsScreenView.setShowTotalForces( false );
          break;
        case 'totalForce':
          atomicInteractionsScreenView.setShowAttractiveForces( false );
          atomicInteractionsScreenView.setShowRepulsiveForces( false );
          atomicInteractionsScreenView.setShowTotalForces( true );
          break;
        case 'componentForce':
          atomicInteractionsScreenView.setShowAttractiveForces( true );
          atomicInteractionsScreenView.setShowRepulsiveForces( true );
          atomicInteractionsScreenView.setShowTotalForces( false );
      }

    } );
    dualAtomModel.atomDiameterProperty.link( function( diameter ) {
      atomicInteractionsScreenView.fixedParticleNode.handleParticleRadiusChanged();
      atomicInteractionsScreenView.movableParticleNode.handleParticleRadiusChanged();
      atomicInteractionsScreenView.handleParticleRadiusChanged();
      atomicInteractionsScreenView.updateMinimumXForMovableAtom();
    } );


    /*  var fixedAtomVerticalCenterMarker = new Path( new Shape().moveTo( 0, 0).lineTo( 0, 500 ),{fill: 'pink', stroke: 'pink'});
     fixedAtomVerticalCenterMarker.setTranslation( 0, 0 );
     this.addChild( fixedAtomVerticalCenterMarker );

     var movableAtomVerticalCenterMarker = new Path( new Shape().moveTo( 0, 0).lineTo( 0, 500 ),{fill: 'orange', stroke: 'orange'});
     movableAtomVerticalCenterMarker.setTranslation( atomicInteractionsModel.getMovableAtomRef().positionProperty.value.x, 0 );
     this.addChild( movableAtomVerticalCenterMarker );

     var rightSideOfChartMarker = new Path(new Shape().moveTo( 0, 0).lineTo(  0, 500 ),{fill: 'green', stroke: 'green'});
     rightSideOfChartMarker.setTranslation( 1100, 0 );
     this.addChild( rightSideOfChartMarker );*/
    atomicInteractionsScreenView.handNode.setVisible( true );
  }

  return inherit( ScreenView, AtomicInteractionsScreenView, {


    /**
     * Called by the animation loop. Optional, so if your view has no animation, you can omit this.
     * @param{Number} dt - time in seconds
     */
    step: function( dt ) {
      this.handlePositionChanged();
    },
    /**
     * Turn on/off the displaying of the force arrows that represent the
     * attractive force.
     */
    setShowAttractiveForces: function( showForces ) {
      this.movableParticleNode.setShowAttractiveForces( showForces );
      this.fixedParticleNode.setShowAttractiveForces( showForces );
      this.showAttractiveForces = showForces;
    },

    /**
     * Turn on/off the displaying of the force arrows that represent the
     * repulsive force.
     */
    setShowRepulsiveForces: function( showForces ) {
      this.movableParticleNode.setShowRepulsiveForces( showForces );
      this.fixedParticleNode.setShowRepulsiveForces( showForces );
      this.showRepulsiveForces = showForces;
    },

    /**
     * Turn on/off the displaying of the force arrows that represent the
     * total force, i.e. attractive plus repulsive.
     */
    setShowTotalForces: function( showForces ) {
      this.movableParticleNode.setShowTotalForces( showForces );
      this.fixedParticleNode.setShowTotalForces( showForces );
      this.showTotalForces = showForces;
    },
    handleFixedParticleAdded: function( particle ) {

      this.fixedParticle = particle;
      this.fixedParticleNode = new ParticleForceNode( particle, this.modelViewTransform, true, true );
      this.fixedParticleNode.setShowAttractiveForces( this.showAttractiveForces );
      this.fixedParticleNode.setShowRepulsiveForces( this.showRepulsiveForces );
      this.fixedParticleNode.setShowTotalForces( this.showTotalForces );
      this.fixedParticleLayer.addChild( this.fixedParticleNode );


      this.updatePositionMarkerOnDiagram();

      // Add the push pin last so that it is on top of the fixed atom.
      // Note that the particulars of how this is positioned will need to
      // change if a different image is used.
      this.addChild( this.pushPinNode );
      this.pushPinNode.setTranslation( this.modelViewTransform.modelToViewX( -this.fixedParticle.getRadius() * 0.75 ),
        this.modelViewTransform.modelToViewY( -this.fixedParticle.getRadius() * 0.9 ) );
    },

    handleFixedParticleRemoved: function( particle ) {
      // Get rid of the node for this guy.
      if ( this.fixedParticleLayer.isChild( this.fixedParticleNode ) ) {

        // Remove the particle node.
        this.fixedParticleLayer.removeChild( this.fixedParticleNode );

        // Remove the pin holding the node.
        this.removeChild( this.pushPinNode );
      }
      else {
        console.error( "Error: Problem encountered removing node from canvas." );
      }
      this.updatePositionMarkerOnDiagram();
      this.fixedParticleNode = null;
    },

    handleMovableParticleAdded: function( particle ) {

      // Add the atom node for this guy.

      this.movableParticle = particle;
      this.handNode = new HandNode( this.dualAtomModel, this.dualAtomModel.movableAtom, this.modelViewTransform, 0,
          1.0 / 0.0 );
      this.movableParticleNode = new GrabbableParticleNode( this.handNode, this.dualAtomModel, particle,
        this.modelViewTransform, true, true, 0, 1.0 / 0.0 );
      this.movableParticleNode.setShowAttractiveForces( this.showAttractiveForces );
      this.movableParticleNode.setShowRepulsiveForces( this.showRepulsiveForces );
      this.movableParticleNode.setShowTotalForces( this.showTotalForces );
      this.movableParticleLayer.addChild( this.movableParticleNode );
      this.addChild( this.handNode );

      // Limit the particle's motion in the X direction so that it can't
      // get to where there is too much overlap, or is on the other side
      // of the fixed particle.
      this.updateMinimumXForMovableAtom();


      // Update the position marker to represent the new particle's position.
      this.updatePositionMarkerOnDiagram();
    },

    handleMovableParticleRemoved: function( particle ) {
      // Get rid of the node for this guy.
      if ( this.movableParticleNode !== null ) {

        // Remove the particle node.
        this.movableParticleLayer.removeChild( this.movableParticleNode );
      }
      else {
        console.error( "Error: Problem encountered removing node from canvas." );
      }
      this.updatePositionMarkerOnDiagram();
      this.movableParticleNode = null;
      if ( this.handNode !== null ) {
        // Remove the particle node.
        this.removeChild( this.handNode );
      }
    },

    /**
     * Handle a notification of a change in the radius of a particle.
     * IMPORTANT NOTE: This is part of a workaround for a problem with
     * rendering the spherical nodes.  To make a long story short, there were
     * problems with resizing the nodes if they were being drawn with a
     * gradient, so this (and other) code was added to effectively turn off
     * the gradient while the particle was being resized and turn it back
     * on when it started moving again.
     */
    handleParticleRadiusChanged: function() {

      // The particles are being resized, so disable the gradients if they
      // are being used and if motion is paused.
      if ( this.dualAtomModel.getMotionPaused() ) {
        if ( this.fixedParticleNode.getGradientEnabled() ) {
          this.fixedParticleNode.setGradientEnabled( false );
        }
        if ( this.movableParticleNode.getGradientEnabled() ) {
          this.movableParticleNode.setGradientEnabled( false );
        }
      }
    },

    handlePositionChanged: function() {

      if ( !this.dualAtomModel.getMotionPaused() ) {
        if ( !this.fixedParticleNode.getGradientEnabled() ) {
          // The movable particle is moving, so turn the gradient
          // back on.
          this.fixedParticleNode.setGradientEnabled( true );
        }
        if ( !this.movableParticleNode.getGradientEnabled() ) {
          // The movable particle is moving, so turn the gradient
          // back on.
          this.movableParticleNode.setGradientEnabled( true );
        }
      }

      this.updatePositionMarkerOnDiagram();
      this.updateForceVectors();

      this.retrieveAtomButtonNode.visible = this.dualAtomModel.movableAtom.getX() > 3000;
    },

    /**
     * Update the position marker on the Lennard-Jones potential diagram.
     * This will indicate the amount of potential being experienced between
     * the two atoms in the model.
     */
    updatePositionMarkerOnDiagram: function() {

      if ( ( this.fixedParticle !== null ) && ( this.movableParticle !== null ) ) {
        var distance = this.fixedParticle.getPositionReference().distance( this.movableParticle.getPositionReference() );

        if ( distance > 0 ) {
          this.interactiveInteractionPotentialDiagram.setMarkerEnabled( true );
          this.interactiveInteractionPotentialDiagram.setMarkerPosition( distance );
        }
        else {
          this.interactiveInteractionPotentialDiagram.setMarkerEnabled( false );
        }
      }
      else {
        this.interactiveInteractionPotentialDiagram.setMarkerEnabled( false );
      }
    },

    /**
     * Update the minimum X value allowed for the movable atom.  This prevents
     * too much overlap between the atoms.
     */
    updateMinimumXForMovableAtom: function() {
      if ( this.movableParticle !== null && this.fixedParticle !== null ) {
        this.movableParticleNode.setMinX( this.modelViewTransform.modelToViewX( this.dualAtomModel.getSigma() * 0.9 ) );
        this.handNode.setMinX( this.modelViewTransform.modelToViewX( this.dualAtomModel.getSigma() * 0.9 ) );
      }
    },
    updateForceVectors: function() {
      if ( ( this.fixedParticle !== null ) && ( this.movableParticle !== null ) ) {
        this.fixedParticleNode.setForces( this.dualAtomModel.getAttractiveForce(),
          -this.dualAtomModel.getRepulsiveForce() );
        this.movableParticleNode.setForces( -this.dualAtomModel.getAttractiveForce(),
          this.dualAtomModel.getRepulsiveForce() );
      }
    }
  } );
} );