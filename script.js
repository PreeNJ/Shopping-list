const itemInput = document.getElementById('item-input');
const priceInput = document.getElementById('price-input');
const addButton = document.getElementById('add-button');
const clearButton = document.getElementById('clear-button');
const shoppingList = document.getElementById('shopping-list');

let items = JSON.parse(localStorage.getItem('shoppingList')) || [];
function renderList() {
  shoppingList.innerHTML = '';

  items.forEach((item, index) => {
    const li = document.createElement('li');
    if (item.purchased) {
      li.classList.add('purchased');
    }
    const textSpan = document.createElement('span');
    textSpan.classList.add('item-text');
    textSpan.textContent = item.text;
    
    const priceSpan = document.createElement('span');
    priceSpan.classList.add('item-price');
    if (item.price !== '' && item.price !== undefined && item.price !== null) {
      priceSpan.textContent = `Ksh ${parseFloat(item.price).toFixed(2)}`;
    }
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');

    const purchaseBtn = document.createElement('button');
    purchaseBtn.textContent = 'Purchased';
    purchaseBtn.addEventListener('click', () => {
      togglePurchased(index);
    });

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
      editItem(index);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      deleteItem(index);
    });

    buttonsDiv.appendChild(purchaseBtn);
    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(deleteBtn);

    li.appendChild(textSpan);
    li.appendChild(priceSpan);
    li.appendChild(buttonsDiv);

    shoppingList.appendChild(li);
  });
}

function addItem() {
  const text = itemInput.value.trim();
  const price = priceInput.value.trim();
  
  if (text !== '') {
    items.push({ text: text, price: price, purchased: false });
    itemInput.value = '';
    priceInput.value = '';
    saveList();
    renderList();
  }
}

function togglePurchased(index) {
  items[index].purchased = !items[index].purchased;
  saveList();
  renderList();
}
function editItem(index) {
  renderList();
  const li = shoppingList.children[index];
  const item = items[index];

  li.innerHTML = '';
const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.value = item.text;
  editInput.classList.add('edit-input');

  const editPriceInput = document.createElement('input');
  editPriceInput.type = 'number';
  editPriceInput.step = '0.01';
  editPriceInput.value = item.price;
  editPriceInput.classList.add('edit-price-input');
  editPriceInput.placeholder = 'Price';

  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save';
  saveBtn.addEventListener('click', () => {
    const newText = editInput.value.trim();
    const newPrice = editPriceInput.value.trim();
    if (newText !== '') {
      items[index].text = newText;
      items[index].price = newPrice;
      saveList();
      renderList();
    }
  });
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.addEventListener('click', () => {
    renderList();
  });

  li.appendChild(editInput);
  li.appendChild(editPriceInput);
  li.appendChild(saveBtn);
  li.appendChild(cancelBtn);
}

function deleteItem(index) {
  items.splice(index, 1);
  saveList();
  renderList();
}

function clearList() {
  items = [];
  saveList();
  renderList();
}

function saveList() {
  localStorage.setItem('shoppingList', JSON.stringify(items));
}

addButton.addEventListener('click', addItem);
clearButton.addEventListener('click', clearList);

itemInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addItem();
  }
});

renderList();
