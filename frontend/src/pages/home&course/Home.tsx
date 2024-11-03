import CourseCard from '@/components/CourseCard'
import CourseList from '@/components/CourseList'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/features/user/home/Hero'
import MentorSlider from '@/features/user/home/MentorSlider'
import PopularCourses from '@/features/user/home/PopularCourse'
import Testimonial from '@/features/user/home/Testimonial'
import React from 'react'


const Home: React.FC = () => {
  return (
    <div className='bg-slate-950 min-h-screen'>
    <Header />
    <Hero />

    {/* Popular Courses Section */}
    <PopularCourses />

    {/* Mentors Slider */}
    <MentorSlider />
    
    <Testimonial />
    <Footer />
  </div>
  )
}

export default Home


// import React from 'react';
// import { ArrowRight, BookOpen, Users, Calendar, Award, ChevronRight } from 'lucide-react';

// const Home = () => {
//   const features = [
//     {
//       title: "Expert Mentors",
//       description: "Learn from industry professionals with years of experience",
//       icon: <Users className="w-6 h-6 text-blue-500" />
//     },
//     {
//       title: "Flexible Learning",
//       description: "Access courses and mentorship sessions at your own pace",
//       icon: <Calendar className="w-6 h-6 text-blue-500" />
//     },
//     {
//       title: "Interactive Courses",
//       description: "Engage with comprehensive curriculum and hands-on projects",
//       icon: <BookOpen className="w-6 h-6 text-blue-500" />
//     },
//     {
//       title: "Certification",
//       description: "Earn recognized certificates upon course completion",
//       icon: <Award className="w-6 h-6 text-blue-500" />
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}
//       <header className="bg-gradient-to-r from-slate-900 to-slate-600">
//         <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex justify-between items-center">
//             <div className="text-white text-2xl font-bold">VISION</div>
//             <div className="hidden md:flex space-x-8">
//               <a href="#features" className="text-white hover:text-blue-200">Features</a>
//               <a href="#courses" className="text-white hover:text-blue-200">Courses</a>
//               <a href="#mentors" className="text-white hover:text-blue-200">Mentors</a>
//               <a href="#pricing" className="text-white hover:text-blue-200">Pricing</a>
//             </div>
//             <button className="bg-white text-slate-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50">
//               Get Started
//             </button>
//           </div>
//         </nav>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
//               Transform Your Career with Expert Mentorship
//             </h1>
//             <p className="text-xl text-blue-100 mb-8">
//               Connect with industry experts and accelerate your learning journey
//             </p>
//             <div className="flex justify-center space-x-4">
//               <button className="bg-white text-slate-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 flex items-center">
//                 Start Learning <ArrowRight className="ml-2 w-5 h-5" />
//               </button>
//               <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700">
//                 View Courses
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Features Section */}
//       <section className="py-20 bg-gray-50" id="features">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
//                 <div className="mb-4">{feature.icon}</div>
//                 <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Popular Courses Section */}
//       <section className="py-20" id="courses">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-center mb-12">Popular Courses</h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[1, 2, 3].map((course) => (
//               <div key={course} className="border rounded-lg overflow-hidden shadow-sm">
//                 <img
//                   src="/api/placeholder/400/200"
//                   alt="Course thumbnail"
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-6">
//                   <div className="text-sm text-blue-600 mb-2">DEVELOPMENT</div>
//                   <h3 className="text-xl font-semibold mb-2">Web Development Masterclass</h3>
//                   <p className="text-gray-600 mb-4">
//                     Learn modern web development from scratch with hands-on projects
//                   </p>
//                   <div className="flex justify-between items-center">
//                     <span className="text-2xl font-bold text-blue-600">$99</span>
//                     <button className="text-blue-600 font-medium flex items-center">
//                       Learn More <ChevronRight className="ml-1 w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl font-bold text-white mb-4">
//             Ready to Start Your Learning Journey?
//           </h2>
//           <p className="text-xl text-blue-100 mb-8">
//             Join thousands of students already learning with us
//           </p>
//           <button className="bg-purple-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-50">
//             Get Started Now
//           </button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-2xl font-bold mb-4">MentorPro</h3>
//               <p className="text-gray-400">
//                 Transforming careers through expert mentorship and quality education
//               </p>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Quick Links</h4>
//               <ul className="space-y-2">
//                 <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">Courses</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Resources</h4>
//               <ul className="space-y-2">
//                 <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Newsletter</h4>
//               <p className="text-gray-400 mb-4">Subscribe to get updates on new courses</p>
//               <div className="flex">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="px-4 py-2 rounded-l-lg w-full text-gray-900"
//                 />
//                 <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700">
//                   Subscribe
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;