"use client";

import { CV_CONTENT } from "@/data/cv";
import { FileText, ExternalLink, FileType2 } from "lucide-react";

export default function CVWindow() {
  return (
    <div className="h-full flex flex-col bg-white font-mono text-sm">
      {/* Notepad menu bar */}
      <div className="flex gap-0 text-xs border-b border-gray-300 bg-[#ECE9D8] px-1">
        {["File", "Edit", "Format", "View", "Help"].map((menu) => (
          <button
            key={menu}
            className="px-2 py-0.5 hover:bg-blue-600 hover:text-white"
          >
            {menu}
          </button>
        ))}
      </div>

      {/* CV document */}
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-gray-300 pb-3 mb-4">
          <div className="bg-blue-100 p-2 rounded">
            <FileText size={30} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Mahmoud Maged Ragab
            </h1>

            <p className="text-xs text-gray-600">
              Frontend Developer | BIS Student
            </p>
          </div>
        </div>
        <Section title="Contact">
          <p>📞 +20 106 885 0668</p>

          <p>
            ✉️{" "}
            <a
              className="text-blue-600 hover:underline"
              target="_blank"
              href="mailto:Mahmoud.m.Ragab06@gmail.com"
            >
              Mahmoud.m.Ragab06@gmail.com
            </a>
          </p>

          <p>📍 Cairo, Egypt</p>
        </Section>

        <Section title="Professional Summary">
          <p>
            Frontend Developer and Business Information Systems student with
            experience building responsive web applications using React.js and
            Next.js. Focused on performance, usability and clean UI.
          </p>
        </Section>

        <Section title="Education">
          <h3 className="font-bold">
            Arab Academy for Science, Technology & Maritime Transport
          </h3>

          <p>Bachelor of Business Information Systems (BIS)</p>

          <p>Expected Graduation: 2027</p>

          <h3 className="font-bold mt-3">The American University in Cairo</h3>

          <p>English Diploma (2024)</p>

          <h3 className="font-bold mt-3">Route Learning Academy</h3>

          <p>Front-End Diploma (2026)</p>
        </Section>

        <Section title="Experience">
          <h3 className="font-bold">
            Frontend Developer (Freelance) — 2025–Present
          </h3>

          <ul className="list-disc ml-5">
            <li>Developed responsive web applications</li>
            <li>Improved UI and user experience</li>
            <li>Optimized frontend performance</li>
          </ul>

          <h3 className="font-bold mt-3">
            Commercial International Bank (CIB) Internship — 2025
          </h3>

          <ul className="list-disc ml-5">
            <li>Analyzed workflows</li>
            <li>Supported process improvements</li>
            <li>Evaluated operational data</li>
          </ul>
        </Section>

        <Section title="Skills">
          <div className="flex flex-wrap gap-2">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "JavaScript",
              "Tailwind",
              "Git",
              "GitHub",
              "UI/UX",
            ].map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 bg-gray-200 border border-gray-400 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Projects">
          <p className="font-bold">Social Hub</p>

          <a
            className="text-blue-600 flex items-center gap-1"
            href="https://mahmoud-maged-ragab.github.io/SocialHub--Your-place-for-communication/"
            target="_blank"
          >
            View Project
          </a>
          <p className="font-bold mt-3">Fresh Cart</p>

          <a
            className="text-blue-600 flex items-center gap-1"
            href="https://fresh-cart-8dia.vercel.app"
            target="_blank"
          >
            View Project
          </a>
        </Section>
      </div>
      <div className="mb-4">
        <a
          href="https://drive.google.com/file/d/1mPN5qQNq2ukz0EL3aabJybGNYDi-vsNC/view"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#ECE9D8] border border-gray-400 rounded shadow-sm hover:bg-blue-600 hover:text-white text-xs"
        >
          <FileType2 size={16} />
          Open CV
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-5">
      <h2 className="text-sm font-bold text-blue-700 border-b border-blue-200 mb-2">
        {`[ ${title} ]`}
      </h2>

      <div className="text-xs text-gray-800 leading-relaxed">{children}</div>
    </section>
  );
}
