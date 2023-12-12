import { PageHeader } from "@/components/UI/Header/PageHeader";
import Image from "next/image";

export default function About() {
  return (
    <div>
      {" "}
      <PageHeader title="Ragunanthan" />
      <Image
        src="/me.jpg"
        alt="me"
        width="1700"
        height="1700"
        style={{
          width: "100%",
          height: "500px",
          objectFit: "cover",
        }}
      />
      <div className="my-4">
        <h3>About Me</h3>
        <p className="text-justify pt-3 leading-relaxed">
          My journey as a full stack developer is not just about mastering
          technologies but understanding their synergy. Collaboration is key,
          and I am adept at working with cross-functional teams to bring
          projects to fruition. Whether it&apos;s collaborating with designers for a
          seamless UI/UX or coordinating with back-end engineers for optimal
          performance, I thrive in the collaborative spirit of web development.
          Confidence in my coding prowess is complemented by an insatiable
          thirst for challenges. Each project is an opportunity to grow,
          innovate, and push the boundaries of what&apos;s possible. I approach
          coding not just as a job but as a continuous learning experience,
          constantly seeking new challenges that fuel my passion for excellence.
        </p>
      </div>
      <div>
        <h3>Skills:</h3>
        <ul className="list-outside list-disc pl-4 pt-3 leading-relaxed">
          <li>
            Extensive experience in UI design, with a strong portfolio of
            completed projects
          </li>
          <li>
            Excellent visual design skills, with a strong understanding of
            layout, color theory, and typography
          </li>
          <li>
            Strong communication and collaboration skills, with the ability to
            work effectively with cross-functional teams
          </li>
          <li>
            Experience conducting user research and gathering insights to inform
            design decisions
          </li>
          <li>Proficiency in HTML, CSS, and JavaScript</li>
          <li>Skill in React Native for mobile application development</li>
          <li>Expertise in Node.js for server-side JavaScript development</li>
          <li>Experience with MySQL and MongoDB databases</li>
          <li>
            Familiarity with React, HTML, and CSS for building dynamic web
            applications
          </li>
          <li>Proficient in Next.js for server-rendered React applications</li>
        </ul>
      </div>
      <div className="my-4">
        <h3>Experience:</h3>
        <ul className="list-outside list-disc pl-4 pt-3 leading-relaxed ">
          <li>
            2.8 years of experience as a full stack developer, working on a
            variety of projects for clients in the tech and retail industries
          </li>
          <li>Led the design of a successful e-commerce website</li>
          <li>
            Conducted user research and usability testing to inform the redesign
            of a healthcare provider&apos;s website, resulting in a 15% increase in
            website traffic
          </li>
        </ul>
      </div>
      <div className="mb-4">
        <h3>Education:</h3>
        <ul className="list-outside list-disc pl-4 pt-3 leading-relaxed">
          <li>Bachelor&apos;s degree in Mechanical Engineer</li>
        </ul>
      </div>
    </div>
  );
}
