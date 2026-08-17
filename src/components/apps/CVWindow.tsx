"use client";

import { CV } from "@/data/cv";
import {
  ExternalLink,
  FileText,
  FileType2,
  Globe,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function CVWindow() {
  return (
    <div className="h-full flex flex-col bg-white font-mono text-sm">
      {/* Notepad menu bar */}
      <div className="flex gap-0 text-xs border-b border-gray-300 bg-[#ECE9D8] px-1 shrink-0">
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
          <div className="bg-blue-100 p-2 rounded shrink-0">
            <FileText size={30} />
          </div>

          <div className="min-w-0">
            <h1 className="text-xl font-bold text-gray-900">{CV.name}</h1>

            <p className="text-xs text-gray-600">{CV.title}</p>
          </div>
        </div>

        <Section title="Contact">
          <p className="flex items-center gap-1.5">
            <Phone size={13} className="shrink-0" /> {CV.contact.phone}
          </p>

          <p className="flex items-center gap-1.5">
            <Mail size={13} className="shrink-0" />
            <a
              className="text-blue-600 hover:underline break-all"
              target="_blank"
              rel="noopener noreferrer"
              href={`mailto:${CV.contact.email}`}
            >
              {CV.contact.email}
            </a>
          </p>

          <p className="flex items-center gap-1.5">
            <MapPin size={13} className="shrink-0" /> {CV.contact.location}
          </p>

          <p className="flex items-center gap-1.5">
            <Globe size={13} className="shrink-0" />
            <a
              className="text-blue-600 hover:underline break-all"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://${CV.contact.portfolio}`}
            >
              {CV.contact.portfolio}
            </a>
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
            <a
              className="text-blue-600 hover:underline break-all"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://${CV.contact.linkedin}`}
            >
              {CV.contact.linkedin}
            </a>
            <a
              className="text-blue-600 hover:underline break-all"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://${CV.contact.github}`}
            >
              {CV.contact.github}
            </a>
          </div>
        </Section>

        <Section title="Professional Summary">
          <p>{CV.summary}</p>
        </Section>

        <Section title="Technical Skills">
          <dl className="space-y-2">
            {CV.skills.map((group) => (
              <div key={group.label}>
                <dt className="font-bold text-gray-800">{group.label}</dt>
                <dd className="flex flex-wrap gap-1.5 mt-1">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-0.5 bg-gray-200 border border-gray-400 rounded"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="Professional Experience">
          <div className="space-y-4">
            {CV.experience.map((job) => (
              <div key={`${job.role}-${job.company}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="font-bold">
                    {job.role}, {job.company}
                  </h3>
                  <span className="text-gray-500 shrink-0">{job.period}</span>
                </div>

                <ul className="list-disc ml-5 mt-1 space-y-0.5">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>

                {job.note && (
                  <p className="mt-1 text-gray-500 italic">Note: {job.note}</p>
                )}
              </div>
            ))}
          </div>
        </Section>

        <Section title="Projects">
          <div className="space-y-3">
            {CV.projects.map((project) => (
              <div key={project.name}>
                <p className="font-bold">
                  {project.name}, {project.tagline}
                </p>
                <p>{project.description}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-0.5">
                  {project.live && (
                    <a
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live site <ExternalLink size={12} />
                    </a>
                  )}
                  {project.github && (
                    <a
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Education">
          <div className="space-y-2">
            {CV.education.map((item) => (
              <div
                key={item.credential}
                className="flex flex-wrap items-baseline justify-between gap-x-3"
              >
                <div>
                  <h3 className="font-bold">{item.credential}</h3>
                  {item.institution && <p>{item.institution}</p>}
                </div>
                <span className="text-gray-500 shrink-0">{item.period}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Certifications">
          <ul className="list-disc ml-5 space-y-0.5">
            {CV.certifications.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </Section>

        <Section title="Languages">
          <p>{CV.languages}</p>
        </Section>
      </div>

      <div className="shrink-0 border-t border-gray-300 bg-[#ECE9D8] px-4 py-2">
        <a
          href={CV.file}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#ECE9D8] border border-gray-400 rounded shadow-sm hover:bg-blue-600 hover:text-white text-xs"
        >
          <FileType2 size={16} />
          Open CV (PDF)
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
