(() => {
  "use strict";
  const { TIMING: T, LAYOUT, SUBTITLES } = window.SHOT05_CONFIG;
  const $ = (id) => document.getElementById(id);
  const elements = {
    scene: $("scene"), main: $("main-diagram"), liquidClip: $("liquid-clip"), circle: $("attention-circle"),
    tip: $("tip-diagram"), tipLines: $("tip-lines"), tipLabel: $("tip-label"), crossOne: $("cross-one"), crossTwo: $("cross-two"),
    gapBracket: $("gap-bracket"), gapAnnotation: $("gap-annotation"), gapLabel: $("gap-label"), gapCn: $("gap-cn"),
    bridgeAnnotation: $("bridge-annotation"), bridgePointer: $("bridge-pointer"), bridgeLabel: $("bridge-label"), bridgeCn: $("bridge-cn"),
    subtitleLayer: $("subtitle-layer"), subtitle: $("subtitle"), scrubber: $("scrubber"), time: $("time-display")
  };
  let currentTime = 0;
  let playing = false;
  let previousFrame = 0;
  let portrait = false;

  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  const progress = (time, start, end) => clamp((time - start) / (end - start));
  const smooth = (value) => value * value * (3 - 2 * value);
  const draw = (element, value) => { element.style.strokeDashoffset = String(1 - clamp(value)); };
  const fadeIn = (element, value) => { element.style.opacity = String(clamp(value)); };
  const transform = (element, point) => {
    const scale = point.scale ? ` scale(${point.scale})` : "";
    element.setAttribute("transform", `translate(${point.x} ${point.y})${scale}`);
  };

  function applyLayout() {
    portrait = matchMedia("(max-aspect-ratio: 3/4)").matches;
    const layout = portrait ? LAYOUT.portrait : LAYOUT.landscape;
    elements.scene.setAttribute("viewBox", portrait ? "0 0 900 1600" : "0 0 1600 900");
    transform(elements.main, layout.hairGroup);
    transform(elements.tip, layout.tipDiagram);
    transform(elements.gapAnnotation, layout.gapAnnotation);
    transform(elements.bridgeAnnotation, layout.liquidBridgeAnnotation);
    const pointer = layout.liquidBridgeAnnotation.pointerEnd;
    elements.bridgePointer.setAttribute("d", `M0 0 L${pointer.x * 0.42} 9 L${pointer.x} ${pointer.y}`);
    const subtitleWidth = portrait ? 800 : 1240;
    elements.subtitleLayer.setAttribute("x", layout.subtitle.x - subtitleWidth / 2);
    elements.subtitleLayer.setAttribute("y", layout.subtitle.y - 45);
    elements.subtitleLayer.setAttribute("width", subtitleWidth);
    elements.subtitleLayer.setAttribute("height", 90);
    render(currentTime);
  }

  function render(time) {
    currentTime = clamp(time, 0, T.totalDuration);
    const liquid = smooth(progress(currentTime, T.liquidRevealStart, T.liquidRevealEnd));
    elements.liquidClip.setAttribute("height", String(352 * liquid));

    draw(elements.circle, progress(currentTime, T.attentionCircleStart, T.attentionCircleEnd));
    const circleFade = 1 - progress(currentTime, T.gapBracketStart, T.attentionCircleFadeEnd);
    elements.circle.style.opacity = String(circleFade);

    const tipProgress = progress(currentTime, T.tipDiagramStart, T.tipDiagramEnd);
    draw(elements.tipLines, tipProgress);
    fadeIn(elements.tipLabel, progress(tipProgress, 0.7, 1));
    draw(elements.crossOne, progress(currentTime, T.tipCrossStart, T.tipCrossStrokeChange));
    draw(elements.crossTwo, progress(currentTime, T.tipCrossStrokeChange, T.tipCrossEnd));
    const tipDemotion = progress(currentTime, T.emphasisReturnStart, T.emphasisReturnEnd);
    elements.tip.style.opacity = String(1 - tipDemotion * 0.72);

    draw(elements.gapBracket, progress(currentTime, T.gapBracketStart, T.gapBracketEnd));
    const gapText = progress(currentTime, T.gapLabelStart, T.gapLabelEnd);
    fadeIn(elements.gapLabel, gapText);
    fadeIn(elements.gapCn, gapText);

    draw(elements.bridgePointer, progress(currentTime, T.liquidBridgePointerStart, T.liquidBridgePointerEnd));
    const bridgeText = progress(currentTime, T.liquidBridgeLabelStart, T.liquidBridgeLabelEnd);
    fadeIn(elements.bridgeLabel, bridgeText);
    fadeIn(elements.bridgeCn, bridgeText);

    const subtitle = SUBTITLES.find((cue) => currentTime >= cue.start && currentTime < cue.end);
    elements.subtitle.textContent = subtitle ? subtitle.text : SUBTITLES.at(-1).text;
    elements.scrubber.value = String(currentTime);
    elements.time.textContent = `0:${String(Math.floor(currentTime)).padStart(2, "0")} / 0:${String(T.totalDuration).padStart(2, "0")}`;
  }

  function frame(now) {
    if (!playing) return;
    if (!previousFrame) previousFrame = now;
    currentTime += (now - previousFrame) / 1000;
    previousFrame = now;
    if (currentTime >= T.totalDuration) { currentTime = T.totalDuration; playing = false; }
    render(currentTime);
    if (playing) requestAnimationFrame(frame);
  }

  $("play").addEventListener("click", () => {
    if (currentTime >= T.totalDuration) return;
    if (!playing) { playing = true; previousFrame = 0; requestAnimationFrame(frame); }
  });
  $("pause").addEventListener("click", () => { playing = false; });
  $("restart").addEventListener("click", () => { playing = false; previousFrame = 0; render(0); });
  elements.scrubber.addEventListener("input", (event) => { playing = false; render(Number(event.target.value)); });
  $("subtitle-toggle").addEventListener("change", (event) => { elements.subtitleLayer.style.display = event.target.checked ? "block" : "none"; });
  $("debug-toggle").addEventListener("change", (event) => { $("debug-guides").classList.toggle("visible", event.target.checked); });
  addEventListener("resize", applyLayout);
  elements.scrubber.max = String(T.totalDuration);
  applyLayout();
})();
