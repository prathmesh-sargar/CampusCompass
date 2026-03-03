
// import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from './App/Store';
// import "react-toastify/dist/ReactToastify.css";

// import LandingPage from './Pages/LandingPage';
// import EventTracker from './Pages/EventTracker';
// import SignIn from './Pages/SignIn';
// import ProfileTracker from './Pages/ProfileTracker';
// import SignUp from './Pages/SignUp';
// import Layout from './Pages/Layout';
// import ProfileEdit from './Pages/ProfileEdit';


// import { ToastContainer } from 'react-toastify';
// import CodeforcesProfile from './components/ProfileTracker/CodeforcesProfile';
// import DevStats from './components/ProfileTracker/DevStats';
// import LeetCodeStats from './components/ProfileTracker/LeetCodeStats';
// import InterviewDashBord from './components/AiInterview/InterviewDashBord';
// import JobForm from './components/AiInterview/JobForm';
// import AiInterview from './components/AiInterview/AiInterview';
// import AIQuestionsPage from './components/AiInterview/AIQuestionspage';
// import CommunityChat from './components/chat/ChatCommunity';
// import ScorePage from './components/AiInterview/ScorePage';
// import ATSResume from './components/chat/ATSResume';
// import ChatGemini from './components/Chatwithgemini/ChatGemini';
// import Watch from './components/YTclone/Watch';
// import HomepageYT from './components/YTclone/HomepageYT';
// import Addactivities from './components/community/Addactivities';
// import Details from './components/community/Details';
// import Cards from './components/community/Cards';
// import OpenSourceContribute from './components/Contribute/OpenSourceContribute.jsx';
// import Leaderboard from './Pages/Leaderboard';
// // import ATSResume from './Components/chat/ATSResume';
// import ProtectedRoute from "./components/ProtectedRoute";


// const router = createBrowserRouter(
//     createRoutesFromElements(
//         <Route path="/" element={<Layout />}>
//             {/* Main Pages */}

//             <Route index element={<LandingPage />} />
//             <Route  path="event-tracker" element={<EventTracker />} />
//             <Route path="login" element={<SignIn />} />
//             <Route path="signup" element={<SignUp />} />
//             <Route path="ainterview" element={<InterviewDashBord />} />
//             <Route path="AIJobForm" element={<JobForm />} />
//             <Route path="community" element={<CommunityChat />} />
//             <Route path="resume" element={<ATSResume />} />
//             <Route path="opensource" element={<OpenSourceContribute />} />
//             <Route path="AI-Interivew/:interviewId" element={<AiInterview />} />
//             <Route path="AI-Interivew/:interviewId/start" element={<AIQuestionsPage />} />
//             <Route path="AI-Interivew/:interviewId/score" element={<ScorePage />} />
           
//            {/* community */}
//            <Route path="/activities" element={<Cards />} />
//            <Route path="/addactivities" element={<Addactivities />} />
//            <Route path="detail/:id" element={<Details />} />

            
//             {/* <Route path="resume" element={<ATSResume />} /> */}
//             <Route path="chat" element={<ChatGemini />} />

//              <Route path="watch" element={<Watch/>} />   
//             <Route path="ytcontent" element={<HomepageYT/>} />  
//             <Route path='leaderboard' element={<Leaderboard/>}/>
            
//             {/* <Route path="profile" element={<Resume />} /> */}

//             {/* Nested Routes for Question Tracker */}

//             {/* <Route path="question-tracker" element={<QuestionTracker />}>

//                 <Route index element={<Workspace />} />
//                 <Route path="workspace" element={<Workspace />} />
//                 <Route path="explore" element={<Explore />} />
//                 <Route path="mySheets" element={<MySheets />} />
//                 <Route path="notes" element={<Notes />} />
//                 <Route path="analysis" element={<Analysis />} />
                
//                 <Route path="explore/sheet/:id" element={<SheetDetails />} />
//             </Route> */}

//             {/* Profile Edit Nested Routes */}
//             <Route path="profile/edit" element={<ProfileEdit />} />



//             {/* Profile Tracker with Sub-Routes */}
//             <Route path="profile" element={<ProfileTracker />}>
//                 <Route index element={<LeetCodeStats />} />
//                 <Route path="leetcode" element={<LeetCodeStats />} />
//                 <Route path="github" element={<DevStats />} />
//                 <Route path="codeforces" element={<CodeforcesProfile />} />
//             </Route>
//         </Route>
//     )
// );

// const App = () => {
//     return (
//         <Provider store={store}>
//             <RouterProvider router={router} />
//             <ToastContainer position="top-right" autoClose={3000} />
//         </Provider>
//     );
// };


// export default App;

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./App/Store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Layout from "./Pages/Layout";
import LandingPage from "./Pages/LandingPage";
import EventTracker from "./Pages/EventTracker";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ProfileTracker from "./Pages/ProfileTracker";
import ProfileEdit from "./Pages/ProfileEdit";
import Leaderboard from "./Pages/Leaderboard";

// AI Interview
import InterviewDashBord from "./components/AiInterview/InterviewDashBord";
import JobForm from "./components/AiInterview/JobForm";
import AiInterview from "./components/AiInterview/AiInterview";
import AIQuestionsPage from "./components/AiInterview/AIQuestionspage";
import ScorePage from "./components/AiInterview/ScorePage";

// Community
import CommunityChat from "./components/chat/ChatCommunity";
import Addactivities from "./components/community/Addactivities";
import Details from "./components/community/Details";
import Cards from "./components/community/Cards";

// Resume + Chat
import ATSResume from "./components/chat/ATSResume";
import ChatGemini from "./components/Chatwithgemini/ChatGemini";

// YT Clone
import Watch from "./components/YTclone/Watch";
import HomepageYT from "./components/YTclone/HomepageYT";

// Open Source
import OpenSourceContribute from "./components/Contribute/OpenSourceContribute";

// Profile Sub Routes
import CodeforcesProfile from "./components/ProfileTracker/CodeforcesProfile";
import DevStats from "./components/ProfileTracker/DevStats";
import LeetCodeStats from "./components/ProfileTracker/LeetCodeStats";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>

      {/* ================= PUBLIC ROUTES ================= */}

      <Route index element={<LandingPage />} />
      <Route path="event-tracker" element={<EventTracker />} />
      <Route path="login" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="opensource" element={<OpenSourceContribute />} />
      <Route path="ytcontent" element={<HomepageYT />} />
      <Route path="watch" element={<Watch />} />
      <Route path="activities" element={<Cards />} />
      <Route path="detail/:id" element={<Details />} />

      {/* ================= PROTECTED ROUTES ================= */}

      <Route
        path="ainterview"
        element={
          <ProtectedRoute>
            <InterviewDashBord />
          </ProtectedRoute>
        }
      />

      <Route
        path="AIJobForm"
        element={
          <ProtectedRoute>
            <JobForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="AI-Interivew/:interviewId"
        element={
          <ProtectedRoute>
            <AiInterview />
          </ProtectedRoute>
        }
      />

      <Route
        path="AI-Interivew/:interviewId/start"
        element={
          <ProtectedRoute>
            <AIQuestionsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="AI-Interivew/:interviewId/score"
        element={
          <ProtectedRoute>
            <ScorePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="community"
        element={
          <ProtectedRoute>
            <CommunityChat />
          </ProtectedRoute>
        }
      />

      <Route
        path="addactivities"
        element={
          <ProtectedRoute>
            <Addactivities />
          </ProtectedRoute>
        }
      />

      <Route
        path="resume"
        element={
          <ProtectedRoute>
            <ATSResume />
          </ProtectedRoute>
        }
      />

      <Route
        path="chat"
        element={
          <ProtectedRoute>
            <ChatGemini />
          </ProtectedRoute>
        }
      />

      <Route
        path="leaderboard"
        element={
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="profile/edit"
        element={
          <ProtectedRoute>
            <ProfileEdit />
          </ProtectedRoute>
        }
      />

      {/* ================= PROTECTED NESTED PROFILE ================= */}

      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <ProfileTracker />
          </ProtectedRoute>
        }
      >
        <Route index element={<LeetCodeStats />} />
        <Route path="leetcode" element={<LeetCodeStats />} />
        <Route path="github" element={<DevStats />} />
        <Route path="codeforces" element={<CodeforcesProfile />} />
      </Route>

    </Route>
  )
);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  );
};

export default App;
