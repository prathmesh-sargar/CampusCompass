# .\venv\Scripts\activate

from flask import Flask, jsonify
from flask_socketio import SocketIO
import cv2
import mediapipe as mp
import base64
import numpy as np
from datetime import datetime

# Initialize Flask and Socket.IO
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="eventlet")

# Initialize MediaPipe components
mp_face_detection = mp.solutions.face_detection
mp_face_mesh = mp.solutions.face_mesh
face_detection = mp_face_detection.FaceDetection(min_detection_confidence=0.6)
face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.5)


@app.route("/health")
def health_check():
    """Health check endpoint for Render."""
    return jsonify({"status": "ok", "message": "Server is running"}), 200



def calculate_eye_contact_percentage(face_landmarks, image_width, image_height):
    """Estimate eye contact based on landmark distances."""
    try:
        left_eye = face_landmarks.landmark[159]  # left eye center
        right_eye = face_landmarks.landmark[386]  # right eye center

        dx = abs(left_eye.x - right_eye.x) * image_width
        dy = abs(left_eye.y - right_eye.y) * image_height

        # Ideal distances (tune for your setup)
        ideal_dx = 60
        ideal_dy = 10

        dx_score = max(0, 1 - abs(dx - ideal_dx) / ideal_dx)
        dy_score = max(0, 1 - abs(dy - ideal_dy) / ideal_dy)
        return round(((dx_score + dy_score) / 2) * 100, 2)
    except Exception:
        return 0.0


def process_frame(data):
    """Decode and analyze frame for face + eye contact."""
    try:
        # Decode base64 image
        img_data = base64.b64decode(data["image"].split(",")[1])
        image = cv2.imdecode(np.frombuffer(img_data, np.uint8), cv2.IMREAD_COLOR)
        if image is None:
            return {"error": "Failed to decode image"}

        height, width, _ = image.shape
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        # Run detection and mesh
        faces = []
        face_results = face_detection.process(image_rgb)
        mesh_results = face_mesh.process(image_rgb)

        if face_results.detections:
            for idx, detection in enumerate(face_results.detections):
                box = detection.location_data.relative_bounding_box
                x, y = int(box.xmin * width), int(box.ymin * height)
                w, h = int(box.width * width), int(box.height * height)
                confidence = detection.score[0]

                eye_contact_score = 0.0
                if mesh_results.multi_face_landmarks and idx < len(mesh_results.multi_face_landmarks):
                    eye_contact_score = calculate_eye_contact_percentage(
                        mesh_results.multi_face_landmarks[idx], width, height
                    )

                faces.append({
                    "x": x,
                    "y": y,
                    "width": w,
                    "height": h,
                    "confidence": round(float(confidence), 2),
                    "eye_contact_percentage": eye_contact_score
                })

        warnings = []
        if not faces:
            warnings.append("No face detected")
        elif len(faces) > 1:
            warnings.append("Multiple faces detected")

        return {
            "faces": faces,
            "total_faces": len(faces),
            "warnings": warnings,
            "timestamp": datetime.now().isoformat()
        }

    except Exception as e:
        return {"error": str(e)}


@socketio.on("video_frame")
def handle_frame(data):
    """Handle video frame events from the client."""
    result = process_frame(data)
    socketio.emit("face_data", result)


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)
