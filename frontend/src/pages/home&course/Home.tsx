import CourseCard from '@/components/CourseCard'
import CourseList from '@/components/CourseList'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/features/user/home/Hero'
import Hero2 from '@/features/user/home/Hero2'
import MentorSlider from '@/features/user/home/MentorSlider'
import PopularCourses from '@/features/user/home/PopularCourse'
import Testimonial from '@/features/user/home/Testimonial'
import React, { useEffect, useRef } from 'react'





const Home: React.FC = () => {

  const sections = useRef<HTMLDivElement[]>([]); // Store section references
  let isScrolling = false; // Prevent multiple triggers

  const handleScroll = (event: WheelEvent) => {
    if (isScrolling) return; // Prevent triggering while scrolling
    isScrolling = true;

    const direction = event.deltaY > 0 ? 1 : -1; // Determine scroll direction
    const viewportHeight = window.innerHeight;

    // Find the section closest to the center of the viewport
    const currentSectionIndex = sections.current.findIndex((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top >= -viewportHeight / 2 && rect.top <= viewportHeight / 2;
    });

    // Determine the next section index
    const nextIndex = Math.min(
      Math.max(0, currentSectionIndex + direction),
      sections.current.length - 1
    );

    // Scroll to the next section
    sections.current[nextIndex]?.scrollIntoView({ behavior: 'smooth' });

    // Allow scrolling again after the transition
    setTimeout(() => {
      isScrolling = false;
    }, 800); // Adjust this timeout to match your smooth scrolling duration
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <div className=' min-h-screen'>
      <div ref={(el) => el && sections.current.push(el)} >
        <Header />
        <Hero />
      </div>

   <div ref={(el) => el && sections.current.push(el)} >
        <Hero2 />
      </div>
      <div ref={(el) => el && sections.current.push(el)} className='min-h-screen'>
        {/* Popular Courses Section */}
        <PopularCourses />
      </div>

      <div ref={(el) => el && sections.current.push(el)} className=''>
        {/* Mentors Slider */}
        <MentorSlider />
      </div>

      <div ref={(el) => el && sections.current.push(el)} className=''>
        <Testimonial />
        <Footer />

      </div>


    </div>
  )
}

export default Home

