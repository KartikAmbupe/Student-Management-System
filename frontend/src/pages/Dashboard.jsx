import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  addStudent,
  deleteStudent,
  updateStudent,
} from "../features/student/studentSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);
  const { role } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ name: "", age: "", course: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (editingId) {
      await dispatch(updateStudent({ id: editingId, data: form }));
      setEditingId(null);
    } else {
      await dispatch(addStudent(form));
    }

    setForm({ name: "", age: "", course: "" });
  };

  const handleEdit = (student) => {
    setForm({
      name: student.name,
      age: student.age,
      course: student.course,
    });
    setEditingId(student._id);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Student Dashboard</h2>

        {role === "admin" && (
          <>
            {/* Add/Edit Student Form */}
            <form onSubmit={handleSubmit} className="flex gap-2 mb-6 flex-wrap">
              <input
                className="flex-1 p-2 rounded bg-gray-700"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className="w-24 p-2 rounded bg-gray-700"
                placeholder="Age"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
              />
              <input
                className="flex-1 p-2 rounded bg-gray-700"
                placeholder="Course"
                value={form.course}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
              />
              <button type="submit" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
                {editingId ? "Update" : "Add"}
              </button>
            </form>
          </>
        )}

        {/* Student List (visible to both admin and user) */}
        <ul className="space-y-4">
          {students.map((student) => (
            <li
              key={student._id}
              className="bg-gray-800 p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{student.name}</h3>
                <p className="text-sm text-gray-400">Age: {student.age}</p>
                <p className="text-sm text-gray-400">Course: {student.course}</p>
              </div>

              {role === "admin" && (
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(student)}
                    className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(deleteStudent(student._id))}
                    className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
