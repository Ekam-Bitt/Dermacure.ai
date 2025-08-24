import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';
import { AiOutlineThunderbolt, AiFillThunderbolt } from 'react-icons/ai';
import { BsFillChatDotsFill, BsRobot } from 'react-icons/bs';
import BotsonicWidget from '../Chatbot/Chatbot.main';
import { EClinic } from './e-clinic.main';
import Chat from '../ChatRoom/ChatRoom.main';
import BotPage from '../Chatbot/Chatbot.openai';

const PatientDashboard = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = searchParams.get('currentTab');
  return (
    <div className="mx-8 py-6 min-h-[90vh] flex justify-between gap-8">
      <div className="max-w-[20vw] space-y-4 w-full">
        <section
          className="cursor-pointer hover:scale-105 duration-200 flex bg-white justify-start items-center space-x-2 text-blueDeep px-4 py-2.5 shadow-lg font-medium rounded-lg"
          onClick={() =>
            router.push('/dashboard/patient-dashboard?currentTab=E-Clinic')
          }
        >
          {currentTab !== 'E-Clinic' ? (
            <AiOutlineThunderbolt size={'36px'} color="#1A75FF" />
          ) : (
            <AiFillThunderbolt size={'36px'} color="#1A75FF" />
          )}
          <span>E Clinic</span>
        </section>
        <section
          className="cursor-pointer hover:scale-105 duration-200 flex bg-white justify-start items-center space-x-2 text-blueDeep px-4 py-2.5 shadow-lg font-medium rounded-lg"
          onClick={() =>
            router.push('/dashboard/patient-dashboard?currentTab=ChatBot')
          }
        >
          {currentTab !== 'ChatBot' ? (
            <BsRobot size={'36px'} color="#1A75FF" />
          ) : (
            <BsRobot size={'36px'} color="#1A75FF" />
          )}
          <span>ChatBot</span>
        </section>
        <section
          className="cursor-pointer hover:scale-105 duration-200 flex bg-white justify-start items-center space-x-2 text-blueDeep px-4 py-2.5 shadow-lg font-medium rounded-lg"
          onClick={() =>
            router.push('/dashboard/patient-dashboard?currentTab=ChatRoom')
          }
        >
          {currentTab !== 'ChatRoom' ? (
            <BsFillChatDotsFill size={'36px'} color="#1A75FF" />
          ) : (
            <BsFillChatDotsFill size={'36px'} color="#1A75FF" />
          )}
          <span>Chat Room</span>
        </section>
      </div>
      <div className="bg-white shadow-lg rounded-md w-full py-4 px-6">
        {currentTab === 'E-Clinic' && <EClinic />}
        {currentTab === 'ChatBot' && <BotPage />}
        {currentTab === 'ChatRoom' && <Chat />}
      </div>
    </div>
  );
};

export default PatientDashboard;
