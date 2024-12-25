
const Testimonial = () => {
    return (
        <section className="py-10 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
            <h2 className="text-4xl text-center font-bold">Testimonials</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 sm:px-10 mt-8">
                <div className="text-center bg-gray-200 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <p className="italic">"Great experience, learned a lot!"</p>
                    <h3 className="mt-4 font-bold">- Student 1</h3>
                </div>
                <div className="text-center bg-gray-200 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <p className="italic">"Amazing mentors and resources!"</p>
                    <h3 className="mt-4 font-bold">- Student 2</h3>
                </div>
                <div className="text-center bg-gray-200 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <p className="italic">"Helped me land my dream job!"</p>
                    <h3 className="mt-4 font-bold">- Student 3</h3>
                </div>
            </div>
        </section>

    )
}

export default Testimonial