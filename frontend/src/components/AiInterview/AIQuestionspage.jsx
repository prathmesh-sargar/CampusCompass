import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Webcam from "react-webcam";
import { io } from "socket.io-client";
import { RiSpeakAiFill } from "react-icons/ri";
import { setSingleInterview } from "../../Features/Auth/interviewSlice";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";
import SpeechRecognition, {
    useSpeechRecognition
} from "react-speech-recognition";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AIInterviewPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { interviewId } = useParams();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [userAnswer, setUserAnswer] = useState("");
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [socketInstance, setSocketInstance] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [warningCount, setWarningCount] = useState(0);
    const [showWarningModal, setShowWarningModal] = useState(false);

    // New state for storing all metrics data
    const [allMetricsData, setAllMetricsData] = useState([]);

    const { transcript, resetTranscript, listening } = useSpeechRecognition();
    const interview = useSelector((state) => state.interview.singleInterview);
    const questions = interview?.questions || [];
    const currentQuestion = questions[currentIndex] || {
        _id: '',
        questionText: 'Loading question...',
        category: 'General',
        userAnswer: ''
    };

    const [metricsHistory, setMetricsHistory] = useState([]);
    const [averageMetrics, setAverageMetrics] = useState({
        confidence: 0,
        eyeContact: 0
    });
    const [totalFaces, setTotalFaces] = useState(0);
    const [warnings, setWarnings] = useState([]);

    // Fullscreen handling
    const enterFullscreen = useCallback(() => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen().then(() => setIsFullscreen(true));
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen().then(() => setIsFullscreen(true));
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen().then(() => setIsFullscreen(true));
        }
    }, []);


    // Check fullscreen state
    useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.hidden) {
      setWarningCount(prev => prev + 1);
      toast.error("Tab switching detected!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handleBlur = () => {
    setWarningCount(prev => prev + 1);
    toast.error("Window focus lost!", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("blur", handleBlur);

  return () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("blur", handleBlur);
  };
}, []);



    // Tab switching detection
    

    // Fetch interview data
    useEffect(() => {
        const fetchInterview = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/aiinterview/get/${interviewId}`
                );
                dispatch(setSingleInterview(response.data));
                setLoading(false);
                toast.success("Interview loaded successfully", {
                    position: "top-right",
                    autoClose: 2000,
                });
            } catch (error) {
                console.error("Error fetching interview:", error);
                setLoading(false);
                toast.error("Failed to load interview", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        };
        fetchInterview();
    }, [dispatch, interviewId]);

    // Load saved answer when question changes
    useEffect(() => {
        if (currentQuestion?.userAnswer) {
            setUserAnswer(currentQuestion.userAnswer);
        } else {
            setUserAnswer("");
        }
    }, [currentIndex, currentQuestion]);

    // Text-to-speech for questions
    const speakText = (text) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;
        utterance.pitch = 1;
        synth.cancel();
        synth.speak(utterance);
    };

    useEffect(() => {
        if (currentQuestion?.questionText) {
            setTimeout(() => speakText(currentQuestion.questionText), 1000);
        }
    }, [currentIndex, currentQuestion]);

    // Save answer to backend
    const handleSaveAnswer = async () => {
        if (!userAnswer.trim()) {
            speakText("Please provide an answer before submitting");
            toast.warn("Please provide an answer before submitting", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        setSaving(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/aiinterview/${interviewId}/submitAns`,
                {
                    questionId: currentQuestion._id,
                    userAnswer,
                }
            );
            console.log("ans save res : ",response);
            toast.success(response.data.message || "Answer saved successfully!", {
                position: "top-right",
                autoClose: 3000,
            });
        } catch (error) {
            console.error("Error saving answer:", error);
            toast.error(error.response?.data?.message || "Failed to save answer. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        } finally {
            setSaving(false);
        }
    };

    // Speech recognition handlers
    const handleStartRecording = () => {
        SpeechRecognition.startListening({
            continuous: true,
            language: "en-IN",
            interimResults: true
        });
        toast.info("Recording started", {
            position: "top-right",
            autoClose: 2000,
        });
    };

    const handleStopRecording = () => {
        SpeechRecognition.stopListening();
        if (transcript.trim()) {
            setUserAnswer(transcript);
            toast.success("Recording saved to answer field", {
                position: "top-right",
                autoClose: 2000,
            });
        }
        resetTranscript();
    };

    const navigateToScore = async () => {
        // Calculate averages
        const total = allMetricsData.length;
        const totalConfidence = allMetricsData.reduce((sum, item) => sum + item.confidence, 0);
        const totalEyeContact = allMetricsData.reduce((sum, item) => sum + item.eyeContact, 0);

        const avgConfidence = totalConfidence / total;
        const avgEyeContact = totalEyeContact / total;

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/aiinterview/expression`,
                {
                    interviewId,
                    confidence: avgConfidence.toFixed(2),
                    eyecontact: avgEyeContact.toFixed(2)
                }
            );
            toast.success(response.data.message || "Interview completed successfully!", {
                position: "top-center",
                autoClose: 3000,
            });
        } catch (error) {
            console.error("Error saving metrics:", error);
            toast.error("Failed to save interview metrics", {
                position: "top-center",
                autoClose: 3000,
            });
        }
        speakText("Interview completed. Now showing your results.");
        navigate(`/AI-Interivew/${interviewId}/score`);
    };

    // Draw bounding boxes on canvas
    const drawBoundingBoxes = (faces) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!ctx || !canvas) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        faces.forEach((face) => {
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle =  "rgba(74, 222, 128, 0.8)" ;
            ctx.rect(face.x, face.y, face.width, face.height);
            ctx.stroke();

            // Add confidence label
            ctx.fillStyle = "rgba(74, 222, 128, 0.8)" ;
            ctx.font = "bold 14px Arial";
            ctx.fillText(
                `${(face.confidence * 100).toFixed(1)}% ${face.eye_contact ? "👀" : "👁️"}`,
                face.x,
                face.y > 20 ? face.y - 5 : 15
            );
        });
    };

    useEffect(() => {
  if (warningCount >= 3) {
    setShowWarningModal(true);
  }

  if (warningCount >= 5) {
    toast.error("Interview terminated due to violations");
    navigate(`/AI-Interivew/${interviewId}/score`);
  }
}, [warningCount]);


    // Setup socket connection and auto-start monitoring
    useEffect(() => {
        const socket = io("http://localhost:5000/", {
            transports: ["websocket"],
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        });
        setSocketInstance(socket);

        socket.on("connect", () => {
            console.log("✅ Connected to socket");
            // Auto-start monitoring when connected
            startMonitoring(socket);
        });

        socket.on("disconnect", () => {
            console.log("❌ Disconnected from socket");
        });

        socket.on("face_data", (data) => {
            const { faces, total_faces, warnings } = data;
            setTotalFaces(total_faces);
            setWarnings(warnings || []);
            drawBoundingBoxes(faces);

            // FACE VALIDATION RULES
if (faces.length === 0) {
  setWarnings(prev => [
    ...prev,
    "No face detected. Please stay in front of the camera."
  ]);
  setWarningCount(prev => prev + 1);
}

if (faces.length > 1) {
  setWarnings(prev => [
    ...prev,
    "Multiple people detected. Only one person is allowed."
  ]);
  setWarningCount(prev => prev + 1); // heavier penalty
}

            // Calculate metrics
            const confidences = faces.map((f) => f.confidence * 100);
            const eyeContacts = faces.map((f) => f.eye_contact_percentage);

            const avgConfidence = confidences.length
                ? confidences.reduce((a, b) => a + b) / confidences.length
                : 0;
            const avgEyeContact = eyeContacts.length
                ? eyeContacts.reduce((a, b) => a + b) / eyeContacts.length
                : 0;

            const timestamp = new Date().toISOString();

            // Create detailed metrics object for each face
            const detailedMetrics = faces.map(face => ({
                confidence: face.confidence * 100,
                eyeContact: face.eye_contact_percentage,
                timestamp
            }));

            // Update all metrics data
            setAllMetricsData(prev => [...prev, ...detailedMetrics]);

            // Also update the average metrics for display
            setAverageMetrics({
                confidence: avgConfidence,
                eyeContact: avgEyeContact
            });

            // Update metrics history for the chart
            setMetricsHistory(prev => [
                ...prev.slice(-14),
                {
                    confidence: avgConfidence,
                    eyeContact: avgEyeContact,
                    timestamp
                }
            ]);
        });

        return () => {
            socket.disconnect();
        };
    }, [currentIndex, currentQuestion]);

    // Start monitoring function
    const startMonitoring = (socket) => {
        const interval = setInterval(() => {
            const webcam = webcamRef.current;
            const canvas = canvasRef.current;

            if (webcam && webcam.video && canvas) {
                canvas.width = webcam.video.videoWidth;
                canvas.height = webcam.video.videoHeight;

                const imageSrc = webcam.getScreenshot();
                if (imageSrc) {
                    socket.emit("video_frame", { image: imageSrc });
                }
            }
        }, 1000); // Send frame every second

        return () => clearInterval(interval);
    };

    if (loading || !interview) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
  <div className=" mx-auto md:pt-[80px]  md:p-6 min-h-screen bg-gray-950 text-gray-100">

    {/* Warning Modal */}
    {showWarningModal && (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 border border-red-700 rounded-xl p-6 max-w-md w-full">
          <h2 className="text-xl font-bold text-red-500 mb-3">⚠️ Warning</h2>
          <p className="text-gray-300 mb-4">
            Continued violations may terminate your session.
          </p>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                setShowWarningModal(false);
                setWarningCount(0);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              I Understand
            </Button>
          </div>
        </div>
      </div>
    )}

    {/* Fullscreen Required */}
    {!isFullscreen && (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full">
          <h2 className="text-xl font-bold text-blue-400 mb-3">
            Fullscreen Required
          </h2>
          <p className="text-gray-400 mb-4">
            The interview must be conducted in fullscreen mode.
          </p>
          <div className="flex justify-end">
            <Button
              onClick={enterFullscreen}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Enter Fullscreen
            </Button>
          </div>
        </div>
      </div>
    )}

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-gray-900/50 p-4 rounded-2xl">

      {/* QUESTION PANEL */}
      <Card className="bg-gray-900/80 border border-gray-800 rounded-2xl shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-100">
              Question {currentIndex + 1} / {questions.length}
            </h2>
            <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/30">
              {currentQuestion?.category || "General"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <p className="text-gray-200 leading-relaxed">
              {currentQuestion?.questionText}
            </p>
            <button
              onClick={() => speakText(currentQuestion?.questionText)}
              className="mt-2 text-blue-400 hover:text-blue-300 flex items-center text-sm"
            >
              <RiSpeakAiFill className="mr-2" />
              Hear Question Again
            </button>
          </div>

          <textarea
            value={listening ? transcript : userAnswer}
            onChange={(e) => !listening && setUserAnswer(e.target.value)}
            className="w-full min-h-[160px] bg-gray-900 border border-gray-700 rounded-xl p-4 text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Type or speak your answer..."
          />

          <div className="flex gap-2">
            <Button
              onClick={listening ? handleStopRecording : handleStartRecording}
              className={`flex-1 ${
                listening
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {listening ? "Recording..." : "Record Answer"}
            </Button>

            <Button
              variant="outline"
              className="border-gray-700 text-red-900 hover:bg-red-400"
              onClick={() => {
                if (listening) handleStopRecording();
                setUserAnswer("");
              }}
            >
              Clear
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t border-gray-800 pt-4">
          <Button
            variant="outline"
            className="border-gray-700 text-black bg-white"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((p) => Math.max(p - 1, 0))}
          >
            Previous
          </Button>

          <Button
            onClick={handleSaveAnswer}
            disabled={!userAnswer.trim()}
            className="bg-green-600 hover:bg-green-700"
          >
            {saving ? "Saving..." : "Save Answer"}
          </Button>

          {currentIndex < questions.length - 1 ? (
            <Button
              onClick={() => setCurrentIndex((p) => p + 1)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={navigateToScore}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Finish
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* MONITORING PANEL */}
      <Card className="bg-gray-900/80 border border-gray-800 rounded-2xl shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-100">
              Performance Monitoring
            </h2>
            <Badge className="bg-green-500/10 text-green-400 border border-green-500/30">
              ● Active
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="relative rounded-xl overflow-hidden border border-gray-800 bg-black">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              className="w-full h-full object-cover"
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
            />
          </div>

          {/* METRICS */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-3">
              <p className="text-xs text-white">Faces</p>
              <p className="text-2xl font-bold text-white ">{totalFaces}</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-3">
              <p className="text-xs text-gray-400">Confidence</p>
              <p className="text-2xl font-bold text-blue-400">
                {averageMetrics.confidence.toFixed(1)}%
              </p>
              <Progress value={averageMetrics.confidence} />
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-3">
              <p className="text-xs text-gray-400">Eye Contact</p>
              <p className="text-2xl font-bold text-amber-400">
                {averageMetrics.eyeContact.toFixed(1)}%
              </p>
              <Progress value={averageMetrics.eyeContact} />
            </div>
          </div>

          {/* CHART */}
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metricsHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2933" />
                <XAxis dataKey="timestamp" tick={{ fontSize: 10 }} />
                <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip />
                <Legend />
                <Line dataKey="confidence" stroke="#3b82f6" strokeWidth={2} />
                <Line dataKey="eyeContact" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

};

export default AIInterviewPage;