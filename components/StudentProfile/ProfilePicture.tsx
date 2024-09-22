"use client"
import { Button, Slider } from "antd"
import Image from "next/image"
import React, { useCallback, useState } from "react"
import Dropzone from "react-dropzone"
import Cropper from "react-easy-crop"
import { getCroppedImg } from "./profile-picture.logic"

const ProfilePicture = ({
  currentTab,
  setTab,
  updateStudentProfile,
  profileData,
}: {
  currentTab: number
  setTab: (tab: number) => void
  updateStudentProfile: any
  profileData: any
}) => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)

  // Handle file input
  const onDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setImageSrc(reader.result as string)
    }
  }

  // Capture the cropped area when cropping is done
  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  // Generate the cropped image when "Save" is clicked
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc!, croppedAreaPixels)
      setCroppedImage(croppedImage as string)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, imageSrc])

  return (
    <div className="flex flex-1 justify-around gap-4">
      {imageSrc ? (
        <div className="flex flex-col">
          {/* Image cropping interface */}
          <div className="relative size-[25rem]">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              showGrid={false}
              cropShape="round"
              aspect={1} // This will maintain a square aspect ratio
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <Slider value={zoom} min={1} max={3} step={0.1} onChange={(value) => setZoom(value)} />
          <Button type="primary" htmlType="button" onClick={showCroppedImage}>
            Set as profile picture
          </Button>
        </div>
      ) : (
        // Image upload interface
        <Dropzone onDrop={onDrop} accept={{ "image/*": [] }}>
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="flex h-60 w-[50rem] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-5 shadow-lg transition duration-300 hover:border-blue-500 hover:bg-blue-50"
            >
              <input {...getInputProps()} />
              <p className="text-gray-500">Drag and drop an image, or click to select one</p>
            </div>
          )}
        </Dropzone>
      )}

      {/* Preview of cropped image */}
      {croppedImage && (
        <div className="flex flex-col justify-center">
          <div
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid #ddd",
              margin: "auto",
            }}
          >
            <img
              src={croppedImage}
              alt="Cropped"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="flex items-end justify-between gap-2">
            <Button type="primary" htmlType="button" onClick={() => setTab(currentTab - 1)}>
              Prev
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfilePicture
