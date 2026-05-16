import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import jsQR from 'jsqr';

const QRScanner = ({ onScanSuccess }) => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [scanning, setScanning] = useState(true);
  const [error, setError] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    let animationFrameId;

    const startScanning = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            scan();
          };
        }
      } catch (err) {
        setError('Camera access denied. Please enable camera permissions.');
        setScanning(false);
      }
    };

    const scan = () => {
      if (!videoRef.current || !canvasRef.current || scanned) {
        animationFrameId = requestAnimationFrame(scan);
        return;
      }

      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          setScanned(true);
          setScanning(false);
          handleQRDetected(code.data);
        }
      }

      animationFrameId = requestAnimationFrame(scan);
    };

    startScanning();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [scanned]);

  const handleQRDetected = (qrData) => {
    try {
      const url = new URL(qrData);
      const tableId = url.pathname.split('/').pop();
      
      if (tableId && tableId.match(/^T\d+$/)) {
        localStorage.setItem('table_id', tableId);
        
        if (onScanSuccess) {
          onScanSuccess(tableId);
        } else {
          navigate(`/table/${tableId}`);
        }
      } else {
        setError('Invalid QR Code. Please scan a valid table QR code.');
        setScanned(false);
      }
    } catch (err) {
      setError('Invalid QR Code format.');
      setScanned(false);
    }
  };

  const handleRetry = () => {
    setScanned(false);
    setError(null);
  };

  return (
    <div className="relative w-full h-screen bg-black flex flex-col items-center justify-center">
      {scanning && !error && (
        <>
          <video
            ref={videoRef}
            className="w-full h-full object-cover absolute inset-0"
            playsInline
            autoPlay
            muted
          />
          <canvas ref={canvasRef} style={{ display: 'none' }} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-64 h-64 border-4 border-[#B5451B] rounded-lg relative">
              <motion.div
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute left-0 right-0 h-1 bg-[#B5451B]"
              />
            </div>
          </motion.div>

          <div className="absolute bottom-20 left-0 right-0 text-center text-white z-10">
            <p className="text-lg font-semibold mb-2">Position QR Code in frame</p>
            <p className="text-sm text-gray-300">Scanning for table QR codes...</p>
          </div>
        </>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-6 py-8 bg-white rounded-lg shadow-lg max-w-sm"
        >
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="px-6 py-2 bg-[#B5451B] text-white rounded-lg font-semibold hover:bg-[#8B3210]"
          >
            Try Again
          </button>
        </motion.div>
      )}

      {scanned && !error && (
        <div className="text-center text-white">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6 }}
            className="text-6xl mb-4"
          >
            ✓
          </motion.div>
          <p>QR Code detected! Redirecting...</p>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
