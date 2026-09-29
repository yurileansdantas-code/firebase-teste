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

// 1. Adicionar Usuário (Create)
async function addData() {
  const nameInput = document.getElementById('name');
  const ageInput = document.getElementById('age');

  if (!nameInput.value || !ageInput.value) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  try {
    await db.collection('users').add({
      name: nameInput.value,
      age: Number.parseInt(ageInput.value, 10)
    });
    nameInput.value = '';
    ageInput.value = '';
  } catch (error) {
    console.error('Erro ao adicionar usuário: ', error);
  }
}

// 2. Escuta em Tempo Real (Realtime Read)
function listenToUsers() {
  db.collection('users').onSnapshot((querySnapshot) => {
    const dataList = document.getElementById('data-list');
    dataList.innerHTML = '';

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const listItem = document.createElement('li');
      
      listItem.innerHTML = `
        <strong>${data.name}</strong> - ${data.age} anos 
        <button onclick="editData('${doc.id}', '${data.name}', ${data.age})">Editar</button>
        <button onclick="deleteData('${doc.id}')">Excluir</button>
      `;
      
      dataList.appendChild(listItem);
    });
  }, (error) => {
    console.error('Erro ao escutar alterações: ', error);
  });
}

// 3. Atualizar Usuário (Update)
async function editData(id, currentName, currentAge) {
  const newName = prompt('Novo nome:', currentName);
  const newAge = prompt('Nova idade:', currentAge);

  if (newName !== null && newAge !== null) {
    try {
      await db.collection('users').doc(id).update({
        name: newName,
        age: Number.parseInt(newAge, 10)
      });
      console.log('Documento atualizado com sucesso:', id);
    } catch (error) {
      console.error('Erro ao atualizar documento: ', error);
    }
  }
}

// 4. Excluir Usuário (Delete)
async function deleteData(id) {
  if (confirm('Deseja realmente excluir este usuário?')) {
    try {
      await db.collection('users').doc(id).delete();
      console.log('Documento removido com sucesso:', id);
    } catch (error) {
      console.error('Erro ao remover documento: ', error);
    }
  }
}

// Inicializa a escuta automática ao carregar a página
window.onload = listenToUsers;

window.addData = addData;
window.editData = editData;
window.deleteData = deleteData;