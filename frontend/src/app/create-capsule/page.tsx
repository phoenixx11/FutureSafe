'use client';

import React, { useState } from 'react';
import styles from './components/styles.module.css';
import { generateAttestationOnChain } from '../../services/signProtocol'; 
import { encryptAndCreateAttestation } from '../backend/services/encryptionService'; 
import { triggerPayment } from '../backend/services/paymentService'; 
import { registerSchemaOnChain } from '../backend/services/schemaService'; 
import { storeDataOnArweave } from '../backend/arweaveService'; 

const CreateCapsule: React.FC = () => {
  const [step, setStep] = useState(1);
  const [content, setContent] = useState<File[]>([]);
  const [unlockDate, setUnlockDate] = useState<string>('');
  const [recipients, setRecipients] = useState<string[]>([]);
  const [customization, setCustomization] = useState({
    holographicMessage: '',
    memoryEnhancements: '',
    visualTheme: '',
  });
  const [loading, setLoading] = useState(false);
  const [attestationId, setAttestationId] = useState<string | null>(null);

  // Function to handle file uploads
  const handleFileUpload = (files: FileList) => {
    setContent([...content, ...Array.from(files)]);
  };

  // Function to handle payment, schema registration, and attestation
  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      // Step 1: Register Schema on-chain and get the Schema ID
      const schemaId = await registerSchemaOnChain();
      console.log('Schema ID:', schemaId);

      // Step 2: Trigger Payment before Capsule Creation
      const paymentSuccess = await triggerPayment();
      if (!paymentSuccess) {
        alert('Payment failed. Please try again.');
        setLoading(false);
        return;
      }

      // Step 3: Encrypt and Store Data on Arweave
      const encryptedFiles = await Promise.all(
        content.map(async (file) => {
          const fileData = await file.arrayBuffer();
          const encryptedData = await encryptAndCreateAttestation(
            new Uint8Array(fileData)
          ); // Encrypt file data
          return await storeDataOnArweave(encryptedData); // Store encrypted data on Arweave
        })
      );

      // Step 4: Create Capsule Data
      const capsuleData = {
        data: encryptedFiles, // Array of Arweave transaction IDs
        unlockDate: new Date(unlockDate),
        authorizedUsers: recipients,
        customization,
      };

      // Step 5: Create Attestation on-chain
      const newAttestationId = await generateAttestationOnChain(
        schemaId,
        capsuleData
      );
      console.log('Attestation ID:', newAttestationId);
      setAttestationId(newAttestationId);

      alert(`Time Capsule created successfully! Attestation ID: ${newAttestationId}`);
    } catch (error) {
      console.error('Error creating time capsule:', error);
      alert('Failed to create time capsule. Please try again.');
    } finally {
      setLoading(false);
    }
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
              <button onClick={nextStep} className={styles.nextButton}>
                Review & Encrypt
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className={styles.step}>
            <h2>Preview & Encrypt</h2>
            <div className={styles.preview}>
              <p>Content: {content.length} files uploaded</p>
              <p>Unlock Date: {unlockDate}</p>
              <p>Recipients: {recipients.join(', ')}</p>
              <p>Holographic Message: {customization.holographicMessage}</p>
              <p>AI Enhancements: {customization.memoryEnhancements}</p>
              <p>Visual Theme: {customization.visualTheme}</p>
            </div>
            <button onClick={handleFinalSubmit} className={styles.encryptButton} disabled={loading}>
              {loading ? 'Processing...' : 'Encrypt & Save Capsule'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCapsule;