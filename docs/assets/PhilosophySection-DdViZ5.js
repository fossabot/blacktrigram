import{j as e}from"./react-vendor-dWzucQ.js";import{u as x,K as t}from"./game-core-B0hT0L.js";import"./korean-data-DMmgpQ.js";import"./pixi-core-llF4J-.js";import{b as o}from"./pixi-scene-Cngq3_.js";import"./vendor-CmOGjt.js";import"./pixi-filters-iiPwGG.js";import"./pixi-rendering-BZGJ8-.js";const C=({onBack:l,x:s=0,y:a=0,width:r=800,height:n=600})=>(x(),e.jsxs("pixiContainer",{x:s,y:a,"data-testid":"philosophy-section",children:[e.jsx("pixiGraphics",{draw:i=>{i.clear(),i.beginFill(t.UI_BACKGROUND_DARK,.95),i.drawRoundedRect(0,0,r,n,10),i.endFill(),i.lineStyle(2,t.ACCENT_GOLD,.6),i.drawRoundedRect(0,0,r,n,10)}}),e.jsx("pixiText",{text:"무술 철학 (Martial Philosophy)",style:new o({fontSize:32,fill:t.ACCENT_GOLD,fontFamily:"Arial, sans-serif",align:"center"}),x:r/2,y:40,anchor:.5}),e.jsx("pixiText",{text:`
흑괘 (Black Trigram) - 한국 무술의 철학

팔괘는 고대 중국의 역경(I Ching)에서 유래한 
여덟 가지 기본 기호로, 우주의 모든 현상을 
나타냅니다. 한국 무술에서는 이를 전투 자세와 
연결하여 몸과 마음의 조화를 추구합니다.

• 건 (☰) - 하늘: 직접적인 힘
• 태 (☱) - 호수: 유연한 적응
• 리 (☲) - 불: 정밀한 공격
• 진 (☳) - 천둥: 폭발적인 힘
• 손 (☴) - 바람: 지속적인 압박
• 감 (☵) - 물: 흐름과 반격
• 간 (☶) - 산: 견고한 방어
• 곤 (☷) - 땅: 포용과 제압

무술은 단순한 격투가 아닌, 자신을 수양하고
상대를 존중하는 도(道)입니다.
  `,style:new o({fontSize:16,fill:t.TEXT_PRIMARY,fontFamily:"Arial, sans-serif",align:"left",wordWrap:!0,wordWrapWidth:r-80,lineHeight:24}),x:40,y:100}),e.jsxs("pixiContainer",{x:r-150,y:n-80,children:[e.jsx("pixiGraphics",{draw:i=>{i.clear(),i.beginFill(t.ACCENT_RED,.8),i.drawRoundedRect(0,0,120,40,5),i.endFill()},interactive:!0,onPointerDown:l}),e.jsx("pixiText",{text:"돌아가기",style:new o({fontSize:16,fill:t.TEXT_PRIMARY,align:"center"}),x:60,y:20,anchor:.5})]})]}));export{C as PhilosophySection,C as default};
