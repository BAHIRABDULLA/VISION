import { updateMentorApproveStatus, userData, } from '@/services/adminApi';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { CommonDetails } from '@/interfaces/UserList';
import { MenteeDetails } from '@/interfaces/UserList';
import { MentorDetails } from '@/interfaces/UserList';
import { Card, CardHeader, CardContent } from '@mui/material';
import {
  Mail, User, Shield, Check, X, Calendar, Book, Users, Award, Building2,
  MapPin, ChartBarStacked, Briefcase, ListTodo
} from 'lucide-react';
import { updateUserActiveStatus } from '@/services/adminApi';

const ViewUser = () => {
  const [userDetails, setUserDetails] = useState<CommonDetails | MentorDetails | MenteeDetails | null>(null);
  console.log(userDetails, 'userdetails in view user ');


  const { id } = useParams()
  const role = id?.slice(0, 6)

  const userId = id?.slice(7)
  if (!userId) {
    return
  }
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

      await updateUserActiveStatus(userId, updatedUser.isActive);

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
    <div className="min-h-screen  p-6">
      <Link className="inline-flex items-center gap-2 mb-6 bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-shadow" to="/admin/users">
        <span>←</span> Back to Users
      </Link>

      <div className=" gap-6">
        {/* Profile Card */}

        <Card className="lg:col-span-1">

          <div className="topCard flex items-center pb-4">
            {/* Profile Image with Status Indicator */}
            <div className="relative ms-20 pt-4 w-32 h-32 mr-4">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 p-1">
                <img
                  src={userDetails?.profile || '/api/placeholder/150/150'}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full bg-white"
                />
              </div>
            </div>

            {/* Right Side: Full Name and Role */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {userDetails?.fullName || "N/A"}
              </h2>
              <span className="mt-1 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {userDetails?.role ? userDetails.role.charAt(0).toUpperCase() + userDetails.role.slice(1) : "N/A"}
              </span>
            </div>
          </div>

          <CardContent>
            <div className="space-y-4 mt-4">
              <div className='flex gap-3'>
                <div className="flex w-full gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">{userDetails.email}</p>
                  </div>
                </div>

                <div className="flex w-full gap-3 p-3 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">User ID</p>
                    <p className="text-gray-900">{userDetails.role === 'mentee' ? userDetails?._id : (userDetails as MentorDetails)?.mentor}</p>
                  </div>
                </div>
              </div>
              <div className='flex gap-3'>
                <div className="flex w-full gap-3 p-3 bg-gray-50 rounded-lg">
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

                <div className="flex w-full gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="text-gray-900">
                      {userDetails && userDetails.createAt ? userDetails.createAt.split("T")[0] : "Loading..."}
                    </p>

                  </div>
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


      </div>
      {userDetails.role === 'mentor' &&
        <Card className='mt-3 rounded-sm'>
          <CardContent>
            <h3 className="text-2xl font-semibold mb-4">Mentorship Details</h3>

            <div className="space-y-4 mt-4">
              <div className='flex gap-3'>
                <div className="flex w-full gap-3 p-3 bg-gray-50 rounded-lg">
                  <Briefcase className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Job Title</p>
                    <p className="text-gray-900">{(userDetails as MentorDetails)?.jobTitle || "N/A"}</p>
                  </div>
                </div>

                <div className="flex w-full gap-3 p-3 bg-gray-50 rounded-lg">
                  <ChartBarStacked className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="text-gray-900">{(userDetails as MentorDetails)?.category || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className='flex gap-3'>
                <div className="flex w-full gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-900">{(userDetails as MentorDetails)?.location || "N/A"}</p>
                  </div>
                </div>

                <div className="flex w-full gap-3 p-3 bg-gray-50 rounded-lg">
                  <Building2 className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Company</p>
                    <p className="text-gray-900">{(userDetails as MentorDetails)?.company || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <ListTodo className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Skills</p>
                  <ul className="list-disc list-inside text-gray-700">
                    {(userDetails as MentorDetails)?.skills?.map((skill, index: number) => (
                      <li key={index}>{skill}</li>
                    )) || <li>No skills listed.</li>}
                  </ul>
                </div>
              </div>

              {/* Social Media */}
              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-700 mb-2">Social Media:</h4>
                <ul className="list-none text-blue-500">
                  {Object.entries((userDetails as MentorDetails)?.socialMediaUrls || {}).map(([platform]) => (
                    <li key={platform}>
                      <a href={(userDetails as MentorDetails)?.socialMediaUrls[platform]} target="_blank" rel="noreferrer">{platform}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Additional Details */}
              <p className="text-gray-700 mb-2">
                <strong>Intro Video:</strong>{" "}
                <a href={(userDetails as MentorDetails)?.introVideoUrl || "#"} className="text-blue-500">
                  Watch Video
                </a>
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Featured Article:</strong>{" "}
                <a href={(userDetails as MentorDetails)?.featuredArticleUrl || "#"} className="text-blue-500">
                  Read Article
                </a>
              </p>

              <div className="mb-4 p-4 shadow rounded-md">
                <h4 className="text-lg font-medium text-gray-700 mb-2">Bio:</h4>
                <p className="text-gray-700">{(userDetails as MentorDetails)?.bio || "N/A"}</p>
              </div>

              <div className="mb-4 p-4 shadow rounded-md">
                <h4 className="text-lg font-medium text-gray-700 mb-2">Why Become a Mentor:</h4>
                <p className="text-gray-700">{(userDetails as MentorDetails)?.whyBecomeMentor || "N/A"}</p>
              </div>

              <div className="p-4 shadow rounded-md">
                <h4 className="text-lg font-medium text-gray-700 mb-2">Greatest Achievement:</h4>
                <p className="text-gray-700">{(userDetails as MentorDetails)?.greatestAchievement || "N/A"}</p>
              </div>
            </div>
            <div>
              <button
                onClick={handleToggleApprovalStatus}
                className={`w-full mt-6 px-4 py-2 rounded-lg font-medium transition-colors ${userDetails.isApproved
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
              >
                {userDetails?.isApproved === 'approved' ? 'Unapprove' : 'Approve'}
              </button>
            </div>
          </CardContent>
        </Card>
      }

      {/* Stats & Activity Cards */}
      <div className="lg:col-span-2 space-y-6 mt-3">

        {/* Recent Activity */}
        <Card>
          <h2>Recent Activity</h2>
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

  );
};

export default ViewUser;
