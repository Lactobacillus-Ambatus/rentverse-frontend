'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { X, Plus, Upload } from 'lucide-react'
import QuestionnaireWrapper from '@/components/QuestionnaireWrapper'

interface PhotoFile {
  id: string
  file: File
  preview: string
}

function AddListingStepTwoPhotos() {
  const [selectedPhotos, setSelectedPhotos] = useState<PhotoFile[]>([])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddPhotos = () => {
    console.log('handleAddPhotos called - setting showUploadModal to true')
    setShowUploadModal(true)
  }

  const handleBrowseFiles = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const newPhotos: PhotoFile[] = []

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const preview = URL.createObjectURL(file)
        newPhotos.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview,
        })
      }
    })

    setSelectedPhotos(prev => [...prev, ...newPhotos])
    setShowUploadModal(false)
    if (newPhotos.length > 0) {
      setShowPreviewModal(true)
    }
  }

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(event.target.files)
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    handleFileSelect(files)
  }

  const handleRemovePhoto = (photoId: string) => {
    setSelectedPhotos(prev => {
      const updated = prev.filter(photo => photo.id !== photoId)
      // Clean up object URL to prevent memory leaks
      const photoToRemove = prev.find(photo => photo.id === photoId)
      if (photoToRemove) {
        URL.revokeObjectURL(photoToRemove.preview)
      }
      return updated
    })
  }

  const handleCloseUploadModal = () => {
    setShowUploadModal(false)
  }

  const handleClosePreviewModal = () => {
    setShowPreviewModal(false)
  }

  const handleUpload = () => {
    // This would be where actual upload logic goes
    console.log('Upload photos:', selectedPhotos)
    setShowPreviewModal(false)
  }

  return (
    <QuestionnaireWrapper>
      <div className="max-w-6xl mx-auto p-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-slate-900">
              Add some photos of your house
            </h2>
            <p className="text-lg text-slate-600">
              You&apos;ll need 5 photos to get started. You can add more or make changes later.
            </p>
          </div>

          {/* Photo Upload Section */}
          <div className="flex flex-col items-center justify-center py-16 space-y-8">
            {/* Camera Icon */}
            <div className="flex items-center justify-center">
              <Image
                src="https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758300393/rentverse-base/image_15_schljx.png"
                alt="Upload Photos"
                width={120}
                height={120}
                className="w-30 h-30 object-contain"
              />
            </div>

            {/* Add Photos Button */}
            <button
              onClick={handleAddPhotos}
              className="px-6 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-900 font-medium hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2"
            >
              Add photos
            </button>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>

          {/* Selected Photos Count */}
          {selectedPhotos.length > 0 && (
            <div className="text-center">
              <p className="text-slate-600">
                {selectedPhotos.length} photo{selectedPhotos.length !== 1 ? 's' : ''} selected
              </p>
              <button
                onClick={() => setShowPreviewModal(true)}
                className="mt-2 text-slate-900 font-medium hover:text-slate-700 transition-colors"
              >
                View selected photos
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal (Drag & Drop) */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
            onClick={handleCloseUploadModal}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl max-w-md w-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-semibold text-slate-900">Upload photos</h3>
                <span className="text-sm text-slate-500">No items selected</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleBrowseFiles}
                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                  title="Browse files"
                >
                  <Plus size={20} />
                </button>
                <button
                  onClick={handleCloseUploadModal}
                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Drag & Drop Area */}
            <div className="p-6">
              <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`
                  border-2 border-dashed rounded-xl p-12 text-center transition-all
                  ${isDragging
                  ? 'border-slate-400 bg-slate-50'
                  : 'border-slate-300 bg-slate-25'
                }
                `}
              >
                {/* Camera Icon */}
                <div className="flex justify-center mb-4">
                  <Image
                    src="https://res.cloudinary.com/dqhuvu22u/image/upload/f_webp/v1758300393/rentverse-base/image_15_schljx.png"
                    alt="Upload"
                    width={64}
                    height={64}
                    className="w-16 h-16 object-contain"
                  />
                </div>

                {/* Text */}
                <h4 className="text-lg font-medium text-slate-900 mb-2">
                  Drag and drop
                </h4>
                <p className="text-sm text-slate-600 mb-6">
                  or browse for photos
                </p>

                {/* Browse Button */}
                <button
                  onClick={handleBrowseFiles}
                  className="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                >
                  Browse
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-slate-200">
              <button
                onClick={handleCloseUploadModal}
                className="px-6 py-2 text-slate-600 hover:text-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                disabled={selectedPhotos.length === 0}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
            onClick={handleClosePreviewModal}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-semibold text-slate-900">Upload photos</h3>
                <span className="text-sm text-slate-500">
                  {selectedPhotos.length} item{selectedPhotos.length !== 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleAddPhotos}
                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                  title="Add more photos"
                >
                  <Plus size={20} />
                </button>
                <button
                  onClick={handleClosePreviewModal}
                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Photos Grid */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-2 gap-4">
                {selectedPhotos.map((photo, index) => (
                  <div key={photo.id} className="relative group">
                    <div className="aspect-square rounded-xl overflow-hidden bg-slate-100">
                      <Image
                        src={photo.preview}
                        alt={`Selected photo ${index + 1}`}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemovePhoto(photo.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-700 z-10"
                    >
                      <X size={14} />
                    </button>

                    {/* Photo Index */}
                    <div
                      className="absolute top-2 left-2 w-6 h-6 bg-slate-900 bg-opacity-75 text-white text-xs rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-slate-200 flex-shrink-0">
              <button
                onClick={handleClosePreviewModal}
                className="px-6 py-2 text-slate-600 hover:text-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                disabled={selectedPhotos.length === 0}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </QuestionnaireWrapper>
  )
}

export default AddListingStepTwoPhotos