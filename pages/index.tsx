import type { GetStaticProps } from 'next';
import { SiteLayout } from '../components/SiteLayout';
import { loadStaticTemplate } from '../lib/template-loader';

type PageProps = {
  bodyHtml: string;
};

const homePageScript = `const container=document.getElementById('three-js-container');if(container&&window.THREE){const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setSize(window.innerWidth,window.innerHeight);renderer.setPixelRatio(window.devicePixelRatio);container.appendChild(renderer.domElement);const count=1500;const pos=new Float32Array(count*3);for(let i=0;i<count*3;i++)pos[i]=(Math.random()-0.5)*10;const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(pos,3));const mat=new THREE.PointsMaterial({size:0.006,color:'#f472b6',transparent:true,opacity:0.5,blending:THREE.AdditiveBlending});const mesh=new THREE.Points(geo,mat);scene.add(mesh);camera.position.z=3;function animate(){requestAnimationFrame(animate);mesh.rotation.y+=0.001;mesh.rotation.x+=0.0005;renderer.render(scene,camera);}window.addEventListener('resize',()=>{camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();renderer.setSize(window.innerWidth,window.innerHeight);});animate();}if(window.Swiper){new Swiper('.testimonialSwiper',{loop:true,autoplay:{delay:4000,disableOnInteraction:false},speed:700,slidesPerView:1,spaceBetween:30,pagination:{el:'.swiper-pagination',clickable:true},navigation:{nextEl:'.swiper-button-next',prevEl:'.swiper-button-prev'},breakpoints:{768:{slidesPerView:1}}});}`;

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
