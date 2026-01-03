import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import { ReactTyped } from "react-typed";
import {useLottie} from 'lottie-react'

import dev1 from "./dev1.json";


 const options = {
  animationData: dev1,
  loop: true,
};

const HomePage = () => {
  const canvasRef = useRef(null);
  
const { View } = useLottie(options);


  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles
    const particleCount = 1800;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.12,
      color: "#8ab4f8",
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.85,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse interaction
    const mouse = new THREE.Vector2(0, 0);
    const targetCameraPosition = new THREE.Vector3(0, 0, 5);

    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);

      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0005;

      targetCameraPosition.x = mouse.x * 0.8;
      targetCameraPosition.y = mouse.y * 0.6;
      camera.position.lerp(targetCameraPosition, 0.1);
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen text-white relative overflow-hidden font-inter">
      {/* 🌌 Particle Background */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-0"
      />

      {/* Content */}
      <div className="relative z-10">
        <main>
          {/* 🚀 Hero Section */}
          <section className="pt-24 pb-16 md:pt-32 md:pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                <div className="lg:w-1/2 text-center lg:text-left">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    <ReactTyped
                      className="text-white font-bold text-3xl sm:text-4xl md:text-6xl"
                      strings={[
                        ' <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">CampusCompass</span> <br/> <span class="text-gray-200">Track. Prepare. Conquer.</span> <br/> <span class="text-purple-400 font-extrabold">Navigate Your Future...</span> ',
                      ]}
                      typeSpeed={65}
                      backSpeed={40}
                      
                      smartBackspace
                    />
                  </h1>

                  <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0">
                    Track your progress, discover events, analyze your resume,
                    practice mock interviews, and connect with communities —
                    everything a student needs to succeed.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link
                      to="/profile"
                      className="px-8 py-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-[1.03] bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                    >
                      <span>Start Tracking</span>
                    </Link>
                  </div>
                </div>

                {/* Hero Visual */}
                <div className="z-2">
        <div className=" relative justify-center  lg:flex mb-0">
          {View}
          
        </div>
    
              </div>
            </div>
            </div>
          </section>

          {/* 📌 Features */}
          <section className="py-20 bg-gradient-to-b from-gray-900/0 to-indigo-900/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Everything You Need
                  </span>
                  <span className="text-gray-200"> to Excel as a Student</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Progress Tracker",
                    description:
                      "Visualize coding problems solved, topics mastered, and certifications earned.",
                  },
                  {
                    title: "Event Updates",
                    description:
                      "Stay ahead with real-time alerts on hackathons, coding contests, and internships.",
                  },
                  {
                    title: "AI Resume Analyzer",
                    description:
                      "Get personalized insights to improve your resume and land your dream job.",
                  },
                  {
                    title: "AI Mock Interviews",
                    description:
                      "Practice interviews tailored to your career goals and skillset.",
                  },
                  {
                    title: "Career Guidance",
                    description:
                      "Receive personalized AI suggestions for courses, skills, and opportunities.",
                  },
                  {
                    title: "Community Groups",
                    description:
                      "Connect with peers in Web Dev, AI/ML, DSA, and grow together.",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-1 hover:-translate-y-2 transition-transform duration-300 backdrop-blur-sm"
                  >
                    <div className="bg-gray-900/30 rounded-xl p-6 h-full">
                      <h3 className="text-xl font-semibold mb-2 text-gray-100">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-3xl p-1 backdrop-blur-sm">
                <div className="bg-gray-900/70 rounded-3xl p-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Ready to{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                      Navigate
                    </span>{" "}
                    Your Future?
                  </h2>
                  <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                    Join CampusCompass and take control of your learning,
                    career, and campus opportunities — all in one place.
                  </p>
                  <Link
                    to="/signup"
                    className="inline-flex items-center px-8 py-4 rounded-xl font-medium space-x-2 transition-all duration-300 transform hover:scale-[1.03] bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg text-lg"
                  >
                    <span>Get Started Free</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

    </div>
  );
};

export default HomePage;
