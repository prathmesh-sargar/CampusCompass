
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './App/Store';
import "react-toastify/dist/ReactToastify.css";

import LandingPage from './Pages/LandingPage';
import EventTracker from './Pages/EventTracker';
import SignIn from './Pages/SignIn';
import ProfileTracker from './Pages/ProfileTracker';
import SignUp from './Pages/SignUp';
import Layout from './Pages/Layout';
import ProfileEdit from './Pages/ProfileEdit';


import { ToastContainer } from 'react-toastify';
import CodeforcesProfile from './Components/ProfileTracker/CodeforcesProfile';
import DevStats from './Components/ProfileTracker/DevStats';
import LeetCodeStats from './Components/ProfileTracker/LeetCodeStats';
import InterviewDashBord from './Components/AiInterview/InterviewDashBord';
import JobForm from './Components/AiInterview/JobForm';
import AiInterview from './Components/AiInterview/AiInterview';
import AIQuestionsPage from './Components/AiInterview/AIQuestionspage';
import CommunityChat from './Components/chat/ChatCommunity';
import ScorePage from './Components/AiInterview/ScorePage';
import ATSResume from './Components/chat/ATSResume';
import ChatGemini from './Components/Chatwithgemini/ChatGemini';
import Watch from './Components/YTclone/Watch';
import HomepageYT from './Components/YTclone/HomepageYT';
import Addactivities from './Components/community/Addactivities';
import Details from './Components/community/Details';
import Cards from './Components/community/Cards';
import OpenSourceContribute from './Components/Contribute/OpenSourceContribute.jsx';
// import ATSResume from './Components/chat/ATSResume';


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            {/* Main Pages */}

            <Route index element={<LandingPage />} />
            <Route  path="event-tracker" element={<EventTracker />} />
            <Route path="login" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="ainterview" element={<InterviewDashBord />} />
            <Route path="AIJobForm" element={<JobForm />} />
            <Route path="community" element={<CommunityChat />} />
            <Route path="resume" element={<ATSResume />} />
            <Route path="opensource" element={<OpenSourceContribute />} />
            <Route path="AI-Interivew/:interviewId" element={<AiInterview />} />
            <Route path="AI-Interivew/:interviewId/start" element={<AIQuestionsPage />} />
            <Route path="AI-Interivew/:interviewId/score" element={<ScorePage />} />
           
           {/* community */}
           <Route path="/activities" element={<Cards />} />
           <Route path="/addactivities" element={<Addactivities />} />
           <Route path="detail/:id" element={<Details />} />

            
            {/* <Route path="resume" element={<ATSResume />} /> */}
            <Route path="chat" element={<ChatGemini />} />

             <Route path="watch" element={<Watch/>} />   
            <Route path="ytcontent" element={<HomepageYT/>} />  
            
            {/* <Route path="profile" element={<Resume />} /> */}

            {/* Nested Routes for Question Tracker */}

            {/* <Route path="question-tracker" element={<QuestionTracker />}>

                <Route index element={<Workspace />} />
                <Route path="workspace" element={<Workspace />} />
                <Route path="explore" element={<Explore />} />
                <Route path="mySheets" element={<MySheets />} />
                <Route path="notes" element={<Notes />} />
                <Route path="analysis" element={<Analysis />} />
                
                <Route path="explore/sheet/:id" element={<SheetDetails />} />
            </Route> */}

            {/* Profile Edit Nested Routes */}
            <Route path="profile/edit" element={<ProfileEdit />} />



            {/* Profile Tracker with Sub-Routes */}
            <Route path="profile" element={<ProfileTracker />}>
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
