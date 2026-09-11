/* Shot 05–06 production controls. Local 0:00 = episode 0:43.000. */
window.SHOT0506_CONFIG = Object.freeze({
  timing: Object.freeze({
    duration: 25,
    shot05: Object.freeze({
      liquidStart: 1, liquidEnd: 3,
      oldFocusStart: 3, oldFocusEnd: 3.6,
      crossOldStart: 3.6, crossOldEnd: 4.3,
      thinkingPause: [4.3, 4.8],
      gapCircleStart: 4.8, gapCircleEnd: 6.4,
      gapHold: [6.4, 9.2],
      gapLabelStart: 9.2, gapLabelEnd: 11.2,
      liquidEmphasisStart: 11.2, liquidEmphasisEnd: 12,
      liquidBridgeLabelStart: 12, liquidBridgeLabelEnd: 13.5,
      substrateStart: 13.5, contactStart: 14.05, lineStart: 14.45
    }),
    shot06: Object.freeze({
      reframeStart: 15, reframeEnd: 16,
      oldRepresentationStart: 16, oldCompleteStart: 17, oldCompleteEnd: 18.8,
      oldRepresentationFade: 18.8, oldFadeEnd: 19.5,
      comparisonPause: [19.5, 20.2],
      newRepresentationStart: 20.2, newFrameEnd: 21.25,
      newTitleStart: 21.1, newQuestionStart: 21.8, newCompleteEnd: 22.8,
      transferReplayStart: 22.8, transferReplayEnd: 24,
      finalHoldStart: 24
    })
  }),
  subtitles: Object.freeze([
    { start: 0, end: 3, text: "液体进入两根毛之间以后，" },
    { start: 3, end: 7, text: "真正重要的东西开始变了。" },
    { start: 7, end: 11, text: "控制液体转移的，不再只是‘尖端到底有多细’，" },
    { start: 11, end: 15, text: "而是两根毛之间的 gap，以及里面形成的 liquid bridge。" }
  ])
});
