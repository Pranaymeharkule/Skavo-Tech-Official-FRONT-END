import Container from "../components/layout/Container";
import { motion } from "framer-motion";
import { useState } from "react";
import api from "../api/axios";

import {
  SiPython,
  SiTensorflow,
  SiGooglecloud,
  SiCyberdefenders
} from "react-icons/si";

import { FaJava } from "react-icons/fa";
import { FiCpu, FiX } from "react-icons/fi";

const courses = [
{
title: "Python Programming",
icon: SiPython,
levels:[
"1 Month: Basics, loops, functions, file handling",
"3 Months: OOP, APIs, database integration",
"6 Months: Flask/Django, automation, capstone projects"
],
project:"Student Management System using Flask"
},

{
title:"Java Programming",
icon:FaJava,
levels:[
"1 Month: Core Java basics",
"3 Months: OOP, JDBC, collections",
"6 Months: Spring Boot, REST APIs, enterprise apps"
],
project:"Online Library Management System"
},

{
title:"Data Science",
icon:SiTensorflow,
levels:[
"1 Month: NumPy, Pandas, Visualization",
"3 Months: EDA, Statistics, Data Cleaning",
"6 Months: ML models, Deep Learning intro"
],
project:"Customer Churn Prediction Model"
},

{
title:"Artificial Intelligence",
icon:FiCpu,
levels:[
"1 Month: AI fundamentals",
"3 Months: NLP & Image Recognition",
"6 Months: Deep Learning (CNN, RNN)"
],
project:"AI Chatbot System"
},

{
title:"Machine Learning",
icon:SiTensorflow,
levels:[
"1 Month: Supervised & Unsupervised Learning",
"3 Months: Feature Engineering & Model Evaluation",
"6 Months: ML Pipelines & Advanced Models"
],
project:"House Price Prediction Model"
},

{
title:"Cyber Security",
icon:SiCyberdefenders,
levels:[
"1 Month: Basics & Cryptography",
"3 Months: Network Security & Pen Testing",
"6 Months: Ethical Hacking & Cloud Security"
],
project:"Web App Vulnerability Assessment"
},

{
title:"Cloud Computing",
icon:SiGooglecloud,
levels:[
"1 Month: Cloud Basics (AWS/Azure/GCP)",
"3 Months: Storage, Compute, Security",
"6 Months: DevOps & Scalable Deployment"
],
project:"Deploy E-Commerce App on AWS"
}
];

export default function Training(){

const [showForm,setShowForm] = useState(false);
const [selectedCourse,setSelectedCourse] = useState("");

const [formData,setFormData] = useState({
name:"",
email:"",
phone:""
});

const handleChange = (e)=>{
setFormData({
...formData,
[e.target.name]:e.target.value
});
};

const handleSubmit = async(e)=>{

e.preventDefault();

try{

await api.post("/training-enrollments",{
...formData,
course:selectedCourse
});

alert("Enrollment submitted successfully");

setShowForm(false);

setFormData({
name:"",
email:"",
phone:""
});

}catch(error){

console.error(error);
alert("Something went wrong");

}

};

return(

<section className="relative bg-[#070707] text-white overflow-hidden">

{/* Glow background */}

<div className="absolute -top-40 left-1/3 w-[600px] h-[600px] bg-purple-600/20 blur-[180px] rounded-full"/>
<div className="absolute -bottom-40 right-1/3 w-[600px] h-[600px] bg-blue-600/20 blur-[180px] rounded-full"/>

<Container>

{/* HERO */}

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.8}}
className="pt-40 pb-20 text-center max-w-3xl mx-auto"
>

<h1 className="text-6xl font-bold mb-6">

Future-Ready{" "}
<span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
Certification Courses
</span>

</h1>

<p className="text-gray-400 text-lg">
Industry-focused training programs with structured levels and
real-world internship projects designed to make you career-ready.
</p>

</motion.div>


{/* COURSES */}

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 pb-32">

{courses.map((course,i)=>{

const Icon = course.icon;

return(

<motion.div
key={i}
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
transition={{delay:i*0.1}}
viewport={{once:true}}
whileHover={{y:-8}}
className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:border-purple-500/40 transition"
>

<div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 mb-6">

<Icon className="text-2xl text-purple-400"/>

</div>

<h3 className="text-xl font-semibold mb-4">
{course.title}
</h3>

<ul className="text-gray-400 text-sm space-y-2 mb-6">

{course.levels.map((lvl,index)=>(
<li key={index} className="flex gap-2">
<span className="text-purple-400">✔</span> {lvl}
</li>
))}

</ul>

<p className="text-gray-300 text-sm mb-6">

<span className="text-purple-400 font-semibold">
Internship Project:
</span>{" "}
{course.project}

</p>

<button
onClick={()=>{
setSelectedCourse(course.title);
setShowForm(true);
}}
className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-sm hover:scale-105 transition"
>

Enroll Now

</button>

</motion.div>

);

})}

</div>

</Container>


{/* MODAL FORM */}

{showForm && (

<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

<div className="bg-[#111] p-8 rounded-2xl w-[420px] border border-white/10 relative">

<button
onClick={()=>setShowForm(false)}
className="absolute top-4 right-4 text-gray-400"
>
<FiX/>
</button>

<h2 className="text-xl font-semibold mb-6">
Enroll in {selectedCourse}
</h2>

<form onSubmit={handleSubmit} className="space-y-4">

<input
type="text"
name="name"
placeholder="Full Name"
value={formData.name}
onChange={handleChange}
required
className="w-full p-3 rounded bg-black border border-white/20"
/>

<input
type="email"
name="email"
placeholder="Email"
value={formData.email}
onChange={handleChange}
required
className="w-full p-3 rounded bg-black border border-white/20"
/>

<input
type="tel"
name="phone"
placeholder="Phone Number"
value={formData.phone}
onChange={handleChange}
required
className="w-full p-3 rounded bg-black border border-white/20"
/>

<button
type="submit"
className="w-full py-3 rounded bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 transition"
>

Submit Enrollment

</button>

</form>

</div>

</div>

)}

</section>

);
}