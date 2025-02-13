import Loading from "@/components/Loading";
import { getAllCategories, saveNewCategory, updateCategory, updateCategoryStatus } from "@/services/adminApi";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Modal from 'react-modal'


Modal.setAppElement("#root")

interface Category {
    _id: string
    name: string;
    skills: string[];
    status: 'active' | 'block'
};

const CategoriesSkills: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newCategory, setNewCategory] = useState<string>('')
    const [newSkill, setNewSkill] = useState<string>('')
    const [skills, setSkills] = useState<string[]>([])
    const [categories, setCategories] = useState<Category[]>([]);
    const [editingCategory, setEditingCategory] = useState<any | null>(null)
    const [loading,setLoading] = useState(true)

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
            const data = { category: newCategory, skills };


            if (editingCategory) {
                const id = editingCategory._id;
                const response = await updateCategory(id, data);

                if (response?.status < 400) {
                    // setCategories((prevCategories) =>
                    //     prevCategories.map((cat) =>
                    //         cat.id === id ? { ...cat, ...data } : cat
                    //     )
                    // );
                    const updatedCategories = await getAllCategories();
                    setCategories(updatedCategories.data.categories);

                    toast.success('Category updated successfully');
                } else {
                    toast.error(response?.data?.message || 'Failed to update category');
                }
            } else {
                const response = await saveNewCategory(data);

                if (response?.status < 400 && response.data?._doc) {
                    setCategories((prevCategories) => [
                        ...prevCategories,
                        response.data._doc,
                    ]);
                    toast.success('New category added successfully');
                } else {
                    toast.error(response?.data?.message || 'Failed to add new category');
                }
            }

            resetModal();
        } catch (error) {
            console.error('Error in saveCategory:', error);
            toast.error('An unexpected error occurred');
        }
    };




    const editCategory = (category: any) => {
        setEditingCategory(category)
        setNewCategory(category.name)
        setSkills(category.skills)
        setIsModalOpen(true)

    }

    const resetModal = () => {
        setEditingCategory(null);
        setNewCategory('');
        setSkills([]);
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories()

                if (response) {
                    setCategories(response.data.categories || [])
                }
            } catch (error) {
                console.error('Error founded in categories',error);
            }finally{
                setLoading(false)
            }
           
        };

        fetchCategories();
    }, []);

    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedStatus, setSelectedStatus] = useState<'active' | 'block'>("active")
    const [statusModalOpen, setStatusModalOpen] = useState(false)

    const openModal = (category: Category, status: 'active' | 'block') => {
        setSelectedCategory(category)
        setSelectedStatus(status)

        setStatusModalOpen(true)
    }
    const closeModal = () => {

        setStatusModalOpen(false)
        setSelectedCategory(null)
    }

    const confirmStatusChange = async () => {

        if (selectedCategory) {

            const response = await updateCategoryStatus(selectedCategory._id, selectedStatus)
            if (response?.status >= 400) {
                toast.error(response?.data.message)
            } else {
                setCategories(prevCat => prevCat?.map(cat =>
                    cat._id === selectedCategory._id ? { ...cat, status: selectedStatus } : cat))
                toast.success('Status updated')
            }
            closeModal()
        }
    }

    if(loading){
        return <Loading/>
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Manage Categories and Skills</h1>
            <Toaster />
            <button className="px-6 py-3  border border-gray-500 shadow-lg text-black rounded-lg" onClick={() => setIsModalOpen(true)}>
                Add New Category
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg w-full">
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
                                onClick={resetModal}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveCategory}
                                className="px-4 py-2 border border-gray-500 shadow-lg text-black rounded-lg"
                            >
                                Save Category
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {categories.map((category, index) => (
                <div key={index} className=" mb-6 mt-3 bg-white shadow p-4 rounded-lg">
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
                        <select className=" border border-gray-500 shadow-lg text-black rounded-lg p-1"
                            value={category.status} onChange={(e) => openModal(category, e.target.value as 'active' | 'block')} >
                            <option hidden disabled>{category.status}</option>
                            <option value="active">Active</option>
                            <option value="block">Block</option>
                        </select>
                    </div>
                </div>

            ))}

            <Modal
                isOpen={statusModalOpen}
                onRequestClose={closeModal}
                contentLabel="Confirm Status Change"
                className="bg-white p-6 rounded shadow-lg max-w-md mx-auto"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <h2 className="text-lg font-semibold mb-4">Confirm Status Change</h2>
                <p>
                    Are you sure you want to change the status to <strong>{selectedStatus}</strong> for{" "}
                    <strong>{selectedCategory?.name}</strong>?
                </p>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={confirmStatusChange}
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={closeModal}
                        className="bg-gray-300 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </Modal>

        </div>
    );
};

export default CategoriesSkills;
