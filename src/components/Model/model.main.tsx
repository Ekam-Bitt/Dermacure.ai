'use client';

import React, { useEffect, useState, useRef } from 'react';
import { loadModel } from '../../utils/loadmodel';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs';
import { Class, Summary } from '../../database/diesease';
import { PDFDocument, rgb } from 'pdf-lib';

import { useUser } from '@/context/usercontext';
import {
  load as cocoModelLoad,
  ObjectDetection
} from '@tensorflow-models/coco-ssd';
import { useReport } from '@/context/reportContext';
import IReport from '@/types/reportInterface';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import createIssue from '@/functions/report/createReport';
import { useToast } from '@/lib/chakraui';

import Image from 'next/image';

interface DetectedObject {
  bbox: [number, number, number, number];
  class: string;
  score: number;
}

const Model = () => {
  const reference = useRef<any>(null);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [useWebcam, setUseWebcam] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [diesease, setDiesease] = useState<number | null>(null);
  const [isloading, setIsloading] = useState<boolean>(true);
  const [isloadingDiesease, setIsloadingDiesease] = useState<boolean>(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<any>(null);
  const { user } = useUser();
  const [imageUploadUrl, setImageUploadUrl] = useState<any>();

  //OBJECT DETECTION //
  const canvasEle = useRef<HTMLCanvasElement | null>(null);
  const imageEle = useRef<HTMLImageElement | null>(null);
  const [objectDetector, setObjectDetector] = useState<ObjectDetection | null>(
    null
  );
  const [detectedObjects, setDetectedObjects] = useState<DetectedObject[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { reportData, setReportData } = useReport();
  const toast = useToast();

  const draw = (ctx: CanvasRenderingContext2D, objects: DetectedObject[]) => {
    if (canvasEle.current && imageEle.current) {
      canvasEle.current.width = imageEle.current.width;
      canvasEle.current.height = imageEle.current.height;

      // Clear part of the canvas
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, imageEle.current.width, imageEle.current.height);

      ctx.drawImage(
        imageEle.current,
        0,
        0,
        imageEle.current.width,
        imageEle.current.height
      );

      for (let i = 0; i < objects.length; i += 1) {
        // Draw the background rectangle
        ctx.fillStyle = 'rgba(0, 128, 0, 0.5)';
        ctx.strokeStyle = 'white';
        ctx.fillRect(
          objects[i].bbox[0],
          objects[i].bbox[1],
          objects[i].bbox[2],
          20
        );

        ctx.font = '16px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(
          //Class[diesease as number],
          //objects[i].class,
          'Object',
          objects[i].bbox[0] + 4,
          objects[i].bbox[1] + 16
        );

        ctx.beginPath();
        ctx.rect(
          objects[i].bbox[0],
          objects[i].bbox[1],
          objects[i].bbox[2],
          objects[i].bbox[3]
        );
        ctx.strokeStyle = 'green';
        ctx.stroke();
        ctx.closePath();
      }
    }
  };

  const startDetecting = async () => {
    if (!objectDetector || !imageEle.current) return;

    const image = tf.browser.fromPixels(imageEle.current);
    const predictions = await objectDetector.detect(image);

    setDetectedObjects(predictions);
    if (predictions && canvasEle.current) {
      draw(
        canvasEle.current.getContext('2d') as CanvasRenderingContext2D,
        predictions
      );
    }
  };

  const loadObjectDetectionModel = async () => {
    try {
      const model = await cocoModelLoad();
      setObjectDetector(model);
      setIsLoading(false);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    loadObjectDetectionModel();
  }, []);

  const setImageCleaned = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];
      if (canvasEle.current) {
        const canvas = canvasEle.current.getContext('2d');
        if (canvas) {
          canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
        }
      }
      setUploadedImage(URL.createObjectURL(image));
    }
  };

  //OBJECT DETECTION //

  const generatePDF = async (dis: string) => {
    try {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();

      // Add a new page to the PDF
      const page = pdfDoc.addPage([400, 400]);
      // const logoImage = await pdfDoc.embedPng(fs.readFileSync('logo.png'));
      // const logoDims = logoImage.scale(0.2);
      // Draw text on the page
      // page.drawImage(logoImage, {
      //   x: 50,
      //   y: 500,
      //   width: logoDims.width,
      //   height: logoDims.height,
      // });

      // Patient information
      const fontSize = 16;
      const padding = 20;
      const patientName = `Patient: ${user?.name}`;
      const age = `Age: ${user?.age}`;
      const sex = `Sex: ${user?.sex}`;
      const disease = `Disease: ${dis}`;

      page.drawText(patientName, {
        x: padding,
        y: 450,
        size: fontSize,
        color: rgb(0, 0, 0)
      });

      page.drawText(age, {
        x: padding,
        y: 450 - fontSize - 10,
        size: fontSize,
        color: rgb(0, 0, 0)
      });

      page.drawText(sex, {
        x: padding,
        y: 450 - 2 * (fontSize + 10),
        size: fontSize,
        color: rgb(0, 0, 0)
      });

      page.drawText(disease, {
        x: padding,
        y: 450 - 3 * (fontSize + 10),
        size: fontSize,
        color: rgb(0, 0, 0)
      });

      // Create a new PDF buffer
      const pdfBytes = await pdfDoc.save();

      // Convert PDF buffer (Uint8Array) to a Blob by using its underlying ArrayBuffer
      const uint8 =
        pdfBytes instanceof Uint8Array
          ? pdfBytes
          : new Uint8Array(pdfBytes as unknown as ArrayBuffer);
      const blob = new Blob([uint8.buffer], { type: 'application/pdf' });
      
      // Set the PDF Blob and PDF generation state
      setPdfBlob(blob);
      setPdfGenerated(true);
    } catch (error) {
      
    }
  };

  const downloadPDF = () => {
    if (pdfBlob) {
      // Create a download link for the PDF Blob
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(pdfBlob);
      downloadLink.download = 'generated-pdf.pdf';

      // Trigger a click on the link to download the PDF
      downloadLink.click();
    }
  };

  useEffect(() => {
    async function load() {
      const loadedModel = await loadModel();
      setModel(loadedModel);
    }
    load();
    setIsloading(false);
  }, []);

  // Function to handle switching between image and webcam inputs
  const toggleInput = () => {
    setUseWebcam(!useWebcam);
    if (useWebcam) {
      stopWebcam();
    } else {
      startWebcam();
    }
  };
  // handle image file upload
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    setImageUploadUrl(file);

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setUseWebcam(false); // Switch back to image input mode
      setImageCleaned(event);

      // Load and preprocess the image
      //startPrediction();
    }
  };

  // Function to handle capturing an image from webcam
  const captureImage = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const capturedImage = canvas.toDataURL('image/jpeg');
        setUploadedImage(capturedImage);
        setImage(capturedImage);
        setUseWebcam(false); // Switch back to image input mode
        setUploadedImage(capturedImage);
        // Load and preprocess the captured image
        //startPrediction();
      }
    }
  };

  // Function to start webcam
  const startWebcam = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setUseWebcam(true);
        }
      } catch (error) {
        
      }
    }
  };

  // Function to stop webcam
  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setUseWebcam(false);
    }
  };

  // Function to initiate model prediction
  const startPrediction = async () => {
    setIsloadingDiesease(true);
    if (model && image) {
      const img = document.createElement('img');
      img.src = uploadedImage as string;
      img.onload = async () => {
        const tensor = tf.browser.fromPixels(img);
        const resized2 = tf.image.resizeBilinear(tensor, [28, 28]);
        const resized = tf.reshape(resized2, [-1, 28, 28, 3]);
        const expanded = resized.expandDims(0);
        //const normalized = expanded.div(255.0);

        const predictions = (await (model as tf.LayersModel).predict(
          resized
        )) as tf.Tensor;
        const predictionData = await predictions.data();
        const topClass = predictionData.indexOf(Math.max(...predictionData));

        setPrediction(`Class ${topClass}`);
        setScore(predictionData[topClass]);
        setDiesease(topClass);
        setIsloadingDiesease(false);
        generatePDF(Class[topClass]);
      };
    }
  };
  useEffect(() => {}, []);

  const handleGenerateReport = async () => {
    try {
      // Add this check
      if (!user || !user.uid) {
        toast({
          title: 'Authentication Error',
          description:
            'User not authenticated or UID not available. Please log in again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right'
        });
        return; // Stop execution if user or UID is missing
      }

      
      let _suspectedDisease = {
        diseaseName: '',
        diseaseDescription: ''
      };
      _suspectedDisease.diseaseName = Class[diesease as number];
      _suspectedDisease.diseaseDescription = Summary[diesease as number] || '';

      let _reporData = { ...reportData };
      let downloadurl = await uploadImageToFirebase();
      _reporData.suspectedDisease = _suspectedDisease;
      _reporData.patientId = user?.uid as string;
      _reporData.patientName = user?.name as string;
      _reporData.patientAge = user?.age as number;
      _reporData.isVerifiedByDoc = false;
      _reporData.diseaseImage = downloadurl as unknown as string;
      setReportData(_reporData);

      createIssue(_reporData);

      toast({
        title: 'Report generated successfully',
        description: 'Your report has been generated successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    } catch (err) {
      toast({
        title: 'Oops! There ws have been an error',
        description: 'There was an error generating your report',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    }
  };

  //detection draw

  const uploadImageToFirebase = async (): Promise<string | undefined> => {
    

    const date = new Date();
    const signatureRef = ref(storage, `disease/${date.getTime()}${user?.uid}`);

    const uploadTask = uploadBytesResumable(signatureRef, imageUploadUrl);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot: any) => {
          const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) *
            100) as number;
          
          // You can update a progress state here if needed
        },
        (error: any) => { // onError callback
          // console.error('Upload failed:', error); // Removed as per previous fix
          reject(error); // Reject the promise on error
        },
        async () => { // onComplete callback
          try {
            const downloadURLOnUpload = await getDownloadURL(
              uploadTask.snapshot.ref
            );
            resolve(downloadURLOnUpload); // Resolve the promise with the download URL
          } catch (error) {
            // console.error('Failed to get download URL:', error); // Removed as per previous fix
            reject(error); // Reject if getting download URL fails
          }
        }
      );
    });
  };

  return (
    <div className="bg-blue-100  flex flex-col min-h-[40rem] justify-center items-center p-12">
      {isloading ? (
        <h1 className="lg:text-2xl font-bold text-blue-800 text-center">
          Loading...
        </h1>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md ">
          <h1 className="lg:text-3xl font-bold my-4 text-center">
            Upload Or Take an Image to Predict Diesease
          </h1>
          <div className="flex justify-around items-end">
            <button
              onClick={toggleInput}
              className="bg-[#221389] text-white hover:bg-blue-700 w-44 h-12 rounded-full"
            >
              {useWebcam ? 'Switch to Image' : 'Switch to Webcam'}
            </button>
            {useWebcam ? (
              <div className="flex flex-col justify-center ">
                <video
                  ref={videoRef}
                  autoPlay
                  width="400"
                  height="400"
                  className="mt-4 rounded-xl "
                ></video>
                <button
                  onClick={e => captureImage(e)}
                  className="bg-[#221389] text-white hover:bg-blue-700 p-3 rounded-full my-4"
                >
                  Capture
                </button>
              </div>
            ) : (
              <div>
                {/* Add your image upload input here */}
                <input
                  type="file"
                  hidden
                  ref={reference}
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="fileInput"
                />
                <button
                  className="bg-[#221389] text-white hover:bg-blue-700 w-44 h-12 rounded-full"
                  onClick={() => reference.current?.click()}
                >
                  Upload Image
                </button>
              </div>
            )}
          </div>
  
            {image && (
              <div className="flex flex-col items-center py-4">
                <button
                  onClick={() => {
                    startPrediction();
                    startDetecting();
                  }}
                  className="bg-[#15B9FF] text-white hover:bg-blue-700 w-44 h-12 rounded-full"
                >
                  Start Predicting
                </button>
              </div>
            )}
  
            <canvas
              ref={canvasRef}
              style={{ display: 'none' }}
              width="300"
              height="300"
            />
            <div className="flex justify-evenly">
              {uploadedImage && (
                <>
                  <Image
                    ref={imageEle}
                    src={uploadedImage}
                    alt="sample image"
                    width={300}
                    height={300}
                    className="rounded-xl"
                  />
                  <canvas
                    ref={canvasEle}
                    width={300}
                    height={300}
                    className="rounded-xl"
                  />
                </>
              )}
            </div>
            {isloadingDiesease ? (
              <h1 className="lg:text-2xl text-center font-bold text-blue-800 mt-4">
                Loading...
              </h1>
            ) : (
              <>
                {prediction !== null && (
                  <div className="mt-4 flex flex-col items-center justify-center py-12 gap-4">
                    <h2 className="text-xl font-bold">Model Prediction:</h2>
                    <p className="text-blue-800 text-xl">
                      {Class[diesease as number]}{' '}
                      {/* {Math.abs((score as number) * 100).toFixed(2)}% */}
                    </p>
                    <p>{Summary[diesease as number]}</p>
                    <button
                      onClick={handleGenerateReport}
                      className="bg-[#221389] text-white hover:bg-blue-700 w-44 h-12 rounded-full"
                    >
                      Generate Report
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    );
  };

export default Model;
