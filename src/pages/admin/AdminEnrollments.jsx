import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminEnrollments() {

const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

const fetchEnrollments = async () => {
  try {

    const res = await api.get("/training-enrollments");

    setData(res.data);

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }
};

useEffect(() => {
  fetchEnrollments();
}, []);

return (

<div className="p-10">

{/* Header */}

<div className="mb-8">

<h1 className="text-3xl font-bold text-white">
Training Enrollments
</h1>

<p className="text-gray-400 mt-1">
Manage student course applications
</p>

</div>


{/* Table Container */}

<div className="bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden">

{loading ? (

<div className="p-10 text-center text-gray-400">
Loading enrollments...
</div>

) : data.length === 0 ? (

<div className="p-10 text-center text-gray-400">
No enrollments found
</div>

) : (

<table className="w-full">

<thead className="bg-black/40 border-b border-white/10">

<tr className="text-left text-gray-400 text-sm">

<th className="p-4">Student</th>
<th className="p-4">Email</th>
<th className="p-4">Phone</th>
<th className="p-4">Course</th>
<th className="p-4">Date</th>

</tr>

</thead>

<tbody>

{data.map((d) => (

<tr
key={d._id}
className="border-b border-white/5 hover:bg-white/5 transition"
>

<td className="p-4 font-medium text-white">
{d.name}
</td>

<td className="p-4 text-gray-300">
{d.email}
</td>

<td className="p-4 text-gray-300">
{d.phone}
</td>

<td className="p-4">

<span className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400">
{d.course}
</span>

</td>

<td className="p-4 text-gray-400 text-sm">

{new Date(d.createdAt).toLocaleDateString()}

</td>

</tr>

))}

</tbody>

</table>

)}

</div>

</div>

);
}