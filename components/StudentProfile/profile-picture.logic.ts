export const getCroppedImg = (imageSrc: string, cropAreaPixels: any) => {
  const createImage = (url: string) =>
    new Promise((resolve, reject) => {
      const image = new Image()
      image.onload = () => resolve(image)
      image.onerror = (error) => reject(error)
      image.src = url
    })

  const getCroppedImg = async (imageSrc: string, pixelCrop: any) => {
    const image: any = await createImage(imageSrc)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!

    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    )

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"))
          return
        }
        const fileUrl = window.URL.createObjectURL(blob)
        resolve(fileUrl)
      }, "image/jpeg")
    })
  }

  return getCroppedImg(imageSrc, cropAreaPixels)
}
