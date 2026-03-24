import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const services = [
{
title: "Web Development",
desc: "Crafting captivating websites with modern technologies and responsive experiences.",
image: "/icons/web-development.jpg"
},
{
title: "Python Development",
desc: "Build powerful backend systems, automation tools, and scalable applications.",
image: "/icons/python.jpeg"
},
{
title: "Mobile App Development",
desc: "High-performance Android & iOS apps with seamless and engaging user experience.",
image: "/icons/mobile-app.jpeg"
},
{
title: "Digital Marketing",
desc: "Boost visibility, generate leads, and grow your brand with strategic marketing.",
image: "/icons/digital-marketing.png"
}
];

const expertise = [
{
title:"Front-End Development",
desc:"Interactive and responsive applications using React, Angular, Vue and modern frameworks."
},
{
title:"Back-End Development",
desc:"Secure and scalable backend systems using Node.js, Python, Java and enterprise technologies."
},
{
title:"UI/UX Design",
desc:"Clean, intuitive, and engaging designs that improve user experience and retention."
},
{
title:"Database Engineering",
desc:"High-performance database architecture with MongoDB, MySQL, PostgreSQL and NoSQL."
},
{
title:"API Integration",
desc:"Payment gateways, social APIs, business tools and advanced integrations."
},
{
title:"Mobile Applications",
desc:"Smooth Android & iOS apps with optimized performance and modern UI."
}
];

import {
SiHtml5,
SiCss3,
SiJavascript,
SiReact,
SiTypescript,
SiTailwindcss,
SiNextdotjs,
SiNodedotjs,
SiPython,
SiDjango,
SiMysql
} from "react-icons/si";

const techStack = [
{ name: "HTML", icon: SiHtml5 },
{ name: "CSS", icon: SiCss3 },
{ name: "JavaScript", icon: SiJavascript },
{ name: "React", icon: SiReact },
{ name: "TypeScript", icon: SiTypescript },
{ name: "Tailwind CSS", icon: SiTailwindcss },
{ name: "Next.js", icon: SiNextdotjs },
{ name: "Node.js", icon: SiNodedotjs },
{ name: "Python", icon: SiPython },
{ name: "Django", icon: SiDjango },
{ name: "SQL", icon: SiMysql }
];

export default function ServicesPreview() {

return (

<section className="relative py-40 bg-black text-white overflow-hidden">

{/* Glow Background */}
<div className="absolute -top-40 left-0 w-[600px] h-[600px] bg-purple-600/20 blur-[160px] rounded-full"/>
<div className="absolute -bottom-40 right-0 w-[600px] h-[600px] bg-blue-600/20 blur-[160px] rounded-full"/>

<div className="max-w-7xl mx-auto px-8 relative z-10">

{/* HERO */}

<div className="text-center mb-28">

<motion.h1
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
transition={{duration:0.8}}
className="text-5xl lg:text-6xl font-bold"
>

Building Complete{" "}
<span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
Digital Ecosystems
</span>

</motion.h1>

<p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg">
We design and develop powerful digital systems that combine performance,
beautiful user experiences, and scalable architecture to grow your business.
</p>

</div>

{/* SERVICES */}

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-32">

{services.map((s,i)=>(

<Tilt key={i} scale={1.08} tiltMaxAngleX={12} tiltMaxAngleY={12}>

<motion.div
initial={{opacity:0,y:60}}
whileInView={{opacity:1,y:0}}
animate={{y:[0,-6,0]}}

viewport={{once:true}}
className="relative p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl group overflow-hidden hover:border-purple-500/40 transition-all duration-500"
>

{/* Hover Glow */}
<div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition duration-500"/>

{/* Icon */}

<div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 mb-6 group-hover:scale-110 group-hover:rotate-6 transition duration-500">

<img
src={s.image}
alt={s.title}
loading="lazy"
className="w-12 h-12 object-contain"
/>

</div>

<h3 className="text-xl font-semibold mb-3">
{s.title}
</h3>

<p className="text-gray-400 text-sm leading-relaxed">
{s.desc}
</p>

{/* bottom animated line */}

<div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-500"/>

</motion.div>

</Tilt>

))}

</div>


{/* COMPANY IMPACT */}

<div className="grid md:grid-cols-4 text-center gap-16 mb-32">

{[
{num:"500+",label:"Projects Completed"},
{num:"98%",label:"Client Satisfaction"},
{num:"10+",label:"Expert Developers"},
{num:"24/7",label:"Support Available"}
].map((item,i)=>(

<motion.div
key={i}
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
transition={{delay:i*0.2}}
viewport={{once:true}}
>

<h3 className="text-5xl font-bold text-purple-400 mb-3">
{item.num}
</h3>

<p className="text-gray-400 text-lg">
{item.label}
</p>

</motion.div>

))}

</div>


{/* EXPERTISE */}

<div className="mb-32">

<h2 className="text-4xl font-bold text-center mb-20">
Our Expertise
</h2>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">

{expertise.map((item,i)=>(

<motion.div
key={i}
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
transition={{delay:i*0.1}}
viewport={{once:true}}
className="p-8 border border-white/10 rounded-2xl bg-white/5 hover:border-purple-500/40 transition"
>

<h3 className="text-xl font-semibold mb-3">
{item.title}
</h3>

<p className="text-gray-400 text-sm">
{item.desc}
</p>

</motion.div>

))}

</div>

</div>


{/* TECH STACK */}
{/* TECH STACK */}

<div className="mb-32 text-center">

<h2 className="text-4xl font-bold mb-16">
Our Tech Stack
</h2>

<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 justify-items-center">

{techStack.map((tech,i)=>{

const Icon = tech.icon;

return(

<motion.div
key={i}
whileHover={{scale:1.1, y:-6}}
className="group flex flex-col items-center justify-center w-28 h-28 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-purple-500/40 transition"
>

<Icon className="text-3xl text-purple-400 group-hover:text-blue-400 transition"/>

<p className="text-xs mt-3 text-gray-300">
{tech.name}
</p>

</motion.div>

)

})}

</div>

</div>


{/* CTA */}

<div className="text-center">

<h2 className="text-4xl font-bold mb-6">
Transform Your Digital Presence
</h2>

<p className="text-gray-400 mb-10 max-w-xl mx-auto">
Partner with us to build high-performance digital systems that
accelerate business growth and improve customer experiences.
</p>

<motion.button
whileHover={{scale:1.08}}
className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg hover:shadow-purple-500/40 transition"
>

Start Your Project

</motion.button>

</div>

</div>

</section>

);
}