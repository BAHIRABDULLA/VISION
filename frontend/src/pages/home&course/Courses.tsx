import CourseList from '@/components/CourseList';
import Header from '@/components/Header';


const Courses = () => {
  return (

    <div className="min-h-screen ">
      <Header />
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">Our Courses</h1>
      <div className='px-20 '>
        <CourseList />
      </div>
    </div>
  );
};

export default Courses;
