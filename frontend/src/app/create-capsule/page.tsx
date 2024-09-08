'use client';

import React, { useState } from 'react';
import styles from './components/styles.module.css';
import { createAttestation } from '../../services/signProtocol'; 
//import { encryptAndCreateAttestation } from '../backend/services/encryptionService'; 
import { triggerPayment } from '../backend/services/paymentService'; 
import { client, registerSchemaOnChain } from '../backend/services/schemaService'; 
import { storeDataOnArweave } from '../backend/services/arweaveService'; 
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { Lit } from '../backend/services/encryptionService';
import { LitNetwork } from "@lit-protocol/constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCapsule: React.FC = () => {
  const [step, setStep] = useState(1);
  const [content, setContent] = useState<File[]>([]);
  const [unlockDate, setUnlockDate] = useState<string>('');
  const [recipients, setRecipients] = useState<string[]>([]);
  const [customization, setCustomization] = useState({
    personalizedMessage: '',
    memoryEnhancements: '',
    visualTheme: '',
  });
  const [loading, setLoading] = useState(false);

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
    const paymentSuccess = await triggerPayment('0.01');
    if (!paymentSuccess) {
      alert('Payment failed. Please try again.');
      setLoading(false);
      return;
    }

    // Step 3: Create Capsule Data
    const capsuleData = {
      data: 'string', // Example data
      unlockDate: 1234567890,
      authorizedUsers: ["address1", "address2"],
      personalizedMessage: 'Hello, world!',
      memoryEnhancements: 'Enhanced memory',
      visualTheme: 'Dark theme',
      indexingValue: "10000000000",
    }
    // Log the capsule data to verify its structure
    console.log("Capsule Data:", capsuleData);

    // Step 4: Encrypt and Store Data on Arweave
    const client = new LitJsSdk.LitNodeClient({
      litNetwork: LitNetwork.Datil,
    });

     const encryptAndStoreOnArweave = async (capsuleData: any) => {
      try {
        // Connect to Lit Protocol network
        await client.connect();
    
        // Encrypt capsule data using Lit JS SDK
        const { ciphertext, dataToEncryptHash } = await LitNodeClient.encrypt(capsuleData);
    
        // Store encrypted data on Arweave
        const arweaveTransactionId = await storeDataOnArweave(ciphertext);
        console.log('Encrypted data stored on Arweave with Transaction ID:', arweaveTransactionId);
    
        // Handle dataToEncryptHash as needed (e.g., store it for verification)
        // console.log('Data to Encrypt Hash:', dataToEncryptHash);
    
        return arweaveTransactionId;
      } catch (error) {
        console.error('Error encrypting and storing data:', error);
        throw error; // Re-throw the error to handle it in the calling function
      }
    };

    // Step 5: Create Attestation on-chain
     console.log("Submitting attestation with schemaId:", schemaId);
     console.log("Capsule data:", capsuleData);
     
      await createAttestation(schemaId, capsuleData);
      console.log("Attestation created successfully");
    } catch (error) {
      console.error("Error creating attestation:", error);
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
              placeholder="Personalized Message"
              value={customization.personalizedMessage}
              onChange={(e) =>
                setCustomization({
                  ...customization,
                  personalizedMessage: e.target.value,
                })
              }
              className={styles.textarea}
            />
            <input
              type="text"
              placeholder=" Memory Enhancements"
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
              <p>Personalized Message: {customization.personalizedMessage}</p>
              <p>Memory Enhancements: {customization.memoryEnhancements}</p>
              <p>Visual Theme: {customization.visualTheme}</p>
            </div>
            <button onClick={handleFinalSubmit} className={styles.encryptButton} disabled={loading}>
              {loading ? 'Processing...' : 'Encrypt & Save Capsule'}
            </button>
            console.log("Submitting attestation with schemaId:", schemaId);
            console.log("Capsule data:", capsuleData);
            console.log("Attestation created successfully");
            <ToastContainer />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCapsule;