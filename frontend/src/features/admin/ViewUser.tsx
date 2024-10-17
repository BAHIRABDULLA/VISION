import { userData, } from '@/services/adminApi';
import { updateUserStatus } from '@/services/userApi';
import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import { Link, useParams } from 'react-router-dom';

import { CommonDetails } from '@/interfaces/UserList';
import { MenteeDetails } from '@/interfaces/UserList';
import { MentorDetails } from '@/interfaces/UserList';

const ViewUser = () => {
  const [userDetails, setUserDetails] = useState<CommonDetails | MentorDetails | MenteeDetails | null>(null);
  const { id } = useParams()
  const role = id?.slice(0, 6)
  console.log(role, 'rolero  __________');

  const userId = id?.slice(7)
  if (!userId) {
    return
  }
  console.log(id?.slice(7), 'use params');
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log('fkjdfjdk', userId);

        const response = await userData(userId)
        // if(role==='mentor'){
        //   setUserDetails(response.data.user)
        // }else{
        //   setUserDetails()
        // }
        console.log(response, 'response ');

        setUserDetails(response.data.user)
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      }
    }
    fetchUserDetails()
  }, [userId])


  const handleToggleActiveStatus = async () => {
    if (!userDetails) return;

    try {
      const updatedUser = { ...userDetails, isActive: !userDetails.isActive };
      await updateUserStatus(userId, { isActive: updatedUser.isActive });
      setUserDetails(updatedUser);
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleToggleApprovalStatus = async () => {
    if (!userDetails || userDetails.role !== 'mentor') return;
    const mentorDetails = userDetails as MentorDetails;

    try {

      const newApprovalStatus = mentorDetails.isApproved == 'pending' ? 'approved' : 'pending';
      const updatedUser = { ...mentorDetails, isApproved: newApprovalStatus };
      await updateUserStatus(userId, { isApproved: newApprovalStatus });
      setUserDetails(updatedUser);
    } catch (error) {
      console.error('Error updating approval status:', error);
    }
  };


  if (!userDetails) {
    return <div>Loading user details...</div>;
  }

  const isMentor = (user: CommonDetails | MentorDetails | MenteeDetails): user is MentorDetails => {
    return user.role === 'mentor' && 'isApproved' in user;
  };

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>

      <div>
        <Link className='shadow bg-white px-7 rounded-lg py-2' to='/admin/users'>Back</Link>
      </div>
      <div className="flex mt-3 p-1">


        {/* Left Side Box (Common Details) */}
        <div className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-lg mr-6">
          <div className="flex flex-col items-center text-center">
            <img
              src={userDetails.profilePictureUrl || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4 border-4 border-indigo-500"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              {userDetails.fullName}
            </h2>

            <div className="w-full mt-4 space-y-3">
              <div className="flex justify-between w-full">
                <span className="text-gray-500 font-medium">Email:</span>
                <span className="text-gray-700">{userDetails.email}</span>
              </div>

              <div className="flex justify-between w-full">
                <span className="text-gray-500 font-medium">ID:</span>
                <span className="text-gray-700">{userDetails.id}</span>
              </div>

              <div className="flex justify-between w-full">
                <span className="text-gray-500 font-medium">Role:</span>
                <span className={`text-gray-700 ${userDetails.role === 'mentor' ? 'text-green-600' : 'text-blue-600'}`}>
                  {userDetails.role}
                </span>
              </div>

              <div className="flex justify-between w-full">
                <span className="text-gray-500 font-medium">Verified:</span>
                <span className={`text-gray-700 ${userDetails.isVerified ? 'text-green-600' : 'text-red-600'}`}>
                  {userDetails.isVerified ? 'Yes' : 'No'}
                </span>
              </div>

              <div className="flex justify-between w-full">
                <span className="text-gray-500 font-medium">Account Created:</span>
                <span className="text-gray-700">{userDetails.accountCreated}</span>
              </div>

              <div className="flex justify-between w-full">
                <span className="text-gray-500 font-medium">Active:</span>
                <span className={`text-gray-700 ${userDetails.isActive ? 'text-green-600' : 'text-red-600'}`}>
                  {userDetails.isActive ? 'Yes' : 'No'}
                </span>
              </div>
              <button onClick={handleToggleActiveStatus} className="mt-3 bg-blue-500 text-white px-4 py-2 rounded">
                {userDetails.isActive ? 'Deactivate' : 'Activate'}
              </button>
              {/* <button  className="mt-3 bg-blue-500 text-white px-4 py-2 rounded">
                {userDetails.isActive ? 'Deactivate' : 'Activate'}
              </button> */}
            </div>
          </div>
        </div>


        {/* Right Side Box (Role-Specific Details) */}
        <div className="w-full md:w-2/3 p-4 bg-white rounded-md shadow-md">
          {userDetails.role === 'mentee' && 'courses' in userDetails && 'mentors' in userDetails && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Mentee Details</h3>

              {/* Courses Taken */}
              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-700 mb-2">Courses Taken:</h4>
                <ul className="list-disc list-inside text-gray-700">
                  {userDetails.courses?.length ? userDetails.courses.map((course, index) => (
                    <li key={index}>{course}</li>
                  )) : <li>No courses taken</li>}
                </ul>
              </div>

              {/* Mentors */}
              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-700 mb-2">Mentors:</h4>
                <ul className="list-disc list-inside text-gray-700">
                  {userDetails.mentors?.length ? userDetails.mentors.map((mentor, index) => (
                    <li key={index}>{mentor}</li>
                  )) : <li>No mentors assigned</li>}
                </ul>
              </div>
            </div>
          )}

          {userDetails.role === 'mentor' && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Mentor Details</h3>

              {/* Job Title, Category, Company, Location */}
              <p className="text-gray-700 mb-2"><strong>Job Title:</strong> {(userDetails as MentorDetails).mentorDetails.jobTitle}</p>
              <p className="text-gray-700 mb-2"><strong>Category:</strong> {(userDetails as MentorDetails).mentorDetails.category}</p>
              <p className="text-gray-700 mb-2"><strong>Company:</strong> {(userDetails as MentorDetails).mentorDetails.company}</p>
              <p className="text-gray-700 mb-4"><strong>Location:</strong> {(userDetails as MentorDetails).mentorDetails.location}</p>

              {/* Skills */}
              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-700 mb-2">Skills:</h4>
                <ul className="list-disc list-inside text-gray-700">
                  {(userDetails as MentorDetails).mentorDetails.skills.map((skill: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined, index: Key | null | undefined) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>

              {/* Social Media URLs */}
              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-700 mb-2">Social Media:</h4>
                <ul className="list-none text-blue-500">
                  {Object.entries((userDetails as MentorDetails).mentorDetails.socialMediaUrls).map(([platform, url]) => (
                    <li key={platform}>
                      {/* <a href={url} target="_blank" rel="noreferrer">{platform}</a> */}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Intro Video, Featured Article */}
              <p className="text-gray-700 mb-2"><strong>Intro Video:</strong> <a href={(userDetails as MentorDetails).mentorDetails.introVideoUrl} className="text-blue-500">Watch Video</a></p>
              <p className="text-gray-700 mb-4"><strong>Featured Article:</strong> <a href={(userDetails as MentorDetails).mentorDetails.featuredArticleUrl} className="text-blue-500">Read Article</a></p>

              {/* Bio, Why Become a Mentor, Greatest Achievement */}
              <div className="mb-4 p-4 shadow rounded-md">
                <h4 className="text-lg font-medium text-gray-700 mb-2">Bio:</h4>
                <p className="text-gray-700">{(userDetails as MentorDetails).mentorDetails.bio}</p>
              </div>

              <div className="mb-4 p-4 shadow rounded-md">
                <h4 className="text-lg font-medium text-gray-700 mb-2">Why Become a Mentor:</h4>
                <p className="text-gray-700">{(userDetails as MentorDetails).mentorDetails.whyBecomeMentor}</p>
              </div>

              <div className="p-4 shadow rounded-md">
                <h4 className="text-lg font-medium text-gray-700 mb-2">Greatest Achievement:</h4>
                <p className="text-gray-700">{(userDetails as MentorDetails).mentorDetails.greatestAchievement}</p>
              </div>

              {/* Approval Status */}
              <div className="flex justify-between items-center">
                {isMentor(userDetails) && (
                  <>
                    <div>
                      <strong>Approved:</strong>
                      <span className={`ml-2 ${userDetails.isApproved === 'approved' ? 'text-green-600' : 'text-red-600'}`}>
                        {userDetails.isApproved === 'approved' ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <button
                      onClick={handleToggleApprovalStatus}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      {userDetails.isApproved === 'approved' ? 'Unapprove' : 'Approve'}
                    </button>
                  </>
                )}
              </div>


            </div>
          )}
        </div>

      </div>
    </div>

  );
};

export default ViewUser;
