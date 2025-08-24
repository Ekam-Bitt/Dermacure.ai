import React from 'react';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import * as tf from '@tensorflow/tfjs';
import {
  load as cocoModelLoad,
  ObjectDetection
} from '@tensorflow-models/coco-ssd';

interface DetectedObject {
  bbox: [number, number, number, number];
  class: string;
  score: number;
}

type Props = {};

const ModelObjectDetection = (props: Props) => {
  const canvasEle = useRef<HTMLCanvasElement | null>(null);
  const imageEle = useRef<HTMLImageElement | null>(null);
  const [objectDetector, setObjectDetector] = useState<ObjectDetection | null>(
    null
  );
  const [detectedObjects, setDetectedObjects] = useState<DetectedObject[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
          objects[i].class,
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

  const setImage = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  
  
  

  return (
    <>
      {isLoading && (
        <div className="text-center p-4">
          Please wait while the model is loading...
        </div>
      )}
      {!isLoading && (
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              {uploadedImage && (
                <>
                  <Image
                    ref={imageEle}
                    src={uploadedImage}
                    alt="sample image"
                    width={500}
                    height={500}
                    layout="responsive"
                    objectFit="cover"
                  />
                  <canvas
                    ref={canvasEle}
                    className="mt-4"
                    width={500}
                    height={500}
                  />
                </>
              )}
              <div className="mt-4">
                <label
                  htmlFor="fileSelect"
                  className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600"
                >
                  <span>
                    <i className="bi bi-upload"></i>
                  </span>
                  Upload an image
                </label>
                <input id="fileSelect" type="file" onChange={setImage} hidden />
              </div>
              {uploadedImage && (
                <button
                  className="bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600"
                  onClick={startDetecting}
                >
                  Start detection
                </button>
              )}
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              <ul>
                {detectedObjects.length > 0 ? (
                  detectedObjects.map((data, index) => (
                    <li key={`${data.class}-${index}`} className="mb-2">
                      <p className="font-semibold">
                        Object {index + 1}:{' '}
                        <span className="font-normal">{data.class}</span>
                      </p>
                      <p>
                        Confidence:{' '}
                        <span className="font-semibold">
                          {Math.abs(data.score * 100).toFixed(2)}%
                        </span>
                      </p>
                    </li>
                  ))
                ) : (
                  <>
                    {imageEle.current && (
                      <li className="text-gray-500">No Results Found</li>
                    )}
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModelObjectDetection;
