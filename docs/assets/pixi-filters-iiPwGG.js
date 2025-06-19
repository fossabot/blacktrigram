import{E as g,M as k,w as G,e as P}from"./pixi-core-llF4J-.js";import{S as O,c as U,G as _,d as M,U as w,B,a as T,e as x,f as I,R as A,g as z}from"./pixi-rendering-BZGJ8-.js";import{g as V,e as q}from"./pixi-scene-Cngq3_.js";class J{constructor(){this.pipe="filter",this.priority=1}destroy(){for(let e=0;e<this.filters.length;e++)this.filters[e].destroy();this.filters=null,this.filterArea=null}}const C=class b extends O{constructor(e){e={...b.defaultOptions,...e},super(e),this.enabled=!0,this._state=U.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,t,r,n){e.applyFilter(this,t,r,n)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:t,gl:r,...n}=e;let a,i;return t&&(a=_.from(t)),r&&(i=M.from(r)),new b({gpuProgram:a,glProgram:i,...n})}};C.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let D=C;class S{constructor(e){this._renderer=e}push(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",canBundle:!1,action:"pushFilter",container:t,filterEffect:e})}pop(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",action:"popFilter",canBundle:!1})}execute(e){e.action==="pushFilter"?this._renderer.filter.push(e):e.action==="popFilter"&&this._renderer.filter.pop()}destroy(){this._renderer=null}}S.extension={type:[g.WebGLPipes,g.WebGPUPipes,g.CanvasPipes],name:"filter"};const E=new I({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),format:"float32x2",stride:2*4,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])});class Y{constructor(){this.skip=!1,this.inputTexture=null,this.backTexture=null,this.filters=null,this.bounds=new q,this.container=null,this.blendRequired=!1,this.outputRenderSurface=null,this.outputOffset={x:0,y:0},this.globalFrame={x:0,y:0,width:0,height:0}}}class R{constructor(e){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new w({uInputSize:{value:new Float32Array(4),type:"vec4<f32>"},uInputPixel:{value:new Float32Array(4),type:"vec4<f32>"},uInputClamp:{value:new Float32Array(4),type:"vec4<f32>"},uOutputFrame:{value:new Float32Array(4),type:"vec4<f32>"},uGlobalFrame:{value:new Float32Array(4),type:"vec4<f32>"},uOutputTexture:{value:new Float32Array(4),type:"vec4<f32>"}}),this._globalFilterBindGroup=new B({}),this.renderer=e}get activeBackTexture(){return this._activeFilterData?.backTexture}push(e){const t=this.renderer,r=e.filterEffect.filters,n=this._pushFilterData();n.skip=!1,n.filters=r,n.container=e.container,n.outputRenderSurface=t.renderTarget.renderSurface;const a=t.renderTarget.renderTarget.colorTexture.source,i=a.resolution,u=a.antialias;if(r.length===0){n.skip=!0;return}const o=n.bounds;if(e.renderables?V(e.renderables,o):e.filterEffect.filterArea?(o.clear(),o.addRect(e.filterEffect.filterArea),o.applyMatrix(e.container.worldTransform)):e.container.getFastGlobalBounds(!0,o),e.container){const h=(e.container.renderGroup||e.container.parentRenderGroup).cacheToLocalTransform;h&&o.applyMatrix(h)}if(this._calculateFilterBounds(n,t.renderTarget.rootViewPort,u,i,1),n.skip)return;const s=this._getPreviousFilterData();let p=i,l=0,f=0;s&&(l=s.bounds.minX,f=s.bounds.minY,p=s.inputTexture.source._resolution),n.outputOffset.x=o.minX-l,n.outputOffset.y=o.minY-f;const c=n.globalFrame;if(c.x=l*p,c.y=f*p,c.width=a.width*p,c.height=a.height*p,n.backTexture=T.EMPTY,n.blendRequired){t.renderTarget.finishRenderPass();const m=t.renderTarget.getRenderTarget(n.outputRenderSurface);n.backTexture=this.getBackTexture(m,o,s?.bounds)}n.inputTexture=x.getOptimalTexture(o.width,o.height,n.resolution,n.antialias),t.renderTarget.bind(n.inputTexture,!0),t.globalUniforms.push({offset:o})}generateFilteredTexture({texture:e,filters:t}){const r=this._pushFilterData();this._activeFilterData=r,r.skip=!1,r.filters=t;const n=e.source,a=n.resolution,i=n.antialias;if(t.length===0)return r.skip=!0,e;const u=r.bounds;if(u.addRect(e.frame),this._calculateFilterBounds(r,u.rectangle,i,a,0),r.skip)return e;const o=a,s=0,p=0;r.outputOffset.x=-u.minX,r.outputOffset.y=-u.minY;const l=r.globalFrame;l.x=s*o,l.y=p*o,l.width=n.width*o,l.height=n.height*o,r.outputRenderSurface=x.getOptimalTexture(u.width,u.height,r.resolution,r.antialias),r.backTexture=T.EMPTY,r.inputTexture=e,this.renderer.renderTarget.finishRenderPass(),this._applyFiltersToTexture(r,!0);const c=r.outputRenderSurface;return c.source.alphaMode="premultiplied-alpha",c}pop(){const e=this.renderer,t=this._popFilterData();t.skip||(e.globalUniforms.pop(),e.renderTarget.finishRenderPass(),this._activeFilterData=t,this._applyFiltersToTexture(t,!1),t.blendRequired&&x.returnTexture(t.backTexture),x.returnTexture(t.inputTexture))}getBackTexture(e,t,r){const n=e.colorTexture.source._resolution,a=x.getOptimalTexture(t.width,t.height,n,!1);let i=t.minX,u=t.minY;r&&(i-=r.minX,u-=r.minY),i=Math.floor(i*n),u=Math.floor(u*n);const o=Math.ceil(t.width*n),s=Math.ceil(t.height*n);return this.renderer.renderTarget.copyToTexture(e,a,{x:i,y:u},{width:o,height:s},{x:0,y:0}),a}applyFilter(e,t,r,n){const a=this.renderer,i=this._activeFilterData,u=i.outputRenderSurface,o=this._filterGlobalUniforms,s=o.uniforms,p=s.uOutputFrame,l=s.uInputSize,f=s.uInputPixel,c=s.uInputClamp,m=s.uGlobalFrame,h=s.uOutputTexture;u===r?(p[0]=i.outputOffset.x,p[1]=i.outputOffset.y):(p[0]=0,p[1]=0),p[2]=t.frame.width,p[3]=t.frame.height,l[0]=t.source.width,l[1]=t.source.height,l[2]=1/l[0],l[3]=1/l[1],f[0]=t.source.pixelWidth,f[1]=t.source.pixelHeight,f[2]=1/f[0],f[3]=1/f[1],c[0]=.5*f[2],c[1]=.5*f[3],c[2]=t.frame.width*l[2]-.5*f[2],c[3]=t.frame.height*l[3]-.5*f[3],m[0]=i.globalFrame.x,m[1]=i.globalFrame.y,m[2]=i.globalFrame.width,m[3]=i.globalFrame.height,r instanceof T&&(r.source.resource=null);const d=this.renderer.renderTarget.getRenderTarget(r);if(a.renderTarget.bind(r,!!n),r instanceof T?(h[0]=r.frame.width,h[1]=r.frame.height):(h[0]=d.width,h[1]=d.height),h[2]=d.isRoot?-1:1,o.update(),a.renderPipes.uniformBatch){const F=a.renderPipes.uniformBatch.getUboResource(o);this._globalFilterBindGroup.setResource(F,0)}else this._globalFilterBindGroup.setResource(o,0);this._globalFilterBindGroup.setResource(t.source,1),this._globalFilterBindGroup.setResource(t.source.style,2),e.groups[0]=this._globalFilterBindGroup,a.encoder.draw({geometry:E,shader:e,state:e._state,topology:"triangle-list"}),a.type===A.WEBGL&&a.renderTarget.finishRenderPass()}calculateSpriteMatrix(e,t){const r=this._activeFilterData,n=e.set(r.inputTexture._source.width,0,0,r.inputTexture._source.height,r.bounds.minX,r.bounds.minY),a=t.worldTransform.copyTo(k.shared),i=t.renderGroup||t.parentRenderGroup;return i&&i.cacheToLocalTransform&&a.prepend(i.cacheToLocalTransform),a.invert(),n.prepend(a),n.scale(1/t.texture.frame.width,1/t.texture.frame.height),n.translate(t.anchor.x,t.anchor.y),n}destroy(){}_applyFiltersToTexture(e,t){const r=e.inputTexture,n=e.bounds,a=e.filters;if(this._globalFilterBindGroup.setResource(r.source.style,2),this._globalFilterBindGroup.setResource(e.backTexture.source,3),a.length===1)a[0].apply(this,r,e.outputRenderSurface,t);else{let i=e.inputTexture;const u=x.getOptimalTexture(n.width,n.height,i.source._resolution,!1);let o=u,s=0;for(s=0;s<a.length-1;++s){a[s].apply(this,i,o,!0);const l=i;i=o,o=l}a[s].apply(this,i,e.outputRenderSurface,t),x.returnTexture(u)}}_calculateFilterBounds(e,t,r,n,a){const i=this.renderer,u=e.bounds,o=e.filters;let s=1/0,p=0,l=!0,f=!1,c=!1,m=!0;for(let h=0;h<o.length;h++){const d=o[h];if(s=Math.min(s,d.resolution==="inherit"?n:d.resolution),p+=d.padding,d.antialias==="off"?l=!1:d.antialias==="inherit"&&l&&(l=r),d.clipToViewport||(m=!1),!!!(d.compatibleRenderers&i.type)){c=!1;break}if(d.blendRequired&&!(i.backBuffer?.useBackBuffer??!0)){G("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."),c=!1;break}c=d.enabled||c,f||(f=d.blendRequired)}if(!c){e.skip=!0;return}if(m&&u.fitBounds(0,t.width/n,0,t.height/n),u.scale(s).ceil().scale(1/s).pad((p|0)*a),!u.isPositive){e.skip=!0;return}e.antialias=l,e.resolution=s,e.blendRequired=f}_popFilterData(){return this._filterStackIndex--,this._filterStack[this._filterStackIndex]}_getPreviousFilterData(){let e,t=this._filterStackIndex-1;for(;t>1&&(t--,e=this._filterStack[t],!!e.skip););return e}_pushFilterData(){let e=this._filterStack[this._filterStackIndex];return e||(e=this._filterStack[this._filterStackIndex]=new Y),this._filterStackIndex++,e}}R.extension={type:[g.WebGLSystem,g.WebGPUSystem],name:"filter"};var X=`in vec2 vMaskCoord;
in vec2 vTextureCoord;

uniform sampler2D uTexture;
uniform sampler2D uMaskTexture;

uniform float uAlpha;
uniform vec4 uMaskClamp;
uniform float uInverse;

out vec4 finalColor;

void main(void)
{
    float clip = step(3.5,
        step(uMaskClamp.x, vMaskCoord.x) +
        step(uMaskClamp.y, vMaskCoord.y) +
        step(vMaskCoord.x, uMaskClamp.z) +
        step(vMaskCoord.y, uMaskClamp.w));

    // TODO look into why this is needed
    float npmAlpha = uAlpha;
    vec4 original = texture(uTexture, vTextureCoord);
    vec4 masky = texture(uMaskTexture, vMaskCoord);
    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);

    float a = alphaMul * masky.r * npmAlpha * clip;

    if (uInverse == 1.0) {
        a = 1.0 - a;
    }

    finalColor = original * a;
}
`,L=`in vec2 aPosition;

out vec2 vTextureCoord;
out vec2 vMaskCoord;


uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;
uniform mat3 uFilterMatrix;

vec4 filterVertexPosition(  vec2 aPosition )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
       
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord(  vec2 aPosition )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

vec2 getFilterCoord( vec2 aPosition )
{
    return  ( uFilterMatrix * vec3( filterTextureCoord(aPosition), 1.0)  ).xy;
}   

void main(void)
{
    gl_Position = filterVertexPosition(aPosition);
    vTextureCoord = filterTextureCoord(aPosition);
    vMaskCoord = getFilterCoord(aPosition);
}
`,y=`struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct MaskUniforms {
  uFilterMatrix:mat3x3<f32>,
  uMaskClamp:vec4<f32>,
  uAlpha:f32,
  uInverse:f32,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;

@group(1) @binding(0) var<uniform> filterUniforms : MaskUniforms;
@group(1) @binding(1) var uMaskTexture: texture_2d<f32>;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) filterUv : vec2<f32>,
};

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);
}

fn getFilterCoord(aPosition:vec2<f32> ) -> vec2<f32>
{
  return ( filterUniforms.uFilterMatrix * vec3( filterTextureCoord(aPosition), 1.0)  ).xy;
}

fn getSize() -> vec2<f32>
{
  return gfu.uGlobalFrame.zw;
}

@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>,
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition),
   getFilterCoord(aPosition)
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) filterUv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {

    var maskClamp = filterUniforms.uMaskClamp;
    var uAlpha = filterUniforms.uAlpha;

    var clip = step(3.5,
      step(maskClamp.x, filterUv.x) +
      step(maskClamp.y, filterUv.y) +
      step(filterUv.x, maskClamp.z) +
      step(filterUv.y, maskClamp.w));

    var mask = textureSample(uMaskTexture, uSampler, filterUv);
    var source = textureSample(uTexture, uSampler, uv);
    var alphaMul = 1.0 - uAlpha * (1.0 - mask.a);

    var a: f32 = alphaMul * mask.r * uAlpha * clip;

    if (filterUniforms.uInverse == 1.0) {
        a = 1.0 - a;
    }

    return source * a;
}
`;class K extends D{constructor(e){const{sprite:t,...r}=e,n=new z(t.texture),a=new w({uFilterMatrix:{value:new k,type:"mat3x3<f32>"},uMaskClamp:{value:n.uClampFrame,type:"vec4<f32>"},uAlpha:{value:1,type:"f32"},uInverse:{value:e.inverse?1:0,type:"f32"}}),i=_.from({vertex:{source:y,entryPoint:"mainVertex"},fragment:{source:y,entryPoint:"mainFragment"}}),u=M.from({vertex:L,fragment:X,name:"mask-filter"});super({...r,gpuProgram:i,glProgram:u,resources:{filterUniforms:a,uMaskTexture:t.texture.source}}),this.sprite=t,this._textureMatrix=n}set inverse(e){this.resources.filterUniforms.uniforms.uInverse=e?1:0}get inverse(){return this.resources.filterUniforms.uniforms.uInverse===1}apply(e,t,r,n){this._textureMatrix.texture=this.sprite.texture,e.calculateSpriteMatrix(this.resources.filterUniforms.uniforms.uFilterMatrix,this.sprite).prepend(this._textureMatrix.mapCoord),this.resources.uMaskTexture=this.sprite.texture.source,e.applyFilter(this,t,r,n)}}P.add(R);P.add(S);export{J as F,K as M,D as a};
