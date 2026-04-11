import type { GetStaticProps } from 'next';
import { SiteLayout } from '../components/SiteLayout';
import { loadStaticTemplate } from '../lib/template-loader';

type PageProps = {
  bodyHtml: string;
};

const homePageScript = `
function initSwiper(){
  if(!window.Swiper)return;
  new Swiper('.testimonialSwiper',{loop:true,autoplay:{delay:4000,disableOnInteraction:false},speed:700,slidesPerView:1,spaceBetween:30,pagination:{el:'.swiper-pagination',clickable:true},navigation:{nextEl:'.swiper-button-next',prevEl:'.swiper-button-prev'},breakpoints:{768:{slidesPerView:1}}});
}
if(window.Swiper){initSwiper();}else{window.addEventListener('load',initSwiper);}
function initThreeJS(){
  var container=document.getElementById('three-js-container');
  if(!container||window.innerWidth<768||window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  var s=document.createElement('script');
  s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  s.onload=function(){
    var scene=new THREE.Scene();
    var camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
    var renderer=new THREE.WebGLRenderer({alpha:true,antialias:window.innerWidth>=1024});
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));
    container.appendChild(renderer.domElement);
    var count=window.innerWidth<1024?700:1500;
    var pos=new Float32Array(count*3);
    for(var i=0;i<count*3;i++)pos[i]=(Math.random()-0.5)*10;
    var geo=new THREE.BufferGeometry();
    geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
    var mat=new THREE.PointsMaterial({size:window.innerWidth<1024?0.008:0.006,color:'#f472b6',transparent:true,opacity:0.42,blending:THREE.AdditiveBlending});
    var mesh=new THREE.Points(geo,mat);
    scene.add(mesh);camera.position.z=3;
    function animate(){requestAnimationFrame(animate);mesh.rotation.y+=0.001;mesh.rotation.x+=0.0005;renderer.render(scene,camera);}
    window.addEventListener('resize',function(){if(window.innerWidth<768)return;camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();renderer.setSize(window.innerWidth,window.innerHeight);renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));});
    animate();
  };
  document.body.appendChild(s);
}
if('requestIdleCallback'in window){requestIdleCallback(initThreeJS,{timeout:1500});}else{setTimeout(initThreeJS,500);}
`;

export default function HomePage({ bodyHtml }: PageProps) {
  return (
    <SiteLayout bodyHtml={bodyHtml} pageScript={homePageScript} title="Home" />
  );
}

export const getStaticProps: GetStaticProps<PageProps> = () => ({
  props: {
    bodyHtml: loadStaticTemplate('index').replace(
      /<script>[\s\S]*<\/script>\s*$/,
      '',
    ),
  },
});
