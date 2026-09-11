/* Shot 05 production controls. Times are local shot seconds (0:00 = episode 0:43). */
window.SHOT05_CONFIG = Object.freeze({
  TIMING: Object.freeze({
    totalDuration: 15,
    liquidRevealStart: 0,
    liquidRevealEnd: 2.5,
    liquidSettleHoldEnd: 3,
    attentionHoldStart: 3,
    attentionCircleStart: 4,
    attentionCircleEnd: 6,
    postCircleHoldEnd: 7,
    tipDiagramStart: 7,
    tipDiagramEnd: 9.2,
    tipReadingHoldEnd: 10,
    tipCrossStart: 10,
    tipCrossStrokeChange: 10.5,
    tipCrossEnd: 11,
    emphasisReturnStart: 11,
    emphasisReturnEnd: 11.6,
    gapBracketStart: 11.6,
    attentionCircleFadeEnd: 11.95,
    gapBracketEnd: 12.5,
    gapLabelStart: 12.5,
    gapLabelEnd: 13,
    gapReadingHoldEnd: 13.6,
    liquidBridgePointerStart: 13.6,
    liquidBridgePointerEnd: 14.2,
    liquidBridgeLabelStart: 14.2,
    liquidBridgeLabelEnd: 14.8,
    finalHoldStart: 14.8,
    finalHoldEnd: 15
  }),
  LAYOUT: Object.freeze({
    landscape: Object.freeze({
      hairGroup: { x: 650, y: 124 }, gapWidth: 112,
      hairGeometry: { width: 150, height: 530, taper: 52 },
      liquidGeometry: { top: 176, bottom: 528, meniscusDepth: 35 },
      circle: { x: 150, y: 325, width: 160, height: 470 },
      tipDiagram: { x: 1200, y: 270 },
      gapAnnotation: { x: 1020, y: 282 },
      liquidBridgeAnnotation: { x: 970, y: 532, pointerEnd: { x: -170, y: -30 } },
      subtitle: { x: 800, y: 825 }
    }),
    portrait: Object.freeze({
      hairGroup: { x: 310, y: 180 }, gapWidth: 112,
      hairGeometry: { width: 150, height: 530, taper: 52 },
      liquidGeometry: { top: 176, bottom: 528, meniscusDepth: 35 },
      circle: { x: 150, y: 325, width: 160, height: 470 },
      tipDiagram: { x: 140, y: 850 },
      gapAnnotation: { x: 575, y: 340 },
      liquidBridgeAnnotation: { x: 540, y: 615, pointerEnd: { x: -80, y: -30 } },
      subtitle: { x: 450, y: 1480 }
    })
  }),
  SUBTITLES: Object.freeze([
    { start: 0, end: 3, text: "液体进入两根毛之间以后，" },
    { start: 3, end: 7, text: "真正重要的东西开始变了。" },
    { start: 7, end: 11, text: "控制液体转移的，不再只是‘尖端到底有多细’，" },
    { start: 11, end: 15.01, text: "而是两根毛之间的 gap，以及里面形成的 liquid bridge。" }
  ])
});
