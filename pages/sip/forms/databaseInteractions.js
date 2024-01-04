import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  where,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { firestoreDB, StorageDB } from "@/lib/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 } from "uuid";

const getDataFromStartupModalById = async (doc_id) => {
  console.log(`id : ${doc_id}`);
  try {
    const docRef = doc(firestoreDB, "StartupApplicationsData", doc_id);

    const docSnap = await getDoc(docRef);
    console.log(`Doc Snap :${docSnap}`);
    return docSnap.data();
  } catch (error) {
    console.error("Error retrieving data:", error.message);
    throw error;
  }
};

const getDataFromStartupModal = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(firestoreDB, "StartupApplicationsData")
    );

    // Initialize an array to store the retrieved data
    const dataArray = [];

    // Loop through the query snapshot and push data to the array
    querySnapshot.forEach((doc) => {
      dataArray.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    return dataArray;
  } catch (error) {
    console.error("Error retrieving data:", error.message);
    throw error;
  }
};

const addJdfileToCloudStorage = async (jdfile) => {
  if (jdfile == null) return;

  try {
    // Uploading the jd file that the startup has added
    const jdref = ref(
      StorageDB,
      `startup_applications_data/jd/${v4()}_${jdfile.name}`
    );
    // Get the snapshot after uploading the file
    const snapshot = await uploadBytes(jdref, jdfile);
    // Get the URL for the uploaded file
    const url = await getDownloadURL(snapshot.ref);
    console.log("JD uploaded!!");
    return url;
  } catch (error) {
    console.error("Error uploading JD file: ", error);
    throw error;
  }
};

const addDataToStartupModal = async (
  formData,
  profilesOthersText,
  hiringProfiles,
  applicableCandidates,
  selectedLoc,
  joiningDate,
  jdurl
) => {
  // If profilesOthersText is not null and not an empty string, add it to hiringProfiles
  if (profilesOthersText !== null && profilesOthersText !== "") {
    hiringProfiles.push(profilesOthersText);
  }
  console.log(`hiringProfiles :${hiringProfiles}`);

  const data = {
    email: formData.email,
    company_name: formData.company_name,
    poc_email: formData.poc_email,
    poc_linkedin: formData.poc_linkedin,
    poc_contact: formData.poc_contact,
    company_pos_web: formData.company_pos_web,
    stipend: formData.stipend,
    loc: selectedLoc,
    hiring_profiles: hiringProfiles,
    applicable_candidates: applicableCandidates,
    joining_date: joiningDate,
    jdurl: jdurl,
  };
  console.log(`url : ${jdurl}`);
  try {
    const docRef = await addDoc(
      collection(firestoreDB, "StartupApplicationsData"),
      data
    );
    console.log("Document written with ID: ", docRef.id);
    if (profilesOthersText !== null && profilesOthersText !== "") {
      hiringProfiles.pop();
    }
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

const addDataToStudentModal = async (formData, resume_url) => {
  const data = {
    name: formData.name,
    year: formData.year,
    email: formData.email,
    contactNumber: formData.contactNumber,
    proposedJoiningDate: formData.proposedJoiningDate,
    applyingPosition: formData.applyingPosition,
    linkedinId: formData.linkedinId,
    githubId: formData.githubId,
    resume: resume_url,
  };
  try {
    const docRef = await addDoc(
      collection(firestoreDB, "StudentsInternData"),
      data
    );
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

const addResumeToCloudStorage = async (resume) => {
  if (resume == null) return;

  try {
    // Uploading the resume that the startup has added
    const resume_ref = ref(
      StorageDB,
      `students_intern_data/resume/${v4()}_${resume.name}`
    );
    // Get the snapshot after uploading the resume
    const snapshot = await uploadBytes(resume_ref, resume);
    // Get the URL for the uploaded file
    const url = await getDownloadURL(snapshot.ref);
    console.log("JD uploaded!!");
    return url;
  } catch (error) {
    console.error("Error uploading JD file: ", error);
    throw error;
  }
};

export {
  addDataToStartupModal,
  addJdfileToCloudStorage,
  getDataFromStartupModal,
  getDataFromStartupModalById,
  addDataToStudentModal,
  addResumeToCloudStorage,
};
