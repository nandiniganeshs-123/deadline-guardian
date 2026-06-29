import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";


const taskCollection = collection(db, "tasks");

export const updateTask = async (id, data) => {
  const taskRef = doc(db, "tasks", id);

  await updateDoc(taskRef, data);
};

export const deleteTask = async (id) => {
  await deleteDoc(doc(db, "tasks", id));
};

export const saveTask = async (task) => {
  const docRef = await addDoc(taskCollection, task);

  return {
    id: docRef.id,
    ...task,
  };
};

export const getTasks = async (uid) => {
  const q = query(
    taskCollection,
    where("uid", "==", uid)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
