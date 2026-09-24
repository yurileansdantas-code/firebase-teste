const firebaseConfig = {
  apiKey: "AIzaSyA1vn2NgVqFXKyFHZ1ctC9vRI-GJOj7H2g",
  authDomain: "senai-teste-99198.firebaseapp.com",
  projectId: "senai-teste-99198",
  storageBucket: "senai-teste-99198.firebasestorage.app",
  messagingSenderId: "741762240969",
  appId: "1:741762240969:web:0f66931b321ad4a1cbd818"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ experimentalForceLongPolling: true });

async function addData() {
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;

  try {
    const docRef = await db.collection('users').add({
      name: name,
      age: Number.parseInt(age, 10)
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}

async function getData() {
  try {
    const querySnapshot = await db.collection('users').get();
    const dataList = document.getElementById('data-list');
    dataList.innerHTML = '';

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const listItem = document.createElement('li');
      listItem.textContent = `${data.name}, ${data.age}`;
      dataList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
}

window.addData = addData;
window.getData = getData;