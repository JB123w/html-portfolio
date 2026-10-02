const addBtn = document.getElementById('add_btn');
const addJobForm = document.getElementById('add_job_form');


addBtn.addEventListener('click', function () {
  addJobForm.classList.toggle('hidden');
});

//Add button
const tableBody = document.querySelector('.applications_table tbody');

addJobForm.addEventListener('submit', function (event) {

  event.preventDefault();

  const company = document.getElementById('company_input').value;
  const position = document.getElementById('position_input').value;
  const status = document.getElementById('status_input').value;

  const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);

  const newRowHTML = `
        <tr>
        <td>${company}</td>
        <td>${position}</td>
        <td><span class="status_badge ${status}">${formattedStatus}</span></td>
        <td>
          <button class="action_btn edit_btn" title="Edit"><i class="fa-solid fa-pen"></i></button>
          <button class="action_btn delete_btn" title="Delete"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `;

  tableBody.insertAdjacentHTML(`beforeend`, newRowHTML)

  addJobForm.reset();
  addJobForm.classList.add('hidden');
  updateDashboard();
  updateRecentApplications();
});

//Edit and Delete
tableBody.addEventListener('click', function (event) {

  if (event.target.closest('.delete_btn')) {
    const rowToDelete = event.target.closest('tr');
    rowToDelete.remove();
    updateRecentApplications();
  }

  if (event.target.closest('.edit_btn')) {
    const rowToEdit = event.target.closest('tr');

    const cells = rowToEdit.querySelectorAll('td');

    const companyName = cells[0].innerText;
    const jobPosition = cells[1].innerText;
    const statusText = cells[2].innerText.toLowerCase();

    document.getElementById('company_input').value = companyName;
    document.getElementById('position_input').value = jobPosition;
    document.getElementById('status_input').value = statusText;

    addJobForm.classList.remove('hidden');

    rowToEdit.remove();
  }

  updateDashboard();
});

//Dashboard Functions
function updateDashboard() {

  const totalCount = document.querySelectorAll('.applications_table tbody tr').length;

  const appliedCount = document.querySelectorAll('.applications_table tbody .applied').length;
  const interviewingCount = document.querySelectorAll('.applications_table tbody .interviewing').length;
  const offerCount = document.querySelectorAll('.applications_table tbody .offer').length;

  document.getElementById('total_metric').innerText = totalCount;
  document.getElementById('applied_metric').innerText = appliedCount;
  document.getElementById('interviewing_metric').innerText = interviewingCount;
  document.getElementById('offers_metric').innerText = offerCount;
}


// --- RECENT APPLICATIONS UPDATE FUNCTION ---
function updateRecentApplications() {
  const recentList = document.querySelector('.Application_list');

  // 1. Clear out the old hardcoded list items
  recentList.innerHTML = '';

  // 2. Grab every row currently in the table
  const allRows = document.querySelectorAll('.applications_table tbody tr');

  // 3. Convert to an Array, grab the last 3, and reverse their order
  const latestRows = Array.from(allRows).slice(-3).reverse();

  // 4. Loop through those 3 rows and extract their data
  latestRows.forEach(function (row) {
    const cells = row.querySelectorAll('td');
    const company = cells[0].innerText;
    const position = cells[1].innerText;
    const status = cells[2].innerText;

    // 5. Build the new HTML for the list item
    const newListItem = `
      <li>
        <span class="job_detail">${company} — ${position}</span>
        <span class="job_status">${status}</span>
      </li>
    `;

    // 6. Inject it into the <ul> container
    recentList.insertAdjacentHTML('beforeend', newListItem);
  });
}

updateDashboard();
updateRecentApplications();