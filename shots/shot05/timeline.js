(() => {
  "use strict";
  const { timing: T, subtitles } = window.SHOT0506_CONFIG;
  const S5 = T.shot05, S6 = T.shot06, $ = (id) => document.getElementById(id);
  const e = Object.fromEntries(["scene","liquid-clip","liquid-contour","old-tip-circle","tip-size-label","tip-size-cross","new-gap-circle","gap-label-group","gap-pointer","gap-label","gap-label-cn","liquid-label-group","liquid-pointer","liquid-bridge-label","liquid-bridge-label-cn","substrate","liquid-contact","written-line","liquid-transfer-label","new-representation-group","new-frame","new-title","new-title-cn","new-question","old-representation-group","old-kicker","old-single-tip","old-arrow","old-thinner-tip","old-frame","old-frame-cross","old-title","old-question","final-statement","subtitle-layer","subtitle","scrubber","time-display"].map(id => [id, $(id)]));
  let time = 0, playing = false, lastFrame = 0;
  const clamp = (v, a=0, b=1) => Math.min(b, Math.max(a, v));
  const p = (t, a, b) => clamp((t-a)/(b-a));
  const smooth = v => v*v*(3-2*v);
  const draw = (node, value) => { node.style.strokeDashoffset = String(1-clamp(value)); };
  const opacity = (node, value) => { node.style.opacity = String(clamp(value)); };

  function render(t) {
    time = clamp(t, 0, T.duration);
    e["liquid-clip"].setAttribute("height", String(430*smooth(p(time,S5.liquidStart,S5.liquidEnd))));
    draw(e["old-tip-circle"],p(time,S5.oldFocusStart,S5.oldFocusEnd)); opacity(e["tip-size-label"],p(time,S5.oldFocusStart+.25,S5.oldFocusEnd));
    draw(e["tip-size-cross"],p(time,S5.crossOldStart,S5.crossOldEnd));
    const oldIdeaFade=p(time,S5.gapCircleEnd,S5.gapHold[1]); opacity(e["old-tip-circle"],1-.84*oldIdeaFade); opacity(e["tip-size-label"],p(time,S5.oldFocusStart+.25,S5.oldFocusEnd)*(1-.78*oldIdeaFade));
    draw(e["new-gap-circle"],p(time,S5.gapCircleStart,S5.gapCircleEnd));
    const gapWrite=p(time,S5.gapLabelStart,S5.gapLabelEnd); opacity(e["gap-label-group"],gapWrite); draw(e["gap-pointer"],gapWrite);
    opacity(e["gap-label-group"],gapWrite*(1-.38*p(time,S5.liquidEmphasisStart,S5.liquidEmphasisEnd)));
    e["liquid-contour"].style.strokeWidth=String(4+3*p(time,S5.liquidEmphasisStart,S5.liquidEmphasisEnd));
    const bridge=p(time,S5.liquidBridgeLabelStart,S5.liquidBridgeLabelEnd); opacity(e["liquid-label-group"],bridge); draw(e["liquid-pointer"],bridge);
    draw(e.substrate,p(time,S5.substrateStart,S5.contactStart)); draw(e["liquid-contact"],p(time,S5.contactStart,S5.lineStart)); draw(e["written-line"],.72*p(time,S5.lineStart,15)); opacity(e["liquid-transfer-label"],p(time,14.55,15));

    const reframe=smooth(p(time,S6.reframeStart,S6.reframeEnd));
    e["new-representation-group"].style.transform=`translate(${690+390*reframe}px,${95+30*reframe}px) scale(${1-.18*reframe})`;
    const oldIntro=p(time,S6.oldRepresentationStart,S6.oldCompleteStart); opacity(e["old-representation-group"],oldIntro); draw(e["old-single-tip"],oldIntro);
    const oldComplete=p(time,S6.oldCompleteStart,S6.oldCompleteEnd); draw(e["old-arrow"],p(oldComplete,0,.3)); draw(e["old-thinner-tip"],p(oldComplete,.18,.52)); draw(e["old-frame"],p(oldComplete,.35,.8)); opacity(e["old-title"],p(oldComplete,.52,.82)); opacity(e["old-question"],p(oldComplete,.7,1)); document.querySelector(".old-copy").style.opacity=String(p(oldComplete,.55,.86));
    const oldFade=p(time,S6.oldRepresentationFade,S6.oldFadeEnd); opacity(e["old-representation-group"],oldIntro*(1-.66*oldFade)); draw(e["old-frame-cross"],oldFade);
    const nf=p(time,S6.newRepresentationStart,S6.newFrameEnd); draw(e["new-frame"],nf); opacity(e["new-frame"],nf); const nt=p(time,S6.newTitleStart,S6.newQuestionStart); opacity(e["new-title"],nt); opacity(e["new-title-cn"],nt); opacity(e["new-question"],p(time,S6.newQuestionStart,S6.newCompleteEnd));
    const replay=p(time,S6.transferReplayStart,S6.transferReplayEnd); if(time>=S6.transferReplayStart){ e["liquid-contour"].style.strokeWidth=String(7+2*Math.sin(replay*Math.PI)); draw(e["liquid-contact"],replay); draw(e["written-line"],.72+.28*replay); }
    opacity(e["final-statement"],time>=S6.finalHoldStart?1:0);
    const cue=subtitles.find(c=>time>=c.start&&time<c.end); e.subtitle.textContent=cue?cue.text:""; opacity(e["subtitle-layer"],cue?1:0);
    e.scrubber.value=String(time); e["time-display"].textContent=`0:${String(Math.floor(time)).padStart(2,"0")} / 0:25`;
  }
  function frame(now){if(!playing)return;if(!lastFrame)lastFrame=now;time+=(now-lastFrame)/1000;lastFrame=now;if(time>=T.duration){time=T.duration;playing=false}render(time);if(playing)requestAnimationFrame(frame)}
  $("play").onclick=()=>{if(time<T.duration&&!playing){playing=true;lastFrame=0;requestAnimationFrame(frame)}}; $("pause").onclick=()=>playing=false; $("restart").onclick=()=>{playing=false;lastFrame=0;render(0)};
  e.scrubber.oninput=ev=>{playing=false;render(Number(ev.target.value))}; $("subtitle-toggle").onchange=ev=>e["subtitle-layer"].style.display=ev.target.checked?"block":"none"; $("debug-toggle").onchange=ev=>$("debug-guides").classList.toggle("visible",ev.target.checked);
  render(0);
})();
