'use client'; 
import React, { useState } from 'react';
import styles from './components/styles.module.css';

const CreateCapsule: React.FC = () => {
  const [step, setStep] = useState(1);

  // State for form data
  const [content, setContent] = useState<File[]>([]);
  const [unlockDate, setUnlockDate] = useState<string>('');
  const [recipients, setRecipients] = useState<string[]>([]);
  const [customization, setCustomization] = useState({
    holographicMessage: '',
    memoryEnhancements: '',
    visualTheme: ''
  });

  // Function to handle file uploads
  const handleFileUpload = (files: FileList) => {
    setContent([...content, ...Array.from(files)]);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Process form data here
    console.log({
      content,
      unlockDate,
      recipients,
      customization,
    });
  };

  // Step navigation
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Your Time Capsule</h1>
      <div className={styles.formContainer}>
        {step === 1 && (
          <div className={styles.step}>
            <h2>Select Content</h2>
            <div
              className={styles.fileUpload}
              onDrop={(e) => {
                e.preventDefault();
                handleFileUpload(e.dataTransfer.files);
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              Drag and drop files here or click to upload
            </div>
            {content.length > 0 && (
              <ul className={styles.fileList}>
                {content.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
            <button onClick={nextStep} className={styles.nextButton}>
              Next: Choose Unlock Date
            </button>
          </div>
        )}

        {step === 2 && (
          <div className={styles.step}>
            <h2>Choose Unlock Date</h2>
            <input
              type="date"
              value={unlockDate}
              onChange={(e) => setUnlockDate(e.target.value)}
              className={styles.dateInput}
            />
            <div className={styles.buttons}>
              <button onClick={prevStep} className={styles.prevButton}>
                Previous: Select Content
              </button>
              <button onClick={nextStep} className={styles.nextButton}>
                Next: Add Recipients
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={styles.step}>
            <h2>Add Recipients</h2>
            <input
              type="email"
              placeholder="Recipient Email"
              className={styles.emailInput}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value) {
                  setRecipients([...recipients, e.currentTarget.value]);
                  e.currentTarget.value = '';
                }
              }}
            />
            <ul className={styles.recipientList}>
              {recipients.map((email, index) => (
                <li key={index}>{email}</li>
              ))}
            </ul>
            <div className={styles.buttons}>
              <button onClick={prevStep} className={styles.prevButton}>
                Previous: Choose Unlock Date
              </button>
              <button onClick={nextStep} className={styles.nextButton}>
                Next: Customize Capsule
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className={styles.step}>
            <h2>Customize Capsule</h2>
            <textarea
              placeholder="Holographic Message"
              value={customization.holographicMessage}
              onChange={(e) =>
                setCustomization({
                  ...customization,
                  holographicMessage: e.target.value,
                })
              }
              className={styles.textarea}
            />
            <input
              type="text"
              placeholder="AI-Powered Memory Enhancements"
              value={customization.memoryEnhancements}
              onChange={(e) =>
                setCustomization({
                  ...customization,
                  memoryEnhancements: e.target.value,
                })
              }
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Visual Theme"
              value={customization.visualTheme}
              onChange={(e) =>
                setCustomization({
                  ...customization,
                  visualTheme: e.target.value,
                })
              }
              className={styles.input}
            />
            <div className={styles.buttons}>
              <button onClick={prevStep} className={styles.prevButton}>
                Previous: Add Recipients
              </button>
              <button onClick={handleSubmit} className={styles.submitButton}>
                Review & Encrypt
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className={styles.step}>
            <h2>Preview & Encrypt</h2>
            <div className={styles.preview}>
              {/* Render a preview of the time capsule here */}
              <p>Content: {content.length} files uploaded</p>
              <p>Unlock Date: {unlockDate}</p>
              <p>Recipients: {recipients.join(', ')}</p>
              <p>Holographic Message: {customization.holographicMessage}</p>
              <p>AI Enhancements: {customization.memoryEnhancements}</p>
              <p>Visual Theme: {customization.visualTheme}</p>
            </div>
            <button onClick={() => alert('Encrypted!')} className={styles.encryptButton}>
              Encrypt & Save Capsule
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCapsule;
