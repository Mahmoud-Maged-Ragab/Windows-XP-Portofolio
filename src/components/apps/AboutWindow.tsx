"use client";

import {
  BriefcaseBusiness,
  CircleCheckBig,
  CodeXml,
  Mail,
  MapPin,
  Target,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import { CV } from "@/data/cv";
// import UserImg from "../../public/UserImg.jpeg";

export default function AboutWindow() {
  return (
    <div className="h-full overflow-y-auto bg-[#ECE9D8] p-0">
      {/* Explorer-style toolbar */}
      <div className="xp-menu-bar px-2 py-0.5 flex gap-4 text-xs border-b border-gray-400">
        {["File", "Edit", "View", "Favorites", "Tools", "Help"].map((item) => (
          <button
            key={item}
            className="hover:bg-blue-600 hover:text-white px-1 py-0.5 rounded"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Address bar */}
      <div className="flex items-center gap-2 px-2 py-1 bg-[#ECE9D8] border-b border-gray-400 text-xs">
        <span className="text-gray-600">Address</span>
        <div className="flex-1 bg-white border border-gray-400 px-2 py-0.5 text-blue-700 font-mono">
          C:\Users\Portfolio\About Me
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-5">
        {/* Profile header */}
        <div className="flex items-start gap-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 shadow-md border-2 border-white">
            <Image
              src="/UserImg.jpeg"
              alt="Mahmoud Maged"
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Mahmoud Maged Mahmoud Ragab
            </h1>
            <p className="text-blue-600 font-semibold text-sm">{CV.title}</p>
            <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
              <MapPin size={14} /> {CV.contact.location}
            </p>
            <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
              <Mail size={14} /> {CV.contact.email}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300" />

        {/* About text */}
        <div>
          <h2 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <UserRound size={14} /> About Me
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{CV.summary}</p>
        </div>

        {/* Experience */}
        <div>
          <h2 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <span>
              <BriefcaseBusiness size={14} />
            </span>
            Experience
          </h2>
          <div className="space-y-3">
            {CV.experience.map((job) => (
              <div
                key={`${job.role}-${job.company}`}
                className="bg-white border border-gray-300 rounded p-3 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {job.role}
                    </p>
                    <p className="text-xs text-blue-600">{job.company}</p>
                  </div>

                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded border">
                    {job.period}
                  </span>
                </div>

                <ul className="text-xs text-gray-600 mt-1.5 list-disc ml-4 space-y-0.5">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>

                {job.note && (
                  <p className="text-[11px] text-gray-500 italic mt-1">
                    Note: {job.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Goals */}
        {/* <div>
          <h2 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <span>
              <Target size={14} />
            </span>{" "}
            Goals & Interests
          </h2>
          <ul className="text-sm text-gray-700 space-y-1">
            {[
              "Build products that make a real difference",
              "Contribute to open source and give back to the community",
              "Master full-stack development to become more versatile",
              "Create exceptional developer and user experiences",
            ].map((goal) => (
              <li key={goal} className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">
                  <CircleCheckBig size={12} />
                </span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
}
