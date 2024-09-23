"use client"

import Image from "next/image"
import { useState } from "react"

export default function Resume() {
  const [imageSrc, setImageSrc] = useState("https://media-public.canva.com/0EEWY/MAEHl10EEWY/1/tl.jpg")
  const [profileInfo, setProfileInfo] = useState({
    firstName: "Abhishek",
    lastName: "Bankar",
    email: "abhishekraje30@gmail.com",
    phone: "1234567890",
    about:
      "Full Stack Developer with a strong background in both front-end and back-end technologies. Experienced in building scalable web applications, working with modern frameworks, and implementing best practices in software development. Passionate about learning new technologies and improving coding skills.",
    city: "Pune",
    state: "Maharashtra",
    branch: "Computer Science",
    collegeName: "Government College of Engineering, Karad",
    joinedYear: 2019,
    passoutYear: 2023,
    cgpa: 8.5,
    hscDetails: {
      year: 2019,
      percentage: 85.6,
      board: "CBSE",
    },
    sscDetails: {
      year: 2017,
      percentage: 92.4,
      board: "CBSE",
    },
  })
  return (
    <div className="mx-auto flex h-[297mm] w-[210mm] flex-col overflow-hidden bg-white shadow-lg">
      <div className="flex h-1/5 w-full">
        <div className="grid w-[30%] place-content-center bg-[#163852] px-4">
          <div className="grid size-[150px] place-content-center overflow-hidden rounded-full border-2 border-gray-300">
            <Image src={imageSrc} alt="Cropped" width={150} height={150} objectFit="cover" />
          </div>
        </div>
        <div className="flex w-[70%] flex-col justify-center pl-8">
          <div className="flex gap-3">
            <h1 className="text-4xl font-bold tracking-wide">{profileInfo.firstName.toUpperCase()}</h1>
            <h1 className="text-4xl font-bold tracking-wide">{profileInfo.lastName.toUpperCase()}</h1>
          </div>
          <h2 className="font-semibold">{profileInfo.branch}</h2>
          <hr className="my-2 w-1/12 border-2 border-[#163853]" />
        </div>
      </div>
      <div className="flex h-4/5 w-full">
        <div className="flex h-full w-[30%] flex-col gap-4 bg-[#163852] px-4 text-white">
          <div>
            <h1 className="text-xl font-bold tracking-wider">CONTACT</h1>
            <hr className="my-1 border border-white" />
            <div className="mt-4 flex flex-col gap-2">
              <p className="text-sm">{profileInfo.phone}</p>
              <p className="text-sm">{profileInfo.email}</p>
              <p className="text-sm">
                {profileInfo.city}, {profileInfo.state}
              </p>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider">EDUCATION</h1>
            <hr className="my-1 border border-white" />
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="font-semibold">B.Tech</h2>
                <p className="text-sm">{profileInfo.collegeName}</p>
                <p className="text-sm">CGPA: {profileInfo.cgpa}</p>
                <p className="text-xs">
                  {profileInfo.joinedYear} - {profileInfo.passoutYear}
                </p>
              </div>
              <div>
                <h2 className="font-semibold tracking-wider">H.S.C</h2>
                <p className="text-sm">{profileInfo.hscDetails.board}</p>
                <p className="text-sm">Percentage: {profileInfo.hscDetails.percentage}</p>
                <p className="text-xs">{profileInfo.hscDetails.year}</p>
              </div>
              <div>
                <h2 className="font-semibold tracking-wider">S.S.C</h2>
                <p className="text-sm">{profileInfo.sscDetails.board}</p>
                <p className="text-sm">Percentage: {profileInfo.sscDetails.percentage}</p>
                <p className="text-xs">{profileInfo.sscDetails.year}</p>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider">SKILLS</h1>
            <hr className="my-1 border border-white" />
            <div className="flex flex-col gap-4">
              <div className="">
                <h2 className="font-semibold">Technical Skills</h2>
                <ol className="list-inside list-disc">
                  <li className="text-sm">HTML</li>
                  <li className="text-sm">CSS</li>
                  <li className="text-sm">JavaScript</li>
                  <li className="text-sm">React</li>
                  <li className="text-sm">Node.js</li>
                </ol>
              </div>
              <div>
                <h2 className="font-semibold">Soft Skills</h2>
                <ol className="list-inside list-disc">
                  <li className="text-sm">Teamwork</li>
                  <li className="text-sm">Communication</li>
                  <li className="text-sm">Problem Solving</li>
                </ol>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider">LANGUAGES</h1>
            <hr className="my-1 border border-white" />
            <ol className="list-disc px-4">
              <li className="text-sm">English</li>
              <li className="text-sm">Marathi</li>
              <li className="text-sm">Hindi</li>
            </ol>
          </div>
        </div>
        <div className="flex h-full w-[70%] flex-col gap-4 px-4 text-justify">
          <div>
            <h1 className="text-xl font-bold tracking-wider text-[#163853]">SUMMARY</h1>
            <hr className="my-1 border border-[#163853]" />
            <div className="mt-4">
              <p className="text-sm">{profileInfo.about}</p>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider text-[#163853]">PROJECT</h1>
            <hr className="my-1 border border-[#163853]" />
            <h3 className="font-bold">Smart Irrigation System</h3>
            <p className="text-sm">
              Developed a microcontroller-based system that automatically waters plants based on soil moisture levels.
              Utilized Arduino, sensors, and Python to create the control system.
            </p>
            <ol className="list-inside list-disc text-sm">
              <li>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non, doloremque! Sapiente repellendus quos
                maxime dolor.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non, doloremque! Sapiente repellendus quos
                maxime dolor.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non, doloremque! Sapiente repellendus quos
                maxime dolor.
              </li>
            </ol>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider text-[#163853]">INTERNSHIP / TRAINING</h1>
            <hr className="my-1 border border-[#163853]" />
            <div className="flex items-center justify-between">
              <h3 className="font-bold">Tiger Analytics Pvt. Ltd.</h3>
              <h3 className="text-xs">January 2024 - June 2024</h3>
            </div>

            <ol className="list-inside list-disc text-sm">
              <li className="">
                Developed a microcontroller-based system that automatically waters plants based on soil moisture levels.
                Utilized Arduino, sensors, and Python to create the control system.
              </li>
              <li>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero numquam, corporis voluptatem quas
                dolorem harum debitis exercitationem nisi placeat commodi?
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores deserunt aspernatur placeat provident,
                voluptatum id praesentium cupiditate repellendus iure quasi!
              </li>
            </ol>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider text-[#163853]">
              EXTRACURRICULAR ACTIVITIES / ACHIEVEMENTS
            </h1>
            <hr className="my-1 border border-[#163853]" />

            <ol className="list-inside list-disc text-sm">
              <li className="">
                Developed a microcontroller-based system that automatically waters plants based on soil moisture levels.
                Utilized Arduino, sensors, and Python to create the control system.
              </li>
              <li>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero numquam, corporis voluptatem quas
                dolorem harum debitis exercitationem nisi placeat commodi?
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores deserunt aspernatur placeat provident,
                voluptatum id praesentium cupiditate repellendus iure quasi!
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
