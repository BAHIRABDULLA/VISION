import { updateMentorApproveStatus, userData, } from '@/services/adminApi';
import { useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';

import { CommonDetails } from '@/interfaces/UserList';
import { MenteeDetails } from '@/interfaces/UserList';
import { MentorDetails } from '@/interfaces/UserList';
import { Card, CardHeader, CardContent } from '@mui/material';
import {
  Mail, User, Shield, Check, X, Calendar, Book, Users, Award, Building2,
  MapPin, ChartBarStacked, Briefcase,  ListTodo
} from 'lucide-react';
import { updateUserActiveStatus } from '@/services/adminApi';

const ViewUser = () => {
  const [userDetails, setUserDetails] = useState<CommonDetails | MentorDetails | MenteeDetails | null>(null);
  console.log(userDetails, 'user details ');


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
        const response = await userData(userId)
        setUserDetails(response.data)
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
      console.log(updatedUser.isActive,'update user . is active ');
      
       await updateUserActiveStatus(userId,updatedUser.isActive );
      
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
      // await updateUserStatus(userId, { isApproved: newApprovalStatus });
      await updateMentorApproveStatus(userId, newApprovalStatus)
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
    <div className="min-h-screen bg-gray-50 p-6">
      <Link className="inline-flex items-center gap-2 mb-6 bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-shadow" to="/admin/users">
        <span>←</span> Back to Users
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center pb-2">
            <div className="relative mx-auto">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 p-1">
                <img
                  src={userDetails.profilePictureUrl || '/api/placeholder/150/150'}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full bg-white"
                />
              </div>
              <div className={`absolute bottom-0 right-0 w-6 h-6 rounded-full ${userDetails.isActive ? 'bg-green-400' : 'bg-red-400'} border-4 border-white`} />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              {userDetails.fullName}
            </h2>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {userDetails.role.charAt(0).toUpperCase() + userDetails.role.slice(1)}
            </span>
          </CardHeader>

          <CardContent>
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{userDetails.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">User ID</p>
                  <p className="text-gray-900">{userDetails.id}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Shield className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Verification Status</p>
                  <div className="flex items-center gap-1">
                    {userDetails.isVerified ? (
                      <>
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-green-600">Verified</span>
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4 text-red-500" />
                        <span className="text-red-600">Not Verified</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-gray-900">
                    {userDetails && userDetails.createAt ? userDetails.createAt.split("T")[0] : "Loading..."}
                  </p>

                </div>
              </div>
            </div>

            <button onClick={handleToggleActiveStatus}
              className={`w-full mt-6 px-4 py-2 rounded-lg font-medium transition-colors ${userDetails.isActive
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
            >
              {userDetails.isActive ? 'Deactivate Account' : 'Activate Account'}
            </button>
          </CardContent>
        </Card>

        {/* Stats & Activity Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <Book className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Sessions</p>
                    <p className="text-2xl font-semibold text-gray-900">24</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-green-100">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Connections</p>
                    <p className="text-2xl font-semibold text-gray-900">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-purple-100">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Achievements</p>
                    <p className="text-2xl font-semibold text-gray-900">5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <h2>Recent Activity</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                    <div>
                      <p className="text-gray-900">Completed mentoring session with Jane Smith</p>
                      <p className="text-sm text-gray-500">2 days ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Engagement Chart Placeholder */}

        </div>
      </div>
      <div className='mt-5'>
        {userDetails?.role === 'mentor' && userDetails?.isMentorFormFilled && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Mentorship Details</h3>
            <div className='flex'>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Briefcase className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Job Title</p>
                  <p className="text-gray-900">{(userDetails as MentorDetails)?.mentorDetails?.jobTitle || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <ChartBarStacked className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="text-gray-900">{(userDetails as MentorDetails)?.mentorDetails?.category || "N/A"}</p>
                </div>
              </div>
            </div>


            <div className='flex'>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-900">{(userDetails as MentorDetails)?.mentorDetails?.location || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Building2 className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="text-gray-900">{(userDetails as MentorDetails)?.mentorDetails?.company || "N/A"}</p>
                </div>
              </div>
            </div>


            {/* Skills */}

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <ListTodo className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Skills</p>
                <ul className="list-disc list-inside text-gray-700">
                  {(userDetails as MentorDetails)?.mentorDetails?.skills?.map((skill, index:number) => (
                    <li key={index}>{skill}</li>
                  )) || <li>No skills listed.</li>}
                </ul>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-medium text-gray-700 mb-2">Social Media:</h4>
              <ul className="list-none text-blue-500">
                {Object.entries((userDetails as MentorDetails)?.mentorDetails?.socialMediaUrls || {}).map(
                  ([platform]) => (
                    <li key={platform}>
                      {/* <a href={url} target="_blank" rel="noreferrer">{platform}</a> */}
                    </li>
                  )
                )}
              </ul>
            </div>

            <p className="text-gray-700 mb-2">
              <strong>Intro Video:</strong>{" "}
              <a href={(userDetails as MentorDetails)?.mentorDetails?.introVideoUrl || "#"} className="text-blue-500">
                Watch Video
              </a>
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Featured Article:</strong>{" "}
              <a href={(userDetails as MentorDetails)?.mentorDetails?.featuredArticleUrl || "#"} className="text-blue-500">
                Read Article
              </a>
            </p>

            <div className="mb-4 p-4 shadow rounded-md">
              <h4 className="text-lg font-medium text-gray-700 mb-2">Bio:</h4>
              <p className="text-gray-700">{(userDetails as MentorDetails)?.mentorDetails?.bio || "N/A"}</p>
            </div>

            <div className="mb-4 p-4 shadow rounded-md">
              <h4 className="text-lg font-medium text-gray-700 mb-2">Why Become a Mentor:</h4>
              <p className="text-gray-700">{(userDetails as MentorDetails)?.mentorDetails?.whyBecomeMentor || "N/A"}</p>
            </div>

            <div className="p-4 shadow rounded-md">
              <h4 className="text-lg font-medium text-gray-700 mb-2">Greatest Achievement:</h4>
              <p className="text-gray-700">{(userDetails as MentorDetails)?.mentorDetails?.greatestAchievement || "N/A"}</p>
            </div>

            <div className="flex justify-between items-center mt-4">
              {isMentor(userDetails) && (
                <>
                  <div>
                    <strong>Approved:</strong>
                    <span className={`ml-2 ${userDetails?.isApproved === 'approved' ? 'text-green-600' : 'text-red-600'}`}>
                      {userDetails?.isApproved === 'approved' ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <button
                    onClick={handleToggleApprovalStatus}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    {userDetails?.isApproved === 'approved' ? 'Unapprove' : 'Approve'}
                  </button>
                </>
              )}
            </div>
          </div>
        )}

      </div>
    </div>

  );
};

export default ViewUser;
