"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Download,
  Calendar,
  Building,
  GraduationCap,
  Brain,
  Database,
  Cpu,
  ChevronDown,
  ChevronUp,
  Award,
  Briefcase,
  User,
  FolderOpen,
  MessageSquare,
  Star,
  CheckCircle,
  AlertCircle,
  Loader2,
  Menu,
  X,
  ArrowUp,
  Code,
  Zap,
  Target,
} from "lucide-react"
import Image from "next/image"
import { sendEmail } from "@/lib/emailjs"

interface FormData {
  name: string
  email: string
  message: string
}

interface FormState {
  success: boolean
  message: string
}

export default function Portfolio() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  })
  const [formState, setFormState] = useState<FormState | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const toggleProject = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (formState) {
      setFormState(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormState(null)

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormState({
        success: false,
        message: "Please fill in all fields.",
      })
      setIsSubmitting(false)
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setFormState({
        success: false,
        message: "Please enter a valid email address.",
      })
      setIsSubmitting(false)
      return
    }

    try {
      const result = await sendEmail(formData)
      setFormState(result)

      if (result.success) {
        setFormData({
          name: "",
          email: "",
          message: "",
        })
      }
    } catch (error) {
      setFormState({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const skills = {
    "Programming Languages": ["Python", "C++", "SQL", "JavaScript", "R"],
    "Machine Learning": ["Scikit-learn", "TensorFlow", "PyTorch", "Keras", "OpenCV"],
    "Data Science": ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Tableau"],
    Databases: ["MySQL", "PostgreSQL", "MongoDB", "NoSQL"],
    "Big Data": ["Hadoop", "Spark", "MapReduce"],
    "Cloud & Tools": ["Git", "Docker", "Linux", "Arduino IDE", "SUMO"],
    Frameworks: ["Streamlit", "Flask", "React", "Node.js"],
  }

  const projects = [
    {
      title: "Tea Leaf Disease Detection",
      domain: "Computer Vision, Plant Pathology, Machine Learning",
      date: "June 2025",
      description:
        "Built an intelligent system to detect and classify tea leaf diseases from images using deep learning. The project aims to assist farmers and agronomists by automating early-stage disease diagnosis through image-based analysis.",
      contributions: [
        "Collected and annotated a dataset of tea leaf images across multiple disease categories (e.g., blister blight, grey blight, red rust, healthy)",
        "Applied preprocessing techniques including image resizing, noise reduction, and data augmentation to improve model generalization",
        "Trained a Convolutional Neural Network (CNN) and evaluated it using metrics like accuracy, precision, recall, and F1-score",
        "Achieved high classification accuracy and developed a Streamlit-based web app for real-time prediction",
      ],
      tools: ["Python", "TensorFlow/Keras", "OpenCV", "NumPy", "Matplotlib", "Scikit-learn", "Streamlit", "CNN"],
      icon: <Target className="h-6 w-6" />,
    },
    {
      title: "Smart Traffic Light System",
      domain: "Artificial Intelligence, Reinforcement Learning, IoT",
      date: "March 2025",
      description:
        "Designed an AI-powered adaptive traffic control system using reinforcement learning integrated with hardware components.",
      contributions: [
        "Simulated traffic junctions and vehicle flow in SUMO using real-time traffic patterns",
        "Implemented a Q-learning agent to analyze queue lengths and determine the optimal signal phase",
        "Integrated with Arduino via serial communication for real-time light control",
        "Demonstrated improved traffic throughput using visualized metrics",
      ],
      tools: ["Python", "PyTorch", "SUMO", "Pandas", "NumPy", "Matplotlib", "Serial", "Arduino IDE", "Breadboard"],
      icon: <Zap className="h-6 w-6" />,
    },
    {
      title: "Restaurant Cuisine Recommendation System",
      domain: "Machine Learning, Data Analytics",
      date: "April 2024",
      description:
        "Developed a machine learning-based system to recommend cuisines based on restaurant data insights and user preferences.",
      contributions: [
        "Imported and explored a structured restaurant dataset",
        "Performed data cleaning and preprocessing using Pandas and NumPy",
        "Applied Random Forest Regressor and Support Vector Regressor to build predictive models",
        "Visualized model performance and feature correlations using bar charts, pie charts, and candlestick charts",
      ],
      tools: ["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-learn", "Random Forest", "SVM"],
      icon: <Database className="h-6 w-6" />,
    },
    {
      title: "Thermal Camera Based Human Detection",
      domain: "Computer Vision, IoT",
      date: "December 2023",
      description:
        "Developed a system for detecting humans using thermal camera data, enabling applications in security and surveillance.",
      contributions: [
        "Processed and analyzed thermal camera data to identify human presence.",
        "Implemented algorithms to differentiate humans from other heat sources.",
        "Integrated the system with IoT devices for real-time monitoring.",
        "Improved detection accuracy through machine learning techniques.",
      ],
      tools: ["Python", "OpenCV", "Scikit-learn", "IoT"],
      icon: <Code className="h-6 w-6" />,
    },
  ]

  const internships = [
    {
      organization: "TexMin, IIT(ISM) Dhanbad",
      role: "Computer Vision Intern",
      duration: "May 2025 – July 2025",
      location: "Dhanbad, Jharkhand",
      achievements: [
        "Preprocessed and analyzed hyperspectral datasets to extract relevant spectral-spatial features for mineral classification",
        "Designed and implemented a 3D Convolutional Neural Network (3D-CNN) architecture capable of learning voxel-level features across spectral and spatial dimensions",
        "Successfully trained the model to classify multiple mineral types with high accuracy, demonstrating the potential of HSI in remote mineral detection",
        "Evaluated the model's performance using metrics such as accuracy, confusion matrix, and per-class classification reports",
        "Contributed to discussions on real-world applications of HSI in mining, exploration, and automated geological surveying",
      ],
    },
    {
      organization: "Indian Institute of Technology, Patna",
      role: "Research Intern",
      duration: "May 2024 – July 2024",
      location: "Patna, Bihar",
      achievements: [
        "Researched and implemented optimality algorithms including Lagrangian multipliers, Stackelberg games, and Coalition Game Theory for sensor selection",
        "Formulated a comprehensive optimality equation using critical parameters such as Energy Consumption, ERS, Reliability Index, Proximity, Device User Load, Matched Efficiency Ratio, Matched Sensor Index, Device Performance Index",
        "Developed a Monte Carlo-based Virtual Simulator to test and validate the model under various simulated environments and constraints",
        "Analyzed results across multiple device and user scenarios to benchmark performance and scalability of the proposed selection algorithm",
      ],
    },
  ]

  const certifications = [
    {
      title: "Mastering Data Structures and Algorithms",
      description:
        "Gained a strong foundation in core data structures and practiced solving complex algorithmic problems using recursion, dynamic programming, and greedy techniques.",
    },
    {
      title: "C++: Beginners to Advanced",
      description:
        "Covered end-to-end C++ programming fundamentals including OOP, memory management, templates, STL, and file handling.",
    },
    {
      title: "Big Data Analytics",
      description:
        "Explored big data processing using Hadoop, Spark, and MapReduce for handling structured and unstructured data.",
    },
    {
      title: "Fundamentals of Data Privacy and Security",
      description:
        "Understood essential concepts in data security including encryption, access control, authentication, and data anonymization.",
    },
    {
      title: "Neural Networks and Deep Learning",
      description:
        "Learned theoretical foundations of neural networks and implemented models in TensorFlow/Keras for classification tasks.",
    },
    {
      title: "Introduction to Operating Systems",
      description:
        "Explored OS concepts such as processes, threads, CPU scheduling, memory management, and synchronization.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50 ? "bg-white/95 backdrop-blur-lg shadow-lg" : "bg-white/80 backdrop-blur-md"
        } border-b border-white/20`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-pulse">
              Aryan Garv
            </h1>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {[
                { name: "About", id: "about" },
                { name: "Projects", id: "projects" },
                { name: "Experience", id: "internships" },
                { name: "Skills", id: "skills" },
                { name: "Contact", id: "contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 font-medium relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2 pt-4">
                {[
                  { name: "About", id: "about" },
                  { name: "Projects", id: "projects" },
                  { name: "Experience", id: "internships" },
                  { name: "Skills", id: "skills" },
                  { name: "Contact", id: "contact" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 relative">
        <div className="container mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
              <Image
                src="/images/aryan-profile.jpg"
                alt="Aryan Garv"
                width={250}
                height={250}
                className="relative rounded-full mx-auto border-4 border-white shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-gradient">
              Aryan Garv
            </h1>
            <div className="space-y-2 mb-6">
              <p className="text-2xl text-gray-700 font-semibold">Data Science & Engineering Student</p>
              <p className="text-lg text-gray-500">Manipal University Jaipur • CGPA: 7.80</p>
            </div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
              Passionate about <span className="text-blue-600 font-semibold">Artificial Intelligence</span>,
              <span className="text-purple-600 font-semibold"> Machine Learning</span>, and
              <span className="text-cyan-600 font-semibold"> Data Science</span>. Experienced in developing intelligent
              systems for real-world applications.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up">
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              asChild
            >
              <a
                href="https://drive.google.com/file/d/1JdqzYywkBhEMExVsAWo4NxzT1LSCIHms/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            </Button>
            <Button
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-transparent"
              onClick={() => scrollToSection("contact")}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Get In Touch
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 flex items-center justify-center">
              <User className="mr-4 h-10 w-10 text-blue-600" />
              About Me
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-5xl mx-auto">
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
              <CardContent className="p-10">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      I'm Aryan Garv, currently pursuing B.Tech in Data Science and Engineering at Manipal University
                      Jaipur with a CGPA of 7.80. I'm passionate about leveraging data science and artificial
                      intelligence to solve real-world problems and create innovative solutions.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      My interests span across various domains including Machine Learning, Deep Learning, Natural
                      Language Processing, Computer Vision, and IoT. I have hands-on experience in developing
                      intelligent systems, from recommendation engines to computer vision applications for agriculture
                      and traffic management.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center group">
                      <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Brain className="h-10 w-10 text-blue-600" />
                      </div>
                      <h3 className="font-bold mb-2 text-gray-900">AI & ML Enthusiast</h3>
                      <p className="text-gray-600 text-sm">
                        Passionate about developing intelligent systems and algorithms
                      </p>
                    </div>
                    <div className="text-center group">
                      <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Database className="h-10 w-10 text-green-600" />
                      </div>
                      <h3 className="font-bold mb-2 text-gray-900">Data Scientist</h3>
                      <p className="text-gray-600 text-sm">Extracting insights and patterns from complex datasets</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 flex items-center justify-center">
              <FolderOpen className="mr-4 h-10 w-10 text-blue-600" />
              Featured Projects
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          <div className="space-y-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm hover:scale-[1.02] border-0"
              >
                <CardHeader
                  className="cursor-pointer bg-gradient-to-r from-blue-50 to-purple-50"
                  onClick={() => toggleProject(index)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl text-white shadow-lg">
                        {project.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-3 text-blue-900 hover:text-blue-700 transition-colors">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-purple-600 font-semibold mb-3 bg-purple-100 px-3 py-1 rounded-full inline-block">
                          {project.domain}
                        </CardDescription>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="mr-2 h-4 w-4" />
                          {project.date}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="hover:bg-blue-100 transition-colors">
                      {expandedProject === index ? (
                        <ChevronUp className="h-6 w-6" />
                      ) : (
                        <ChevronDown className="h-6 w-6" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                {expandedProject === index && (
                  <CardContent className="pt-0 animate-slide-down">
                    <Separator className="mb-6" />
                    <p className="text-gray-700 mb-6 leading-relaxed">{project.description}</p>
                    <div className="mb-6">
                      <h4 className="font-bold mb-4 text-gray-900 text-lg">Key Contributions:</h4>
                      <ul className="space-y-3">
                        {project.contributions.map((contribution, idx) => (
                          <li key={idx} className="flex items-start group">
                            <Star className="mr-3 h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                            <span className="text-gray-700">{contribution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-4 text-gray-900 text-lg">Tools & Technologies:</h4>
                      <div className="flex flex-wrap gap-3">
                        {project.tools.map((tool, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 hover:scale-105 transition-transform cursor-default"
                          >
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Internships Section */}
      <section id="internships" className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 flex items-center justify-center">
              <Briefcase className="mr-4 h-10 w-10 text-blue-600" />
              Professional Experience
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          <div className="space-y-10">
            {internships.map((internship, index) => (
              <Card
                key={index}
                className="shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm hover:scale-[1.02] border-0"
              >
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl text-blue-900 mb-3">{internship.role}</CardTitle>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Building className="mr-2 h-5 w-5" />
                        <span className="font-semibold">{internship.organization}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm mb-1">
                        <Calendar className="mr-2 h-4 w-4" />
                        {internship.duration}
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="mr-2 h-4 w-4" />
                        {internship.location}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <h4 className="font-bold mb-4 text-gray-900 text-lg">Key Achievements:</h4>
                  <ul className="space-y-4">
                    {internship.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start group">
                        <Star className="mr-3 h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-gray-700 leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 flex items-center justify-center">
              <Award className="mr-4 h-10 w-10 text-blue-600" />
              Certifications
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className="shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/80 backdrop-blur-sm border-0 group"
              >
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-lg">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-blue-900 group-hover:text-blue-700 transition-colors">
                      {cert.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 flex items-center justify-center">
              <Cpu className="mr-4 h-10 w-10 text-blue-600" />
              Skills & Technologies
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <Card
                key={index}
                className="shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/80 backdrop-blur-sm border-0 group"
              >
                <CardHeader>
                  <CardTitle className="text-xl text-blue-900 group-hover:text-blue-700 transition-colors">
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {skillList.map((skill, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="border-blue-200 text-blue-800 hover:bg-blue-100 hover:scale-105 transition-all cursor-default px-3 py-1"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 px-6 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%239C92AC fillOpacity=0.1%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="container mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 flex items-center justify-center">
              <MessageSquare className="mr-4 h-10 w-10" />
              Get In Touch
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-8">Let's Connect</h3>
              <p className="text-blue-100 mb-10 leading-relaxed text-lg">
                I'm always interested in discussing new opportunities, collaborations, or just having a chat about
                technology and innovation. Feel free to reach out!
              </p>
              <div className="space-y-6">
                <div className="flex items-center group">
                  <div className="bg-blue-600 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <a href="mailto:aryangarv160504@gmail.com" className="hover:text-blue-300 transition-colors text-lg">
                    aryangarv160504@gmail.com
                  </a>
                </div>
                <div className="flex items-center group">
                  <div className="bg-green-600 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <a href="tel:+919928488959" className="hover:text-blue-300 transition-colors text-lg">
                    +91 99284 88959
                  </a>
                </div>
                <div className="flex items-center group">
                  <div className="bg-purple-600 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform shadow-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-lg">Jaipur, Rajasthan, India</span>
                </div>
              </div>
              <div className="flex space-x-6 mt-10">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white bg-transparent hover:scale-110 transition-all duration-300 shadow-lg"
                  asChild
                >
                  <a href="https://github.com/Sammy8617" target="_blank" rel="noopener noreferrer">
                    <Github className="h-6 w-6" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white bg-transparent hover:scale-110 transition-all duration-300 shadow-lg"
                  asChild
                >
                  <a href="https://linkedin.com/in/aryan-garv-2a2749257" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-6 w-6" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white bg-transparent hover:scale-110 transition-all duration-300 shadow-lg"
                  asChild
                >
                  <a href="mailto:aryangarv160504@gmail.com?subject=Portfolio Contact&body=Hi Aryan,%0D%0A%0D%0AI found your portfolio and would like to connect.%0D%0A%0D%0ABest regards">
                    <Mail className="h-6 w-6" />
                  </a>
                </Button>
              </div>
            </div>
            <Card className="bg-white/10 border-white/20 backdrop-blur-lg shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 transition-colors"
                    required
                    disabled={isSubmitting}
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 transition-colors"
                    required
                    disabled={isSubmitting}
                  />
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 min-h-[120px] focus:border-blue-400 transition-colors"
                    required
                    disabled={isSubmitting}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>

                {formState && (
                  <Alert
                    className={`mt-6 ${formState.success ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}
                  >
                    {formState.success ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                    <AlertDescription className={formState.success ? "text-green-800" : "text-red-800"}>
                      {formState.message}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-gray-900 text-gray-400">
        <div className="container mx-auto text-center">
          <p className="text-lg">&copy; 2025 Aryan Garv. All rights reserved.</p>
          <p className="mt-2">Built with Next.js, Tailwind CSS, and lots of ❤️</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  )
}
