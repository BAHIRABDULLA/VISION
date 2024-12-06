// import React from 'react';

// interface SidebarItemProps {
//     icon: React.ReactNode;
//     label: string;
//     isCollapsed: boolean;
//     isActive: boolean;
//     onClick: () => void;
//     badge?: string
//   }

// const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, isCollapsed, isActive, onClick, badge }) => {
//   return (
//     <div
//       className={`w-full flex items-center justify-between p-4 ${
//         isActive ? 'bg-purple-600' : 'hover:bg-purple-600'
//       }  rounded-md transition cursor-pointer relative`}
//       onClick={onClick}
//     >
//       <div className='flex items-center space-x-3'>
//         <div className='text-2xl'>{icon}</div>
//         {!isCollapsed && <span>{label}</span>}
//       </div>
//       {badge && !isCollapsed && (
//         <span className='absolute right-4 bg-pink-500 text-white px-2 py-1 rounded-full'>{badge}</span>
//       )}
//     </div>
//   );
// };

// export default SidebarItem;
