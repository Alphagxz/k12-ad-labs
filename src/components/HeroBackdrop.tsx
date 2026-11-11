"use client";

import { useEffect, useRef } from "react";
import { site } from "@/config/site";

const FRAG = `
precision mediump float;
uniform vec2 r; uniform float t;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.03+vec2(3.1,1.7);a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/r; vec2 p=(gl_FragCoord.xy-.5*r)/r.y;
  float T=t*.045;
  vec2 q=vec2(fbm(p*1.3+vec2(T,-T*.6)),fbm(p*1.3+vec2(-T*.8,T)+4.2));
  float f=fbm(p*1.6+q*1.9+vec2(0.,T*.5));
  float beam=smoothstep(.42,.95,f);
  vec3 warm=vec3(1.,.30,.14), cool=vec3(.80,.78,.74);
  vec3 c=vec3(.034,.032,.030);
  c+=warm*pow(beam,2.0)*.85*smoothstep(-.6,.7,p.x+q.y*.6);
  c+=cool*pow(smoothstep(.5,1.,fbm(p*2.2-q*1.4+T)),3.)*.16;
  c*=smoothstep(1.25,.25,length(p*vec2(.8,1.15)));
  c*=mix(.55,1.,smoothstep(0.,.55,uv.y));
  gl_FragColor=vec4(c,1.);
}`;

/**
 * Hero background. Plays site.hero.videoUrl when supplied; otherwise
 * renders a slow, generated light study (a stand-in until the
 * showreel montage is delivered — not presented as client work).
 */
export default function HeroBackdrop() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const { videoUrl, posterUrl } = site.hero;

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const gl = el.getContext("webgl", { antialias: false, powerPreference: "low-power" });
    if (!gl) return;

    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}"));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const a = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(a);
    gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(prog, "r");
    const uT = gl.getUniformLocation(prog, "t");

    // Render at reduced resolution: soft imagery, cheap on GPUs.
    const size = () => {
      const s = 0.5;
      el.width = Math.max(2, Math.floor(el.clientWidth * s));
      el.height = Math.max(2, Math.floor(el.clientHeight * s));
      gl.viewport(0, 0, el.width, el.height);
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(el);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let id = 0;
    let visible = true;
    const draw = (ms: number) => {
      gl.uniform2f(uR, el.width, el.height);
      gl.uniform1f(uT, 40 + ms / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduce && visible) id = requestAnimationFrame(draw);
    };
    const io = new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting;
      if (visible && !was && !reduce) id = requestAnimationFrame(draw);
    });
    io.observe(el);
    id = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(id);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  if (videoUrl) {
    return (
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={videoUrl}
        poster={posterUrl || undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
    );
  }
  return <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden />;
}
