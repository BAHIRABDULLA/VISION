import { getAllCategories, saveNewCategory, updateCategory } from "@/services/adminApi";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";



interface Category {
    id: string
    name: string;
    skills: string[];
};

const CategoriesSkills: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newCategory, setNewCategory] = useState<string>('')
    const [newSkill, setNewSkill] = useState<string>('')
    const [skills, setSkills] = useState<string[]>([])
    const [categories, setCategories] = useState<Category[]>([]);
    const [editingCategory, setEditingCategory] = useState<any | null>(null)

    const addSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills((prev) => [...prev, newSkill.trim()])
            setNewSkill('')
        }
    }

    const removeSkill = (skill: string) => {
        setSkills((prev) => prev.filter((s) => s !== skill))
    }
    const saveCategory = async () => {
        try {

            console.log(newCategory, 'new cateogory')
            console.log(skills, 'skills ssds');
            const data = { category: newCategory, skills }
            if (editingCategory) {
                const response = await updateCategory(data)
            } else {
                const response = await saveNewCategory(data)
                console.log(response, 'response in save new category');
                if (response.status >= 400 || !response) {
                    toast.error(response?.data.message || 'Not updated')
                } else {
                    toast.success('New category added')
                    setNewCategory('')
                    setSkills([])
                }
                setIsModalOpen(false)
                setEditingCategory(null)
            }


        } catch (error) {
            console.error('error foiunded in save caatgory ', error);
        }
    }


    const editCategory = (category: any) => {
        setEditingCategory(category)
        setNewCategory(category.name)
        setSkills(category.skills)
        setIsModalOpen(true)
    }


    useEffect(() => {
        const fetchCategories = async () => {

            const response = await getAllCategories()
            console.log(response,'resopnse for fetch categoires');
            
            if(response){
                setCategories(response.data.categories)
            }
            // const mockData: Category[] = [
            //     {
            //         id: "1",
            //         name: "Software Development",
            //         skills: ["JavaScript", "React", "Node.js"],
            //     },
            //     {
            //         id: "2",
            //         name: "UI/UX Design",
            //         skills: ["Figma", "Adobe XD", "Wireframing",],
            //     },
            // ];
            // setCategories(mockData);
        };

        fetchCategories();
    }, []);



    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Manage Categories and Skills</h1>
            <Toaster />
            <button className="px-6 py-3  border border-gray-500 shadow-lg text-black rounded-lg" onClick={() => setIsModalOpen(true)}>
                Add New Category
            </button>
            {isModalOpen && (
                <div className="p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-lg font-bold mb-4">{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
                    <label className="block text-sm font-medium mb-2">Category Name</label>
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
                        placeholder="Enter category name"
                    />

                    <label className="block text-sm font-medium mb-2">Skills</label>
                    <div className="flex items-center mb-4">
                        <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            className="flex-grow px-3 py-2 border border-gray-300 rounded"
                            placeholder="Enter a skill"
                        />
                        <button
                            onClick={addSkill}
                            className="ml-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Add
                        </button>
                    </div>

                    {skills.length > 0 && (
                        <div className="mb-4">
                            <h3 className="text-sm font-medium mb-2">Added Skills</h3>
                            <ul className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm"
                                    >
                                        {skill}
                                        <button
                                            onClick={() => removeSkill(skill)}
                                            className="ml-2 text-red-500 hover:text-red-700"
                                        >
                                            ✕
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            // onClick={() => console.log({ category: newCategory, skills })}
                            onClick={saveCategory}
                            className="px-4 py-2  border border-gray-500 shadow-lg text-black rounded-lg"
                        >
                            Save Category
                        </button>
                    </div>

                </div>
            )}
            {categories.map((category) => (
                <div key={category.id} className="mb-6 mt-3 bg-white shadow p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-3">{category.name}</h2>
                    <ul className="list-disc pl-6">
                        {category.skills.map((skill, index) => (
                            <li key={index} className="text-gray-700">
                                {skill}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 flex gap-2">
                        <button className="px-4 py-2  border border-gray-500 shadow-lg text-black rounded-lg"
                            onClick={() => editCategory(category)} >
                            Edit
                        </button>
                        <select className=" border border-gray-500 shadow-lg text-black rounded-lg p-1" >
                            <option value="active">Active</option>
                            <option value="block">Block</option>
                        </select>
                    </div>
                </div>
            ))}


        </div>
    );
};

export default CategoriesSkills;
