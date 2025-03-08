import React, { useState, useEffect } from "react";
import { storage, auth } from "../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import "./UploadDocs.css";

const UploadDocs = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [docs, setDocs] = useState([]);
  const user = auth.currentUser; // Get logged-in user

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Upload file to Firebase Storage
  const handleUpload = () => {
    if (!file || !user) {
      alert("Please select a file and log in first.");
      return;
    }

    const storageRef = ref(storage, `medical-docs/${user.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress indicator (optional)
      },
      (error) => {
        console.error("Upload failed:", error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(storageRef);
        setDocs((prev) => [...prev, { name: file.name, url: downloadURL }]);
        setUploading(false);
      }
    );
  };

  // Fetch uploaded files when user logs in
  useEffect(() => {
    if (!user) return;

    const fetchDocuments = async () => {
      const folderRef = ref(storage, `medical-docs/${user.uid}`);
      const filesList = await listAll(folderRef);

      const fileUrls = await Promise.all(
        filesList.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return { name: item.name, url };
        })
      );

      setDocs(fileUrls);
    };

    fetchDocuments();
  }, [user]);

  return (
    <div className="upload-docs">
      <h2>Upload Medical Documents</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>

      <h3>Your Documents</h3>
      <ul>
        {docs.map((doc, index) => (
          <li key={index}>
            <a href={doc.url} target="_blank" rel="noopener noreferrer">
              {doc.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadDocs;
